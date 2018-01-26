(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory();
        });
    } else if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory();
    } else {
        window.amplifier = factory();
    }
})(function () {
    var amplifier = function (selector) {
        var body = document.body,
            mask = null, //the topest layout except the element local centre
            center_el = null, // element to center (horizatal, vertical)
            scale_el = null;  // element to scale

        var wrapper = document.querySelector(selector);

        var getTranslate = function (elem) {
            var domRect = elem.getBoundingClientRect() || new TypeError("elem must be a HtmlElement"),
                centerDistance = {
                    x: 0,
                    y: 0
                };

            centerDistance.x = document.body.clientWidth / 2 - domRect.left - domRect.width / 2;
            centerDistance.y = document.body.clientHeight / 2 - domRect.top - domRect.height / 2;

            return centerDistance;

        }

        var zIndex = 1;

        wrapper.onclick = function (e) {
            var target = e.target;
            if (target.className.indexOf('img-300') > -1) {
                //prevent repeat toggle scale and return default status
                if (target.className.indexOf('scale') > -1) {
                    body.removeChild(mask)
                    //async end animation
                    setTimeout(function () {
                        center_el.classList.remove('h-v-center')
                        center_el.style.zIndex = zIndex++ //当active的item恢复默认状态的过程中，优先级最高不会被其他item遮挡
                        center_el.style.transform = 'translate(0, 0)'
                        scale_el.classList.remove('scale')
                    })
                    return;
                }

                //ready for animation
                scale_el = target
                center_el = target.parentNode

                var Distance = getTranslate(center_el);

                mask = document.createElement('div')
                mask.classList.add('mask')
                body.appendChild(mask)

                e.stopPropagation();

                //async start animation
                setTimeout(function () {
                    mask.classList.add('fade')
                    center_el.classList.add('h-v-center')
                    center_el.style.transform = 'translate(' + Distance.x + 'px,' + Distance.y + 'px)';
                    scale_el.classList.add('scale')
                })
            }
        }
    }
    return amplifier;
})