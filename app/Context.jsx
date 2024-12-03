"use client";

import { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext({});

export function Appwrapper({ children }) {
  const [showsearchbar, setshowsearchbar] = useState(false);

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function AppContextfn() {
  return useContext(AppContext);
}
