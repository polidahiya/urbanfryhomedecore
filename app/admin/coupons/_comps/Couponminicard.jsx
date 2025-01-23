const Couponminicard = ({ coupon, setdata, setshowform }) => {
  return (
    <div
      className={`flex py-5 border-y cursor-pointer ${
        !coupon?.isActive && "bg-red-50"
      }`}
      onClick={() => {
        setdata(coupon);
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
      <p className="flex-1 text-center text-sm">{coupon?.usagetimes}</p>
      <p className="flex-1 text-center text-sm">
        {coupon?.validFrom} to {coupon?.validTo}
      </p>
    </div>
  );
};

export default Couponminicard;
