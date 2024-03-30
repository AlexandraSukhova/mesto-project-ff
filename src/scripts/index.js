import '../pages/index.css';
import {createCard, createNewCard, initialCards, deleteCard, likeCard} from './cards.js';
import {openModal, closeButton, createImageModal} from './modal.js'

const cardList = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const allPopups = document.querySelectorAll('.popup');
const form = document.forms;
const formAddNewCard = form['new-place'];
const inputCardName = formAddNewCard.elements['place-name'];
const inputCardLink = formAddNewCard.elements['link'];
const formEditProfile = form['edit-profile'];
const inputEditName = formEditProfile.elements['name'];
const inputEditeDescription = formEditProfile.elements['description'];
const popupImage = document.querySelector('.popup_type_image');

function showCards() {
  initialCards.forEach(cardInfo =>
   cardList.append(createCard(cardInfo, deleteCard, likeCard, openedImageModal))
   );
 }

showCards();

function addNewCard(newCard) {
  cardList.prepend(newCard);
}

allPopups.forEach(item => item.classList.toggle('popup_is-animated'));

export function openedImageModal(evt) {
  openModal(popupImage, 'popup_is-opened')
  createImageModal(evt);
}

function handleFormEdit(evt) {
  evt.preventDefault();

  const name = inputEditName.value;
  const description = inputEditeDescription.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = name;
  profileDescription.textContent = description;
}

function handleFormCard(evt) {
  evt.preventDefault();

  const name = inputCardName.value;
  const link = inputCardLink.value;

  addNewCard(createNewCard(name, link));

  evt.target.reset();
}

function assignValue() {
  inputEditName.value = document.querySelector('.profile__title').textContent;
  inputEditeDescription.value = document.querySelector('.profile__description').textContent;
}

profileAddButton.addEventListener('click', () => {
  formAddNewCard.reset();
  openModal(popupAddNewCard, 'popup_is-opened');
  }
);

profileEditButton.addEventListener('click', () => {
  openModal(popupEditProfile, 'popup_is-opened');
  assignValue();
  });

popupAddNewCard.addEventListener('submit', evt => handleFormCard(evt));

popupEditProfile.addEventListener('submit', evt => handleFormEdit(evt));

document.addEventListener('click', (evt) => {
  if(inputEditName.value.length > 0 && inputEditeDescription.value.length || inputCardName.value.length > 0 && inputCardLink.value.startsWith('http')) {
    closeButton(evt, 'popup__button')
    }
  }
);

document.addEventListener('click', (evt) => closeButton(evt, 'popup__close'));

document.addEventListener('click', (evt) => closeButton(evt, 'popup'));
