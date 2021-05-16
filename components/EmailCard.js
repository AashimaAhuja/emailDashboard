export const EmailCard = listItem => {
  const card = document.createElement("div");
  card.setAttribute("class", 'email-card');

  card.setAttribute("data-id", listItem.id);

  const avatar = document.createElement("div");
  avatar.setAttribute("class", "avatar");
  avatar.appendChild(
    document.createTextNode(`${listItem.from.name[0].toUpperCase()}`)
  );

  card.appendChild(avatar);
  card.appendChild(EmailBody(listItem));

  return card;
};

const EmailBody = listItem => {
  const emailBody = document.createElement("div");
  emailBody.setAttribute("id", "email-body");

  const emailFrom = document.createElement("div");
  emailFrom.setAttribute("class", "email-from");
  emailFrom.appendChild(document.createTextNode(`${listItem.from.email}`));

  const emailSubject = document.createElement("div");
  emailSubject.setAttribute("class", "email-subject");
  emailSubject.appendChild(
    document.createTextNode(`Subject: ${listItem.subject}`)
  );

  const description = document.createElement("div");
  description.setAttribute("class", "email-description");
  description.appendChild(
    document.createTextNode(`${listItem.short_description}`)
  );

  emailBody.appendChild(emailFrom);
  emailBody.appendChild(emailSubject);
  emailBody.appendChild(description);

  return emailBody;
};