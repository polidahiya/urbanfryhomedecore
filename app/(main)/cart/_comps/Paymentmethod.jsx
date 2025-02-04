import { useEffect } from "react";

const PaymentMethod = ({ paymentMethod, setPaymentMethod, totalPrice }) => {
  const handleToggle = (method) => {
    if (method === "cod" && totalPrice >= 5000) return;
    setPaymentMethod(method);
  };

  useEffect(() => {
    if (paymentMethod === "cod" && totalPrice >= 5000)
      setPaymentMethod("online");
  }, [totalPrice]);

  return (
    <div className="w-full md:w-fit flex flex-col gap-4">
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
          } ${totalPrice >= 5000 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <input
            type="radio"
            name="payment"
            value="cod"
            checked={paymentMethod === "cod"}
            onChange={() => handleToggle("cod")}
            disabled={totalPrice >= 5000}
            className="w-5 h-5 accent-theme cursor-pointer"
          />
          <span className="text-gray-700">Cash on Delivery (COD)</span>
        </label>
      </div>

      {/* Disabled Message */}
      {totalPrice >= 5000 && (
        <p className="text-xs text-gray-500">
          * COD is available only for orders below ₹5,000.
        </p>
      )}
    </div>
  );
};

export default PaymentMethod;
