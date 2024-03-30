export function openModal(modal, addClass){
  modal.classList.toggle(addClass);
  document.addEventListener('keydown', keyHandler);
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

