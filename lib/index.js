import { msEventType } from "./utils";
import { CustomSwipeHelper } from "./core";
const defaults = {
    swipeThreshold: 100
};
/**
* Bind the swipe event to the whole document with a IIFE
*
* @return { CustomSwipeEvent }
*/
const customSwipeModule = (function (csh, win, doc) {
    const touchEvents = {
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
    function setListener(elm, events, callback) {
        let eventsArray = events.split(' ');
        let i = eventsArray.length;
        while (i--) {
            elm.addEventListener(eventsArray[i], callback, false);
        }
    }
    function sendEvent(elm, eventName, originalEvent, data) {
    }
    return csh;
}(new CustomSwipeHelper(defaults), window, window.document));
export default customSwipeModule;
