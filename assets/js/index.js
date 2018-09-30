(function () {
'use strict';

/**
 * @author Vincent Paquette <vpaquette@spektrummedia.com>
 */

// scroll_events
//import {H as headerSticky} from './headerSticky'

var Scroll = {

	scrollTopCurrent: 0,
	buffer: false,

	//	triggerAnims: function() {
	//		headerSticky.stickyVisibility(Scroll.scrollTopCurrent)
	//	},

	// Scroll position calculation
	updateScroll: function updateScroll() {

		Scroll.scrollTopCurrent = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;

		if (!Scroll.buffer) {
			window.requestAnimationFrame(function () {
				//				Scroll.triggerAnims()
				Scroll.buffer = false;
			});
		}

		Scroll.buffer = true;
	}

	// scrollTo: function(dest){
	// 	var destination = dest.getBoundingClientRect()
	// 	console.log(destination)
	// 	 window.scrollTo(0, destination.y)
	// }

};

//===================================================================
// Get Top and Left position relative to the document
// Includes margins, padding, borders
// Cross-browser, IE10+
//===================================================================

(function () {

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

	window.addEventListener('scroll', function () {

		Scroll.updateScroll();
	}, true);
})();

}());
