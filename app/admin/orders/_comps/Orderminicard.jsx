import { Statuslists } from "@/app/commondata";

const Orderminicard = ({ order, setshowfullorder }) => {
  return (
    <div
      className="flex py-5 border-y cursor-pointer"
      onClick={() => setshowfullorder({ show: true, data: order })}
    >
      <p className="flex-1 text-center text-sm">{order?.username}</p>
      <p className="flex-1 text-center text-sm">{order?.email}</p>
      <p
        className={`flex-1 text-center text-sm ${
          order?.payment == "successful"
            ? "text-green-500"
            : order?.paymentMethod == "cod"
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        {order?.paymentMethod == "online" ? order?.payment : "Cod"}
      </p>
      <p className="flex-1 text-center text-sm">
        {Statuslists[order?.orderstage]}
      </p>
      <p className="flex-1 text-center text-sm">{order?.date}</p>
    </div>
  );
};

export default Orderminicard;
