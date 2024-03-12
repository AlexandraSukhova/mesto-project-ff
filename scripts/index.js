// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const cardList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(cardInfo, deleteCard) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.alt;
  cardTitle.textContent = cardInfo.name;

  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", (evt) => deleteCard(evt));
  return cardItem;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest(".places__item").remove();
}

// @todo: Вывести карточки на страницу
function showCards() {
 initialCards.forEach(cardInfo =>
  cardList.append(createCard(cardInfo, deleteCard))
  );
}

showCards();

