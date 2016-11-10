import { msEventType, getPointerEvent } from "./utils";

interface CustomSwipeEventsList {
	touchstart: string,
	touchend: string,
	touchmove: string
}

interface CustomSwipeEventDistance {
	x: number,
	y: number
}

type CustomSwipeEventSubType = "swipestart" | "swipemove" | "swipeend";

interface CustomSwipeEventData {
	x: number,
	y: number,
	distance: CustomSwipeEventDistance,
	swipeEventSubType: CustomSwipeEventSubType
}

export namespace CustomSwipe {

	let TARGET: EventTarget = null;

	const touchEvents: CustomSwipeEventsList = {
		touchstart: msEventType('PointerDown') + ' touchstart',
		touchend: msEventType('PointerUp') + ' touchend',
		touchmove: msEventType('PointerMove') + ' touchmove'
	};

	let isTouchEvent: boolean = false;
	let currX: number;
	let currY: number;
	let cachedX: number;
	let cachedY: number;

	// We need these variables to get the final distance
	let deltaX: number;
	let deltaY: number;

	export function init(doc: HTMLDocument): boolean {

		let html: HTMLElement = doc.documentElement;

		// Return false in case there is no html element for some reason
		if (html == null) return false;

		// In case some other framework has already instantiated custom-swipe-event
		if (html.classList.contains('custom-swipe-event-enabled')) return true;

		//setting the events listeners
		// we need to debounce the callbacks because some devices multiple events are triggered at same time
		setListener(doc, touchEvents.touchstart + ' mousedown', onTouchStart);
		setListener(doc, touchEvents.touchend + ' mouseup', onTouchEnd);
		setListener(doc, touchEvents.touchmove + ' mousemove', onTouchMove);

		html.classList.add('custom-swipe-event-enabled');

		return true;
	}

	function setListener(elm: HTMLDocument, events: String, callback: EventListenerOrEventListenerObject) {
		let eventsArray: Array<string> = events.split(' ');
		let i = eventsArray.length;

		while (i--) {
			elm.addEventListener(eventsArray[i], callback, false);
		}
	}

	function onTouchStart(e: Event) {
		if (e.type !== 'mousedown') isTouchEvent = true;

		// skip this event we don't need to track it now
		if (e.type === 'mousedown' && isTouchEvent) {
			TARGET = null;
			return;
		}

		let pointer = getPointerEvent(e);

		// caching the current x
		cachedX = currX = pointer.pageX;
		// caching the current y
		cachedY = currY = pointer.pageY;

		TARGET = e.target;

		sendEvent(TARGET, 'swipestart', { x: 0, y: 0 });

	}

	function onTouchEnd(e: Event) {

		let eventName: string = null;

		// skip the mouse events if previously a touch event was dispatched
		// and reset the touch flag
		if (e.type === 'mouseup' && isTouchEvent) {
			isTouchEvent = false;
			TARGET = null;
			return;
		}

		deltaY = cachedY - currY;
		deltaX = cachedX - currX;

		sendEvent(TARGET, 'swipeend', { x: Math.abs(deltaX), y: Math.abs(deltaY) });
		TARGET = null;

	}

	function onTouchMove(e: Event) {
		// skip the mouse move events if the touch events were previously detected
		if (e.type === 'mousemove' && isTouchEvent) return;

		let pointer = getPointerEvent(e);
		currX = pointer.pageX;
		currY = pointer.pageY;

		deltaY = cachedY - currY;
		deltaX = cachedX - currX;

		if (TARGET) {
			sendEvent(TARGET, 'swipemove', { x: Math.abs(deltaX), y: Math.abs(deltaY) });
		}
	}

	function sendEvent(elm: EventTarget, type: CustomSwipeEventSubType, distance: CustomSwipeEventDistance) {

		let data: CustomSwipeEventData = {
			x: currX,
			y: currY,
			distance: distance,
			swipeEventSubType: type
		};

		let customEvent = window.document.createEvent('Event');

		// addEventListener
		if (customEvent.initEvent) {
			for (let key in data) {
				customEvent[key] = data[key];
			}
			customEvent.initEvent('swipe', true, true);
			elm.dispatchEvent(customEvent);
		}

		// detect all the inline events
		// also on the parent nodes
		/*while (elm) {
		  // inline
		  if (elm['on' + eventName]) elm['on' + eventName](customEvent);
		  elm = elm.parentNode
		}*/
	}

}
