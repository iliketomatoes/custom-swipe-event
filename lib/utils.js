export function bind(obj, type, fn) {
    obj.addEventListener(type, fn, false);
}
export function unbind(obj, type, fn) {
    obj.removeEventListener(type, fn, false);
}
export function msEventType(type) {
    let lo = type.toLowerCase();
    let ms = 'MS' + type;
    return window.navigator.msPointerEnabled ? ms : lo;
}
export function getTimeStamp() {
    return new Date().getTime();
}
export function getPointerEvent(event) {
    return event.targetTouches ? event.targetTouches[0] : event;
}
