// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
// @todo: DOM узлы
const cardList = document.querySelector(".places__list");
// @todo: Функция создания карточки
function cardCreate(card, cardDelete) {
  const cardItem = cardTemplate.querySelector(".places__item").cloneNode(true); // Обязательно объявлять и клонировать здесь
  const cardImage = cardItem.querySelector(".card__image");
  const cardTitle = cardItem.querySelector(".card__title");

  cardImage.src = card.link;
  cardImage.alt = card.alt;
  cardTitle.textContent = card.name;

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
 initialCards.forEach(card => 
  cardList.append(cardCreate(card, cardDelete))
  );
}
showCards();

