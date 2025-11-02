import { Statuslists } from "@/app/commondata";
import formatDate from "@/app/_globalcomps/_helperfunctions/formateddate";

const Orderminicard = ({ order, setshowfullorder }) => {
  return (
    <tr
      className="group relative hover:bg-gray-100"
      onClick={() => setshowfullorder({ show: true, data: order })}
    >
      <td className="border border-gray-300 px-4 py-2">
        {order?.userdata?.name || order?.userdata?.username}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {order?.userdata?.email}
      </td>
      <td
        className={`border border-gray-300 px-4 py-2 ${
          order?.paymentStatus == "success"
            ? "text-green-500"
            : order?.paymentMethod == "cod"
            ? "text-yellow-500"
            : "text-red-500"
        }`}
      >
        {order?.paymentMethod == "online" ? order?.paymentMethod : "Cod"}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {Statuslists[order?.status]}
      </td>
      <td className="border border-gray-300 px-4 py-2">
        {formatDate(order?.createdAt)}
      </td>
    </tr>
  );
};

export default Orderminicard;
