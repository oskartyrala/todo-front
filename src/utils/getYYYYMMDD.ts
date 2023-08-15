export default function getYYMMDD(date: Date | string): string {
  const yearMonthDay = date.toString().split("T")[0];
  return yearMonthDay;
}
