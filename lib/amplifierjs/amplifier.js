(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory(root);
        });
    } else if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory(root);
    } else {
        root.amplifier = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {
    var amplifier = function (selector) {
        var body = document.body,
            mask = null, //the topest layout except the element local centre
            center_el = null, // element to center (horizatal, vertical)
            scale_el = null;  // element to scale

        var wrapper = document.querySelector(selector);

        var getTranslation = function (elem) {
            if (elem == undefined || typeof elem.nodeType == 'undefined' || elem.nodeType != 1) {
                throw new TypeError("elem must be a HTMLElement");
            }

            var domRect = elem.getBoundingClientRect(),
                centerDistance = {
                    x: 0,
                    y: 0
                };

            
            centerDistance.x = body.clientWidth / 2 - domRect.left - domRect.width / 2;
            centerDistance.y = body.clientHeight / 2 - domRect.top - domRect.height / 2;

            return centerDistance;

        }

        var zIndex = 1;

        wrapper.onclick = function (e) {
            var target = e.target;
            if (target.className.indexOf('amplifier_img') > -1) {
                //prevent repeat toggle scale and return default status
                if (target.className.indexOf('amplifier_scale') > -1) {
                    body.removeChild(mask)
                    //async end animation
                    setTimeout(function () {
                        center_el.classList.remove('amplifier_maxIndex')
                        center_el.style.zIndex = zIndex++ //当active的item恢复默认状态的过程中，优先级最高不会被其他item遮挡
                        center_el.style.transform = 'translate(0, 0)'
                        scale_el.classList.remove('amplifier_scale')
                    })
                    return;
                }

                //ready for animation
                scale_el = target
                center_el = target.parentNode
               
                var Distance = getTranslation(center_el);
               
                mask = document.createElement('div')
                mask.classList.add('amplifier_mask')
                body.appendChild(mask)
                
                mask.style.display = 'block'
                e.stopPropagation();

                //async start animation
                setTimeout(function () {
                    center_el.classList.add('amplifier_maxIndex')
                    mask.classList.add('amplifier_fade')
                    center_el.style.transform = 'translate(' + Distance.x + 'px,' + Distance.y + 'px)';
                    scale_el.classList.add('amplifier_scale')
                }, 20)
            }
        }
    }
    return amplifier;
})