import { closeModal, openModal } from "./modal";
import {sendLike, deleteLike, deleteMyCard} from './api.js'
import {handleSubmit} from './utils/utils.js'

export let deletedCardId
export const popupConfim = document.querySelector('.popup_type_confirm');
export const cardTemplate = document.querySelector('#card-template').content;

export function createCard(cardInfo, functionsForCard, userId) {
  const cardItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardItem.querySelector('.card__image');
  const cardTitle = cardItem.querySelector('.card__title');
  const cardLikes = cardItem.querySelector('.like-number');
  const cardLikeButton = cardItem.querySelector('.card__like-button');
  const cardDeleteButton = cardItem.querySelector('.card__delete-button');
  const likeNumber = cardLikeButton.querySelector('.like-number');
  const likeArray = cardInfo.likes;
  const ownerId = cardInfo.owner._id;

  cardImage.src = cardInfo.link;
  cardImage.alt = cardInfo.name;
  cardTitle.textContent = cardInfo.name;
  cardLikes.textContent = cardInfo.likes.length;

  activateDeleteButton(ownerId, cardDeleteButton, userId)

  likeArray.forEach(like => isLiked(like._id, userId, cardLikeButton));

  cardLikeButton.addEventListener('click', () => likeCard(cardLikeButton, cardInfo._id, likeNumber));

  cardDeleteButton.addEventListener('click', () => {
    deletedCardId = cardInfo._id;
    cardItem.id = deletedCardId;
    openModal(popupConfim);
    popupConfim.addEventListener('submit', handleConfirmSubmit);
  })

  cardImage.addEventListener('click', () => functionsForCard.openedImageModal(cardInfo.link, cardInfo.name));

  return cardItem;
}

export function deleteCard(deletedCardId) {
  const cardToDelete = document.getElementById(deletedCardId);
  cardToDelete.remove();
}

function activateDeleteButton(ownerId, button, userId) {
  if(ownerId === userId){
    button.hidden = false;
  }
}

function isLiked(likeId, userId, button, likeClass = 'card__like-button_is-active') {
  if(likeId === userId){
    button.classList.add(likeClass);
  }
}

export function likeCard(button, id, likeNumber) {
  if(button.classList.contains('card__like-button_is-active')) {
    deleteLike(id)
      .then((res) => {
        button.classList.remove('card__like-button_is-active');
        likeNumber.textContent = res.likes.length;
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
  else if(button.classList.contains('card__like-button')) {
    sendLike(id)
      .then(res => {
        button.classList.add('card__like-button_is-active');
        likeNumber.textContent = res.likes.length;
    })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }
}

function handleConfirmSubmit(evt) {
  function makeRequest() {
    return deleteMyCard(deletedCardId)
    .then(() => {
      closeModal(popupConfim);
      deleteCard(deletedCardId);
      popupConfim.removeEventListener('submit', handleConfirmSubmit);
    });
  }

  handleSubmit(makeRequest, evt, 'Удаление...', 'Да');
}