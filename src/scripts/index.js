import '../pages/index.css';
import {showCards} from './cards.js';
import {openModal, handleFormEdit, assignValue, closeButton, handleFormCard, inputCardName, inputCardLink, inputEditeDescription, inputEditName } from './modal.js'

const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const allPopups = document.querySelectorAll('.popup');

// @todo: Функция создания карточки

showCards();

allPopups.forEach(item => item.classList.toggle('popup_is-animated'));

profileAddButton.addEventListener('click', () => openModal(popupAddNewCard, 'popup_is-opened'));

profileEditButton.addEventListener('click', () => {
  openModal(popupEditProfile, 'popup_is-opened');
  assignValue();
  })

popupAddNewCard.addEventListener('submit', evt => handleFormCard(evt));

popupEditProfile.addEventListener('submit', evt => handleFormEdit(evt))

document.addEventListener('click', (evt) => {
  if(inputEditName.value.length > 0 && inputEditeDescription.value.length || inputCardName.value.length > 0 && inputCardLink.value.startsWith('http')) {
    closeButton(evt, 'popup__button')
    }
  }
)

document.addEventListener('click', (evt) => closeButton(evt, 'popup__close'));
document.addEventListener('click', (evt) => closeButton(evt, 'popup'));
