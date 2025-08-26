"use client";
import { createContext, useContext } from "react";

const Productcontext = createContext({});

export function Productctxwrapper({ children }) {
  return (
    <Productcontext.Provider value={{}}>{children}</Productcontext.Provider>
  );
}

export function Productctxfn() {
  return useContext(Productcontext);
}
