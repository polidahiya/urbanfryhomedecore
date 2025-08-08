"use client";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { Inhomecontextfn } from "../Context";
import Nextimage from "@/app/_globalcomps/Nextimage";
import { LuCloudUpload } from "react-icons/lu";
import { AppContextfn } from "@/app/Context";
import { BsArrowLeftShort } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import {
  Addimages,
  Deleteimages,
} from "@/app/_serveractions/_admin/adminAddproduct";
import { Addpost } from "../Serveraction";
import Revalidatepathfn from "@/app/_serveractions/Revalidatepathpn";

export default function Inhomeform() {
  const { setmessagefn } = AppContextfn();
  const { showinhomeform, setshowinhomeform, data, setdata, initialdatastate } =
    Inhomecontextfn();
  const [imageloading, setimageloading] = useState(false);
  const [newadded, setnewadded] = useState([]);
  const [deletedimages, setdeletedimages] = useState([]);

  const handleDeleteImage = (imageIndex) => {
    // Store deleted images
    const image = data.images[imageIndex];
    setdeletedimages((pre) => [...pre, image]);
    // remove image
    const updateddata = { ...data };
    updateddata.images = updateddata.images.filter((_, i) => i !== imageIndex);
    setdata(updateddata);
  };

  const MAX_FILE_SIZE = 1 * 1024 * 1024;
  const handleaddimage = async (file, imgIndex) => {
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
      const res = await Addimages(formdata, "Altorganizer/inhome");
      if (res.status == 200) {
        const imageurl = res?.imageurl;
        if (imgIndex !== undefined && imgIndex !== null) {
          setdeletedimages((pre) => [...pre, data.images[imgIndex]]);
          setdata((pre) => {
            const updateddata = { ...pre };
            updateddata.images[imgIndex] = imageurl;
            return updateddata;
          });
        } else {
          setdata((pre) => ({ ...pre, images: [...pre.images, imageurl] }));
        }
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
  const handleMoveImage = (imageIndex, direction) => {
    const updateddata = { ...data };
    const images = updateddata.images;
    const newIndex = imageIndex + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      [images[imageIndex], images[newIndex]] = [
        images[newIndex],
        images[imageIndex],
      ];
      setdata(updateddata);
    }
  };

  const submitform = async (e) => {
    e.preventDefault();
    const res = await Addpost(data, deletedimages);
    setmessagefn(res?.message);
    if (res?.status === 200) {
      await Revalidatepathfn("/Urbanfryinhomes");
      setshowinhomeform(false);
      setdata(initialdatastate);
    }
  };

  return (
    <AnimatePresence>
      {showinhomeform && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed min-h-dvh w-full top-0 left-0 flex items-center justify-center bg-black/30 z-30 px-2"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-xl flex flex-col bg-white py-10 px-5 md:px-10 md:py-10"
          >
            <div className="flex flex-col items-center">
              <Nextimage
                src="/uiimages/logo.png"
                alt="logo"
                className="w-16 aspect-square mr-2"
                width={200}
                height={200}
                quality={100}
              />
              <p className="font-tenor text-3xl text-center mt-5">
                {data?._id ? "Update" : "Add"} Post
              </p>
            </div>
            <form
              onSubmit={submitform}
              className="relative flex flex-col gap-5 mt-10 h-full max-h-[500px] overflow-y-scroll themescroll"
            >
              <div className=" relative border border-theme">
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={data.title}
                  onChange={(e) =>
                    setdata((prevData) => ({
                      ...prevData,
                      title: e.target.value,
                    }))
                  }
                  className="forminput w-full  py-4 px-4 text-gray-700 outline-none"
                  required
                />
                <label
                  htmlFor="title"
                  className="absolute top-0 left-0 py-4 flex items-center px-4 text-sm duration-300 text-theme pointer-events-none"
                >
                  Title <span className="text-red-500">*</span>
                </label>
              </div>
              {/*  */}
              <div className="flex items-start justify-center gap-2 flex-wrap">
                {data.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="flex gap-2 flex-col items-center"
                  >
                    <img
                      src={
                        image instanceof File
                          ? URL.createObjectURL(image)
                          : image
                      }
                      alt={`Image ${imgIndex}`}
                      className="w-32 aspect-[3/4] object-cover border"
                    />
                    <div className="flex h-8 w-full">
                      <button
                        type="button"
                        onClick={() => handleMoveImage(imgIndex, -1)}
                        className="flex-1 aspect-square text-sm border rounded-md"
                      >
                        <BsArrowLeftShort className="inline-block" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleMoveImage(imgIndex, 1)}
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
                              handleaddimage(file, imgIndex);
                            }
                            e.target.value = null; // Reset input
                          }}
                          className="hidden"
                        />
                        ↺
                      </label>
                      <button
                        type="button"
                        onClick={() => handleDeleteImage(imgIndex)}
                        className="flex-1 aspect-square text-sm border rounded-md"
                      >
                        <MdDeleteOutline className="inline-block" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              {/*  */}
              <div className="flex justify-center">
                <label
                  htmlFor="imageUpload"
                  className="flex flex-col items-center justify-center w-36 aspect-square border border-dashed border-theme cursor-pointer rounded-lg"
                >
                  <LuCloudUpload className="text-3xl" />
                  <p>{imageloading ? "Uploading..." : "Upload Image"}</p>
                  <input
                    type="file"
                    accept="image/*"
                    id="imageUpload"
                    disabled={imageloading}
                    multiple
                    onChange={(e) => {
                      Array.from(e.target.files).forEach((file) => {
                        handleaddimage(file);
                      });
                      e.target.value = null;
                    }}
                    className="hidden"
                  />
                </label>
              </div>
              {/* submit button */}
              <div className="sticky bottom-0 flex justify-center gap-5 mt-3">
                <button
                  type="submit"
                  className=" px-10 py-3 w-fit mt-auto bg-theme text-white bg-opacity-70 lg:hover:bg-opacity-100 duration-300"
                >
                  Post Now!
                </button>
              </div>
            </form>
            {/* cancel button */}
            <button
              className="group h-14 aspect-square absolute top-0 right-0 flex items-center justify-center z-10"
              onClick={async () => {
                if (newadded.length > 0) {
                  setmessagefn("Cleaning up...");
                  await Deleteimages(newadded, "Altorganizer/inhome");
                }
                setdata(initialdatastate);
                setshowinhomeform(false);
              }}
            >
              <RxCross1 className="text-2xl lg:group-hover:rotate-90 duration-300" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
