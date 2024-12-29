"use client";
import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext({});

export function Appwrapper({ children }) {
  const [cart, setcart] = useState({});
  const [showsearchbar, setshowsearchbar] = useState(false);
  const [showsidecart, setshowsidecart] = useState({
    show: false,
    effect: false,
  });
  const [messagearray, setmessagearray] = useState([]);
  const showdialoginitialvalues = {
    show: false,
    title: "",
    continue: null,
    type: true,
  };
  const [showdialog, setshowdialog] = useState(showdialoginitialvalues);
  //admin states

  // message function
  const setmessagefn = (message) => {
    setmessagearray([
      ...messagearray,
      { id: Math.random() + new Date().getMilliseconds(), message: message },
    ]);
  };

  // get cookies cart
  useEffect(() => {
    const cookieCart = Cookies.get("cart");
    if (cookieCart) {
      const parsedCart = JSON.parse(cookieCart);
      setcart(parsedCart);
    }
  }, []);

  //  update cookies when cart change
  useEffect(() => {
    if (cart && Object.keys(cart).length > 0) {
      Cookies.set("cart", JSON.stringify(cart));
    } else {
      // Remove the cookie if the cart is empty
      Cookies.remove("cart");
    }
  }, [cart]);

  return (
    <AppContext.Provider
      value={{
        cart,
        setcart,
        showsearchbar,
        setshowsearchbar,
        showsidecart,
        setshowsidecart,
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
