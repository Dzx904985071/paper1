export function sjjs(lb){
    //从这开始及后面都是用来计算时间的
            //根据出入的lb判定需要哪种日期再进行返回         
                var now = new Date(); //当前日期
                var startStop = new Array();

                //获取当前时间
                var currentDate = new Date();
                if (lb == "BZ") {
                    //返回date是一周中的某一天
                    var week = currentDate.getDay();
                    //返回date是一个月中的某一天
                    var month = currentDate.getDate();

                    //一天的毫秒数
                    var millisecond = 1000 * 60 * 60 * 24;
                    //减去的天数
                    var minusDay = week != 0 ? week - 1 : 6;
                    //alert(minusDay);
                    //本周 周一
                    var monday = new Date(currentDate.getTime() - minusDay * millisecond);
                    //本周 周日
                    var sunday = new Date(monday.getTime() + 6 * millisecond);
                    //添加本周时间
                    var startsj = timeD(monday); //将标准时间转换年月日
                    var startime =
                        startsj.year + "-" + startsj.month + "-" + startsj.day + " 00:00:00";
                    var endsj = timeD(sunday); //将标准时间转换年月日
                    var endtime =
                        endsj.year + "-" + endsj.month + "-" + endsj.day + " 23:59:59";
                    startStop.push(startime); //本周起始时间
                    //添加本周最后一天时间
                    startStop.push(endtime); //本周终止时间
                    //返回
                    return startStop;
                } else if (lb == "BY") {
                    //获得当前月份0-11
                    var currentMonth = currentDate.getMonth();
                    //获得当前年份4位年
                    var currentYear = currentDate.getFullYear();
                    //求出本月第一天
                    var firstDay = new Date(currentYear, currentMonth, 1);

                    //当为12月的时候年份需要加1
                    //月份需要更新为0 也就是下一年的第一个月
                    if (currentMonth == 11) {
                        currentYear++;
                        currentMonth = 0; //就为
                    } else {
                        //否则只是月份增加,以便求的下一月的第一天
                        currentMonth++;
                    }

                    //一天的毫秒数
                    var millisecond = 1000 * 60 * 60 * 24;
                    //下月的第一天
                    var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
                    //求出上月的最后一天
                    var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

                    var startsj = timeD(firstDay); //将标准时间转换年月日
                    var startime =
                        startsj.year + "-" + startsj.month + "-" + startsj.day + " 00:00:00";
                    var endsj = timeD(lastDay); //将标准时间转换年月日
                    var endtime =
                        endsj.year + "-" + endsj.month + "-" + endsj.day + " 23:59:59";
                    startStop.push(startime); //本周起始时间
                    //添加本周最后一天时间
                    startStop.push(endtime); //本周终止时间
                    //返回
                    return startStop;
                }
                //上周
                else if (lb == "SZ") {
                    //返回date是一周中的某一天
                    var week = currentDate.getDay();
                    //返回date是一个月中的某一天
                    var month = currentDate.getDate();
                    //一天的毫秒数
                    var millisecond = 1000 * 60 * 60 * 24;
                    //减去的天数
                    var minusDay = week != 0 ? week - 1 : 6;
                    //获得当前周的第一天
                    var currentWeekDayOne = new Date(
                        currentDate.getTime() - millisecond * minusDay
                    );
                    //上周最后一天即本周开始的前一天
                    var priorWeekLastDay = new Date(
                        currentWeekDayOne.getTime() - millisecond
                    );
                    //上周的第一天
                    var priorWeekFirstDay = new Date(
                        priorWeekLastDay.getTime() - millisecond * 6
                    );

                    var startsj = timeD(priorWeekFirstDay); //将标准时间转换年月日
                    var startime =
                        startsj.year + "-" + startsj.month + "-" + startsj.day + " 00:00:00";
                    var endsj = timeD(priorWeekLastDay); //将标准时间转换年月日
                    var endtime =
                        endsj.year + "-" + endsj.month + "-" + endsj.day + " 23:59:59";

                    //添加至数组
                    startStop.push(startime);
                    startStop.push(endtime);

                    return startStop;
                }
                //上月
                else if (lb == "SY") {
                    //获得当前月份0-11
                    var currentMonth = currentDate.getMonth();
                    //获得当前年份4位年
                    var currentYear = currentDate.getFullYear();
                    if (currentMonth == 0) {
                        currentYear--;
                        currentMonth = 11;
                    } else {
                        currentMonth--;
                    }
                    //获取某月的天数
                    var monthStartDate = new Date(currentYear, currentMonth, 1);
                    var monthEndDate = new Date(currentYear, currentMonth + 1, 1);
                    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);

                    //获得上一个月的第一天
                    var priorMonthFirstDay = new Date(currentYear, currentMonth, 1);
                    //获得上一月的最后一天
                    var priorMonthLastDay = new Date(currentYear, currentMonth, days);
                    //添加至数组

                    var startsj = timeD(priorMonthFirstDay); //将标准时间转换年月日
                    var startime =
                        startsj.year + "-" + startsj.month + "-" + startsj.day + " 00:00:00";
                    var endsj = timeD(priorMonthLastDay); //将标准时间转换年月日
                    var endtime =
                        endsj.year + "-" + endsj.month + "-" + endsj.day + " 23:59:59";

                    startStop.push(startime);
                    startStop.push(endtime);
                    //返回
                    return startStop;
                } else if (lb == "ZT") {
                    var timenow = new Date();
                    timenow.setDate(timenow.getDate() - 1); //设置天数 -1 天，昨天的日期
                    var y = timenow.getFullYear(); //年
                    var m = timenow.getMonth() + 1; //月
                    m = m < 10 ? "0" + m : m;
                    var d = timenow.getDate(); //日
                    d = d < 10 ? "0" + d : d;
                    var yesterdayTime = y + "-" + m + "-" + d; //字符串拼接成自己想要的时间格式，现在是yyyy/mm/dd格式
                    startStop.push(yesterdayTime + " 00:00:00");
                    startStop.push(yesterdayTime + " 23:59:59");
                    return startStop;
                } else {
                    return [];
                }
}
//将标准时间转换年月日格式
function timeD(time) {
    let d = new Date(time),
        data = {
            year: d.getFullYear(),
            month: timeP(d.getMonth() + 1),
            day: timeP(d.getDate()),
            // 'hour': this.timeP(d.getHours()),
            // 'min': this.timeP(d.getMinutes()),
            // 'sec': this.timeP(d.getSeconds()),
        };
    return data;
}
function timeP(s) {
    return s < 10 ? "0" + s : s;
}


