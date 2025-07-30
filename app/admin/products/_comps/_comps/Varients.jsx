import React, { useState } from "react";
import Dropdownmenu from "./Dropdownmenu";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiSolidImageAdd } from "react-icons/bi";
import { MdAddToPhotos } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import { AppContextfn } from "@/app/Context";
import { Addimages } from "@/app/_serveractions/_admin/adminAddproduct";

const ProductVariants = ({
  variants,
  setstate,
  setdeletedimages,
  setnewadded,
}) => {
  const { setmessagefn } = AppContextfn();
  const [imageloading, setimageloading] = useState(false);
  const handleAddVariant = () => {
    setstate((pre) => {
      const updatedstate = { ...pre };
      updatedstate.variants = [
        ...updatedstate.variants,
        { finish: "Honey Oak", images: [] },
      ];

      return updatedstate;
    });
  };

  const handleDeleteVariant = (index) => {
    // store deleted images
    variants[index].images.forEach((image) => {
      setdeletedimages((pre) => [...pre, image]);
    });

    // delete variant
    setstate((pre) => {
      const updatedstate = { ...pre };
      updatedstate.variants = updatedstate.variants.filter(
        (_, i) => i !== index
      );
      return updatedstate;
    });
  };

  const handleDeleteImage = (variantIndex, imageIndex) => {
    // Store deleted images
    const image = variants[variantIndex].images[imageIndex];
    setdeletedimages((pre) => [...pre, image]);
    // remove image
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].images = updatedVariants[
      variantIndex
    ].images.filter((_, i) => i !== imageIndex);
    setstate((pre) => ({ ...pre, variants: updatedVariants }));
  };

  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const handleaddimage = async (varientindex, file, imgIndex) => {
    try {
      setimageloading(true);
      if (!file) {
        setmessagefn(`Please select an image`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setmessagefn(`Image exceeds 1 MB of size`);
        return;
      }
      const formdata = new FormData();
      formdata.append("image", file);
      const res = await Addimages(formdata);
      if (res.status == 200) {
        const imageurl = res?.imageurl;
        const updatedVariants = [...variants];

        if (imgIndex !== undefined && imgIndex !== null) {
          setdeletedimages((pre) => [
            ...pre,
            variants[varientindex].images[imgIndex],
          ]);
          updatedVariants[varientindex].images[imgIndex] = imageurl;
        } else {
          updatedVariants[varientindex].images.push(imageurl);
        }

        setstate((pre) => ({ ...pre, variants: updatedVariants }));
        setnewadded((pre) => [...pre, imageurl]);
      } else {
        setmessagefn(`Unable to update image`);
      }
      setimageloading(false);
    } catch (error) {
      console.log(error);
      setmessagefn(`Unable to update image`);
      setimageloading(false);
    }
  };
  const handleMoveImage = (variantIndex, imageIndex, direction) => {
    const updatedVariants = [...variants];
    const images = updatedVariants[variantIndex].images;
    const newIndex = imageIndex + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      [images[imageIndex], images[newIndex]] = [
        images[newIndex],
        images[imageIndex],
      ];
      setstate((pre) => ({ ...pre, variants: updatedVariants }));
    }
  };

  return (
    <div>
      {variants?.map((variant, index) => (
        <div key={index} className="mt-4 p-4 border rounded-md">
          <h2 className="py-5 font-bold text-center">
            Variant -{index == 0 ? "Default" : index}
          </h2>
          <Dropdownmenu
            title={"Finishes"}
            state={variants[index].finish}
            onchange={(value) => {
              setstate((pre) => {
                const updatedvariant = { ...pre };
                updatedvariant.variants[index].finish = value;
                return updatedvariant;
              });
            }}
            options={[
              "Honey Oak",
              "Walnut",
              "Teak",
              "Natural",
              "Color",
              "Unavailable",
            ]}
          />

          <div className="mt-5">
            <h4 className="font-medium mb-2 text-sm">Images:</h4>
            <div className="flex items-start justify-center gap-2 flex-wrap">
              {variant.images.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className="flex gap-2 flex-col items-center"
                >
                  <img
                    src={
                      image instanceof File ? URL.createObjectURL(image) : image
                    }
                    alt={`Variant ${index} Image ${imgIndex}`}
                    className="w-32 aspect-square object-cover border"
                  />
                  <div className="flex h-8 w-full">
                    <button
                      type="button"
                      onClick={() => handleMoveImage(index, imgIndex, -1)}
                      className="flex-1 aspect-square text-sm border rounded-md"
                    >
                      <BsArrowLeftShort className="inline-block" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleMoveImage(index, imgIndex, 1)}
                      className="flex-1 aspect-square text-sm border rounded-md"
                    >
                      <BsArrowLeftShort className="inline-block rotate-180" />
                    </button>
                    {/* Replace Image Button */}
                    <label className="flex-1 aspect-square text-blue-500 border rounded-md flex items-center justify-center cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        disabled={imageloading}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            handleaddimage(index, file, imgIndex);
                          }
                          e.target.value = null; // Reset input
                        }}
                        className="hidden"
                      />
                      ↺
                    </label>
                    <button
                      type="button"
                      onClick={() => handleDeleteImage(index, imgIndex)}
                      className="flex-1 aspect-square text-sm border rounded-md"
                    >
                      <MdDeleteOutline className="inline-block" />
                    </button>
                  </div>
                </div>
              ))}
              <div className="relative border border-dotted border-slate-300 cursor-pointer w-32 aspect-square rounded-md">
                <input
                  type="file"
                  accept="image/*"
                  disabled={imageloading}
                  multiple
                  onChange={(e) => {
                    Array.from(e.target.files).forEach((file) => {
                      handleaddimage(index, file);
                    });
                    e.target.value = null;
                  }}
                  className="absolute inset-0 mt-2 opacity-0 z-10 cursor-pointer"
                />
                <div className="h-full w-full pointer-events-none flex flex-col gap-2 items-center justify-center">
                  {imageloading ? (
                    <span className="text-green-600">Uploading...</span>
                  ) : (
                    <>
                      <BiSolidImageAdd className="text-5xl" />
                      <p className=" text-center text-sm">Add Image</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          {index != 0 && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => handleDeleteVariant(index)}
                className="border px-4 py-2 rounded-md mt-4 float-right lg:hover:bg-red-500 lg:hover:text-white"
              >
                Delete Variant
              </button>
            </div>
          )}
        </div>
      ))}
      <button
        onClick={handleAddVariant}
        type="button"
        className="bg-green-500 text-white px-4 py-2 rounded-md mt-5"
      >
        <MdAddToPhotos className="inline" /> Add Variant
      </button>
    </div>
  );
};

export default ProductVariants;
