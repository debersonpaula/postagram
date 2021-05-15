export default function convertDate(dateString?: string) {
  if (dateString) {
    const date = new Date(dateString);
    return date.toDateString() + ' - ' + date.toTimeString();
  }
  return '';
}
