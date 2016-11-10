'use strict';

var doc = window.document;

describe('Custom Swipe Event', function() {

  // We need these before-and-after stuff to load the html
  before(function() {
      fixture.setBase('test/templates');
  });

  beforeEach(function(){
    this.result = fixture.load('core.html');
  });

  afterEach(function(){
    fixture.cleanup()
  });

	it('should add "custom-swipe-event-enabled" class to the html element', function() {
    var html = doc.documentElement;
		expect(html.classList.contains('custom-swipe-event-enabled')).to.be.true;
	});

  it('expects swipable-div', function() {
    var swipableDiv = doc.getElementById('swipable-div');
		expect(swipableDiv).to.be.ok;
	});
});
