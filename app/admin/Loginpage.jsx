"use client";
import React, { useEffect, useState, useRef } from "react";
import { passwordlogin } from "../_serveractions/Loginaction";
import { AppContextfn } from "@/app/Context";
import { ImEye } from "react-icons/im";
import { ImEyeBlocked } from "react-icons/im";
import Recaptcha from "../_components/_helperfunctions/Recaptcha";

function Loginpage() {
  const { setmessagefn } = AppContextfn();
  const [password, setpassword] = useState("");
  const [showpassword, setshowpassword] = useState(false);
  const passwordinput = useRef();
  const [showloading, setshowloading] = useState(false);

  const loginfn = () => {
    setshowloading(true);

    if (password == "") {
      setmessagefn("Please enter password");
      setshowloading(false);
      return;
    }

    Recaptcha(
      async () => {
        let res = await passwordlogin({ password: password });
        setmessagefn(res.message);
        setshowloading(false);
      },
      () => {
        setmessagefn("Something went wrong!");
        setshowloading(false);
      }
    );
  };

  useEffect(() => {
    passwordinput?.current?.focus();
  }, []);

  return (
    <div
      className="h-screen w-full flex items-center justify-center"
      style={{
        backgroundImage:
          " linear-gradient(45deg, rgba(254, 246, 210, 0.53) 0%, rgba(254, 246, 210, 0.53) 14.286%,rgba(221, 240, 216, 0.53) 14.286%, rgba(221, 240, 216, 0.53) 28.572%,rgba(188, 233, 223, 0.53) 28.572%, rgba(188, 233, 223, 0.53) 42.858%,rgba(156, 227, 229, 0.53) 42.858%, rgba(156, 227, 229, 0.53) 57.144%,rgba(123, 220, 235, 0.53) 57.144%, rgba(123, 220, 235, 0.53) 71.42999999999999%,rgba(90, 214, 242, 0.53) 71.43%, rgba(90, 214, 242, 0.53) 85.71600000000001%,rgba(57, 207, 248, 0.53) 85.716%, rgba(57, 207, 248, 0.53) 100.002%),linear-gradient(135deg, rgb(246, 99, 200) 0%, rgb(246, 99, 200) 12.5%,rgb(223, 98, 196) 12.5%, rgb(223, 98, 196) 25%,rgb(199, 97, 192) 25%, rgb(199, 97, 192) 37.5%,rgb(176, 96, 188) 37.5%, rgb(176, 96, 188) 50%,rgb(152, 95, 184) 50%, rgb(152, 95, 184) 62.5%,rgb(129, 94, 180) 62.5%, rgb(129, 94, 180) 75%,rgb(105, 93, 176) 75%, rgb(105, 93, 176) 87.5%,rgb(82, 92, 172) 87.5%, rgb(82, 92, 172) 100%)",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div
        className=" flex flex-col items-center justify-center gap-[10px] rounded-[10px] w-[90%] max-w-[500px] aspect-[2/1] text-white  "
        style={{
          backgroundImage:
            "linear-gradient(200deg, rgba(171, 171, 171,0.05) 0%, rgba(171, 171, 171,0.05) 23%,rgba(90, 90, 90,0.05) 23%, rgba(90, 90, 90,0.05) 48%,rgba(65, 65, 65,0.05) 48%, rgba(65, 65, 65,0.05) 61%,rgba(232, 232, 232,0.05) 61%, rgba(232, 232, 232,0.05) 100%),linear-gradient(126deg, rgba(194, 194, 194,0.05) 0%, rgba(194, 194, 194,0.05) 11%,rgba(127, 127, 127,0.05) 11%, rgba(127, 127, 127,0.05) 33%,rgba(117, 117, 117,0.05) 33%, rgba(117, 117, 117,0.05) 99%,rgba(248, 248, 248,0.05) 99%, rgba(248, 248, 248,0.05) 100%),linear-gradient(144deg, rgba(64, 64, 64,0.05) 0%, rgba(64, 64, 64,0.05) 33%,rgba(211, 211, 211,0.05) 33%, rgba(211, 211, 211,0.05) 50%,rgba(53, 53, 53,0.05) 50%, rgba(53, 53, 53,0.05) 75%,rgba(144, 144, 144,0.05) 75%, rgba(144, 144, 144,0.05) 100%),linear-gradient(329deg, hsl(148,0%,0%),hsl(148,0%,0%))",
        }}
      >
        <label htmlFor="password" className="text-[30px]">
          Admin
        </label>
        <div className="flex items-center justify-center border border-slate-300 rounded-full overflow-hidden">
          <input
            type={showpassword ? "text" : "password"}
            name="password"
            ref={passwordinput}
            value={password}
            onChange={(e) => {
              setpassword(e.target.value);
            }}
            onKeyPress={(e) => {
              if (e.key == "Enter") {
                loginfn();
              }
            }}
            autoComplete="current-password"
            className=" outline-none text-center bg-transparent"
          />
          <button
            className="h-[30px] p-[5px] aspect-square bg-white bg-opacity-[0.1]"
            onClick={(e) => {
              e.preventDefault();
              setshowpassword(!showpassword);
            }}
          >
            {showpassword ? <ImEye /> : <ImEyeBlocked />}
          </button>
        </div>
        <button
          className="flex items-center justify-center gap-[10px] py-1 px-5 bg-slate-500 rounded-full cursor-pointer"
          onClick={(e) => {
            loginfn();
          }}
        >
          {showloading && (
            <div className="h-[20px] aspect-square rounded-full  border-r-2 border-l-2 border-white animate-spin"></div>
          )}
          <span>{showloading ? "Logingin..." : "Login"}</span>
        </button>
      </div>
    </div>
  );
}

export default Loginpage;
