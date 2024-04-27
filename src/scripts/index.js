import '../pages/index.css';
import {createCard, deleteCard, likeCard, popupConfim, deletedCardId, deletedCard} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation, validationConfig} from './validation.js';
import {getInitialCards, deleteMyCard, updateProfileInfo, postNewCard, updateProfileAvatar, getProfileInfo} from './api.js'
import {handleSubmit, renderLoading} from './utils/utils.js'

let userId

const cardList = document.querySelector('.places__list');
const profileAddButton = document.querySelector('.profile__add-button');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupImage = document.querySelector('.popup__image');
const popupTypeImageCaption = document.querySelector('.popup__caption');
const popupEditProfile = document.querySelector('.popup_type_edit');
const popupAddNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const formAddNewCard = document.forms['new-place'];
const inputCardName = formAddNewCard.elements['place-name'];
const inputCardLink = formAddNewCard.elements['link'];
const formEditProfile = document.forms['edit-profile'];
const inputEditName = formEditProfile.elements['name'];
const inputEditeDescription = formEditProfile.elements['description'];
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const popupUpdateAvatar = document.querySelector('.popup_type_update_avatar');
const formUpdateAvatar = document.forms['update-avatar'];
const inputUpdateAvatar = formUpdateAvatar.elements['avatar-link'];

function fillProfile(pageInfo) {
  profileImage.style = `background-image: url('${pageInfo.avatar}')`
  profileTitle.textContent = pageInfo.name;
  profileDescription.textContent = pageInfo.about;
  userId = pageInfo._id;
}

enableValidation(validationConfig);

const functionsForCard = {
  deleteCard,
  likeCard,
  openedImageModal
}

function renderCard(card, method = 'prepend') {
  const cardElem = createCard(card, functionsForCard, userId);
  cardList[method](cardElem);
}

function openedImageModal(link, title) {
  popupImage.src = link;
  popupImage.alt = title;
  popupTypeImageCaption.textContent = title;
  openModal(popupTypeImage);
}

function handleFormEdit(name, description) {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
  
  closeModal(popupEditProfile);
}

function handleFormAvatar(link) {
  profileImage.style = `background-image: url('${link}')`

  closeModal(popupUpdateAvatar);
}

function handleFormCard(cardInfo) {
  renderCard(cardInfo);
  closeModal(popupAddNewCard);
}

function fillProfileInputs() {
  inputEditName.value = profileTitle.textContent;
  inputEditeDescription.value = profileDescription.textContent;
}

profileImage.addEventListener('click', () => {
  formUpdateAvatar.reset();
  clearValidation(formUpdateAvatar, validationConfig);
  openModal(popupUpdateAvatar);
});

profileEditButton.addEventListener('click', () => {
  fillProfileInputs();
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEditProfile);
  }
);

profileAddButton.addEventListener('click', () => {
  formAddNewCard.reset();
  clearValidation(formAddNewCard, validationConfig);
  openModal(popupAddNewCard);
  }
);

const closeButtons = {
  atCross: 'popup__close',
  atBackdrop: 'popup'
}

function closeModalAtButton(modal, closeButtons) {
  modal.addEventListener('click', (evt) => {
    if(evt.target.classList.contains(closeButtons.atCross) || evt.target.classList.contains(closeButtons.atBackdrop)) {
      closeModal(modal);
      }
    }
  );
}

const modalList = Array.from(document.querySelectorAll('.popup'));

modalList.forEach(modal => closeModalAtButton(modal, closeButtons));

function showCards(infoForCards) {
  infoForCards.forEach(info => {
    renderCard(info, 'append');
  });
 }

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return updateProfileInfo(inputEditName.value, inputEditeDescription.value)
    .then(userData => handleFormEdit(userData.name, userData.about));
  }

  handleSubmit(makeRequest, evt);
}

function handleProfileAvatarSubmit(evt) {
  function makeRequest() {
    return updateProfileAvatar(inputUpdateAvatar.value)
    .then(userData => handleFormAvatar(userData.avatar))
  }

  handleSubmit(makeRequest, evt);
}

function handleMakeNewCardSubmit(evt) {
  function makeRequest() {
    return postNewCard(inputCardName.value, inputCardLink.value)
    .then(cardData => handleFormCard(cardData));
  }

  handleSubmit(makeRequest, evt, 'Созданение...');
}

function handleConfirmSubmit(evt) {
  function makeRequest() {
    return deleteMyCard(deletedCardId)
    .then(() => {
      closeModal(popupConfim);
      deleteCard(deletedCard);
    });
  }

  handleSubmit(makeRequest, evt, 'Удаление...');
}

popupAddNewCard.addEventListener('submit', handleMakeNewCardSubmit);

popupEditProfile.addEventListener('submit', handleProfileFormSubmit);

popupUpdateAvatar.addEventListener('submit', handleProfileAvatarSubmit);

popupConfim.addEventListener('submit', handleConfirmSubmit);

Promise.all([getProfileInfo(), getInitialCards()])
.then(([pageInfo, cardsInfo]) => {
  fillProfile(pageInfo);
  showCards(cardsInfo);
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
});
