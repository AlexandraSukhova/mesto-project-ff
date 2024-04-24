export function openModal(modal, addClass='popup_is-opened'){
  modal.classList.toggle(addClass);
  document.addEventListener('keydown', keyHandler);
}

export function closeModal(modal, classRemove = 'popup_is-opened') {
  modal.classList.toggle(classRemove);
  document.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
  if (evt.key === 'Escape'){
    const openedModal = document.querySelector('.popup_is-opened');
    closeModal(openedModal)
    };
} 
