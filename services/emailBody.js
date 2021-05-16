export default function fetchEmailBody(url) {
  return fetch(`https://flipkart-email-mock.vercel.app/?id=3`)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.log("Oops, there is an error fetching data"));
}
