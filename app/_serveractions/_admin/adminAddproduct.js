"use server";
import { uploadImage, Deleteiamgefromurl } from "@/app/_connections/Cloudinary";
import Verification from "@/app/_connections/Verifytoken";
import { getcollection } from "@/app/_connections/Mongodb";
import { staticdata, materialoptions } from "@/app/commondata";

export const Addproduct = async (data, imagesformdata, deletedimages) => {
  try {
    const res = await Verification("Products_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }

    const { Productscollection, ObjectId } = await getcollection();

    for (const variant of data.variants) {
      for (let j = 0; j < variant?.images?.length; j++) {
        const image = variant?.images[j];
        if (image.length < 15) {
          const arrayBuffer = await imagesformdata.get(image).arrayBuffer();
          const buffer = Buffer.from(arrayBuffer);
          const cloudinaryres = await uploadImage(
            buffer,
            "Altorganizer/products"
          );
          variant.images[j] = cloudinaryres.secure_url;
        }
      }
    }

    // delete previous images
    deletedimages.forEach((image) => {
      Deleteiamgefromurl(image, "Altorganizer/products");
    });

    const date = new Date().getTime();

    // Add to MongoDB
    if (data._id) {
      // to update a product
      const { _id, ...updateFields } = data;
      await Productscollection.updateOne(
        { _id: new ObjectId(data._id) },
        { $set: { ...updateFields, lastupdated: date } }
      );
      return { status: 200, message: "Updated successfully" };
    } else {
      // to add a product
      await Productscollection.insertOne({ ...data, lastupdated: date });
      return { status: 200, message: "Added successfully" };
    }
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error!" };
  }
};

export const Deleteproduct = async (variants, id) => {
  try {
    const res = await Verification("Products_permission");
    if (!res?.verified) {
      return { status: 400, message: "Invalid user" };
    }
    const { Productscollection, ObjectId } = await getcollection();

    if (variants) {
      for (const item of variants) {
        for (let j = 0; j < item.images.length; j++) {
          const url = item.images[j];
          Deleteiamgefromurl(url, "Altorganizer/products");
        }
      }
    }

    // delete form mongodb
    await Productscollection.findOneAndDelete({ _id: new ObjectId(id) });
    return { status: 200, message: "Deleted successfully" };
  } catch (error) {
    console.log(error);
    return { status: 500, message: "Server Error" };
  }
};

export const Uploadfileproducts = async (products) => {
  try {
    const res = await Verification("Products_permission");
    if (!res?.verified) {
      return {
        status: 400,
        message: "Invalid user",
        logs: [
          {
            message: `Invalid user`,
            type: false,
          },
        ],
      };
    }

    const validationErrors = [];
    // First loop for validation
    products.forEach((product, i) => {
      if (!Object.keys(staticdata.categories).includes(product?.categories)) {
        validationErrors.push({
          message: `Data error at B:${i + 2} - Invalid category: ${
            product?.categories
          }`,
          type: false,
        });
      }
      if (!Object.keys(staticdata.rooms).includes(product?.rooms)) {
        validationErrors.push({
          message: `Data error at C:${i + 2} - Invalid room type: ${
            product?.rooms
          }`,
          type: false,
        });
      }
      if (!product.productName?.trim()) {
        validationErrors.push({
          message: `Data error at D:${i + 2} - productName cannot be empty`,
          type: false,
        });
      }
      if (!product.sku?.trim()) {
        validationErrors.push({
          message: `Data error at E:${i + 2} - sku cannot be empty`,
          type: false,
        });
      }
      if (!product.mrp?.trim()) {
        validationErrors.push({
          message: `Data error at G:${i + 2} - mrp cannot be empty`,
          type: false,
        });
      }
      if (!product.sellingprice?.trim()) {
        validationErrors.push({
          message: `Data error at H:${i + 2} - sellingprice cannot be empty`,
          type: false,
        });
      }
      if (!materialoptions.includes(product?.Material)) {
        validationErrors.push({
          message: `Data error at I:${i + 2} - Invalid Material: ${
            product?.Material
          }`,
          type: false,
        });
      }
      if (!(product.available == "TRUE" || product.available == "FALSE")) {
        validationErrors.push({
          message: `Data error at S:${
            i + 2
          } - available should be either TRUE or FALSE`,
          type: false,
        });
      }
    });

    // If there are errors, log them and return
    if (validationErrors.length > 0) {
      return {
        status: 400,
        message: "Validation Error",
        logs: validationErrors,
      };
    }

    // duplicate check
    const { duplicateIds, duplicateSkus } = detectDuplicates(products);

    if (duplicateIds.length > 0 || duplicateSkus.length > 0) {
      return {
        status: 400,
        message: "Duplicate unique id or sku found",
        logs: [
          {
            message: `Duplicate IDs: ${duplicateIds.join(
              ", "
            )} | Duplicate SKUs: ${duplicateSkus.join(", ")}`,
            type: false,
          },
        ],
      };
    }

    const { Productscollection, ObjectId } = await getcollection();
    // Prepare bulk operations
    const bulkOps = await Promise.all(
      products.map(async (product) => {
        // Process and clean product data
        const processedProduct = {
          ...product,
          dimensions: product.dimensions ? product.dimensions.split("; ") : [],
          keyfeatures: product.keyfeatures
            ? product.keyfeatures.split("; ")
            : [],
          descriptions: product.descriptions
            ? product.descriptions.split("; ")
            : [],
          available: product.available == "TRUE",
          mrp: parseInt(product.mrp),
          sellingprice: parseInt(product.sellingprice),
          weight: parseInt(product.weight),
          Warranty: parseInt(product.Warranty),
        };

        if (product._id && product._id.trim() !== "") {
          const objectId = new ObjectId(product._id);

          const existingProduct = await Productscollection.findOne({
            _id: objectId,
          });

          if (existingProduct) {
            // Remove _id from both existing and processed products
            const { _id, ...existingDataWithoutId } = existingProduct;
            const { _id: _, ...processedProductWithoutId } = processedProduct;

            const updatedProduct = {
              ...existingDataWithoutId,
              ...processedProductWithoutId,
            };

            return {
              updateOne: {
                filter: { _id: objectId },
                update: { $set: { ...updatedProduct } },
                upsert: true,
              },
            };
          } else {
            // Insert if _id doesn't exist in DB
            const { _id, ...processedProductWithoutId } = processedProduct;
            return {
              insertOne: {
                document: {
                  ...processedProductWithoutId,
                  variants: [{ finish: "Honey Oak", images: [] }],
                  lastupdated: new Date().getTime(),
                },
              },
            };
          }
        } else {
          // Insert new products when _id is empty or not provided
          const { _id, ...processedProductWithoutId } = processedProduct;
          return {
            insertOne: {
              document: {
                ...processedProductWithoutId,
                variants: [{ finish: "Honey Oak", images: [] }],
                lastupdated: new Date().getTime(),
              },
            },
          };
        }
      })
    );

    await Productscollection.bulkWrite(bulkOps);

    return {
      status: 200,
      message: "File imported successfully",
      logs: [
        {
          message: `File imported successfully`,
          type: true,
        },
      ],
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: "Server Error!",
      logs: [
        {
          message: `Server Error!`,
          type: false,
        },
      ],
    };
  }
};

const detectDuplicates = (products) => {
  const idSet = new Set();
  const skuSet = new Set();
  const duplicateIds = [];
  const duplicateSkus = [];

  products.forEach((product) => {
    if (product._id) {
      if (idSet.has(product._id)) {
        duplicateIds.push(product._id);
      } else {
        idSet.add(product._id);
      }
    }

    if (product.sku) {
      if (skuSet.has(product.sku)) {
        duplicateSkus.push(product.sku);
      } else {
        skuSet.add(product.sku);
      }
    }
  });

  return { duplicateIds, duplicateSkus };
};
