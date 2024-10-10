const items = [...document.querySelectorAll('.card__content')];
const cards = [...document.querySelectorAll('.card')];

const isMobile = window.matchMedia('(max-width: 600px)').matches

const FORCE = 25;
let dataItems = [];
let isAnimate = false;
let timeout = false;
const w = document.body.clientWidth;
const h = document.body.clientHeight;

function mouseMove({clientX, clientY}, item) {
    isAnimate = true;
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        isAnimate = false;
        clearTimeout(timeout)
    }, 1000)

    const {sizes} = item;
    const {top, left, width, height} = sizes;

    const centerY = top + height / 2;
    const centerX = left + width / 2;
    item.nextProgressY = (clientY - centerY) / w
    item.nextProgressX = (clientX - centerX) / h
}

function calculateInitData() {
    dataItems = items.map(el => ({
        el,
        animElem: el.querySelector('.card__imgWrapper'),
        sizes: el.getBoundingClientRect(),
        isHover: false,
        progressX: 0,
        progressY: 0,
        nextProgressY: 0,
        nextProgressX: 0,
    }))
}

calculateInitData()

cards.forEach(el => el.addEventListener("click", () => {

}))

dataItems.forEach((item) => {
    item.el.addEventListener('click', () => {
        const link = item.el.getAttribute("data-href");
        window.open(link, '_blank')
    })
    if (isMobile) {
        return undefined;
    } else {
        item.el.addEventListener('mouseenter', () => item.isHover = true)
        item.el.addEventListener('mouseleave', () => item.isHover = false)
        item.el.addEventListener('mousemove', (ev) => mouseMove(ev, item))
    }
})

function animate() {
    dataItems.forEach((item) => {
        if (item.isHover) {
            item.progressX += (item.nextProgressX - item.progressX) * 0.11;
            item.progressY += (item.nextProgressY - item.progressY) * 0.11;
        } else {
            item.progressX += (0 - item.progressX) * 0.11 || 0;
            item.progressY += (0 - item.progressY) * 0.11 || 0;
        }

        const forceX = isMobile ? FORCE * 6 : FORCE
        const forceY = isMobile ? FORCE * 0.8 : FORCE

        const rotateX = +(item.progressX * forceX).toFixed(2)
        const rotateY = +(item.progressY * forceY * -1).toFixed(2)

        item.animElem.style.transform = `rotateX(${rotateY}deg) rotateY(${rotateX}deg)`;
    })
    requestAnimationFrame(animate)
}

animate()

window.addEventListener('resize', function resize() {
    dataItems.forEach(item => item.sizes = item.el.getBoundingClientRect())
})
