requirejs.config({
    baseUrl: '../',
    waitSeconds: 5,
    paths: {
        "jquery": "lib/jquery/dist/jquery.min",
        "bootstrap": "lib/bootstrap/dist/js/bootstrap.bundle.min",
        "event-unit": 'lib/event-unit/EventUnit',
        "event-custom": 'lib/event-unit/event-custom',
        "dragger": 'lib/drag/drag',
        "scroll": 'lib/smooth-scroll/dist/js/smooth-scroll.min',
        "event-custom-native": 'lib/event-unit/EventCustom',
        "smooth-load": 'lib/smooth-load/smooth-load',
        "amplifier": 'lib/amplifierjs/amplifier',
        "scrollToTarget": 'lib/scrollToTarget/scrollToTarget',
        "date-builder": 'lib/date-builder/date-builder',
        "css": "lib/require-css/css.min"
    },
    map: {
        "*": {
            "css": "lib/require-css/css.min"
        }
    },
    shim: {
        "bootstrap": {
            deps: ["jquery"]
        }
    }
})
requirejs(['page/render'])