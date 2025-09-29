"use client";
import { useEffect } from "react";
import { AppContextfn } from "@/app/Context";

const PaymentMethod = ({
  totalPrice,
  maxcashpaymentavailable,
  paymentMethod,
  setPaymentMethod,
}) => {
  const { pincode } = AppContextfn();

  // ✅ COD limit check (depends on NCR or not)
  const codDisabled = !pincode?.isNcr && totalPrice >= maxcashpaymentavailable;

  const handleToggle = (method) => {
    if (method === "cod" && codDisabled) return;
    setPaymentMethod(method);
  };

  useEffect(() => {
    if (paymentMethod === "cod" && codDisabled) {
      setPaymentMethod("online");
    }
  }, [totalPrice, codDisabled]);

  return (
    <div className="w-full md:max-w-96 flex flex-col gap-4">
      <span className="font-semibold">Payment Method</span>
      <div className="w-full flex flex-col gap-2 text-sm">
        {/* Online Payment Option */}
        <label
          className={`w-full flex items-center gap-3 p-3 border cursor-pointer transition ${
            paymentMethod === "online"
              ? "bg-white border-theme"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <input
            type="radio"
            name="payment"
            value="online"
            checked={paymentMethod === "online"}
            onChange={() => handleToggle("online")}
            className="w-5 h-5 accent-theme cursor-pointer"
          />
          <span className="text-gray-700">Pay Online</span>
        </label>

        {/* COD Option */}
        <label
          className={`w-full flex items-center gap-3 p-3 border cursor-pointer transition ${
            paymentMethod === "cod"
              ? "bg-white border-theme"
              : "bg-gray-100 border-gray-300"
          } ${codDisabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => handleToggle("cod")}
            disabled={codDisabled}
            className="w-5 h-5 accent-theme cursor-pointer"
          />
          <span className="text-gray-700">Cash on Delivery (COD)</span>
        </label>
      </div>

      {/* Disabled Message */}
      {codDisabled && (
        <p className="text-xs text-gray-500">
          * COD available in Delhi NCR only or for Orders below{" "}
          {maxcashpaymentavailable}/-
        </p>
      )}
    </div>
  );
};

export default PaymentMethod;
