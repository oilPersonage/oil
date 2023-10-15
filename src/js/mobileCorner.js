const bigMask = [...document.querySelectorAll('.mask')]
const smallMask = [...document.querySelectorAll('.maskSmall:not(.card__description)')]

const countCorner = 4;
const cornerMapper = {
	0: 'topLeft',
	1: 'topRight',
	2: 'bottomRight',
	3: 'bottomLeft',
}


function iOS() {
	return [
		'iPad Simulator',
		'iPhone Simulator',
		'iPod Simulator',
		'iPad',
		'iPhone',
		'iPod'
	].includes(navigator.platform)
}

if (iOS()) {
	const markup = (className) => `
	<div class="card__corner card__corner_${className}">
		<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48" fill="none">
			<path fill-rule="evenodd" clip-rule="evenodd"
				d="M7.02945 7.02943C0 14.0589 0 25.3726 0 48V0H48C25.3726 0 14.0589 0 7.02945 7.02943Z"
				fill="#D9D9D9"/>
		</svg>
	</div>
`;

	function createCorners(el) {
		Array.from({length: countCorner}).forEach((_, index) => {
			const child = markup(cornerMapper[index])
			el.insertAdjacentHTML('beforeend', child);
		})
	}

	bigMask.forEach(el => createCorners(el))
	smallMask.forEach(el => createCorners(el))
}