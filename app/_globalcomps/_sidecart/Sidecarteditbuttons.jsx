import { AiOutlineDelete } from "react-icons/ai";
import { AppContextfn } from "@/app/Context";

function Sidecarteditbuttons({ cartproductname }) {
  const { cart, setcart, setmessagefn } = AppContextfn();
  const MAX_QUANTITY = 10; // Define the maximum quantity

  const handleIncrement = () => {
    if (cart[cartproductname]?.quantity < MAX_QUANTITY)
      setcart((pre) => {
        const updatedcart = { ...pre };
        updatedcart[cartproductname] = {
          ...updatedcart[cartproductname],
          quantity: updatedcart[cartproductname].quantity + 1,
        };
        return updatedcart;
      });
  };

  const handleDecrement = () => {
    if (cart[cartproductname]?.quantity > 1)
      setcart((pre) => {
        const updatedcart = { ...pre };
        updatedcart[cartproductname] = {
          ...updatedcart[cartproductname],
          quantity: updatedcart[cartproductname].quantity - 1,
        };
        return updatedcart;
      });
  };

  // add to cart button
  const handleremovefromcart = () => {
    setcart((pre) => {
      const updatedcart = { ...pre };
      updatedcart[cartproductname] = {
        ...updatedcart[cartproductname],
        added: false,
      };
      return updatedcart;
    });
    setmessagefn("Removed from cart");
  };

  return (
    <div className="flex gap-4 h-16 mt-5">
      <div className="flex items-stretch h-full w-fit border border-white border-opacity-30">
        {/* Decrement Button */}
        <button
          onClick={handleDecrement}
          disabled={cart[cartproductname]?.quantity <= 1}
          className={`flex items-center justify-center h-full aspect-square text-xl ${
            cart[cartproductname]?.quantity <= 1 && "opacity-50"
          }`}
        >
          -
        </button>
        {/* display quantity */}
        <p className="flex items-center justify-center h-full w-5">
          {cart[cartproductname]?.quantity}
        </p>
        {/* Increment Button */}
        <button
          onClick={handleIncrement}
          disabled={cart[cartproductname]?.quantity >= MAX_QUANTITY}
          className={`flex items-center justify-center h-full aspect-square text-xl ${
            cart[cartproductname]?.quantity >= MAX_QUANTITY && "opacity-50"
          }`}
        >
          +
        </button>
      </div>
      {/* add to cart button */}
      <button
        className="w-full h-full text-white bg-theme text-xl px-10"
        onClick={handleremovefromcart}
      >
        <AiOutlineDelete />
      </button>
    </div>
  );
}

export default Sidecarteditbuttons;
