import { AppContextfn } from "@/app/Context";

const Reviewbutton = ({ showwritereview, setshowwritereview, token }) => {
  const { setmessagefn } = AppContextfn();
  return (
    <button
      className="bg-theme text-white px-10 py-2 lg:hover:opacity-75"
      onClick={() => {
        if (!token) {
          setmessagefn("Please login first!");
          return;
        }
        setshowwritereview((pre) => !pre);
      }}
    >
      {showwritereview ? "Cancle review" : "Write a review"}
    </button>
  );
};

export default Reviewbutton;
