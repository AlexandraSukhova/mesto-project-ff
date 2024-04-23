import '../pages/index.css';
import {createCard, deleteCard, likeCard, popupConfim} from './card.js';
import {openModal, closeModal} from './modal.js';
import {enableValidation, clearValidation, validationConfig} from './validation.js';
import {getInitialCards, deleteMyCard, updateProfileInfo, postNewCard, updateProfileAvatar, getProfileInfo} from './api.js'

const userId = 'fd28bb529e4433b2cbfa9207';
let deletedCardId

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
const popupButton = document.querySelector('.popup__button');

function fillProfile(pageInfo) {
  profileImage.style = `background-image: url('${pageInfo.avatar}')`
  profileTitle.textContent = pageInfo.name;
  profileDescription.textContent = pageInfo.about;
}

enableValidation(validationConfig);

const functionsForCard = {
  deleteCard,
  likeCard,
  openedImageModal
}

function addNewCard(newCard) {
  cardList.prepend(newCard);
}

function openedImageModal(link, title) {
  popupImage.src = link;
  popupImage.alt = title;
  popupTypeImageCaption.textContent = title;
  openModal(popupTypeImage, 'popup_is-opened');
}

function handleFormEdit(name, description) {
  profileTitle.textContent = name;
  profileDescription.textContent = description;
  
  closeModal(popupEditProfile, 'popup_is-opened');
}

function handleFormAvatar(link) {
  profileImage.style = `background-image: url('${link}')`
  formUpdateAvatar.reset();

  closeModal(popupUpdateAvatar, 'popup_is-opened');
}

function handleFormCard(cardInfo) {
  const newCard = createCard(cardInfo, functionsForCard);
  const cardDeleteButton = newCard.querySelector('.card__delete-button');
  cardDeleteButton.hidden = false;
  addNewCard(newCard);

  closeModal(popupAddNewCard, 'popup_is-opened');
}

function handleSubmitConfirmPopup(deletedCard) {
  popupConfim.id = false;
  deletedCard = document.getElementById(deletedCard);
  functionsForCard.deleteCard(deletedCard);
  closeModal(popupConfim, 'popup_is-opened');
}

function assignValue() {
  inputEditName.value = profileTitle.textContent;
  inputEditeDescription.value = profileDescription.textContent;
}

export function renderLoading(popup, text) {
  const popupSubmitButton = popup.querySelector('.popup__button');
  popupSubmitButton.textContent = text;
}

profileImage.addEventListener('click', () => {
  renderLoading(popupUpdateAvatar, 'Сохранить');
  openModal(popupUpdateAvatar, 'popup_is-opened');
});

profileEditButton.addEventListener('click', () => {
  assignValue();
  clearValidation(formEditProfile, validationConfig);
  renderLoading(popupEditProfile, 'Сохранить');
  openModal(popupEditProfile, 'popup_is-opened');
  }
);

profileAddButton.addEventListener('click', () => {
  formAddNewCard.reset();
  clearValidation(formAddNewCard, validationConfig);
  renderLoading(popupAddNewCard, 'Создать');
  openModal(popupAddNewCard, 'popup_is-opened');
  }
);

popupUpdateAvatar.addEventListener('click', (evt) => {
  if(evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    formUpdateAvatar.reset();
    clearValidation(formUpdateAvatar, validationConfig);
    closeModal(popupUpdateAvatar, 'popup_is-opened');
    }
  }
);

const modalList = [popupEditProfile, popupTypeImage, popupConfim, popupAddNewCard];

const closeButtons = {
  atCross: 'popup__close',
  atBackdrop: 'popup'
}

function closeModalAtButton(modal, closeButtons) {
  modal.addEventListener('click', (evt) => {
    if(evt.target.classList.contains(closeButtons.atCross) || evt.target.classList.contains(closeButtons.atBackdrop)) {
      closeModal(modal, 'popup_is-opened');
      }
    }
  );
}

modalList.forEach(modal => closeModalAtButton(modal, closeButtons));

function isLiked(likeId, button, likeClass) {
  if(likeId === userId){
    button.classList.add(likeClass);
  }
}

function activateDeleteButton(ownerId, button) {
  if(ownerId === userId){
    button.hidden = false;
   }
}

function showCards(infoForCards) {
  infoForCards.forEach(info => {
    cardList.append(createCard(info, functionsForCard));

    const likeArray = info.likes;
    const id = info._id;
    const myCard = document.getElementById(id);
    const deleteButton = myCard.querySelector('.card__delete-button');
    const cardLikeButton = myCard.querySelector('.card__like-button');

    likeArray.forEach(like => {
      isLiked(like._id, cardLikeButton, 'card__like-button_is-active');
    });

    activateDeleteButton(info.owner._id, deleteButton);
  });
 }


popupEditProfile.addEventListener('submit', evt => {
  evt.preventDefault();
  renderLoading(popupEditProfile, 'Сохранение...');
  updateProfileInfo(inputEditName.value, inputEditeDescription.value)
  .then(res => handleFormEdit(res.name, res.about))
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => renderLoading(popupEditProfile, 'Успешно'));
});

popupUpdateAvatar.addEventListener('submit', (evt) => { 
  evt.preventDefault();
  renderLoading(popupUpdateAvatar, 'Сохранение...');
  const link = inputUpdateAvatar.value;
  updateProfileAvatar(link)
  .then(res => handleFormAvatar(res.avatar))
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => renderLoading(popupUpdateAvatar, 'Успешно'));
});

popupAddNewCard.addEventListener('submit', evt => {
  evt.preventDefault();
  renderLoading(popupAddNewCard, 'Созданение...');
  postNewCard(inputCardName.value, inputCardLink.value)
  .then((res) => handleFormCard(res))
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => renderLoading(popupAddNewCard, 'Успешно'));
  });

popupConfim.addEventListener('submit', (evt) => {
  evt.preventDefault();
  deletedCardId = popupConfim.id;
  renderLoading(popupConfim, 'Удаление...');
  deleteMyCard(deletedCardId)
    .then(() => handleSubmitConfirmPopup(deletedCardId))
    .catch((err) => {
      console.log(`Ошибка: ${err}`);
    })
    .finally(() => renderLoading(popupConfim, 'Успешно'));
  }
)

Promise.all([getProfileInfo(), getInitialCards()])
.then(([pageInfo, cardsInfo]) => {
  fillProfile(pageInfo);
  showCards(cardsInfo);
})
.catch((err) => {
  console.log(`Ошибка: ${err}`);
});