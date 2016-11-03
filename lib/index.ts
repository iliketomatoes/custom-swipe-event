import { bind, unbind, msEventType, getTimeStamp } from "./utils";
import { CustomSwipeEventOptions, CustomSwipeEventsList, CustomSwipeHelper } from "./core";

const defaults: CustomSwipeEventOptions = {
	swipeThreshold: 100
};

/**
* Bind the swipe event to the whole document with a IIFE
*
* @return { CustomSwipeEvent }
*/
const customSwipeModule: CustomSwipeHelper = (function(csh, win, doc) {

	const touchEvents: CustomSwipeEventsList = {
		touchstart: msEventType('PointerDown') + ' touchstart',
		touchend: msEventType('PointerUp') + ' touchend',
		touchmove: msEventType('PointerMove') + ' touchmove'
	};

	function onTouchStart() {

	}

	function onTouchEnd() {

	}

	function onTouchMove() {

	}

	function setListener(elm: HTMLElement, events: String, callback: EventListenerOrEventListenerObject) {
		let eventsArray = events.split(' ');
		let i = eventsArray.length;

		while (i--) {
			elm.addEventListener(eventsArray[i], callback, false);
		}
	}

	function sendEvent(elm: HTMLElement, eventName: String, originalEvent: Event, data: Object) {

	}

	return csh;

} (new CustomSwipeHelper(defaults), window, window.document));

export default customSwipeModule;
