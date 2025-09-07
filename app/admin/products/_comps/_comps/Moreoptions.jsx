import React, { useState } from "react";
import Standardinputfield from "./Standardinputfield";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { MdModeEditOutline } from "react-icons/md";
import { LuCloudUpload } from "react-icons/lu";
import { AppContextfn } from "@/app/Context";
import { Addimages } from "@/app/_serveractions/_admin/adminAddproduct";

function Moreoptions({ data, setdata, setdeletedimages, setnewadded }) {
  const [showform, setshowform] = useState(false);
  const [editindex, seteditindex] = useState([0, 0]);

  const handleMoveOption = (i, j, dir) => {
    const updateddata = { ...data };
    const options = updateddata.moreoptions[i].options;
    const newIndex = j + dir;
    if (newIndex >= 0 && newIndex < options.length) {
      [options[j], options[newIndex]] = [options[newIndex], options[j]];
      setdata(updateddata);
    }
  };

  return (
    <div className="mt-4">
      <div className="space-y-2">
        {!showform &&
          data.moreoptions.map((moreoption, i) => (
            <div
              key={i}
              className="relative rounded-2xl border border-gray-200 bg-white p-4 z-0"
            >
              {/* Section Title */}
              <h2 className="text-lg font-semibold text-gray-800 mb-3">
                {moreoption.name}
              </h2>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {moreoption.options.map(
                  ({ name, image, imageindex, price, mrp }, j) => (
                    <div key={j}>
                      <div
                        key={j}
                        className="relative flex items-start gap-3 rounded-xl border border-gray-100 bg-gray-50 p-3"
                      >
                        {/* Image (optional) */}
                        {image.length > 0 && (
                          <img
                            src={image[0]}
                            alt={name}
                            className="h-16 w-16 rounded-lg object-cover border"
                          />
                        )}
                        {/* Always show details */}
                        <div className="text-sm">
                          <p className="font-medium text-gray-900">{name}</p>
                          <p className="text-gray-500">Index: {imageindex}</p>
                          <p className="text-green-600 font-semibold">
                            ₹{price}
                          </p>
                          <p className="text-red-500 line-through text-xs">
                            ₹{mrp}
                          </p>
                        </div>
                      </div>
                      {/* Edit Button */}
                      <div className="flex h-8 gap-1 w-full mt-1">
                        <button
                          type="button"
                          onClick={() => handleMoveOption(i, j, -1)}
                          className="flex-1 aspect-square text-sm border rounded-md"
                        >
                          <BsArrowLeftShort className="inline-block" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleMoveOption(i, j, 1)}
                          className="flex-1 aspect-square text-sm border rounded-md"
                        >
                          <BsArrowLeftShort className="inline-block rotate-180" />
                        </button>
                        {/* Replace Image Button */}
                        <button
                          className="flex-1 aspect-square text-sm border rounded-md"
                          onClick={() => {
                            setshowform(true);
                            seteditindex([i, j]);
                          }}
                          type="button"
                        >
                          ↺
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const images = data.moreoptions[i].options[j].image;
                            setdeletedimages((pre) => [...pre, ...images]);
                            //
                            const updateddata = { ...data };
                            updateddata.moreoptions[i].options.splice(j, 1);
                            setdata(updateddata);
                          }}
                          className="flex-1 aspect-square text-sm border rounded-md"
                        >
                          <MdDeleteOutline className="inline-block" />
                        </button>
                      </div>
                    </div>
                  )
                )}
                {/* add new button */}
                <button
                  className="rounded-xl border border-gray-100 bg-gray-50 min-h-10"
                  onClick={() => {
                    const updateddata = { ...data };
                    updateddata.moreoptions[i].options.push({
                      name: "",
                      image: [],
                      imageindex: 0,
                      price: "",
                      mrp: "",
                    });
                    setdata(updateddata);
                  }}
                  type="button"
                >
                  Add new
                </button>
              </div>
              {/* delete button */}
              <button
                className="absolute top-2 right-2 rounded-full bg-gray-100 hover:bg-gray-200 w-9 h-9 flex items-center justify-center"
                type="button"
                onClick={() => {
                  const dimages = [];
                  data.moreoptions[i].options.forEach((option) => {
                    if (option.image.length > 0) {
                      dimages.push(...option.image);
                    }
                  });
                  setdeletedimages((pre) => [...pre, ...dimages]);
                  //
                  const updateddata = { ...data };
                  updateddata.moreoptions.splice(i, 1);
                  setdata(updateddata);
                }}
              >
                ✕
              </button>
            </div>
          ))}
        <button
          className="px-5 py-2 rounded-md bg-green-500 text-white"
          onClick={() => {
            const updatedata = { ...data };
            updatedata.moreoptions.push({
              name: "Option Name",
              options: [
                { name: "", image: [], imageindex: 0, price: "", mrp: "" },
              ],
            });
            setdata(updatedata);
          }}
          type="button"
        >
          Add a Option
        </button>
      </div>
      {showform && (
        <Optionform
          setshowform={setshowform}
          editindex={editindex}
          data={data}
          setdata={setdata}
          setdeletedimages={setdeletedimages}
          setnewadded={setnewadded}
        />
      )}
    </div>
  );
}

const Optionform = ({
  setshowform,
  editindex,
  data,
  setdata,
  setdeletedimages,
  setnewadded,
}) => {
  const { setmessagefn } = AppContextfn();
  const [imageloading, setimageloading] = useState(false);

  const option = data?.moreoptions[editindex[0]]?.options[editindex[1]];

  // helper to update deep values safely
  const updateOptionField = (field, value) => {
    setdata((prev) => {
      const updated = { ...prev };
      updated.moreoptions[editindex[0]].options[editindex[1]][field] = value;
      return updated;
    });
  };

  const updateOptionName = (value) => {
    setdata((prev) => {
      const updated = { ...prev };
      updated.moreoptions[editindex[0]].name = value;
      return updated;
    });
  };

  const MAX_FILE_SIZE = 0.2 * 1024 * 1024;
  const handleaddimage = async (file, i, j) => {
    try {
      setimageloading(true);
      if (!file) {
        setmessagefn(`Please select an image`);
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setmessagefn(`Image exceeds 200 Kb of size`);
        return;
      }
      const formdata = new FormData();
      formdata.append("image", file);
      const res = await Addimages(formdata, "Altorganizer/products");
      const selectedimage = data.moreoptions[i].options[j].image;
      if (res.status == 200) {
        const imageurl = res?.imageurl;
        if (selectedimage.length > 0) {
          setdeletedimages((pre) => [...pre, selectedimage[0]]);
        }
        setdata((pre) => {
          const updateddata = { ...pre };
          updateddata.moreoptions[i].options[j].image[0] = imageurl;
          return updateddata;
        });
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

  return (
    <div className="fixed top-0 left-0 inset-0 z-10 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-xl rounded-2xl bg-white shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Edit Option</h2>
          <button
            className="rounded-full bg-gray-100 hover:bg-gray-200 w-9 h-9 flex items-center justify-center"
            type="button"
            onClick={() => setshowform(false)}
          >
            ✕
          </button>
        </div>
        {/* Form */}
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Standardinputfield
            titlename="Option Group Name"
            value={data?.moreoptions[editindex[0]]?.name}
            onchange={(e) => updateOptionName(e.target.value)}
            clear={() => updateOptionName("")}
          />
          <hr />
          <div className="flex justify-center">
            <label
              htmlFor="imageUpload"
              className="flex flex-col items-center justify-center w-36 aspect-square border border-dashed border-theme cursor-pointer rounded-lg overflow-hidden"
            >
              {option.image.length > 0 ? (
                <div className="relative w-full h-full group hover:bg-black">
                  <img
                    src={option.image[0]}
                    alt=""
                    className="w-full h-full lg:group-hover:opacity-30"
                  />
                  <MdModeEditOutline className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-theme text-white text-2xl box-content p-2 lg:hidden lg:group-hover:block" />
                </div>
              ) : (
                <>
                  <LuCloudUpload className="text-3xl" />
                  <p className="text-center">
                    {imageloading ? "Uploading..." : "Upload Thumbnail"}
                  </p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                id="imageUpload"
                disabled={imageloading}
                onChange={(e) => {
                  handleaddimage(e.target.files[0], editindex[0], editindex[1]);
                  e.target.value = null;
                }}
                className="hidden"
              />
            </label>
          </div>

          <Standardinputfield
            titlename="Option Value"
            value={option?.name || ""}
            onchange={(e) => updateOptionField("name", e.target.value)}
            clear={() => updateOptionField("name", "")}
          />

          <Standardinputfield
            titlename="Image Index"
            type="number"
            value={option?.imageindex || ""}
            onchange={(e) => updateOptionField("imageindex", e.target.value)}
            clear={() => updateOptionField("imageindex", "")}
          />

          <Standardinputfield
            titlename="Change in Price"
            type="number"
            value={option?.price || ""}
            onchange={(e) => updateOptionField("price", e.target.value)}
            clear={() => updateOptionField("price", "")}
          />

          <Standardinputfield
            titlename="Change in MRP"
            type="number"
            value={option?.mrp || ""}
            onchange={(e) => updateOptionField("mrp", e.target.value)}
            clear={() => updateOptionField("mrp", "")}
          />
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setshowform(false)}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Moreoptions;
