import './into.js'
import './heading.js'
import './card.js'
import './mobileCorner.js'


import {init} from "./heading.js";
import {hideOverlay} from "./into.js";


document.onreadystatechange = function () {
	if (document.readyState === 'complete') {
		hideOverlay()
		init()
	}
};