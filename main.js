(()=>{"use strict";var e={d:(t,o)=>{for(var n in o)e.o(o,n)&&!e.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:o[n]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t){e.classList.toggle(t),document.addEventListener("keydown",n)}function o(e,t){e.classList.toggle(t),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"),"popup_is-opened")}e.d({},{b:()=>N});const r={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"d997cce7-ebe0-4725-9847-92653316575c","Content-Type":"application/json"}},s=e=>fetch(`${r.baseUrl}/cards/likes/`+e,{method:"PUT",headers:r.headers}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`))),a=e=>fetch(`${r.baseUrl}/cards/likes/`+e,{method:"DELETE",headers:r.headers}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`))),c=document.querySelector(".popup_type_confirm"),i=document.querySelector("#card-template").content;function l(e,o){const n=i.querySelector(".places__item").cloneNode(!0),r=n.querySelector(".card__image"),s=n.querySelector(".card__title"),a=n.querySelector(".like-number"),l=n.querySelector(".card__like-button"),u=n.querySelector(".card__delete-button");return r.src=e.link,r.alt=e.name,s.textContent=e.name,n.id=e._id,a.textContent=e.likes.length,l.addEventListener("click",(()=>d(l,e._id))),u.addEventListener("click",(()=>{N(c,"Да"),t(c,"popup_is-opened"),c.id=n.id})),r.addEventListener("click",(()=>o.openedImageModal(e.link,e.name))),n}function d(e,t){const o=e.querySelector(".like-number");e.classList.contains("card__like-button_is-active")?a(t).then((t=>{e.classList.remove("card__like-button_is-active"),o.textContent=t.likes.length})):e.classList.contains("card__like-button")&&s(t).then((t=>{e.classList.add("card__like-button_is-active"),o.textContent=t.likes.length}))}const u={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},p=(e,t)=>Array.from(e.querySelectorAll(t)),_=(e,t)=>{const o=e.querySelector(t.submitButtonSelector),n=p(e,t.inputSelector);n.forEach((t=>{m(t,e)})),h(n,o)},m=(e,t)=>{const o=t.querySelector(`.${e.id}-error`);e.classList.remove(u.inputErrorClass),o.classList.remove(u.errorClass),o.textContent=""};function h(e,t){!function(e){return e.some((e=>!e.validity.valid))}(e)?(t.disabled=!1,t.classList.remove(u.inactiveButtonClass)):(t.disabled=!0,t.classList.add(u.inactiveButtonClass))}const y=e=>{const t=p(e,u.inputSelector),o=e.querySelector(u.submitButtonSelector);h(t,o),t.forEach((n=>{n.addEventListener("input",(()=>{((e,t)=>{e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?m(e,t):((e,t,o)=>{const n=t.querySelector(`.${e.id}-error`);e.classList.add(u.inputErrorClass),n.classList.add(u.errorClass),n.textContent=o})(e,t,e.validationMessage)})(n,e),h(t,o)}))}))},v="fd28bb529e4433b2cbfa9207";let f;const b=document.querySelector(".places__list"),k=document.querySelector(".profile__add-button"),S=document.querySelector(".profile__edit-button"),g=document.querySelector(".popup__image"),E=document.querySelector(".popup__caption"),L=document.querySelector(".popup_type_edit"),C=document.querySelector(".popup_type_new-card"),q=document.querySelector(".popup_type_image"),$=document.forms["new-place"],j=$.elements["place-name"],P=$.elements.link,x=document.forms["edit-profile"],B=x.elements.name,U=x.elements.description,T=document.querySelector(".profile__title"),w=document.querySelector(".profile__description"),O=document.querySelector(".profile__image"),D=document.querySelector(".popup_type_update_avatar"),M=document.forms["update-avatar"],A=M.elements["avatar-link"];document.querySelector(".popup__button"),(e=>{p(document,e.formSelector).forEach((e=>{y(e)}))})(u);const I={deleteCard:function(e){e.remove()},likeCard:d,openedImageModal:function(e,o){g.src=e,g.alt=o,E.textContent=o,t(q,"popup_is-opened")}};function N(e,t){e.querySelector(".popup__button").textContent=t}O.addEventListener("click",(()=>{N(D,"Сохранить"),t(D,"popup_is-opened")})),S.addEventListener("click",(()=>{B.value=T.textContent,U.value=w.textContent,_(x,u),N(L,"Сохранить"),t(L,"popup_is-opened")})),k.addEventListener("click",(()=>{$.reset(),_($,u),N(C,"Создать"),t(C,"popup_is-opened")})),D.addEventListener("click",(e=>{(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&(M.reset(),_(M,u),o(D,"popup_is-opened"))}));const J={atCross:"popup__close",atBackdrop:"popup"};[L,q,c,C].forEach((e=>function(e,t){e.addEventListener("click",(n=>{(n.target.classList.contains(t.atCross)||n.target.classList.contains(t.atBackdrop))&&o(e,"popup_is-opened")}))}(e,J))),L.addEventListener("submit",(e=>{var t,n;e.preventDefault(),N(L,"Сохранение..."),(t=B.value,n=U.value,fetch(`${r.baseUrl}/users/me`,{method:"PATCH",headers:r.headers,body:JSON.stringify({name:t,about:n})}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))).then((e=>{return t=e.name,n=e.about,T.textContent=t,w.textContent=n,void o(L,"popup_is-opened");var t,n})).catch((e=>{console.log(`Ошибка: ${e}`)})).finally((()=>N(L,"Успешно")))})),D.addEventListener("submit",(e=>{e.preventDefault(),N(D,"Сохранение...");var t;(t=A.value,fetch(`${r.baseUrl}/users/me/avatar`,{method:"PATCH",headers:r.headers,body:JSON.stringify({avatar:t})}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))).then((e=>function(e){O.style=`background-image: url('${e}')`,M.reset(),o(D,"popup_is-opened")}(e.avatar))).catch((e=>{console.log(`Ошибка: ${e}`)})).finally((()=>N(D,"Успешно")))})),C.addEventListener("submit",(e=>{var t,n;e.preventDefault(),N(C,"Созданение..."),(t=j.value,n=P.value,fetch(`${r.baseUrl}/cards`,{method:"POST",headers:r.headers,body:JSON.stringify({name:t,link:n})}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))).then((e=>function(e){const t=l(e,I);t.querySelector(".card__delete-button").hidden=!1,function(e){b.prepend(e)}(t),o(C,"popup_is-opened")}(e))).catch((e=>{console.log(`Ошибка: ${e}`)})).finally((()=>N(C,"Успешно")))})),c.addEventListener("submit",(e=>{var t;e.preventDefault(),f=c.id,N(c,"Удаление..."),(t=f,fetch(`${r.baseUrl}/cards/`+t,{method:"DELETE",headers:r.headers}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))).then((()=>{return e=f,c.id=!1,e=document.getElementById(e),I.deleteCard(e),void o(c,"popup_is-opened");var e})).catch((e=>{console.log(`Ошибка: ${e}`)})).finally((()=>N(c,"Успешно")))})),Promise.all([fetch(`${r.baseUrl}/users/me`,{method:"GET",headers:r.headers}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`))),fetch(`${r.baseUrl}/cards`,{headers:r.headers}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))]).then((([e,t])=>{!function(e){O.style=`background-image: url('${e.avatar}')`,T.textContent=e.name,w.textContent=e.about}(e),t.forEach((e=>{b.append(l(e,I));const t=e.likes,o=e._id,n=document.getElementById(o),r=n.querySelector(".card__delete-button"),s=n.querySelector(".card__like-button");t.forEach((e=>{e._id===v&&s.classList.add("card__like-button_is-active")})),e.owner._id===v&&(r.hidden=!1)}))})).catch((e=>{console.log(`Ошибка: ${e}`)}))})();