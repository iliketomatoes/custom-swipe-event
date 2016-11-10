# Custom Swipe Event
Add horizontal swipe event to the document. Written in TypeScript. Source files are also available in ES6. Distribution files were transpiled to ES5 with Babel and put together with Rollup.
Inspired by [Tocca.js](https://github.com/GianlucaGuarini/Tocca.js).

## Usage
Import the Javascript:

```html
<script src="path/to/custom-swipe-event/dist/index.js"></script>
```

This Javascript library is UMD compliant, so you can require the library like this:

```javascript
require('customSwipeEvent');
```

Then you can set the custom swipe event listener on any HTML element.
Let's assume you have an element like this:

```html
<div id="my-swipable-div"></div>
```
Then you can add the event listener:

```javascript
var mySwipableDiv = document.getElementById('my-swipable-div');

mySwipableDiv.addEventListener('swipe',function(e){
  // Put your code here
});
```

## Custom data
You can retrieve some useful data from the event argument passed to the callback function. Try this *testCB* callback out to see the output in your console.

```javascript

var testCB = function(e) {

  // x coordinate relative to the document
  console.log(e.x);

  // y coordinate relative to the document
  console.log(e.y);

  /**
   * The distance object has 2 properties: 'x' and 'y'.
   * They keep track of the distance from the starting point.
   * The starting point is determined by the 'swipestart' sub-event.
   */
  console.log(e.distance);

  /**
   * The swipe event is made up of 3 sub-events:
   * - 'swipestart'
   * - 'swipemove'
   * - 'swipeend'
   * In order to detect what subtype of event we are dealing with,
   * we can get the swipeEventSubType property.
   */
   console.log(e.swipeEventSubType);
};

mySwipableDiv.addEventListener('swipe', testCB);
```

## Important
Keep in mind that the 'swipe' event dispatched to the listeners is made out of 3 subtypes of event:
  1. 'swipestart'
  2. 'swipemove'
  3. 'swipeend'

For example, if you used this library to make a flickable widget, detecting the event subtype would be fundamental.
In a typical scenario the callback inside the event listener should look like this:
```javascript

var typicalCB = function(e) {

   if (e.swipeEventSubType === 'swipestart') {
     // Do stuff when the swipe event starts
   } else {
     if(e.swipeEventSubType === 'swipesmove') {
       // Do different stuff when the swipe event is unfolding
     } else {
       // In the end, do something else when the swipe event ends
     }
   }
};

mySwipableDiv.addEventListener('swipe', typicalCB);
```

## Good to know
This library is initialized through an IIFE. As the custom swipe event becomes available, the class *'custom-swipe-event-enabled'* is added to the html node:
```html
<html class="custom-swipe-event-enabled"> ... </html>
```
That class works as a guard to prevent other frameworks using this library from binding the custom swipe event to the document more than once.

## AUTHORS
Giancarlo Soverini <giancarlosoverini@gmail.com>

## LICENSE
AGPL-3.0
