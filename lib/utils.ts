export function bind(obj: HTMLElement, type: string, fn: EventListenerOrEventListenerObject) {
	obj.addEventListener(type, fn, false);
}

export function unbind(obj: HTMLElement, type: string, fn: EventListenerOrEventListenerObject) {
	obj.removeEventListener(type, fn, false);
}

export function setListener(elm: HTMLDocument, events: String, callback: EventListenerOrEventListenerObject) {
	let eventsArray: Array<string> = events.split(' ');
	let i = eventsArray.length;

	while (i--) {
		elm.addEventListener(eventsArray[i], callback, false);
	}
}

export function msEventType(type: string): string {
	let lo = type.toLowerCase();
	let ms = 'MS' + type;
	return window.navigator.msPointerEnabled ? ms : lo;
}

export function getTimeStamp(): number {
	return new Date().getTime();
}

export function getPointerEvent(event: any): MouseEvent {
	return event.targetTouches ? event.targetTouches[0] : event;
}
