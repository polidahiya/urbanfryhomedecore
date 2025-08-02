import React from "react";

const indianPincodes = [
  {
    pincode: "110001",
    area: "Connaught Place",
    city: "New Delhi",
    state: "Delhi",
  },
  { pincode: "400001", area: "Fort", city: "Mumbai", state: "Maharashtra" },
  {
    pincode: "560001",
    area: "Bangalore GPO",
    city: "Bangalore",
    state: "Karnataka",
  },
  {
    pincode: "700001",
    area: "Barabazar Market",
    city: "Kolkata",
    state: "West Bengal",
  },
  {
    pincode: "600001",
    area: "Chennai GPO",
    city: "Chennai",
    state: "Tamil Nadu",
  },
  {
    pincode: "500001",
    area: "Hyderabad GPO",
    city: "Hyderabad",
    state: "Telangana",
  },
  {
    pincode: "380001",
    area: "Ahmedabad GPO",
    city: "Ahmedabad",
    state: "Gujarat",
  },
  {
    pincode: "751001",
    area: "Bhubaneswar GPO",
    city: "Bhubaneswar",
    state: "Odisha",
  },
  { pincode: "302001", area: "Jaipur GPO", city: "Jaipur", state: "Rajasthan" },
  { pincode: "682001", area: "Kochi GPO", city: "Kochi", state: "Kerala" },
];

function Pincodecomp({ pincode, setpincode, pincodemsg, setpincodemsg }) {
  return (
    <div className="mt-10">
      <form
        className=" w-full flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            pincode.length === 6 &&
            indianPincodes.find((pincodeobj) => pincodeobj.pincode === pincode)
          ) {
            localStorage.setItem("pin", pincode);
            setpincodemsg({
              status: 200,
              message: "Available at this pincode",
            });
          } else {
            setpincodemsg({
              status: 404,
              message: "Not Available at this pincode",
            });
          }
        }}
      >
        <input
          type="number"
          placeholder="Pincode"
          max={999999}
          value={pincode}
          onChange={(e) => setpincode(e.target.value)}
          className="px-3 py-2 text-sm border-b border-gray-300 focus:outline-none focus:border-theme placeholder:text-gray-400"
        />
        <input
          type="submit"
          value="Check"
          className="px-4 py-2 text-sm bg-theme text-white hover:bg-theme/90 cursor-pointer"
        />
      </form>
      {pincodemsg && (
        <p
          className={`${
            pincodemsg?.status === 200 ? "text-green-600" : "text-red-600"
          } text-sm mt-2`}
        >
          {pincodemsg?.message}
        </p>
      )}
    </div>
  );
}

export default Pincodecomp;
