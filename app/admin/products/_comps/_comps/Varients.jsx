import React from "react";
import Dropdownmenu from "./Dropdownmenu";
import { BsArrowLeftShort } from "react-icons/bs";
import { BiSolidImageAdd } from "react-icons/bi";
import { MdAddToPhotos } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";

const ProductVariants = ({
  varientstructure,
  variants,
  setstate,
  deletedimages,
  setdeletedimages,
}) => {
  const handleAddVariant = () => {
    setstate((pre) => {
      const updatedstate = { ...pre };
      updatedstate.variants = [...updatedstate.variants, ...varientstructure];
      return updatedstate;
    });
  };

  const handleDeleteVariant = (index) => {
    // store deleted images
    variants[index].images.forEach((image) => {
      if (!(image instanceof File)) setdeletedimages((pre) => [...pre, image]);
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

  const handleAddImage = (variantIndex, file) => {
    const updatedVariants = [...variants];
    if (file) {
      updatedVariants[variantIndex].images.push(file);
      setstate((pre) => ({ ...pre, variants: updatedVariants }));
    }
  };

  const handleDeleteImage = (variantIndex, imageIndex) => {
    // Store deleted images
    const image = variants[variantIndex].images[imageIndex];
    if (!(image instanceof File)) setdeletedimages((pre) => [...pre, image]);

    // remove image
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].images = updatedVariants[
      variantIndex
    ].images.filter((_, i) => i !== imageIndex);
    setstate((pre) => ({ ...pre, variants: updatedVariants }));
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
          <h2 className="py-5 font-bold text-center">Variant - {index + 1}</h2>
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
            {variant.images.map((image, imgIndex) => (
              <div
                key={imgIndex}
                className="flex gap-2 flex-col items-center mb-2"
              >
                <img
                  src={
                    image instanceof File ? URL.createObjectURL(image) : image
                  }
                  alt={`Variant ${index} Image ${imgIndex}`}
                  className="w-32 aspect-square object-cover border"
                />
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveImage(index, imgIndex, -1)}
                    className="h-full aspect-square text-sm border rounded-md"
                  >
                    <BsArrowLeftShort className="inline-block" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveImage(index, imgIndex, 1)}
                    className="h-full aspect-square text-sm border rounded-md"
                  >
                    <BsArrowLeftShort className="inline-block rotate-180" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index, imgIndex)}
                    className="h-full aspect-square text-sm border rounded-md"
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
                multiple
                onChange={(e) => {
                  Array.from(e.target.files).forEach((file) =>
                    handleAddImage(index, file)
                  );
                  e.target.value = null;
                }}
                className="absolute inset-0 mt-2 opacity-0 z-10 cursor-pointer"
              />
              <div className="h-full w-full pointer-events-none flex flex-col gap-2 items-center justify-center">
                <BiSolidImageAdd className="text-5xl" />
                <p className=" text-center text-sm">Add Image</p>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => handleDeleteVariant(index)}
              className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 float-right"
            >
              Delete Variant
            </button>
          </div>
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
