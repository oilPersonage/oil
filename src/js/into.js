import {animateItem} from "./utils/animateItem";

const overlay = document.querySelector('.overlay')
const cards = [...document.querySelectorAll('.card')]
const headerLogo = document.querySelector('.logotype')
const overlayLogo = document.querySelector('.overlay__logotype')
const heading = document.querySelector('.heading__jobs')
const title = document.querySelector('.heading h1')
const social = document.querySelector('.social')

const DEF_TIMEOUT = 300;

export function hideOverlay() {
    overlay.classList.toggle('hideAnimation')
    animateItem(overlayLogo, 'hide', 0)

    setTimeout(() => {
        overlay.classList.toggle('hide')
    }, DEF_TIMEOUT)

    animateItem(headerLogo, 'show', DEF_TIMEOUT + 200)
    animateItem(social, 'show', DEF_TIMEOUT + 200)
    animateItem(heading, 'show', DEF_TIMEOUT + 1400)
    animateItem(title, 'show', DEF_TIMEOUT + 600)

    cards.forEach((el, index) => animateItem(el, 'introShow', DEF_TIMEOUT + 600 + index * 200))
}