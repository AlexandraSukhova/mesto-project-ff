import { openModal } from "./modal";
import {sendLike, deleteLike} from './api.js'
import {renderLoading} from "./index.js";


export const popupConfim = document.querySelector('.popup_type_confirm');
export const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardInfo, functionsForCard) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardLikes = cardItem.querySelector('.like-number');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;
  cardItem.id = cardInfo._id;
  cardLikes.textContent = cardInfo.likes.length;

  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, cardInfo._id));

  cardDeleteButton.addEventListener('click', () => {
    renderLoading(popupConfim, 'Да');
    openModal(popupConfim, 'popup_is-opened');
    popupConfim.id = cardItem.id;
  })

  cardImage.addEventListener('click', () => functionsForCard.openedImageModal(cardInfo.link, cardInfo.name));

  return cardItem;
}

export function deleteCard(element) {
  element.remove();
}

export function likeCard(button, id) {
  const likeNumber = button.querySelector('.like-number');
  if(button.classList.contains('card__like-button_is-active')) {
    deleteLike(id)
      .then((res) => {
        button.classList.remove('card__like-button_is-active');
        likeNumber.textContent = res.likes.length;
      });
  }
  else if(button.classList.contains('card__like-button')) {
    sendLike(id)
      .then(res => {
        button.classList.add('card__like-button_is-active');
        likeNumber.textContent = res.likes.length;
    })
  }
}
