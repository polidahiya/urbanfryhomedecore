import React from "react";

const Formparts = ({ children, heading = "" }) => {
  return (
    <div className="p-5 border rounded-md space-y-5">
      <h2 className="text-2xl font-tenor">{heading}</h2>
      {children}
    </div>
  );
};

export default Formparts;
