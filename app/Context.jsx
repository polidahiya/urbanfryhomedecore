"use client";
import Cookies from "js-cookie";
import { createContext, useContext, useState, useEffect } from "react";
const AppContext = createContext({});

export function Appwrapper({ children, token, userdata, parsedCart }) {
  const [cart, setcart] = useState(parsedCart || {});
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
  const [quickview, setquickview] = useState({ show: false, data: {} });
  const [quickviewclosebutton, setquickviewclosebutton] = useState(true);
  // newsletter
  const [shownewsletter, setshownewsletter] = useState(false);
  useEffect(() => {
    // newsletter
    const alreadySubscribed = localStorage.getItem("isSubscribed");
    if (alreadySubscribed) return;

    const timer = setTimeout(() => {
      setshownewsletter(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  //admin states

  // message function
  const setmessagefn = (message) => {
    setmessagearray([
      ...messagearray,
      { id: Math.random() + new Date().getMilliseconds(), message: message },
    ]);
  };

  //  update cookies when cart change
  useEffect(() => {
    if (cart && Object.keys(cart).length > 0) {
      Cookies.set("cart", JSON.stringify(cart), { expires: 1 });
    }
  }, [cart]);

  return (
    <AppContext.Provider
      value={{
        token,
        userdata,
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
        quickview,
        setquickview,
        shownewsletter,
        setshownewsletter,
        quickviewclosebutton,
        setquickviewclosebutton,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function AppContextfn() {
  return useContext(AppContext);
}
