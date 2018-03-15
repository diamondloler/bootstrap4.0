define('page/index', [
    'css!page/index.css',
    'bootstrap',
    'event-custom-native',
    "smooth-load",
    "amplifier",
    'scrollToTarget',
    "date-builder"
], function (css, Bootstrap, CustomEvent, smoothLoad, Amplifier, ScrollToTarget, dateBuilder) {
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
            speed: 2000,
            easing: 'ease-in-out'
        })

    //模拟http请求
    setTimeout(function () {
        xixi.stopLoop();
        load_el.style.width = 100 + '%';
        setTimeout(function () {
            load_el.style.width = 0;
        }, 200)
    }, 1000)

    var elTest = document.querySelector('.d1');

    elTest.onclick = function () {
        xixi.stopLoop()
    }

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
    Amplifier('.wrapper')


    ScrollToTarget(['.dj', '.aj'], ['show', 'shake'], true)
     
    var date_ = dateBuilder();
    console.log(date_.$value)

    var node = document.querySelector('.absd')
    var node_ = node.cloneNode(true)
    console.log(node_)

});