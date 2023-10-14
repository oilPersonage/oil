import anime from 'animejs'

const animItem = document.querySelector('.heading__abs')
const items = [...document.querySelectorAll('.heading__jobs span')]

const DURATION = 7000;
let activeIndex = 0;
let prevIndex = 0;
let positions = [];
let width = [];
let interval = undefined;

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function init() {

	positions = items.reduce((final, curr) => [...final, curr.clientWidth + final[final.length - 1]], [0])
	width = items.map((el) => el.clientWidth)

	animItem.style.width = items[activeIndex].clientWidth + 'px'


	clearInterval(interval)
	interval	= setInterval(() => {
		prevIndex = activeIndex;
		const next = getRandomInt(0, items.length - 1)
		activeIndex = next === prevIndex ? getRandomInt(0, items.length - 1) : next;

		anime({
			targets: animItem,
			translateY: ['-50%', '-50%'],
			translateX: [positions[prevIndex], positions[activeIndex]],
			width: [width[prevIndex], width[activeIndex]],
			easing: 'cubicBezier(.32,0,.73,1)',
			duration: 1500 * (Math.abs(prevIndex - activeIndex) * 0.7),
		})
	}, DURATION)
}


window.addEventListener('resize', function resize() {
	init()
})