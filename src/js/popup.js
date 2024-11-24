import anime from "animejs";

const popup = document.getElementById("popup");
const popupScrollbar = document.querySelector(".popup__scrollbar");
const popupButton = [...document.querySelectorAll(".popup__button")];
const popupBody = document.querySelector(".popup__content");
const popupClose = document.querySelectorAll('.popup__close');

let isAnimate = false;
let touchY = 0;
let isOpenPortfolio = window.location.hash === "#portfolio";
const SHOW_POPUP_TOP = 240;
const HIDE_POPUP_TOP = window.innerHeight;

function showPopup() {
    if (isAnimate) return;
    isAnimate = true;
    popup.style.zIndex = '1';
    popupScrollbar.classList.add('show')
    popup.classList.add("opened");
    window.location.hash = '#portfolio'
    anime({
        targets: popupBody,
        translateY: [HIDE_POPUP_TOP, SHOW_POPUP_TOP],
        duration: 1000,
        easing: 'easeOutQuint',
        complete() {
            isAnimate = false;
        }
    })
    isOpenPortfolio = true;
}

function hidePopup() {
    if (isAnimate) return;
    isAnimate = true;
    popupScrollbar.classList.remove('show')
    popup.classList.remove("opened");
    history.pushState({}, "", "#")
    anime({
        targets: popupBody,
        translateY: [SHOW_POPUP_TOP, HIDE_POPUP_TOP],
        duration: 1000,
        easing: 'easeOutQuint',
        complete() {
            isAnimate = false;
            popup.style.zIndex = '-1';
            console.log(123)
            isOpenPortfolio = false;
        }
    })
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
        popup.scrollTo({top: 0, behavior: 'smooth'});
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

// document.addEventListener('scroll', function (e) {
//     const target = document.body.scrollTop || document.documentElement.scrollTop
//     const progress = document.body.scrollHeight - (target + window.innerHeight)
//     console.log(progress)
//     if (progress === 0 && !isAnimate && !isOpenPortfolio) {
//         showPopup()
//     }
// })
window.addEventListener('touchstart', (e) => {
    touchY = e.touches[0].clientY;
})
window.addEventListener('touchcancel', (e) => {
    touchY = 0;
})
window.addEventListener('touchend', (e) => {
    touchY = 0;
})
window.addEventListener('touchmove', (e) => {
    if (e.touches[0].clientY + 70 < touchY && !isAnimate && !isOpenPortfolio) {
        showPopup()
    }
})