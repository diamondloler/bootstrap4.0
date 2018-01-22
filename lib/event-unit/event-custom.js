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
         window !== undefined && window.EventTarget === undefined && (window.EventTarget = factory())
     }
 })(function () {
     function EventTarget() {
         this.handlers = {

         }
     }

     //overwrite EventTarget prototype
     EventTarget.prototype = {
         constructor: EventTarget,

         //add the event handler
         addHandler: function (type, handler) {
             if (this.handlers[type] == undefined) {
                 this.handlers[type] = []
             }
             if (handler instanceof Function) {
                 this.handlers[type].push(handler)
             } else {
                 throw new TypeError(handler + 'must be a function')
             }
         },

         //emit event
         fire: function (type, event) {
             if (this.handlers[type] instanceof Array) {
                 this.handlers[type].forEach(function (val, index) {
                     val(event)
                 })
             }
         },

         // remove event handler
         removeHandler: function (type, handler) {
             if (this.handlers[type] instanceof Array) {
                 this.handlers[type].forEach(function (val, index, arr) {
                     if (val == handler) {
                         arr.splice(index, 1)
                     }
                 })
             }
         }
     }

     return EventTarget;
 })