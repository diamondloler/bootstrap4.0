define('page/index', [
    'css!page/index.css',
    'bootstrap',
    'event-custom-native',
    "smooth-load",
    "amplifier",
    'scrollToTarget'
], function (css, Bootstrap, CustomEvent, smoothLoad, Amplifier, ScrollToTarget) {
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



    var dateBuilder = function (dateString) {
        var date = dateString, //日期字符串
            day = 0,
            weekday = 0,
            years = 0,
            month = 0,
            hour = 0,
            minute = 0,
            second = 0,
            index = -1,
            patchPlace = function (val) {
                return val.length < 2 ? '0' + val : val;
            },
            mappingValue = function (dateString) {
                index++;
                return dateString.split(/\-/)[index] || 0;
            },
            mappingWeekDay = function (val) {
                if (val == 1) return '星期一'
                if (val == 2) return '星期二'
                if (val == 3) return '星期三'
                if (val == 4) return '星期四'
                if (val == 5) return '星期五'
                if (val == 6) return '星期六'
                if (val == 0) return '星期日'
            },
            getCurrFullDate = function () {
                var DATE = new Date();
                day = patchPlace(DATE.getDate())
                weekday = mappingWeekDay(DATE.getDay())
                years = DATE.getFullYear()
                month = patchPlace(DATE.getMonth() + 1)
                hour = patchPlace(DATE.getHours())
                minute = patchPlace(DATE.getMinutes())
                second = patchPlace(DATE.getSeconds())
                return years + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + ',' + weekday;
            };



        //无参数的情况下以原生date对象进行逻辑操作    
        if (arguments.length < 1) {
            getCurrFullDate()
        };



        //有参数的情况下对字符串date进行逻辑操作 
        if (typeof date === 'string') {
            years = mappingValue(date)
            month = mappingValue(date)
            day = mappingValue(date)
            hour = mappingValue(date)
            minute = mappingValue(date)
            second = mappingValue(date)
            weekday = mappingValue(date)
        }

        var publicApis = {};

        //@return {date} 返回当前日期(yyyy-mm-dd格式)。 
        publicApis.now = function () {
            return getCurrFullDate();
        }

        var ymd = years + '-' + month + '-' + day;
        var ymdhmsw = ymd + ' ' + hour + ':' + minute + ':' + second + ',' + weekday;

        publicApis.$value = arguments > 0 ? dateString.split(/\-/).length < 4 ? ymd : ymdhmsw : ymdhmsw;

        publicApis.add = function (baseNumber, dateType) {
            var judgeOdd = function (val) {
                return val % 2 != 0 ? true : false;
            }

            var getPeriod = function (val, base) {
                return Math.floor(val / base);
            }

            var getRemain = function (val, base) {
                return val % base;
            }

            var shiftNumber = function (val) {
                if (val.indexOf('0') == 0) {
                    return Number(val.charAt(1))
                }
                return Number(val)
            }
            var getExtra = function (val, type) {
                var num = 0;
                for (var i = 1; i < val + 1; i++) {
                    if (type == 'odd' && !judgeOdd(i)) {
                        num++;
                    }
                    if (type == 'even' && judgeOdd(i)) {
                        num++;
                    }
                }
                return num;
            }
            var month_ = shiftNumber(month)
            var years_ = shiftNumber(years)
            if (dateType == 'days') {
                var day_ = shiftNumber(baseNumber)
                if (baseNumber > 30) {
                    var odd_flag = judgeOdd(month_),
                        odd_days = getRemain(day_, 30) + getExtra(getPeriod(day_, 30), 'odd'),
                        even_days = getRemain(day_, 30) + getExtra(getPeriod(day_, 30), 'even'),
                        finalMonth = month_ + getPeriod(day_, 30);
                      
                    if (finalMonth > 8 && month_ < 7) {
                        day_ = odd_flag ? odd_days + 1 : even_days + 1
                    }

                    if (finalMonth < 8 || month_ > 8) {
                        day_ = odd_flag ? odd_days : even_days
                    }

                    if(finalMonth > 2 && month_ < 2) {
                        day_ -= 2; 
                    }
                    year = patchPlace(years_ + getPeriod(month_, 12))
                    month = patchPlace(finalMonth)
                    day = patchPlace(day_)
                }
                
            }

            if (dateType == 'years') {
                years = baseNumber + years
            }

            if (dateType == 'months') {

                month = patchPlace(month_)
            }

            if (dateType == 'hours') {
                hour = baseNumber + hour
            }

            if (dateType == 'minutes') {
                minute = baseNumber + minute
            }

            if (dateType == 'seconds') {
                second = baseNumber + second
            }

            return {
                format: function (string) {
                    var len = string.split('-').length
                    if (len < 3) {
                        throw new TypeError('the format of argument must be same as "YYYY-MM-DD or YYYY-MM-DD--hh-mm-ss"');
                    }

                    switch (len) {
                        case 3:
                            return ymd
                        case 6:
                            return ymd + ' ' + hour + ':' + minute + ':' + second
                    }
                }
            }
        }

        return publicApis;

    }

    var date_ = dateBuilder();
    console.log(date_.$value)
});