import { msEventType, getPointerEvent, setListener } from "./utils";
import { CustomSwipeHelper } from "./core";
const defaultSettings = {
    swipeThreshold: 100,
    touchEventsOnly: false
};
/**
* Bind the swipe event to the whole document with a IIFE
*
* @return { CustomSwipeHelper }
*/
const customSwipeModule = (function (helper, win, doc) {
    const touchEvents = {
        touchstart: msEventType('PointerDown') + ' touchstart',
        touchend: msEventType('PointerUp') + ' touchend',
        touchmove: msEventType('PointerMove') + ' touchmove'
    };
    // Auxiliary variables
    let isTouchEvent = false;
    let currX;
    let currY;
    let cachedX;
    let cachedY;
    function onTouchStart(e) {
        if (e.type !== 'mousedown')
            isTouchEvent = true;
        // skip this event we don't need to track it now
        if (e.type === 'mousedown' && isTouchEvent)
            return;
        let pointer = getPointerEvent(e);
        // caching the current x
        cachedX = currX = pointer.pageX;
        // caching the current y
        cachedY = currY = pointer.pageY;
    }
    function onTouchEnd(e) {
        // We need these variables to get the final distance
        let deltaX;
        let deltaY;
        let eventName = '';
        // skip the mouse events if previously a touch event was dispatched
        // and reset the touch flag
        if (e.type === 'mouseup' && isTouchEvent) {
            isTouchEvent = false;
            return;
        }
    }
    function onTouchMove(e) {
    }
    function sendEvent(elm, eventName, originalEvent, data) {
    }
    // Bind swipe-event to the document
    setListener(doc, touchEvents.touchstart + (helper.options.touchEventsOnly ? '' : ' mousedown'), onTouchStart);
    setListener(doc, touchEvents.touchend + (helper.options.touchEventsOnly ? '' : ' mouseup'), onTouchEnd);
    setListener(doc, touchEvents.touchmove + (helper.options.touchEventsOnly ? '' : ' mousemove'), onTouchMove);
    return helper;
}(new CustomSwipeHelper(defaultSettings), window, window.document));
export default customSwipeModule;
