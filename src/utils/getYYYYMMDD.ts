export default function getYYMMDD(date: Date): string {
  const yearMonthDay = date.toString().split("T")[0];
  return yearMonthDay;
}
