var postcss = require('gulp-postcss'),
    gulp = require('gulp'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano'),
    concat = require('gulp-concat'),
    rjs = require('gulp-requirejs-optimize'),
    path = require('path'),
    sourcemaps = require('gulp-sourcemaps'),
    htmlreplace = require('gulp-html-replace'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    glob = require("glob"),
    flowRemoveTypes = require('gulp-flow-remove-types');

var getAMDModule = function (globList) {
    var list = [];
    globList.forEach(function (item) {
        list = list.concat(glob.sync(item))
    })
    list = list.map(function (item) {
        return path.relative('./', item).replace('.js', '').replace(path.sep, '/');
    })
    return list;
}

gulp.task('css', function () {
    return gulp.src(['./lib/bootstrap/dist/css/bootstrap.min.css',
            './lib/amplifierjs/amplifier.css',
            './page/*.css'
        ])
        .pipe(sourcemaps.init())
        .pipe(postcss([
            autoprefixer({
                browsers: ['> 0.5%', 'IE 9']
            }),
            cssnano({
                safe: true,
                autoprefixer: false,
            })
        ]))
        .pipe(concat('main.min.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/css'))
})

gulp.task('rjs', function () {
    global.BASE_PATH = './'
    global.requirejs = function () {};
    global.requirejs.config = function (option) {
        rjsConfig = Object.assign({
            wrapShim: true,
            useStrict: true,
            baseUrl: BASE_PATH,
            generateSourceMaps: true,
            preserveLicenseComments: false,
            separateCSS: true,
            pragmasOnSave:{
                excludeRequireCss: true
            },
            optimize: "none",
            out: "modules.js"
        }, option)
    }

    require('./config/config')
    global.requirejs = undefined
    global.BASE_PATH = undefined

    rjsConfig.baseUrl = "./";
    // rjsConfig.separateCSS = true
    // //   rjsConfig.buildCSS = false
    // rjsConfig.pragmasOnSave = {
    //     excludeRequireCss: true
    // };
    rjsConfig.include = getAMDModule(['./page/*.js'])
    return gulp.src(['./page/render.js'])
        .pipe(sourcemaps.init())
        .pipe(rjs(rjsConfig))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('js', ['rjs'], function () {
    return gulp.src(['./lib/requirejs/require.js',
            './config/config.js',
            './dist/js/modules.js'
        ])
        .pipe(sourcemaps.init({
            loadMaps: true
        }))
        .pipe(concat('main.min.js'))
        .pipe(flowRemoveTypes())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./dist/js'))
})

gulp.task('html', function () {
    return gulp.src(['./page/*.html'])
        .pipe(htmlreplace({
            css: 'css/main.min.css',
            js: 'js/main.min.js'
        }))
        .pipe(gulp.dest('./dist'))
})

gulp.task('asset-img', function () {
    return gulp.src(['./images/*'])
        .pipe(gulp.dest('./dist/images'))
})

gulp.task('default', ['js', 'css', 'html', 'asset-img'])