import { event } from 'jquery';
import '../pages/index.css';
import { initialCards } from './cards.js'
// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardInfo, deleteCard, likeCard, openedImageModal) {
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

function createImageModal(evt) {
  const popupCardLink = evt.target.src;
  const popupCardAlt = evt.target.src;

  document.querySelector('.popup__image').src = popupCardLink;
  document.querySelector('.popup__image').alt = popupCardAlt;
  document.querySelector('.popup__caption').textContent = evt.target.closest('.places__item').textContent;
}

function openedImageModal(evt) {
  document.querySelector('.popup_type_image').classList.toggle('popup_is-opened');
  createImageModal(evt);
  document.addEventListener('keydown', keyHandler);
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
  const eventTarget = evt.target;
  eventTarget.closest('.places__item').remove();
}

function likeCard(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_is-active');
}

// @todo: Вывести карточки на страницу
function showCards() {
 initialCards.forEach(cardInfo =>
  cardList.append(createCard(cardInfo, deleteCard, likeCard, openedImageModal))
  );
}

showCards();

const form = document.forms; //все формы в документе

const popupEditProfile = document.querySelector('.popup_type_edit')
//Форма для изменения профиля
//const formEditProfile = form['edit-profile']; //форма изменения профиля
//const inputEditName = formEditProfile.elements['name'];
//const inputEditeDescription = formEditProfile.elements['description'];

const popupAddNewCard = document.querySelector('.popup_type_new-card')
//Форма для новой карточки
//const formAddNewCard = form['new-place']; //форма добавления новой карточки
//const inputCardName = formAddNewCard['place-name'];
//const inputCardLink = formAddNewCard['link'];

//'input' — срабатывает при вводе или удалении каждого символа;
//'change' — только когда поле изменилось и пользователь перешёл к другому элементу формы. Пригодится, когда пользователь пропустил поле и ничего не заполнил.

const cardImage = document.querySelector('.card__image'); //открытые на странице карточки при клике должен открыться попап
const popupImage = document.querySelector('.popup_type_image') // попап с картинкой, при нажатии на карточку должна передаваться ссылка, альт и описание

const popup = document.querySelector('.popup')// для всех попапов одинаковый класс ? использовать при закрытии крестиком 'closest' или evt.target.classList.contains
const popupCloseButton = popup.querySelector('.popup__close')//для всех попапов одинаковый класс

console.log(document.querySelectorAll('.popup'));
const allPopups = document.querySelectorAll('.popup');
allPopups.forEach(item => item.classList.toggle('popup_is-animated'));

function openModal(modal, addClass){
  modal.classList.toggle(addClass);
  document.addEventListener('keydown', keyHandler);
}

  document.querySelector('.profile__add-button').addEventListener('click', () => openModal(popupAddNewCard, 'popup_is-opened'));
  document.querySelector('.profile__edit-button').addEventListener('click', () => openModal(popupEditProfile, 'popup_is-opened'));

//вывод последнего элемента массива

function createNewCard(name, link) {
  const cardInfo = {};
  cardInfo.name = name;
  cardInfo.link = link;
  initialCards.push(cardInfo);
  
  const newCard = createCard(initialCards[initialCards.length-1], deleteCard, likeCard);
  return newCard;
}

//form add card

// Находим форму в DOM
const formAddNewCard = form['new-place'];// Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const inputCardName = formAddNewCard.elements['place-name'];
const inputCardLink = formAddNewCard.elements['link'];

function addNewCard(newCard) {
  cardList.prepend(newCard);
  }

function handleFormCard(evt) {
  evt.preventDefault();

  const name = inputCardName.value;
  const link = inputCardLink.value;

  addNewCard(createNewCard(name, link));

  evt.target.reset();
}

popupAddNewCard.addEventListener('submit', evt => {
  handleFormCard(evt);
});

// Находим форму в DOM
const formEditProfile = form['edit-profile']; //форма изменения профиля
const inputEditName = formEditProfile.elements['name'];
const inputEditeDescription = formEditProfile.elements['description'];
inputEditName.placeholder = document.querySelector('.profile__title').textContent;
inputEditeDescription.placeholder = document.querySelector('.profile__description').textContent;

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormEdit(evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                                // Так мы можем определить свою логику отправки.
                                                // О том, как это делать, расскажем позже.

    // Получите значение полей jobInput и nameInput из свойства value
  const name = inputEditName.value;
  const description = inputEditeDescription.value;
    // Выберите элементы, куда должны быть вставлены значения полей
  const profileTitle = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
  profileTitle.textContent = name;
  profileDescription.textContent = description;
  inputEditName.placeholder = profileTitle.textContent;
  inputEditeDescription.placeholder = profileDescription.textContent;
    evt.target.reset();
}


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupEditProfile.addEventListener('submit', evt => {
  handleFormEdit(evt)})

document.addEventListener('click', (evt) => {
  if(inputEditName.value.length > 0 && inputEditeDescription.value.length || inputCardName.value.length > 0 && (!inputCardName.value))
  {closeModal(evt, 'popup__button')}});

document.addEventListener('click', (evt) => closeModal(evt, 'popup__close'));
document.addEventListener('click', (evt) => closeModal(evt, 'popup'));

function closeModal(evt, button) {
  if (evt.target.classList.contains(button)) {
    document.querySelector('.popup_is-opened').classList.toggle('popup_is-opened');
    formAddNewCard.reset() || formEditProfile.reset();
    document.removeEventListener('keydown', keyHandler);
  }
}

function keyHandler(evt) {
  if (evt.key === 'Escape'){
    document.querySelector('.popup_is-opened').classList.toggle('popup_is-opened');
    document.removeEventListener('keydown', keyHandler);
}
}
