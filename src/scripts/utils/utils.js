export function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res.status);
}

export function renderLoading(isLoading, button, loadingText='Сохранение...', buttonText='Сохранить') {
  if(isLoading) {
    button.textContent = loadingText;
  } else {
    button.textContent = buttonText;
  }
}

export function handleSubmit(request, evt, loadingText='Сохранение...', initialText = 'Сохранить') {
  evt.preventDefault();
  const submitButton = evt.submitter;
  renderLoading(true, submitButton, loadingText, initialText);
  request()
  .then(() => evt.target.reset())
  .catch((err) => {
    console.log(`Ошибка: ${err}`);
  })
  .finally(() => renderLoading(false, submitButton, loadingText, initialText));
}