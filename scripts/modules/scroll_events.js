// scroll_events
//import {H as headerSticky} from './headerSticky'

export const Scroll = {

	scrollTopCurrent: 0,
	buffer: false,

//	triggerAnims: function() {
//		headerSticky.stickyVisibility(Scroll.scrollTopCurrent)
//	},

	// Scroll position calculation
	updateScroll: function() {

		Scroll.scrollTopCurrent = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
		
		if (!Scroll.buffer) {
			window.requestAnimationFrame(function() {
//				Scroll.triggerAnims()
				Scroll.buffer = false
			});
		}

		Scroll.buffer = true;
	}

	// scrollTo: function(dest){
	// 	var destination = dest.getBoundingClientRect()
	// 	console.log(destination)
	// 	 window.scrollTo(0, destination.y)
	// }
		
}


