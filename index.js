// Import stylesheets
import "./style.css";
import { FILTERS, BASE_URL } from "./constants";
import fetchEmailList from "./services/emailList";
import { EmailCard } from "./components/EmailCard";
import fetchEmailBody from "../utils/fetchEmailBody";
import { BASE_URL } from "../constants";

// Write Javascript code!
(function() {
  const appDiv = document.getElementById("app");
  const eleMarkFavorite = document.getElementsByClassName("mark-favorite");
  const eleCards = document.getElementsByClassName("card");
  const favoriteList = [];

  function init() {
    renderFilters();
    renderEmailList();
  }

  async function renderEmailList() {
    const { list } = await fetchEmailList(BASE_URL);
    const d = document.createDocumentFragment();
    list.forEach(item => {
      d.appendChild(EmailCard(item));
    });

    document.getElementById("email-list").appendChild(d);
  }

  function renderFilters() {
    let d = document.createDocumentFragment();
    Object.keys(FILTERS).forEach(filter => {
      let filterEle = document.createElement("div");
      filterEle.setAttribute("id", FILTERS[filter].toLowerCase());
      filterEle.setAttribute("class", "filter");

      var t = document.createTextNode(FILTERS[filter]);

      filterEle.appendChild(t);
      d.appendChild(filterEle);
    });
    document.getElementById("filters").appendChild(d);
  }

  function markAsFavorite(event) {
    const id = event.target.id;
    favoriteList.push(id);
    console.log(favoriteList);
  }

  async function openEmail(event, id) {
    const emailClicked = event.target;
    emailClicked.closest(".email-card").classList.add("active");

    const emailContent = await fetchEmailBody(`${BASE_URL}/?id=${id}`);
    console.log(emailContent);
    document.getElementsById("content-body").innerHTML = emailContent.body;
  }

  // for (let i = 0; i < eleMarkFavorite.length; i++) {
  //   eleMarkFavorite[i].addEventListener("click", markAsFavorite);
  // }
  // for (let i = 0; i < eleCards.length; i++) {
  //   eleCards[i].addEventListener("click", openEmail);
  // }

  document.getElementById("email-list").addEventListener("click", openEmail);

  init();
})();
