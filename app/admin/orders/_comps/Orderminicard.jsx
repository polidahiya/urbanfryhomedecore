import { Statuslists } from "@/app/commondata";
import formatDate from "@/app/_globalcomps/_helperfunctions/formateddate";

const Orderminicard = ({ order, setshowfullorder }) => {
  return (
    <div
      className="flex py-5 border-y cursor-pointer"
      onClick={() => setshowfullorder({ show: true, data: order })}
    >
      <p className="flex-1 text-center text-sm">{order?.userdata?.username}</p>
      <p className="flex-1 text-center text-sm">{order?.userdata?.email}</p>
      <p
        className={`flex-1 text-center text-sm ${
          order?.paymentStatus == "success"
            ? "text-green-500"
            : order?.paymentMethod == "cod"
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        {order?.paymentMethod == "online" ? order?.paymentMethod : "Cod"}
      </p>
      <p className="flex-1 text-center text-sm">{Statuslists[order?.status]}</p>
      <p className="flex-1 text-center text-sm">
        {formatDate(order?.createdAt)}
      </p>
    </div>
  );
};

export default Orderminicard;
