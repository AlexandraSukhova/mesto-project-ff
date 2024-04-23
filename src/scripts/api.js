// Опционально, если хотите потренироваться, можете проверить, что это именно URL на изображение, и он действительный. 
//Для этого вам потребуется сделать запрос с методом HEAD по этому адресу и проверить статус ответа и mime-тип в заголовках.

// Поработайте над UX. При редактировании профиля уведомите пользователя о процессе загрузки, 
// поменяв текст кнопки на: «Сохранение...», пока данные загружаются

const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-12',
  headers: {
    authorization: 'd997cce7-ebe0-4725-9847-92653316575c',
    'Content-Type': 'application/json'
  }
}

export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'GET',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


export const deleteMyCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/` + cardId, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
    });
}


export const postNewCard = (inputNameValue, inputLinkValue) => {
  return  fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: inputNameValue,
      link: inputLinkValue
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const updateProfileInfo = (inputEditNameValue, inputEditeDescriptionValue) => {
  return  fetch(`${config.baseUrl}/users/me`, {
  method: 'PATCH',
  headers: config.headers,
  body: JSON.stringify({
    name: inputEditNameValue,
    about: inputEditeDescriptionValue
    })
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const sendLike = (cardId) => {
  return  fetch(`${config.baseUrl}/cards/likes/` + cardId, {
    method: 'PUT',
    headers: config.headers
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const deleteLike = (cardId) => {
  return  fetch(`${config.baseUrl}/cards/likes/` + cardId, {
    method: 'DELETE',
    headers: config.headers
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
  });
}

export const updateProfileAvatar = (inputUpdateAvatarValue) => {
  return  fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: inputUpdateAvatarValue
    })
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      return Promise.reject(`Ошибка: ${res.status}`);
  });
}