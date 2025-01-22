import React from "react";

function Userminicard({ user, setshowfulluser }) {
  return (
    <div
      className="rounded-md border p-5 cursor-pointer"
      onClick={() => {
        setshowfulluser({ show: true, data: user });
      }}
    >
      <p>{user?.name}</p>
      <p className="text-sm text-theme">{user?.email}</p>
    </div>
  );
}

export default Userminicard;
