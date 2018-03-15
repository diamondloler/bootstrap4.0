(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            'use strict';
            return factory(root);
        });
    } else if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory(root);
    } else {
        root.CustomEvent = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {
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
    
    return CustomEvent;
})