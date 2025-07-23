export function getYYMMDD() {
  const date = new Date();
  const yy = date.getFullYear().toString().slice(-2); // Last 2 digits of year
  const mm = String(date.getMonth() + 1).padStart(2, "0"); // Month (01-12)
  const dd = String(date.getDate()).padStart(2, "0"); // Day (01-31)

  return `${yy}${mm}${dd}`;
}
