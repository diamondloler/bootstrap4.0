define('page/dj', [
    'css!page/dj.css',
    'dragger',
    'scroll' 
], function (css, Dragger, Scroll) {
    'use strict';
    var haha = Dragger('#9527');
    haha.enable();

    var xixi = new Scroll(),
    li = document.querySelector('.point'),
    toggle = document.querySelector('.test'),
    options = {
        speed: 2000,
        easing: 'easeOutCubic'
    };
    xixi.animateScroll(li, toggle, options)

});