function msEventType(type) {
    var lo = type.toLowerCase();
    var ms = 'MS' + type;
    return window.navigator.msPointerEnabled ? ms : lo;
}
function getPointerEvent(event) {
    return event.targetTouches ? event.targetTouches[0] : event;
}

var CustomSwipe;
(function (CustomSwipe) {
    var TARGET = null;
    var touchEvents = {
        touchstart: msEventType('PointerDown') + ' touchstart',
        touchend: msEventType('PointerUp') + ' touchend',
        touchmove: msEventType('PointerMove') + ' touchmove'
    };
    var isTouchEvent = false;
    var currX = void 0;
    var currY = void 0;
    var cachedX = void 0;
    var cachedY = void 0;
    // We need these variables to get the final distance
    var deltaX = void 0;
    var deltaY = void 0;
    function init(doc) {
        var html = doc.documentElement;
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
    CustomSwipe.init = init;
    function setListener(elm, events, callback) {
        var eventsArray = events.split(' ');
        var i = eventsArray.length;
        while (i--) {
            elm.addEventListener(eventsArray[i], callback, false);
        }
    }
    function onTouchStart(e) {
        if (e.type !== 'mousedown') isTouchEvent = true;
        // skip this event we don't need to track it now
        if (e.type === 'mousedown' && isTouchEvent) {
            TARGET = null;
            return;
        }
        var pointer = getPointerEvent(e);
        // caching the current x
        cachedX = currX = pointer.pageX;
        // caching the current y
        cachedY = currY = pointer.pageY;
        TARGET = e.target;
        sendEvent(TARGET, 'swipestart', { x: 0, y: 0 });
    }
    function onTouchEnd(e) {
        var eventName = null;
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
    function onTouchMove(e) {
        // skip the mouse move events if the touch events were previously detected
        if (e.type === 'mousemove' && isTouchEvent) return;
        var pointer = getPointerEvent(e);
        currX = pointer.pageX;
        currY = pointer.pageY;
        deltaY = cachedY - currY;
        deltaX = cachedX - currX;
        if (TARGET) {
            sendEvent(TARGET, 'swipemove', { x: Math.abs(deltaX), y: Math.abs(deltaY) });
        }
    }
    function sendEvent(elm, type, distance) {
        var data = {
            x: currX,
            y: currY,
            distance: distance,
            swipeEventSubType: type
        };
        var customEvent = window.document.createEvent('Event');
        // addEventListener
        if (customEvent.initEvent) {
            for (var key in data) {
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

var CustomSwipeEvent = function (doc) {
    return CustomSwipe.init(doc);
}(window.document);

export default CustomSwipeEvent;
//# sourceMappingURL=index.mjs.map
