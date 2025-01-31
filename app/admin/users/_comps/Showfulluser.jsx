import React, { useState } from "react";
import { AppContextfn } from "@/app/Context";
import { permissions } from "@/app/commondata";
import Dropdownmenu from "../../products/_comps/_comps/Dropdownmenu";
import { updateuser, Deleteuser } from "@/app/_serveractions/_admin/Getusers";

function Showfulluser({ showfulluser, setshowfulluser, setrefresher }) {
  const userdata = showfulluser.data;
  const { setmessagefn, setshowdialog } = AppContextfn();
  const [permissionsstate, setpermissionsstate] = useState(
    userdata?.permission || []
  );

  const updateuserfn = async () => {
    const res = await updateuser(userdata?._id, permissionsstate);
    setmessagefn(res?.message);
    if (res?.status == 200) {
      setrefresher((pre) => !pre);
    }
  };

  const handledelete = async () => {
    const res = await Deleteuser(userdata?._id);
    setmessagefn(res?.message);
    if (res?.status == 200) {
      setrefresher((pre) => !pre);
    }
  };

  const addPermission = (value) => {
    if (!permissionsstate.includes(value)) {
      setpermissionsstate((prev) => [...prev, value]);
    } else {
      setmessagefn("Permission already exists!"); // Optional feedback to the user
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/25 z-10">
      <div className="relative bg-white flex flex-col gap-5 p-6 max-w-2xl w-full h-full overflow-y-scroll">
        <h2 className="text-2xl text-center font-semibold text-gray-800">
          User
        </h2>
        <p>Name: {userdata?.name}</p>
        <p>Email: {userdata?.email}</p>
        <div>
          Permissions:
          <div className="flex flex-col items-start gap-2 flex-wrap">
            {permissionsstate.map((items, i) => (
              <div
                key={i}
                className="flex items-center justify-center h-10 pl-5 gap-5 border rounded-md bg-slate-100 overflow-hidden"
              >
                <span>{items}</span>
                <button
                  className="h-full aspect-square lg:hover:bg-white"
                  onClick={() =>
                    setpermissionsstate((prev) =>
                      prev.filter((permission) => permission !== items)
                    )
                  }
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <Dropdownmenu
            title={""}
            state={""}
            onchange={(value) => addPermission(value)} // Use the addPermission function
            options={["", ...permissions]}
          />
        </div>
        <div className="flex items-center justify-center gap-2 mt-auto">
          <button
            className="border border-green-500 text-green-500 rounded-md px-5 py-2"
            onClick={updateuserfn}
          >
            Update
          </button>
          <button
            className="border rounded-md px-5 py-2"
            onClick={() => setshowfulluser({ show: false, data: {} })}
          >
            Cancel
          </button>
          {userdata?.email !== "altorganisers@gmail.com" && (
            <button
              className="border border-red-500 text-red-500 rounded-md px-5 py-2"
              onClick={() => {
                setshowdialog({
                  show: true,
                  title: "Confirm Delete?",
                  continue: () => {
                    handledelete();
                  },
                  type: false,
                });
              }}
            >
              Delete
            </button>
          )}
        </div>
        {/* Cancel button */}
        <button
          className="absolute top-2 right-2 bg-gray-200 text-gray-700 rounded-full h-10 aspect-square hover:bg-gray-300"
          onClick={() => setshowfulluser({ show: false, data: {} })}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default Showfulluser;
