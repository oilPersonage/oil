const popup = document.getElementById("popup");
const popupButton = [...document.querySelectorAll(".popup__button")];
const popupBody = document.getElementById("popupBody");
const popupClose = document.querySelectorAll('.popup__close');

let isOpenPortfolio = window.location.hash === "#portfolio";
if (isOpenPortfolio) {
    popup.classList.add("opened");
}

popupButton.forEach(el => el.addEventListener("click", (e) => {
    if (isOpenPortfolio) {
        window.location.hash = ''
        popup.classList.remove("opened");
    } else {
        window.location.hash = '#portfolio'
        popup.classList.add("opened");
    }
    isOpenPortfolio = !isOpenPortfolio;
    popup.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}))