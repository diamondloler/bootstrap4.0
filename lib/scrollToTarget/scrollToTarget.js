(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory();
        });
    } else if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory();
    } else {
        window.scrollToTarget = factory();
    }
})(function () {
    var scrollToTarget = function (selectList, animationClassList) {
        //check the arguments
        if (Object.prototype.toString.call(selectList) !== '[object Array]' ||
            Object.prototype.toString.call(animationClassList) !== '[object Array]') {
            throw new TypeError('arguments must be a Array');
        }

        if (selectList.length != animationClassList.length) {
            throw new RangeError('The length of parameter 1 and parameter 2 must be the same');
        }


        //default settings
        var body = document.body,
            clientHeight = Math.min(body.clientHeight, document.documentElement.clientHeight),
            el_queue = [];



        /**
         * @param {Array} queue: select content List
         * @return {Array} element list
         */


        var getElements = function (queue) {
            var list = [],
                el = null;
            list = queue.map(function (val) {
                el = document.querySelector(val);
                if (typeof el == 'undefined') {
                    throw new ReferenceError('not found the element by the method of querySelector');
                }
                return el;
            })
            return list;
        }


        /**
         * @param {Object} el: html element
         * @return {Number}  the finally offset top 
         */


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


        //get the element list
        el_queue = getElements(selectList);

        //handle scroll
        var handleScroll = function () {
            //mapping element animation
            el_queue.forEach(function (val, index) {
                if (body.scrollTop >= getEndOffsetTop(val) - clientHeight) {
                    if (val.className.indexOf(animationClassList[index]) == -1) {
                        val.className += (' ' + animationClassList[index]);
                    }
                } else {
                    if (val.className.indexOf(animationClassList[index]) >= -1) {
                        val.classList.remove(animationClassList[index])
                    }
                }
            })
        }
        
        // window add event listen
        window.addEventListener('scroll', handleScroll, false);

        //public API
        return {
            destory: function () {
                el_queue = [],
                window.removeEventListener('scroll', handleScroll);
            }
        }
    }

    return scrollToTarget;

})