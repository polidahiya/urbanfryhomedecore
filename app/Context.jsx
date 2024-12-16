"use client";

import { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext({});

export function Appwrapper({ children }) {
  const [showsearchbar, setshowsearchbar] = useState(false);
  const [messagearray, setmessagearray] = useState([]);
  const showdialoginitialvalues = {
    show: false,
    title: "",
    continue: null,
    type: true,
  };
  const [showdialog, setshowdialog] = useState(showdialoginitialvalues);
  //admin states

  const setmessagefn = (message) => {
    setmessagearray([
      ...messagearray,
      { id: Math.random() + new Date().getMilliseconds(), message: message },
    ]);
  };

  // useEffect(() => {
  //   const cookieCart = Cookies.get("cart");
  //   if (cookieCart) {
  //     const parsedCart = JSON.parse(cookieCart);
  //     setcart(parsedCart);
  //   }
  // }, []);

  return (
    <AppContext.Provider
      value={{
        showsearchbar,
        setshowsearchbar,
        setmessagefn,
        messagearray,
        setmessagearray,
        showdialog,
        setshowdialog,
        showdialoginitialvalues,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function AppContextfn() {
  return useContext(AppContext);
}
