requirejs.config({
    baseUrl: '../',
    waitSeconds: 10,
    paths: {
        "jquery": "lib/jquery/dist/jquery.min",
        "bootstrap": "lib/bootstrap/dist/js/bootstrap.bundle.min",
        "css": "lib/require-css/css.min",
        "event-unit": 'lib/event-unit/EventUnit',
        "event-custom": 'lib/event-unit/event-custom',
        "dragger": 'lib/drag/drag',
        "scroll": 'lib/smooth-scroll/dist/js/smooth-scroll.min',
        "event-custom-native": 'lib/event-unit/EventCustom',
        "smooth-load":'lib/smooth-load/smooth-load'
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