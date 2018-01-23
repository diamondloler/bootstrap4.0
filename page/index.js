

define('page/index', [
    'css!page/index.css',
    'bootstrap',
    'event-custom-native',
    "smooth-load"
], function (css, Bootstrap, CustomEvent, smoothLoad) {
    'use strict';
    var event = new CustomEvent('fuckyou', {
            detail: {
                a: 1
            }
        }),
        el = document.querySelector('.damit');

    el.addEventListener('fuckyou', function (e) {
        console.log(e);
    })

    el.dispatchEvent(event)

    var load_el = document.querySelector('.line'),
        xixi = smoothLoad({
            elem: load_el,
            speed: 8000,
            easing: 'ease-in'
        })

    var elTest = document.querySelector('.d1');

    function getEndLocation(el) {
        var location = 0;

        if (el.offsetParent) {
            do {
                location += el.offsetTop
                el = el.offsetParent
            } while (el)
        }
         console.log(location)
        return location
    }
    // console.log(elTest.offsetTop)
    getEndLocation(elTest)

    var listen  = function (center_el, scale_el) {
        var body = document.body,
             mask = null;
        scale_el.onclick = function (e) {
            if(scale_el.className.indexOf('scale') > -1){
                return;
            }
            mask = document.createElement('div')
            mask.classList.add('mask')
            body.appendChild(mask)
            e.stopPropagation();
            setTimeout(function () {
                mask.classList.add('fade')
                center_el.classList.add('h-v-center')
                scale_el.classList.add('scale')
            })
        }
        document.onclick = function (e) {
            var target = e.target;
            if(target.className.indexOf('mask') > -1) {
                body.removeChild(target)   
                setTimeout(function () {         
                    center_el.classList.remove('h-v-center')
                    scale_el.classList.remove('scale')
                })
            }
        }
    }
    var el_c = document.querySelector('.zoom-img-wrapper'),
        el_s = document.querySelector('.img-300');
    listen(el_c, el_s);
    
});