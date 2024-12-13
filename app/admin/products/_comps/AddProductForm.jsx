import React, { useState } from "react";
import Standardinputfield from "./_comps/Standardinputfield";
import Multiplevaluesfield from "./_comps/Multiplevaluesfield";
import Dropdownmenu from "./_comps/Dropdownmenu";
import ProductVariants from "./_comps/Varients";

const AddProductForm = () => {
  const [productName, setProductName] = useState("");
  const [sku, setsku] = useState("");
  const [handlingtime, sethandlingtime] = useState("");
  const [mrp, setmrp] = useState("");
  const [sellingprice, setsellingprice] = useState("");
  const [Material, setMaterial] = useState("");
  const [Warranty, setWarranty] = useState("");
  const [finishes, setfinishes] = useState("");
  const [dimensions, setDimensions] = useState([""]);
  const [descriptions, setDescriptions] = useState([""]);
  const [colors, setColors] = useState([]);
  const [currentColor, setCurrentColor] = useState({
    name: "",
    hex: "",
    images: [],
  });

  const handleAddColor = () => {
    if (currentColor.name && currentColor.hex) {
      setColors([...colors, currentColor]);
      setCurrentColor({ name: "", hex: "", images: [] });
    }
  };

  const handleRemoveColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const handleColorImagesUpload = (files) => {
    const images = Array.from(files).map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Create a preview URL for the image
    }));
    setCurrentColor({
      ...currentColor,
      images: [...currentColor.images, ...images],
    });
  };

  const handleRemoveImage = (colorIndex, imageIndex) => {
    const updatedColors = [...colors];
    updatedColors[colorIndex].images.splice(imageIndex, 1);
    setColors(updatedColors);
  };

  const handleRemoveCurrentImage = (imageIndex) => {
    const updatedImages = [...currentColor.images];
    updatedImages.splice(imageIndex, 1);
    setCurrentColor({ ...currentColor, images: updatedImages });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(
      productName,
      sku,
      handlingtime,
      mrp,
      sellingprice,
      Material,
      Warranty,
      finishes,
      dimensions,
      descriptions
    );

    // const formData = new FormData();
    // formData.append("name", productName);
    // formData.append("price", price);
    // formData.append("discount", discount);
    // formData.append("dimensions", JSON.stringify(dimensions));
    // formData.append("descriptions", JSON.stringify(descriptions));
    // formData.append(
    //   "colors",
    //   JSON.stringify(
    //     colors.map((color) => ({
    //       name: color.name,
    //       hex: color.hex,
    //     }))
    //   )
    // );

    // colors.forEach((color, index) => {
    //   color.images.forEach((image, imageIndex) => {
    //     formData.append(`colorImages_${index}_${imageIndex}`, image.file);
    //   });
    // });

    // try {
    //   const response = await fetch("/api/products", {
    //     method: "POST",
    //     body: formData,
    //   });

    //   if (response.ok) {
    //     alert("Product added successfully!");
    //     setProductName("");
    //     setDimensions([]);
    //     setDescriptions([]);
    //     setPrice("");
    //     setDiscount("");
    //     setColors([]);
    //   } else {
    //     alert("Failed to add product.");
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-lg rounded-md space-y-6 mt-10"
    >
      <h2 className="text-2xl font-semibold text-gray-800">Add New Product</h2>
      {/* Product Name */}
      <Standardinputfield
        titlename="Product Name"
        value={productName}
        onchange={(e) => setProductName(e.target.value)}
      />
      {/* sku id */}
      <Standardinputfield
        titlename="SKU ID"
        value={sku}
        onchange={(e) => setsku(e.target.value)}
      />
      {/* handling time */}
      <Standardinputfield
        titlename="Handling Time"
        value={handlingtime}
        onchange={(e) => sethandlingtime(e.target.value)}
      />
      {/* mrp */}
      <Standardinputfield
        titlename="MRP"
        value={mrp}
        onchange={(e) => setmrp(e.target.value)}
      />
      {/* selling price */}
      <Standardinputfield
        titlename="Selling Price"
        value={sellingprice}
        onchange={(e) => setsellingprice(e.target.value)}
      />
      {/* Material  */}
      <Standardinputfield
        titlename="Material"
        value={Material}
        onchange={(e) => setMaterial(e.target.value)}
      />
      {/* Warranty  */}
      <Standardinputfield
        titlename="Warranty"
        value={Warranty}
        onchange={(e) => setWarranty(e.target.value)}
      />
      {/* Dimensions */}
      <Multiplevaluesfield
        state={dimensions}
        setState={setDimensions}
        placeholder={"e.g., 12x8x6 (Inches)"}
        title={"Dimensions"}
      />
      {/* Descriptions */}
      <Multiplevaluesfield
        state={descriptions}
        setState={setDescriptions}
        placeholder={"Lorem ipsum"}
        title={"Descriptions"}
      />
      {/* finishes */}
      {/* <Dropdownmenu
        title={"Finishes"}
        state={finishes}
        setState={setfinishes}
        options={[
          "Honey Oak",
          "Walnut",
          "Teak",
          "Natural",
          "Color",
          "Unavailable",
        ]}
      /> */}

      <ProductVariants />

      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Submit
      </button>
    </form>
  );
};

export default AddProductForm;

{
  /* Colors */
}
{
  /* <div>
<label className="block text-sm font-medium text-gray-600">
  Colors
</label>
<div className="space-y-2 mt-2">
  <div className="flex gap-2">
    <input
      type="text"
      placeholder="Color name"
      value={currentColor.name}
      onChange={(e) =>
        setCurrentColor({ ...currentColor, name: e.target.value })
      }
      className="flex-1 p-2 border rounded-md focus:ring focus:ring-blue-300"
    />
    <input
      type="color"
      value={currentColor.hex}
      onChange={(e) =>
        setCurrentColor({ ...currentColor, hex: e.target.value })
      }
      className="w-12 h-12 border rounded-md"
    />
  </div>
  <input
    type="file"
    multiple
    onChange={(e) => handleColorImagesUpload(e.target.files)}
    className="block w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
  />
  <div className="flex flex-wrap gap-4 mt-2">
    {currentColor.images.map((image, index) => (
      <div key={index} className="relative">
        <img
          src={image.preview}
          alt="Preview"
          className="w-16 h-16 object-cover rounded-md"
        />
        <button
          type="button"
          onClick={() => handleRemoveCurrentImage(index)}
          className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
        >
          ✕
        </button>
      </div>
    ))}
  </div>
  <button
    type="button"
    onClick={handleAddColor}
    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
  >
    Add Color
  </button>
</div>
<ul className="mt-4 space-y-4">
  {colors.map((color, colorIndex) => (
    <li key={colorIndex} className="p-4 bg-gray-100 rounded-md">
      <div className="flex justify-between items-center mb-2">
        <span style={{ color: color.hex }}>
          {color.name} ({color.hex})
        </span>
        <button
          type="button"
          onClick={() => handleRemoveColor(colorIndex)}
          className="text-red-500 hover:underline"
        >
          Remove
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        {color.images.map((image, imageIndex) => (
          <div key={imageIndex} className="relative">
            <img
              src={image.preview}
              alt="Preview"
              className="w-16 h-16 object-cover rounded-md"
            />
            <button
              type="button"
              onClick={() => handleRemoveImage(colorIndex, imageIndex)}
              className="absolute top-0 right-0 bg-red-600 text-white rounded-full p-1 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </li>
  ))}
</ul>
</div> */
}
