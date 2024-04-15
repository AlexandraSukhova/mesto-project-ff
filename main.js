(()=>{"use strict";const e=document.querySelector("#card-template").content;function t(t,n){const o=e.querySelector(".places__item").cloneNode(!0),p=o.querySelector(".card__image"),c=o.querySelector(".card__title");p.src=t.link,p.alt=t.name,c.textContent=t.name,o.querySelector(".card__delete-button").addEventListener("click",(()=>n.deleteCard(o)));const s=o.querySelector(".card__like-button");return s.addEventListener("click",(()=>n.likeCard(s))),p.addEventListener("click",(()=>n.openedImageModal(t.link,t.name))),o}function n(e,t){e.classList.toggle(t),document.addEventListener("keydown",p)}function o(e,t){e.classList.toggle(t),document.removeEventListener("keydown",p)}function p(e){"Escape"===e.key&&o(document.querySelector(".popup_is-opened"),"popup_is-opened")}const c=document.querySelector(".places__list"),s=document.querySelector(".profile__add-button"),r=document.querySelector(".profile__edit-button"),a=document.querySelector(".popup__image"),d=document.querySelector(".popup__caption"),i=document.querySelector(".popup_type_edit"),l=document.querySelector(".popup_type_new-card"),u=document.querySelector(".popup_type_image"),m=document.querySelectorAll(".popup"),_=document.forms["new-place"],y=_.elements["place-name"],k=_.elements.link,v=document.forms["edit-profile"],f=v.elements.name,g=v.elements.description,L=document.querySelector(".profile__title"),q=document.querySelector(".profile__description"),S={deleteCard:function(e){e.remove()},likeCard:function(e){e.classList.toggle("card__like-button_is-active")},openedImageModal:function(e,t){a.src=e,a.alt=t,d.textContent=t,n(u,"popup_is-opened")}};[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((e=>c.append(t(e,S)))),m.forEach((e=>e.classList.toggle("popup_is-animated"))),r.addEventListener("click",(()=>{n(i,"popup_is-opened"),f.value=L.textContent,g.value=q.textContent})),s.addEventListener("click",(()=>{_.reset(),n(l,"popup_is-opened")})),l.addEventListener("submit",(e=>function(e){var n;e.preventDefault(),n=function(e,n){const o={};return o.name=e,o.link=n,t(o,S)}(y.value,k.value),c.prepend(n),_.reset(),o(l,"popup_is-opened")}(e))),i.addEventListener("submit",(e=>function(e){e.preventDefault();const t=f.value,n=g.value;L.textContent=t,q.textContent=n,o(i,"popup_is-opened")}(e))),l.addEventListener("click",(e=>{(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&o(l,"popup_is-opened")})),i.addEventListener("click",(e=>{(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&o(i,"popup_is-opened")})),u.addEventListener("click",(e=>{(e.target.classList.contains("popup__close")||e.target.classList.contains("popup"))&&o(u,"popup_is-opened")}))})();