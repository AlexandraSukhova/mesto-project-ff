export function openModal(modal, addClass){
  modal.classList.toggle(addClass);
  document.addEventListener('keydown', keyHandler);
}

export function closeModal(modal, classRemove) {
  modal.classList.toggle(classRemove);
  document.removeEventListener('keydown', keyHandler);
}

function keyHandler(evt) {
  if (evt.key === 'Escape'){
    closeModal(document.querySelector('.popup_is-opened'), 'popup_is-opened')
    };
} 

