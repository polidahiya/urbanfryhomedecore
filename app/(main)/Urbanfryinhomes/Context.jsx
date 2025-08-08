"use client";
import { createContext, useContext, useState } from "react";

const Inhomecontext = createContext({});
export function Inhomecontextwrapper({ children }) {
  const [showinhomeform, setshowinhomeform] = useState(false);
  const initialdatastate = {
    title: "",
    images: [],
  };
  const [data, setdata] = useState(initialdatastate);
  const initialfullimagestate = {
    show: false,
    data: null,
  };
  const [fullimage, setfullimage] = useState(initialfullimagestate);
  return (
    <Inhomecontext.Provider
      value={{
        showinhomeform,
        setshowinhomeform,
        data,
        setdata,
        initialdatastate,
        fullimage,
        setfullimage,
        initialfullimagestate,
      }}
    >
      {children}
    </Inhomecontext.Provider>
  );
}

export function Inhomecontextfn() {
  return useContext(Inhomecontext);
}
