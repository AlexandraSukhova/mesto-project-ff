const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardInfo, deleteCard, likeCard, openedImageModal) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', () => deleteCard(cardItem));

  const cardLikeButton = cardItem.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton));;

  cardImage.addEventListener('click', () => openedImageModal(cardImage, cardTitle));

  return cardItem;
}

export function deleteCard(element) {
  element.remove();
}

export function likeCard(button) {
  button.classList.toggle('card__like-button_is-active');
}
