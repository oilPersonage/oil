import {isInViewport} from "./utils/detectVisibleElement.js";

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
	},1000)

	const {sizes} = item;
	const {top, left, width, height} = sizes;
	const centerY = top + height / 2;
	const centerX = left + width / 2;
	item.nextProgressY = (clientY - centerY) /  w
	item.nextProgressX = (clientX - centerX) /  h
	console.log(item.nextProgressY, clientY)
}

dataItems = items.map(el => ({
	el,
	animElem: el.querySelector('.card__imgWrapper'),
	sizes: el.getBoundingClientRect(),
	isHover: false,
	progressX: 0,
	progressY: 0
}))

dataItems.forEach((item) => {
	item.el.addEventListener('mouseenter', () => item.isHover = true)
	item.el.addEventListener('mouseleave', () => item.isHover = false)
	item.el.addEventListener('mousemove', (ev) => mouseMove(ev, item))
})



function animate() {
	if (!isAnimate) {
		requestAnimationFrame(animate)
		return;
	}
	dataItems.forEach((item) => {
		if (item.isHover) {
			item.progressX += (item.nextProgressX - item.progressX) * 0.11;
			item.progressY += (item.nextProgressY - item.progressY) * 0.11;
		} else {
			item.progressX += (0 - item.progressX) * 0.11;
			item.progressY += (0 - item.progressY) * 0.11;
		}

		const rotateX = +(item.progressX * FORCE).toFixed(2)
		const rotateY = +(item.progressY * FORCE * -1).toFixed(2)

		const transform = `rotateX(${rotateY}deg) rotateY(${rotateX}deg)`
		item.animElem.style.transform = transform;
	})
	requestAnimationFrame(animate)
}

animate()

window.addEventListener('resize', function resize() {
	dataItems.forEach(item => item.sizes = item.el.getBoundingClientRect())
})







// MOBILE
if (isMobile) {
	const cardsData = cards.map(el => ({el, isAnimated: false}))
	const itemCaller = (item, callback, hideCallback) => {
		const visibleCurrent = isInViewport(item.el, true, 0.4);
		if (visibleCurrent !== item.isAnimated && visibleCurrent) {
			item.isAnimated = true;
			callback(item.el)
		} else if (item.isAnimated && !visibleCurrent) {
			if (hideCallback) hideCallback(item.el)
			item.isAnimated = false;
		}
	}

	function showCallback(el) {
		el.classList.add('show')
	}
	function hideCallback(el) {
		el.classList.remove('show')
	}

	const scrollHandler = function() {
		cardsData.forEach(card => {
			itemCaller(card, showCallback, hideCallback)
		})
	};


	if (window.addEventListener) {
		addEventListener('DOMContentLoaded', scrollHandler, false);
		addEventListener('load', scrollHandler, false);
		addEventListener('scroll', scrollHandler, false);
		addEventListener('resize', scrollHandler, false);
	} else if (window.attachEvent)  {
		attachEvent('onDOMContentLoaded', scrollHandler); // Internet Explorer 9+ :(
		attachEvent('onload', scrollHandler);
		attachEvent('onscroll', scrollHandler);
		attachEvent('onresize', scrollHandler);
	}
}
