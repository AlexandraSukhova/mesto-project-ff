import {addNewCard, createNewCard} from './cards'

const form = document.forms;
const formAddNewCard = form['new-place'];
export const inputCardName = formAddNewCard.elements['place-name'];
export const inputCardLink = formAddNewCard.elements['link'];
const formEditProfile = form['edit-profile'];
export const inputEditName = formEditProfile.elements['name'];
export const inputEditeDescription = formEditProfile.elements['description'];
const popupImage = document.querySelector('.popup_type_image');

export function openModal(modal, addClass){
  modal.classList.toggle(addClass);
  document.addEventListener('keydown', keyHandler);
}

export function handleFormEdit(evt) {
  evt.preventDefault();

  const name = inputEditName.value;
  const description = inputEditeDescription.value;

  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  profileTitle.textContent = name;
  profileDescription.textContent = description;
}

export function handleFormCard(evt) {
  evt.preventDefault();

  const name = inputCardName.value;
  const link = inputCardLink.value;

  addNewCard(createNewCard(name, link));

  evt.target.reset();
}

export function assignValue() {
  inputEditName.value = document.querySelector('.profile__title').textContent;
  inputEditeDescription.value = document.querySelector('.profile__description').textContent;
}

export function closeButton(evt, button) {
  if (evt.target.classList.contains(button)) {
    closeModal('.popup_is-opened', 'popup_is-opened')
  };
}

export function keyHandler(evt) {
  if (evt.key === 'Escape'){
    closeModal('.popup_is-opened', 'popup_is-opened')
    };
}

export function closeModal(modal, classRemove) {
  document.querySelector(modal).classList.toggle(classRemove);
  document.removeEventListener('keydown', keyHandler);
}

export function createImageModal(evt) {
  const popupCardLink = evt.target.src;
  const popupCardAlt = evt.target.src;

  document.querySelector('.popup__image').src = popupCardLink;
  document.querySelector('.popup__image').alt = popupCardAlt;
  document.querySelector('.popup__caption').textContent = evt.target.closest('.places__item').textContent;
}

export function openedImageModal(evt) {
  openModal(popupImage, 'popup_is-opened')
  createImageModal(evt);
}
