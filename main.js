(()=>{"use strict";function e(e,t="popup_is-opened"){e.classList.toggle(t),document.addEventListener("keydown",n)}function t(e,t="popup_is-opened"){e.classList.toggle(t),document.removeEventListener("keydown",n)}function n(e){"Escape"===e.key&&t(document.querySelector(".popup_is-opened"))}function o(e){return e.ok?e.json():Promise.reject(e.status)}function r(e,t,n="Сохранение...",o="Сохранить"){t.textContent=e?n:o}function a(e,t,n="Сохранение...",o="Сохранить"){t.preventDefault();const a=t.submitter;r(!0,a,n,o),e().then((()=>t.target.reset())).catch((e=>{console.log(`Ошибка: ${e}`)})).finally((()=>r(!1,a,n,o)))}const s={baseUrl:"https://nomoreparties.co/v1/wff-cohort-12",headers:{authorization:"d997cce7-ebe0-4725-9847-92653316575c","Content-Type":"application/json"}};function c(e,t,n){return fetch(`${e.baseUrl}/`+t,n).then(o)}const i=e=>c(s,"cards/"+e,{method:"DELETE",headers:s.headers}),u=e=>c(s,"cards/likes/"+e,{method:"PUT",headers:s.headers}),l=e=>c(s,"cards/likes/"+e,{method:"DELETE",headers:s.headers});let d;const p=document.querySelector(".popup_type_confirm"),m=document.querySelector("#card-template").content;function _(e){document.getElementById(e).remove()}function v(e,t,n){e.classList.contains("card__like-button_is-active")?l(t).then((t=>{e.classList.remove("card__like-button_is-active"),n.textContent=t.likes.length})).catch((e=>{console.log(`Ошибка: ${e}`)})):e.classList.contains("card__like-button")&&u(t).then((t=>{e.classList.add("card__like-button_is-active"),n.textContent=t.likes.length})).catch((e=>{console.log(`Ошибка: ${e}`)}))}function f(e){a((function(){return i(d).then((()=>{t(p),_(d),p.removeEventListener("submit",f)}))}),e,"Удаление...","Да")}const y={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"},h=(e,t)=>Array.from(e.querySelectorAll(t)),S=(e,t)=>{const n=e.querySelector(t.submitButtonSelector),o=h(e,t.inputSelector);o.forEach((n=>{b(n,e,t)})),E(o,n,t)},b=(e,t,n)=>{const o=t.querySelector(`.${e.id}-error`);e.classList.remove(n.inputErrorClass),o.classList.remove(n.errorClass),o.textContent=""},k=(e,t)=>{e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorMessage):e.setCustomValidity(""),e.validity.valid?b(e,t,y):((e,t,n,o)=>{const r=t.querySelector(`.${e.id}-error`);e.classList.add(o.inputErrorClass),r.classList.add(o.errorClass),r.textContent=n})(e,t,e.validationMessage,y)};function E(e,t,n){!function(e){return e.some((e=>!e.validity.valid))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):(t.disabled=!0,t.classList.add(n.inactiveButtonClass))}let C;const L=document.querySelector(".places__list"),g=document.querySelector(".profile__add-button"),q=document.querySelector(".profile__edit-button"),x=document.querySelector(".popup__image"),B=document.querySelector(".popup__caption"),T=document.querySelector(".popup_type_edit"),$=document.querySelector(".popup_type_new-card"),w=document.querySelector(".popup_type_image"),A=document.forms["new-place"],P=A.elements["place-name"],M=A.elements.link,N=document.forms["edit-profile"],O=N.elements.name,j=N.elements.description,D=document.querySelector(".profile__title"),I=document.querySelector(".profile__description"),J=document.querySelector(".profile__image"),U=document.querySelector(".popup_type_update_avatar"),G=document.forms["update-avatar"],H=G.elements["avatar-link"];(e=>{h(document,e.formSelector).forEach((t=>{((e,t)=>{const n=h(e,t.inputSelector),o=e.querySelector(t.submitButtonSelector);E(n,o,t),n.forEach((r=>{r.addEventListener("input",(()=>{k(r,e),E(n,o,t)}))}))})(t,e)}))})(y);const V={deleteCard:_,likeCard:v,openedImageModal:function(t,n){x.src=t,x.alt=n,B.textContent=n,e(w)}};function z(t,n="prepend"){const o=function(t,n,o){const r=m.querySelector(".places__item").cloneNode(!0),a=r.querySelector(".card__image"),s=r.querySelector(".card__title"),c=r.querySelector(".like-number"),i=r.querySelector(".card__like-button"),u=r.querySelector(".card__delete-button"),l=i.querySelector(".like-number"),_=t.likes,y=t.owner._id;return a.src=t.link,a.alt=t.name,s.textContent=t.name,c.textContent=t.likes.length,function(e,t,n){e===n&&(t.hidden=!1)}(y,u,o),_.forEach((e=>function(e,t,n,o="card__like-button_is-active"){e===t&&n.classList.add(o)}(e._id,o,i))),i.addEventListener("click",(()=>v(i,t._id,l))),u.addEventListener("click",(()=>{d=t._id,r.id=d,e(p),p.addEventListener("submit",f)})),a.addEventListener("click",(()=>n.openedImageModal(t.link,t.name))),r}(t,V,C);L[n](o)}J.addEventListener("click",(()=>{G.reset(),S(G,y),e(U)})),q.addEventListener("click",(()=>{O.value=D.textContent,j.value=I.textContent,S(N,y),e(T)})),g.addEventListener("click",(()=>{A.reset(),S(A,y),e($)}));const F={atCross:"popup__close",atBackdrop:"popup"};Array.from(document.querySelectorAll(".popup")).forEach((e=>function(e,n){e.addEventListener("click",(o=>{(o.target.classList.contains(n.atCross)||o.target.classList.contains(n.atBackdrop))&&t(e)}))}(e,F))),$.addEventListener("submit",(e=>{!function(e){a((function(){return(e=P.value,n=M.value,c(s,"cards",{method:"POST",headers:s.headers,body:JSON.stringify({name:e,link:n})})).then((e=>(z(e),void t($))));var e,n}),e,"Созданение...","Создать")}(e)})),T.addEventListener("submit",(e=>{!function(e){a((function(){return(e=O.value,n=j.value,c(s,"users/me",{method:"PATCH",headers:s.headers,body:JSON.stringify({name:e,about:n})})).then((e=>{return n=e.name,o=e.about,D.textContent=n,I.textContent=o,void t(T);var n,o}));var e,n}),e)}(e)})),U.addEventListener("submit",(e=>{!function(e){a((function(){return(e=H.value,c(s,"users/me/avatar",{method:"PATCH",headers:s.headers,body:JSON.stringify({avatar:e})})).then((e=>{return n=e.avatar,J.style=`background-image: url('${n}')`,void t(U);var n}));var e}),e)}(e)})),Promise.all([c(s,"users/me",{method:"GET",headers:s.headers}),c(s,"cards",{method:"GET",headers:s.headers})]).then((([e,t])=>{!function(e){J.style=`background-image: url('${e.avatar}')`,D.textContent=e.name,I.textContent=e.about,C=e._id}(e),t.forEach((e=>{z(e,"append")}))})).catch((e=>{console.log(`Ошибка: ${e}`)}))})();