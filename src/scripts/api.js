// Опционально, если хотите потренироваться, можете проверить, что это именно URL на изображение, и он действительный. 
//Для этого вам потребуется сделать запрос с методом HEAD по этому адресу и проверить статус ответа и mime-тип в заголовках.

// Поработайте над UX. При редактировании профиля уведомите пользователя о процессе загрузки, 
// поменяв текст кнопки на: «Сохранение...», пока данные загружаются
import {checkResponse} from './utils/utils.js'

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
  headers: {
    authorization: 'd997cce7-ebe0-4725-9847-92653316575c',
    'Content-Type': 'application/json'
  }
}

function requestToAPI(config, endpoint, options) {
  return fetch(`${config.baseUrl}/` + endpoint, options)
  .then(checkResponse)
}

export const getProfileInfo = () => {
  return requestToAPI(config, 'users/me', {
    method: 'GET',
    headers: config.headers
  });
}

export const getInitialCards = () => {
 return requestToAPI(config, 'cards', {
    method: 'GET',
    headers: config.headers
  });
}

export const deleteMyCard = (cardId) => {
  return requestToAPI(config, 'cards/' + cardId, {
    method: 'DELETE',
    headers: config.headers
  });
}

export const postNewCard = (inputCardNameValue, inputCardLinkValue) => {
  return requestToAPI(config, 'cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
          name: inputCardNameValue,
          link: inputCardLinkValue
        })
  });
}

export const updateProfileInfo = (inputEditNameValue, inputEditeDescriptionValue) => {
  return requestToAPI(config, 'users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
          name: inputEditNameValue,
          about: inputEditeDescriptionValue
        })
  });
}

export const sendLike = (cardId) => {
  return requestToAPI(config, 'cards/likes/' + cardId, {
    method: 'PUT',
    headers: config.headers
  })
}

export const deleteLike = (cardId) => {
  return requestToAPI(config, 'cards/likes/' + cardId, {
    method: 'DELETE',
    headers: config.headers
  })
}

export const updateProfileAvatar = (inputUpdateAvatarValue) => {
  return requestToAPI(config, 'users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: inputUpdateAvatarValue
    })
  })
}