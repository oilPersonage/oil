import anime from "animejs";

const popup = document.getElementById("popup");
const popupScrollbar = document.querySelector(".popup__scrollbar");
const popupButton = [...document.querySelectorAll(".popup__button")];
const popupBody = document.querySelector(".popup__content");
const popupClose = document.querySelectorAll('.popup__close');

let isOpenPortfolio = window.location.hash === "#portfolio";
const SHOW_POPUP_TOP = 240;
const HIDE_POPUP_TOP = window.innerHeight;

function showPopup() {
    popup.style.zIndex = 1;
    popupScrollbar.classList.add('show')
    popup.classList.add("opened");
    window.location.hash = '#portfolio'
    anime({
        targets: popupBody,
        translateY: [HIDE_POPUP_TOP, SHOW_POPUP_TOP],
        duration: 1000,
        easing: 'easeInOutQuint'
        // easing: 'cubic-bezier(.32,0,.73,1)',
    })
    isOpenPortfolio = !isOpenPortfolio;
}

function hidePopup() {
    window.location.hash = ''
    popupScrollbar.classList.remove('show')
    popup.classList.remove("opened");
    popup.scrollTo({
        top: 0, behavior: 'smooth'
    });

    anime({
        targets: popupBody,
        translateY: [SHOW_POPUP_TOP, HIDE_POPUP_TOP],
        duration: 1000,
        easing: 'easeInOutQuint',
        complete() {
            popup.style.zIndex = '-1';
        }
    })
    isOpenPortfolio = !isOpenPortfolio;
}

if (isOpenPortfolio) {
    showPopup()
} else {
    popup.style.zIndex = '-1';
}
popup.addEventListener("click", (e) => {
    if (e.target !== popup) return;
    hidePopup()
});
popupButton.forEach(el => el.addEventListener("click", (e) => {
    if (isOpenPortfolio) {
        hidePopup()
    } else {
        showPopup()
    }
}))


const sH = window.innerHeight;
popup.addEventListener('scroll', (e) => {
    const progress = popup.scrollTop / (popup.scrollHeight - sH)
    popupScrollbar.style.transform = `translateY(${progress * (sH - 120)}px)`;
    if (popup.scrollTop === 0) {
        hidePopup();
    }
})