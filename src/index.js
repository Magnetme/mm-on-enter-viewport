//babel/polyfill requires the native path module. Webpack has some magic to get it working, yoloader does not.
//We don't absolutely need it now, and thus we temporarily disable the polyfill
//import 'babel/polyfill';

import angular from 'angular';

export default angular.module('mm.onEnterViewport', [])
	.value('mmOnEnterViewportDefaults', {
		thresholdBottom : 0
	})
	/**
	 * @ngdoc directive
	 * @name mm.onEnterViewport.mmOnEnterViewport
	 * @description
	 * Detects when an element enters the viewport
	 *
	 * @restrict A
	 * @param {&Function} mmOnEnterViewport Callback that will be triggered when the element enters the viewport
	 * @param {@Number} [thresholdBottom] Part of the bottom of the actual viewport that will be considerd out of view.
	 *                                  E.g. if this is set to 0.3 then the callback will only fire when the element
	 *                                  is in the upper 70% of the screen. Note that setting a too high value here
	 *                                  will prevent elements at the bottom of the page to ever trigger the event.
	 *                                  This value can also be configured globally with the
	 *
	 * @example
	 * <example module="on-enter-viewport-demo">
	 *   <file name="index.html">
	 *     <div ng-controller="viewport-demo-ctrl">
	 *       <div mm-on-enter-viewport="showAlert()" style="height: 500px">
	 *         An alert will be shown when I enter the viewport
	 *       </div>
	 *     </div>
	 *   </file>
	 *   <file name="app.js">
	 *     angular.module('on-enter-viewport-demo', ['mm.onEnterViewport'])
	 *       .config(($provide) => {
	 *         $provide.decorator('mmOnEnterViewportDefaults', ($delegate) => {
	 *           $delegate.thresholdBottom = 0.3;
	 *           return $delegate;
	 *         });
	 *       })
	 *       .controller('viewport-demo-ctrl', ($scope) => {
	 *         $scope.showAlert = () => alert('I have become visible!');
	 *       });
	 *
	 *   </file>
	 * </example>
	 */
	.directive('mmOnEnterViewport', ($timeout, $parse, mmOnEnterViewportDefaults) => {

		function isInView(element, thresholdBottom) {
			const boundingRect = element.getBoundingClientRect();
			return boundingRect.height > 0 && boundingRect.width > 0 && boundingRect.bottom > 0 && boundingRect.top < window.innerHeight * (1 - thresholdBottom);
		}

		return {
			restrict : 'A',
			link : function (scope, elem, attrs) {
				const callbackGetter = $parse(attrs.mmOnEnterViewport);
				const thresholdBottom = attrs.thresholdBottom ? $parse(attrs.thresholdBottom)(scope) : mmOnEnterViewportDefaults.thresholdBottom;
				const viewportEvents = ['scroll', 'resize'];

				let visible = false;
				function checkVisibility() {
					const currentlyVisible = isInView(elem[0], thresholdBottom);
					if (currentlyVisible !== visible) {
						visible = currentlyVisible;
						if (visible) {
							scope.$apply(function() {
								callbackGetter(scope);
							});
						}
					}
				}

				viewportEvents.forEach((event) => window.addEventListener(event, checkVisibility));
				scope.$on('$destroy', function () {
					viewportEvents.forEach((event) => window.removeListener(event, checkVisibility));
				});
				$timeout(checkVisibility);
			}
		};
	});
