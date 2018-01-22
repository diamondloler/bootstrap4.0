(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            'use strict';
            return factory();
        });
    } else if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory();
    } else {
        factory();
    }
})(function () {
    if (typeof window.CustomEvent === "function") return window.CustomEvent;

    function CustomEvent(event, params) {
        params = params || {
            bubbles: false,
            cancelable: false,
            detail: undefined
        };

        //create event yourslef
        var evt = document.createEvent('CustomEvent');

        //init event
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);

        //return event
        return evt;
    }

    CustomEvent.prototype = window.Event.prototype;

    window.CustomEvent = CustomEvent;

    return CustomEvent;
})