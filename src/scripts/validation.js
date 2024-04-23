//formInput //все инпуты всех форм form.selectt слушатель 'input' validity.valid
//`${.formInput.id}-error` // спан для вывода текста ошибки
// validationMessage - стандартное браузерное сообщение об ошибке

// включение валидации вызовом enableValidation
// все настройки передаются при вызове

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const makeArray = (parent, element) => {
  return Array.from(parent.querySelectorAll(element));
}

export const clearValidation = (formElement, validationConfig) => {
  const formButton = formElement.querySelector(validationConfig.submitButtonSelector);
  const formInput = makeArray(formElement, validationConfig.inputSelector);
  formInput.forEach((input) => {
    hideInputError(input, formElement);
  });
  toggleButtonState(formInput, formButton);
}

const showInputError = (formInput, formElement, errorMessage) => {
  const errorText = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.add(validationConfig.inputErrorClass);
  errorText.classList.add(validationConfig.errorClass);
  errorText.textContent = errorMessage;
} //показывает валидность

const hideInputError = (formInput, formElement) => {
  const errorText = formElement.querySelector(`.${formInput.id}-error`);

  formInput.classList.remove(validationConfig.inputErrorClass);
  errorText.classList.remove(validationConfig.errorClass);
  errorText.textContent = '';
} //скрывает

const isValid = (formInput, formElement) => {
  if(formInput.validity.patternMismatch) { //patternMismatch = true - поле НЕ прошло проверку
    formInput.setCustomValidity(formInput.dataset.errorMessage);
  }
  else {
    formInput.setCustomValidity('');
  }

  if(!formInput.validity.valid) {
    showInputError(formInput, formElement, formInput.validationMessage);
  }
  else {
    hideInputError(formInput, formElement);
  }
} // проверяет на валидность

function hasInvalidInput(inputList) {
  // проходим по этому массиву методом some
  return inputList.some((formInput) => !formInput.validity.valid)
};

function toggleButtonState(inputList, formButton) {
  if(hasInvalidInput(inputList)) {
    formButton.disabled = true;
    formButton.classList.add(validationConfig.inactiveButtonClass);
  }
  else {
    formButton.disabled = false;
    formButton.classList.remove(validationConfig.inactiveButtonClass);
  }
}

const setEventListeners = (formElement) => {
  const inputList = makeArray(formElement, validationConfig.inputSelector);
  const formButton = formElement.querySelector(validationConfig.submitButtonSelector);
  
  toggleButtonState(inputList, formButton);

  inputList.forEach((input) => {
    input.addEventListener('input', () => { 
      isValid(input, formElement);
      toggleButtonState(inputList, formButton);
    });
  })
}


export const enableValidation = (validationConfig) => {
  const formList = makeArray(document, validationConfig.formSelector);

  formList.forEach((form) => {
    setEventListeners(form);
  })
}