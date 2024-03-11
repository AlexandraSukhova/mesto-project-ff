// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function cardCreate(cardInfo, cardDelete) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true);
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.alt;
  cardTitle.textContent = cardInfo.name;

  const cardDeleteButton = cardItem.querySelector(".card__delete-button");
  cardDeleteButton.addEventListener("click", cardDelete(cardDeleteButton));
  return cardItem;
}
// @todo: Функция удаления карточки
function cardDelete(button) {
  button.addEventListener("click", function(evt){
    const eventTarget = evt.target;
    eventTarget.closest(".places__item").remove();
  });
}
// @todo: Вывести карточки на страницу
function showCards() {
 initialCards.forEach(cardInfo =>
  cardList.append(cardCreate(cardInfo, cardDelete))
  );
}
showCards();

