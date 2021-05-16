export default function fetchEmailList(url) {
  return fetch(url)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log("Oops, there is an error fetching data"));
}
