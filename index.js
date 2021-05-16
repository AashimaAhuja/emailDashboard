// Import stylesheets
import './style.css';
import { FILTERS, BASE_URL } from './constants';
import fetchEmailList from './services/emailList';
import { EmailCard } from './components/EmailCard';
import { EmailBody } from './components/EmailBody';
import fetchEmailBody from './services/emailBody';
import { BASE_URL } from '../constants';

(function() {
  const emailListObj = {};
  const emailList = document.getElementById('email-list');

  function init() {
    renderFilters();
    renderEmailList();
  }

  async function renderEmailList(emailList) {
    const { list } = await fetchEmailList(BASE_URL);
    const d = document.createDocumentFragment();
    list.forEach(item => {
      emailListObj[item.id] = item;
      d.appendChild(EmailCard(item));
    });

    document.getElementById('email-list').appendChild(d);
  }

  function filterList(event) {
    const filterName = event.target.id;
    const d = document.createDocumentFragment();
    const filteredList = Object.keys(emailListObj)
      .filter(item => {
        if (filterName == 'unread') return !emailListObj[item]['read'];
        return emailListObj[item][filterName] == true;
      })
      .map(id => emailListObj[id]);

    console.log(filteredList);
    filteredList.forEach(item => {
      d.appendChild(EmailCard(item));
    });
    emailList.innerHTML = '';
    emailList.appendChild(d);
  }

  function renderFilters() {
    let d = document.createDocumentFragment();
    Object.keys(FILTERS).forEach(filter => {
      let filterEle = document.createElement('div');
      filterEle.setAttribute('id', FILTERS[filter].toLowerCase());
      filterEle.setAttribute('class', 'filter');

      var t = document.createTextNode(FILTERS[filter]);

      filterEle.appendChild(t);
      d.appendChild(filterEle);
    });
    document.getElementById('filters').appendChild(d);
  }

  function markFlag(id, name) {
    emailListObj[id][name] = true;
  }

  function markAsFavorite(event) {
    const eleId = event.target.id;

    if (eleId === 'favourite-btn') {
      const id = event.target.closest('#email-content').dataset.id;
      emailListObj[id].favourites = true;
    }
  }

  async function openEmail(event) {
    const emailClicked = event.target.closest('.email-card');
    const id = emailClicked.dataset.id;
    const eleEmailContent = document.getElementById('email-content');

    eleEmailContent.innerHTML = '';
    eleEmailContent.setAttribute('data-id', id);
    const emailList = document.getElementById('email-list').children;

    for (let ele of emailList) {
      ele.classList.remove('active');
    }

    emailClicked.classList.add('active');
    emailClicked.classList.add('read');

    const emailContent = await fetchEmailBody(`${BASE_URL}/?id=${id}`);
    const emailData = emailListObj[id];
    eleEmailContent.appendChild(EmailBody(emailData));
    document.getElementById('content-body').innerHTML = emailContent.body;

    document.getElementById('email-list').style.width = '35%';
    eleEmailContent.style.width = '65%';
    eleEmailContent.style.display = 'flex';

    markFlag(id, 'read');
  }

  document.getElementById('email-list').addEventListener('click', openEmail);
  document.getElementById('filters').addEventListener('click', filterList);
  document
    .getElementById('email-content')
    .addEventListener('click', markAsFavorite);

  init();
})();
