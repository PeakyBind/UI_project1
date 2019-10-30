export default function (date) {
  if (date) {
    date = new Date(date);
    let options = {year: 'numeric', month: 'numeric', day: 'numeric' };
    return date.toLocaleDateString('fr-Fr', options)
  }
}
