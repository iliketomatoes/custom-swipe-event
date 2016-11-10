export function msEventType(type: string): string {
	let lo = type.toLowerCase();
	let ms = 'MS' + type;
	return window.navigator.msPointerEnabled ? ms : lo;
}

export function getPointerEvent(event: any): MouseEvent {
	return event.targetTouches ? event.targetTouches[0] : event;
}
