import {isInViewport} from "./utils/detectVisibleElement.js";
import {getTouchDirection} from "./utils/getTouchDirection.js";

const items = [...document.querySelectorAll('.card__content')];
const cards = [...document.querySelectorAll('.card')];

const isMobile = window.matchMedia('(max-width: 600px)').matches

const FORCE = 25;
const MAX_CALL_FOR_DETECT = 5;
const touch = {
	x: 0,
	y: 0
}
let dataItems = [];
let isAnimate = false;
let timeout = false;
let countCheckDetection = 0;
let dirX = false;
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

function touchStart({touches}, item) {
	const event = touches[0];
	touch.x = event.clientX;
	touch.y = event.clientY;
	item.sizes = item.el.getBoundingClientRect()
}

dataItems.forEach((item) => {
	if (isMobile) {
		item.el.addEventListener('touchmove', (ev) => touchMove(ev, item), {passive: false})
		item.el.addEventListener('touchstart', (ev) => touchStart(ev, item))
		item.el.addEventListener('touchend', () => {
			item.isHover = false;
			countCheckDetection = 0;
			dirX = false;
		})
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


// MOBILE

// TOUCH

function touchMove(ev, item) {
	const {touches} = ev;
	const event = touches[0];
	countCheckDetection += 1;

	if (countCheckDetection < MAX_CALL_FOR_DETECT) {
		const {x: isX} = getTouchDirection(event.clientX - touch.x, event.clientY - touch.y)
		dirX = isX;
	}

	if (dirX) {
		item.isHover = true
		ev.preventDefault();
		ev.stopImmediatePropagation();
		mouseMove(event, item)
	}
	//
	// touchStart.prevX = event.clientX / width;
}

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

	const scrollHandler = function () {
		cardsData.forEach(card => {
			itemCaller(card, showCallback, hideCallback)
		})
	};


	if (window.addEventListener) {
		addEventListener('DOMContentLoaded', scrollHandler, false);
		addEventListener('load', scrollHandler, false);
		addEventListener('scroll', scrollHandler, false);
		addEventListener('resize', scrollHandler, false);
	} else if (window.attachEvent) {
		attachEvent('onDOMContentLoaded', scrollHandler); // Internet Explorer 9+ :(
		attachEvent('onload', scrollHandler);
		attachEvent('onscroll', scrollHandler);
		attachEvent('onresize', scrollHandler);
	}
}
