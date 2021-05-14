export default function convertDate(date?: string) {
  if (date) {
    return new Date(date).toDateString();
  }
  return '';
}
