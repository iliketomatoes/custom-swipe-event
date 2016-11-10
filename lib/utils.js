export function msEventType(type) {
    let lo = type.toLowerCase();
    let ms = 'MS' + type;
    return window.navigator.msPointerEnabled ? ms : lo;
}
export function getPointerEvent(event) {
    return event.targetTouches ? event.targetTouches[0] : event;
}
