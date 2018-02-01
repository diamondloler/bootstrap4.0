(function () {
    var Event_Unit = null,
        Event_Custom = null

    //adjust main font project
    if (typeof define === 'function' && define.amd) {
        define(['event-unit',
            "event-custom"
        ], function (EventUnit, EventCustom) {
            'use strict';
            Event_Unit = EventUnit
            Event_Custom = EventCustom
            return dragger
        });
    } else if (typeof exports === "object" && typeof module !== "undefined") {
        Event_Unit = require('../event-unit/EventUnit')
        Event_Custom = require('../event-unit/event-custom')
        module.exports = dragger
    } else {
        window !== undefined && window.EventTarget !== undefined && window.EventUntil !== undefined && (Event_Unit = window.EventUntil, Event_Custom = window.EventTarget, window.dragger = dragger)
    }

    function dragger(element_id) {
        var target = null, //event target
            drag = null, //drag element,
            dragStyle = null,
            id = element_id.replace(/^\#/, ''),
            diffX = 0,
            diffY = 0,
            drag_flow = new Event_Custom(),
            offsetParent = null,
            offsetParentX = 0,
            offsetParentY = 0,
            handleStart = function (e) {
                console.log('drag start!')
            },
            handleDragging = function (e) {
                console.log('dragging!')
            },
            handleEnd = function (e) {
                console.log('drag done!')
            }

        //custom event add listener
        drag_flow.addHandler('drag.start', handleStart)
        drag_flow.addHandler('dragging', handleDragging)
        drag_flow.addHandler('drag.done', handleEnd)

        var getEndOffsetTop = function (el) {
            var EndOffsetTop = 0;
            if (el.offsetParent) {
                do {
                    EndOffsetTop += el.offsetTop
                    el = el.offsetParent
                } while (el)
            }
            return EndOffsetTop
        }

        var getEndOffsetLeft = function (el) {
            var EndOffsetLeft = 0;
            if (el.offsetParent) {
                do {
                    EndOffsetLeft += el.offsetLeft
                    el = el.offsetParent
                } while (el)
            }
            return EndOffsetLeft
        }

        var getPositionParent = function (el) {
            if (el.parentNode) {
                do {
                    if (window.getComputedStyle(el.parentNode).position == 'relative') {
                        return el.parentNode
                    }
                    el = el.parentNode
                } while (el)

            }
        }


        var handler = function (event) {
            target = Event_Unit.getTarget(event)

            //mapping event handler
            switch (event.type) {
                case 'mousedown':
                    if (target.id.indexOf(id) > -1) {
                        drag_flow.fire('drag.start', {
                            type: 'drag.start'
                        })

                        drag = target
                        dragStyle = drag.style 
                       
                        offsetParent = getPositionParent(drag)
                        offsetParentY = offsetParent == undefined ? 0 : getEndOffsetTop(offsetParent)
                        offsetParentX = offsetParent == undefined ? 0 : getEndOffsetLeft(offsetParent)
            
                        diffX = event.clientX - getEndOffsetLeft(drag)
                        diffY = event.clientY - getEndOffsetTop(drag)
                    }
                    break;
                case 'mousemove':
                    if (drag !== null) {
                        drag_flow.fire('dragging', {
                            type: 'dragging'
                        })

                        dragStyle.left = (event.clientX - diffX - offsetParentX) + 'px'
                        dragStyle.top = (event.clientY - diffY - offsetParentY) + 'px'
                    }
                    break;
                case 'mouseup':
                    drag_flow.fire('drag.done', {
                        type: 'drag.done'
                    })
                    drag = null
                    break;
            }
        }

        return {
            enable: function () {
                //add listener 
                Event_Unit.addhandler(document, 'mousedown', handler)
                Event_Unit.addhandler(document, 'mousemove', handler)
                Event_Unit.addhandler(document, 'mouseup', handler)
            },
            disable: function () {
                //remove listener 
                Event_Unit.removeHandler(document, 'mousedown', handler)
                Event_Unit.removeHandler(document, 'mousemove', handler)
                Event_Unit.removeHandler(document, 'mouseup', handler)
            }
        }

    }
})()