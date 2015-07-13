describe('mm-on-enter-viewport', function() {
	var el;
	beforeEach(function(done) {
		module('mm.onEnterViewport');
		el = testUtil.loadTemplate(testUtil.getScriptDir() + '/onEnterViewportTest.html', {
			scope: {
				firstEnterViewport : jasmine.createSpy('firstEnterViewport'),
				secondEnterViewport : jasmine.createSpy('secondEnterViewport')
			}
		});
		document.body.appendChild(el[0]);
		inject(function($timeout) {
			$timeout.flush();
			done();
		});
	});

	it('should call the callback on load when an element is initially already in view', function(done) {
		var spy = el.scope().firstEnterViewport;
		testUtil.waitFor(spy.calls.any)
			.then(done)
			.catch(testUtil.asyncFail(done));
	});

	//PhantomJS automatically resizes the viewport to the document size, so this test will never work there
	if (!/PhantomJS/.test(window.navigator.userAgent)) {
		it('should not call the callback on load when the element is not initially in view', function(done) {
			var firstSpy = el.scope().firstEnterViewport;
			var secondSpy = el.scope().secondEnterViewport;
			testUtil.waitFor(firstSpy.calls.any)
				.then(function() {
					expect(secondSpy).not.toHaveBeenCalled();
					done();
				})
				.catch(testUtil.asyncFail(done));
		});
	}

	it('should call the callback when the element is scrolled into view', function(done){
		window.scrollTo(0, 1000);
		var spy = el.scope().secondEnterViewport;
		testUtil.waitFor(spy.calls.any)
			.then(done)
			.catch(testUtil.asyncFail(done));
	});
});
