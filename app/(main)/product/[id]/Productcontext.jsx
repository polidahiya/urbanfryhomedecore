"use client";
import { createContext, useContext, useState } from "react";

const Productcontext = createContext({});

export function Productctxwrapper({ children }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <Productcontext.Provider
      value={{ selectedImageIndex, setSelectedImageIndex }}
    >
      {children}
    </Productcontext.Provider>
  );
}

export function Productctxfn() {
  return useContext(Productcontext);
}
