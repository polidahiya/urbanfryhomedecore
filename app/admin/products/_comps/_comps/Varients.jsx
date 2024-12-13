import React, { useState } from "react";
import Dropdownmenu from "./Dropdownmenu";
import { TiArrowUp } from "react-icons/ti";
import { BiSolidImageAdd } from "react-icons/bi";

const ProductVariants = () => {
  const varientstructure = { color: "Honey Oak", images: [] };
  const [variants, setVariants] = useState([varientstructure]);

  console.log(variants);

  const handleAddVariant = () => {
    setVariants([...variants, varientstructure]);
  };

  const handleDeleteVariant = (index) => {
    setVariants(variants.filter((_, i) => i !== index));
  };

  const handleAddImage = (variantIndex, file) => {
    const updatedVariants = [...variants];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      updatedVariants[variantIndex].images.push(imageUrl);
      setVariants(updatedVariants);
    }
  };

  const handleDeleteImage = (variantIndex, imageIndex) => {
    const updatedVariants = [...variants];
    updatedVariants[variantIndex].images = updatedVariants[
      variantIndex
    ].images.filter((_, i) => i !== imageIndex);
    setVariants(updatedVariants);
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
      setVariants(updatedVariants);
    }
  };

  return (
    <div>
      {variants.map((variant, index) => (
        <div key={index} className="mt-4 p-4 border rounded-md">
          <Dropdownmenu
            title={"Finishes"}
            state={variants.color}
            setState={(e) => {
              const updatedvariant = [...variants];
              updatedvariant[index].color = e;
              setVariants(updatedvariant);
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
              <div key={imgIndex} className="flex gap-2 items-center mb-2">
                <img
                  src={image}
                  alt={`Variant ${index} Image ${imgIndex}`}
                  className="w-32 aspect-square object-cover border rounded-md"
                />
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => handleMoveImage(index, imgIndex, -1)}
                    className="px-2 py-1 text-gray-800 border border-slate-300 rounded-md"
                  >
                    <TiArrowUp className="inline-block" /> Up
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveImage(index, imgIndex, 1)}
                    className="px-2 py-1 text-gray-800 border border-slate-300 rounded-md"
                  >
                    <TiArrowUp className="inline-block rotate-180" /> Down
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => handleDeleteImage(index, imgIndex)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  -
                </button>
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
        + Add Variant
      </button>
    </div>
  );
};

export default ProductVariants;
