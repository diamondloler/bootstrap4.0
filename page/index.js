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
});