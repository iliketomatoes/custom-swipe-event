export function bind(obj: HTMLElement, type: string, fn: EventListenerOrEventListenerObject) {
	obj.addEventListener(type, fn, false);
}

export function unbind(obj: HTMLElement, type: string, fn: EventListenerOrEventListenerObject) {
	obj.removeEventListener(type, fn, false);
}

export function msEventType(type: string): string {
	let lo = type.toLowerCase();
	let ms = 'MS' + type;
	return window.navigator.msPointerEnabled ? ms : lo;
}

export function getTimeStamp(): number {
	return new Date().getTime();
}

export function getPointerEvent(event: any): Event {
	return event.targetTouches ? event.targetTouches[0] : event;
}
