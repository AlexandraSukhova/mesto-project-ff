import {openedImageModal} from './index.js';

export const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardInfo, deleteCard, likeCard, openedImageModal) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;

  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', deleteCard);

  const cardLikeButton = cardItem.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', likeCard);

  cardImage.addEventListener('click', openedImageModal)

  return cardItem;
}

export function deleteCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.places__item').remove();
}

export function likeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_is-active');
}

export function createNewCard(name, link) {
  const cardInfo = {};
  cardInfo.name = name;
  cardInfo.link = link;
  initialCards.push(cardInfo);
  
  const newCard = createCard(initialCards[initialCards.length-1], deleteCard, likeCard, openedImageModal);
  return newCard;
}
