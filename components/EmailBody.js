import { createElement } from "../utils/helpers";

export const EmailBody = ({ id, initial, subject }) => {
  const d = document.createDocumentFragment();
  const avatar = document.createElement("div");

  avatar.setAttribute("class", "avatar");
  avatar.appendChild(document.createTextNode(`${initial.toUpperCase()}`));

  const eleContent = createElement("div", { class: "content" });
  const heading = createElement("div", { class: "heading" });
  const title = createElement("div", { class: "title" });
  const btn = createElement("button", { class: "favourite-btn" });

  const dateTime = createElement("div", { class: "date-time" });
  const contentBody = createElement("div", { id: "content-body" });

  heading.appendChild(title);
  heading.appendChild(btn);

  eleContent.appendChild(heading);
  eleContent.appendChild(dateTime);
  eleContent.appendChild(contentBody);

  d.appendChild(avatar);
  d.appendChild(eleContent);
};

`<div class='avatar'></div>
<div class= 'content'>
  <heading>
    <title>
    <mark as favourite>
  </heading>
  <date>
  <content-body>

</div>
`;
