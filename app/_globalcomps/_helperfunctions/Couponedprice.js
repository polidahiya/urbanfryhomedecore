
export default function Couponedprice(totalPrice, coupon) {
  let discountedPrice = totalPrice;
  if (coupon) {
    const discountValue = parseFloat(coupon?.discountValue || 0);
    if (coupon?.discountType === "percentage") {
      discountedPrice = totalPrice - (totalPrice * discountValue) / 100;
    } else if (coupon?.discountType === "fixed amount") {
      discountedPrice = totalPrice - discountValue / coupon?.share;
    }
  }

  const formattedPrice = `₹${parseInt(discountedPrice, 10).toLocaleString(
    "en-IN"
  )}/-`;
  const originalPriceFormatted = `₹${parseInt(totalPrice, 10).toLocaleString(
    "en-IN"
  )}/-`;
  return { formattedPrice, originalPriceFormatted };
}
