(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], function () {
            return factory(root);
        });
    } else if (typeof exports === "object" && typeof module !== "undefined") {
        module.exports = factory(root);
    } else {
        root.dateBuilder = factory(root);
    }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {
    
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
                if(typeof val === 'string') return val.length < 2 ? '0' + val : val;
                if(typeof val === 'number') return val < 10 ? '0' + val : val;
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
                return val % base || base;
            }

            var shiftNumber = function (val) {
                if (typeof val === 'string' && val.indexOf('0') == 0) {
                    return Number(val.charAt(1))
                }
                return Number(val)
            }

            var getExtra = function (val, type) {
                var num = 0;
                for (var i = 1; i < val + 1; i++) {
                    if (type == 'odd' && !judgeOdd(i)) {
                        num--;
                    }
                    if (type == 'even' && judgeOdd(i)) {
                        num--;
                    }
                }
               
                return num;
            }

            var month_ = shiftNumber(month)
            var years_ = shiftNumber(years)
            var day_ = shiftNumber(day)


    

            if (dateType == 'days') {
                var sumDay = baseNumber + day_
                if (sumDay > 30) {
                    var odd_flag = judgeOdd(month_),
                        ExtraMonth = getPeriod(sumDay, 30),
                        pre_odd_days = getRemain(sumDay, 30) + getExtra(ExtraMonth, 'odd'),
                        pre_even_days = getRemain(sumDay, 30) + getExtra(ExtraMonth, 'even'),
                        odd_days = pre_odd_days == 0 ? 31 : pre_odd_days,
                        even_days = pre_even_days == 0 ? 30 : pre_even_days;

                    //默认情况
                    day_ = odd_flag ? odd_days : even_days

                    var NiceExtraMonth = (day_ == 31 || day_ == 30)  ? ExtraMonth -1 : ExtraMonth;
                    var NiceExtraYear = getPeriod(month_ + NiceExtraMonth, 12);
                    var finalMonth = getRemain(month_ + NiceExtraMonth, 12);
                 
                    //经过7.8月份
                    if (finalMonth > 8 && month_ < 7 || (NiceExtraYear && month_ > 8 && finalMonth > 8)) {
                        day_ -= 1*(NiceExtraYear || 1);
                    }
                    //经过2月份
                    if (finalMonth > 2 && month_ < 2 || (NiceExtraYear && month_ > 2 && finalMonth > 2)) {
                        day_ += 2 *(NiceExtraYear || 1);
                    }

                    month = patchPlace(finalMonth)
                    day = patchPlace(day_)
                    years = years_ + ((NiceExtraYear == 1 && finalMonth == 12 ) ? 0 : NiceExtraYear)

                } else {
                    day = day_ + baseNumber;
                }
            }

            if (dateType == 'months') {
                var sumMonth = baseNumber + month_;
                if (sumMonth > 12) {
                    years = years_ + getPeriod(sumMonth, 12);
                    month = getRemain(sumMonth, 12)
                } else {
                    month = patchPlace(sumMonth);
                }

            }

            if (dateType == 'years') {
                years = years_ + baseNumber;
            }

            //return add() api   
            return {
                format: function (string) {
                    var len = string.split('-').length
                    if (len < 3) {
                        throw new TypeError('the format of argument must be same as "YYYY-MM-DD or YYYY-MM-DD--hh-mm-ss"');
                    }
                    switch (len) {
                        case 3:
                            return years + '-' + month + '-' + day;
                        case 6:
                            return years + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second + ',' + weekday;
                    }
                }
            }
        }

        return publicApis;

    }

    return dateBuilder

})