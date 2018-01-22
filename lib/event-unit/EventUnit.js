(function (factory) {
	//adjust major font project
	if (typeof define === 'function' && define.amd) {
		define([], function () {
			'use strict';
			return factory();
		});
	} else if (typeof exports === "object" && typeof module !== "undefined") {
		module.exports = factory();
	} else {
		window !== undefined && window.EventUntil === undefined && (window.EventUntil = factory())
	}
})(function () {
	var EventUntil = {
		addhandler: function (element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		getEvent: function (event) {
			return event ? event : window.event;
		},
		getTarget: function (event) {
			return event.target || event.srcElement;
		},
		preventDefault: function (event) {
			if (event.preventDefault) {
				event.preventDefault();
			} else {
				event.returnValue = false;
			}
		},
		removeHandler: function (element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false);
			} else if (element.detachEvent) {
				element.detachEvent("on" + type, handler);
			} else {
				element["on" + type] = null;
			}
		},
		stopPropagation: function (event) {
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = ture;
			}
		},
		getRelatedTarget: function (event) {
			if (event.relatedTarget) {
				return event.relatedTarget;
			} else if (event.toElement && event.type == "mouseout") {
				return event.toElement;
			} else if (event.formElement && event.type == "mouseover") {
				return event.formElement;
			} else {
				return null;
			}
		},
		getButton: function (event) {
			if (document.implementation.hasFeature("MouseEvents", "2.0")) {
				return event.button;
			} else {
				switch (event.button) {
					case 0:
					case 1:
					case 3:
					case 5:
					case 7:
						return 0;
					case 2:
					case 6:
						return 2;
					case 4:
						return 1;


				}
			}

		},
		getCharCode: function (event) {
			if (typeof event.charCode == "number") {
				return event.charCode;
			} else

			{
				return event.keyCode;
			}
		},
		getClipboardText: function (event) {
			var clipboardData = (event.clipboardData || window.clipboardData);
			return clipboardData.getData("text");
		},
		setClipboardText: function (event) {
			if (event.clipboardData) {
				return event.clipboardData.setData("text/plain", value);
			} else if (window.clipboardData) {
				return window.clipboardData.setData("text", value);
			}
		}
	};
	return EventUntil;
})