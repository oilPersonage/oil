export function isInViewport(element, partiallyVisible = false, percent = 0.3) {
	const { top, left, bottom, right, height } = element.getBoundingClientRect();
	const { innerHeight, innerWidth } = window;
	const percentH = (height * percent);

	return partiallyVisible
		? ((top  > 0 && top + percentH < innerHeight) ||
				(bottom - percentH > 0 && bottom < innerHeight)) &&
		((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
		: top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
}