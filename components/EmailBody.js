import { createElement } from '../utils/helpers';

export const EmailBody = emailData => {
  const d = document.createDocumentFragment();
  const avatar = document.createElement('div');
  const initial = emailData.from.name[0].toUpperCase();

  console.log(emailData);
  avatar.setAttribute('class', 'avatar');

  avatar.appendChild(document.createTextNode(initial));

  const eleContent = createElement('div', { class: 'content' });
  const heading = createElement('div', { class: 'heading' });
  const title = createElement('div', { class: 'title' });
  const btn = createElement('button', { id: 'favourite-btn' });

  title.appendChild(document.createTextNode(emailData.subject));
  btn.appendChild(document.createTextNode('Mark as favourite'));

  const dateTime = createElement('div', { class: 'date-time' });
  const contentBody = createElement('div', { id: 'content-body' });

  heading.appendChild(title);
  heading.appendChild(btn);

  eleContent.appendChild(heading);
  eleContent.appendChild(dateTime);
  eleContent.appendChild(contentBody);

  d.appendChild(avatar);
  d.appendChild(eleContent);

  return d;
};
