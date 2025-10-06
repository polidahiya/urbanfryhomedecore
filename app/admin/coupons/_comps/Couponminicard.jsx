import formatDate from "@/app/_globalcomps/_helperfunctions/formateddate";
const Couponminicard = ({ initialstate, coupon, setdata, setshowform }) => {
  return (
    <div
      className={`flex py-5 border-y cursor-pointer ${
        !coupon?.isActive && "bg-red-50"
      }`}
      onClick={() => {
        setdata({ ...initialstate, ...coupon });
        setshowform(true);
      }}
    >
      <p className="flex-1 text-center text-sm">{coupon?.code}</p>
      <p className="flex-1 text-center text-sm">{coupon?.discountType}</p>
      <p className={`flex-1 text-center text-sm`}>
        {coupon?.discountValue}
        {coupon?.discountType == "percentage" && "%"}
        {coupon?.discountType == "fixed amount" && "/-"}
      </p>
      <p className="flex-1 text-center text-sm">
        {coupon?.usageLimit == -1 ? "Unlimited" : coupon?.usageLimit}
      </p>
      <p className="flex-1 text-center text-sm">
        {coupon?.usageLimitperuser == -1
          ? "Unlimited"
          : coupon?.usageLimitperuser}
      </p>
      <p className="flex-1 text-center text-sm">
        {formatDate(coupon?.validFrom, true)} to{" "}
        {formatDate(coupon?.validTo, true)}
      </p>
    </div>
  );
};

export default Couponminicard;
