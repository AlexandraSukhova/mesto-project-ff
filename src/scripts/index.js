import '../pages/index.css';
import {initialCards} from './cards.js';
import {createCard, deleteCard, likeCard} from './card.js';
import {openModal, closeModal} from './modal.js'

const cardList = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupImage = document.querySelector('.popup__image');
const popupTypeImageCaption = document.querySelector('.popup__caption');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const allPopups = document.querySelectorAll('.popup');
const form = document.forms;
const formAddNewCard = form['new-place'];
const inputCardName = formAddNewCard.elements['place-name'];
const inputCardLink = formAddNewCard.elements['link'];
const formEditProfile = form['edit-profile'];
const inputEditName = formEditProfile.elements['name'];
const inputEditeDescription = formEditProfile.elements['description'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function showCards() {
  initialCards.forEach(cardInfo =>
   cardList.append(createCard(cardInfo, deleteCard, likeCard, openedImageModal))
   );
 }

showCards();

function createNewCard(name, link) {
  const cardInfo = {};
  cardInfo.name = name;
  cardInfo.link = link;

  const newCard = createCard(cardInfo, deleteCard, likeCard, openedImageModal);
  return newCard;
}

function addNewCard(newCard) {
  cardList.prepend(newCard);
}

function openedImageModal(image, title) {
  const popupCardLink = image.src;
  const popupCardAlt = image.src;

  popupImage.src = popupCardLink;
  popupImage.alt = popupCardAlt;
  popupTypeImageCaption.textContent = title.textContent;
  openModal(popupTypeImage, 'popup_is-opened');
}

allPopups.forEach(item => item.classList.toggle('popup_is-animated'));

function handleFormEdit(evt) {
  evt.preventDefault();

  const name = inputEditName.value;
  const description = inputEditeDescription.value;

  profileTitle.textContent = name;
  profileDescription.textContent = description;
  
  closeModal(popupEditProfile, 'popup_is-opened');
}

function handleFormCard(evt) {
  evt.preventDefault();

  const name = inputCardName.value;
  const link = inputCardLink.value;

  addNewCard(createNewCard(name, link));

  formAddNewCard.reset();
  closeModal(popupAddNewCard, 'popup_is-opened');
}

function assignValue() {
  inputEditName.value = profileTitle.textContent;
  inputEditeDescription.value = profileDescription.textContent;
}


profileEditButton.addEventListener('click', () => {
  openModal(popupEditProfile, 'popup_is-opened');
  assignValue();
  }
);

profileAddButton.addEventListener('click', () => {
  formAddNewCard.reset();
  openModal(popupAddNewCard, 'popup_is-opened');
  }
);

popupAddNewCard.addEventListener('submit', evt => handleFormCard(evt));

popupEditProfile.addEventListener('submit', evt => handleFormEdit(evt));

popupAddNewCard.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    closeModal(popupAddNewCard, 'popup_is-opened');
    }
  }
);

popupEditProfile.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    closeModal(popupEditProfile, 'popup_is-opened');
    }
  }
);

popupTypeImage.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    closeModal(popupTypeImage, 'popup_is-opened');
    }
  }
);
