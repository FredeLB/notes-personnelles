

import svgSprite from './modules/svgSpriteImport'

import {
	Scroll as scrollEvent
} from './modules/scroll_events'
import animateScrollTo from './utils/animateScrollTo'


(() => {

	// DOM ready
	setTimeout(function () {
		// svgSprite()
	
		// scrollEvent.updateScroll()
	
		
	}, 50);



	// load event
	//	window.addEventListener('load', () => {
	//		defineAnchors()
	//	})
	//
	//	// resize event
	//	window.addEventListener('resize', () => {
	//		clearTimeout(resizeTimer);
	//		resizeTimer = setTimeout(() => {}, 100)
	//	})



	// scroll event

	window.addEventListener('scroll', () => {

		scrollEvent.updateScroll()
		
	}, true)


})()