(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory(root);
        });
    } else if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory(root);
    } else {
        root.scrollToTarget = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {
    var scrollToTarget = function (selectList, animationClassList, loop_) {
        //check the arguments
        if (Object.prototype.toString.call(selectList) !== '[object Array]' ||
            Object.prototype.toString.call(animationClassList) !== '[object Array]') {
            throw new TypeError('arguments must be a Array');
        }

        if (selectList.length != animationClassList.length) {
            throw new RangeError('The length of parameter 1 and parameter 2 must be the same');
        }


        //default var
        var body = document.body,
            html = document.documentElement,
            clientHeight = Math.min(body.clientHeight, html.clientHeight),
            el_queue = [],
            loop = loop_ || false;




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

        //兼容DTD模式  在DTD模式下IE、Firefox的 document.body 不适用，但chrome可以 - -
        var getScrollTop = function () {
            return Math.max(body.scrollTop, html.scrollTop)
        }

        //get the element list
        el_queue = getElements(selectList);

        //handle scroll
        var handleScroll = function () {
            //mapping element animation
            el_queue.forEach(function (val, index, arr) {
                if (getScrollTop() >= getEndOffsetTop(val) - clientHeight) {
                    if (val.className.indexOf(animationClassList[index]) == -1) {
                        val.className += (' ' + animationClassList[index]);
                    }
                    // 等所有动画执行完一次之后 destory    
                    if (!loop && index == arr.length - 1) {
                        apis.destory();
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

        var apis = {}

        //remove listener and reset to default value
        apis.destory = function () {
            el_queue = [];
            window.removeEventListener('scroll', handleScroll);
        }

        //return public API
        return apis
    }

    return scrollToTarget;

})