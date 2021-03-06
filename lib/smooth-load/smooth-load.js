(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory(root);
        });
    } else if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory(root);
    } else {
        root.smoothLoading = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {
    function smoothLoading(options_) {
        'use strict';


        //default settings
        var options = {
            speed: 1000,
            elem: null,
            easing: 'ease-in-out'
        };


        /**
         * merge user settings
         * @param {obj} target Merge sources
         * @returns {obj} Merged target
         */
        var merge = function (target) {
            for (var i = 1; i < arguments.length; i++) {
                var source = arguments[i] || {};
                for (var key in source) {
                    if (source.hasOwnProperty(key) && source[key] !== undefined) {
                        target[key] = source[key]
                    }
                }
            }
            return target;
        }

        options = merge(options, options_)

        var loadingElement = options.elem
        if (loadingElement == undefined || loadingElement.nodeType == undefined || loadingElement.nodeType != 1) {
            throw new TypeError('elem must be a HTMLElement');
        }

        var getTimeFunc = function (setting, time) {
            var pattern = 0;
            if (setting == 'ease-in-out') pattern = time < 0.5 ? 4 * time * time * time : (time - 1) * (2 * time - 2) * (2 * time - 2) + 1;
            if (setting == 'ease-in') pattern = time * time;
            if (setting == 'ease-out') pattern = time * (2 - time);
            return pattern || time;
        }


        /**
         * ready to loading
         */
        var start = null,
            percentage = 0,
            time_interseptal = 0,
            width = 0,
            frameId = 0;

        var soomth_loading = {};

        soomth_loading.stopLoop = function () {
            window.cancelAnimationFrame(frameId);
        }

        soomth_loading.cancelProgress = function (width) {
            if (width > 80) {
                //clear timer
                soomth_loading.stopLoop()
                //reset
                start = null

                return true;
            }
        }

        var loopWidth = function (timestamp) {
            if (!start) {
                start = timestamp;
            } //记录第一次绘制时间
            time_interseptal += timestamp - start; //第一次绘制时间与第二次绘制时间的时间差 （递增）
            percentage = time_interseptal / parseInt(options.speed, 10);
            loadingElement.style.width = (100 * getTimeFunc(options.easing, percentage)) + '%';
            width = loadingElement.style.width.replace(/\%*$/, '')
            if (!soomth_loading.cancelProgress(width)) {
                frameId = window.requestAnimationFrame(loopWidth)
                start = timestamp; //以此类推
            }
        }

        //start loading
        soomth_loading.stopLoop()
        frameId = window.requestAnimationFrame(loopWidth)

        //return public apis
        return soomth_loading;
    }

    return smoothLoading;
})