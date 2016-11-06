import { msEventType, getPointerEvent } from "./utils";
var CustomSwipeEventSubType;
(function (CustomSwipeEventSubType) {
    CustomSwipeEventSubType[CustomSwipeEventSubType["SwipeStart"] = 0] = "SwipeStart";
    CustomSwipeEventSubType[CustomSwipeEventSubType["SwipeMove"] = 1] = "SwipeMove";
    CustomSwipeEventSubType[CustomSwipeEventSubType["SwipeEnd"] = 2] = "SwipeEnd";
})(CustomSwipeEventSubType || (CustomSwipeEventSubType = {}));
export var CustomSwipe;
(function (CustomSwipe) {
    let TARGET = null;
    const touchEvents = {
        touchstart: msEventType('PointerDown') + ' touchstart',
        touchend: msEventType('PointerUp') + ' touchend',
        touchmove: msEventType('PointerMove') + ' touchmove'
    };
    let isTouchEvent = false;
    let currX;
    let currY;
    let cachedX;
    let cachedY;
    // We need these variables to get the final distance
    let deltaX;
    let deltaY;
    function init(doc) {
        //setting the events listeners
        // we need to debounce the callbacks because some devices multiple events are triggered at same time
        setListener(doc, touchEvents.touchstart + ' mousedown', onTouchStart);
        setListener(doc, touchEvents.touchend + ' mouseup', onTouchEnd);
        setListener(doc, touchEvents.touchmove + ' mousemove', onTouchMove);
    }
    CustomSwipe.init = init;
    function setListener(elm, events, callback) {
        let eventsArray = events.split(' ');
        let i = eventsArray.length;
        while (i--) {
            elm.addEventListener(eventsArray[i], callback, false);
        }
    }
    function onTouchStart(e) {
        if (e.type !== 'mousedown')
            isTouchEvent = true;
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
        sendEvent(TARGET, CustomSwipeEventSubType.SwipeStart, { x: 0, y: 0 });
    }
    function onTouchEnd(e) {
        let eventName = null;
        // skip the mouse events if previously a touch event was dispatched
        // and reset the touch flag
        if (e.type === 'mouseup' && isTouchEvent) {
            isTouchEvent = false;
            TARGET = null;
            return;
        }
        deltaY = cachedY - currY;
        deltaX = cachedX - currX;
        sendEvent(TARGET, CustomSwipeEventSubType.SwipeEnd, { x: Math.abs(deltaX), y: Math.abs(deltaY) });
        TARGET = null;
    }
    function onTouchMove(e) {
        // skip the mouse move events if the touch events were previously detected
        if (e.type === 'mousemove' && isTouchEvent)
            return;
        let pointer = getPointerEvent(e);
        currX = pointer.pageX;
        currY = pointer.pageY;
        deltaY = cachedY - currY;
        deltaX = cachedX - currX;
        if (TARGET) {
            sendEvent(TARGET, CustomSwipeEventSubType.SwipeMove, { x: Math.abs(deltaX), y: Math.abs(deltaY) });
        }
    }
    function sendEvent(elm, type, distance) {
        let data = {
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
})(CustomSwipe || (CustomSwipe = {}));
