<template>
    <div style="height: 100%; width: 100%" class="table">
        <div class="searchForm padding">
            <div class="searchInputs" style="width: calc(50% - 10px)">
                <p style="width: 155px">时间段</p>
                <el-select v-model="searchForm.sjd" style="width: calc(30% + 110px);" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in sjdOption"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-date-picker
                        v-model="searchForm.rq"
                        type="datetimerange"
                        :picker-options="pickerOptions2"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        align="right"
                >
                </el-date-picker>
            </div>
            <div class="searchInputs">
                <p>车间</p>
                <el-select v-model="searchForm.cj" placeholder="请选择" :popper-append-to-body="false" @change="cjSelect">
                    <el-option
                            v-for="item in cjOptions"
                            :key="item.siteId"
                            :label="item.siteCode + '-' + item.siteName"
                            :value="item.siteId"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="searchInputs">
                <p>产线</p>
                <el-select v-model="searchForm.productionLineFk" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in cxOptions"
                            :key="item.workLineId"
                            :label="item.workLineCode+'-'+ item.workLineName"
                            :value="item.workLineId">
                    </el-option>
                </el-select>
            </div>
            <div class="searchInputs">
                <p style="width: 130px">产品名称</p>
                <el-select v-model="searchForm.productProcessFk" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in cpOptions"
                            :key="item.produceProductTypeCode"
                            :label="item.produceProductTypeCode + '-' + item.produceProductTypeName"
                            :value="item.produceProductTypeCode"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="searchInputs">
                <p style="width: 130px">工序名称</p>
                <el-select v-model="searchForm.gxFk" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in gxOptions"
                            :key="item.specificationID"
                            :label="item.specificationCode + '-' + item.specificationName"
                            :value="item.specificationID"
                    >
                    </el-option>
                </el-select>
            </div>
            <div
                    class="searchInputs" style="width: calc(32% - 10px);"
            >
                <p>周期</p>
                <el-radio-group v-model="searchForm.period">
                    <el-radio v-model="radio" label="1">周别</el-radio>
                    <el-radio v-model="radio" label="2">月别</el-radio>
                    <el-radio v-model="radio" label="3">日别</el-radio>
                </el-radio-group>
            </div>
            <div class="searchDiv3" style="width: calc(18% - 5px);">
                <section class="reset_button" @click="reset()" size="small">
                    重置
                </section>
                <section class="query_button" @click="getMsg" size="small">
                    查询
                </section>
            </div>
        </div>
        <div style="height: 50%; margin-top: 15px" class="all_background">
            <div style="height: 50px" class="searchForm padding">
                <div class="searchInputone" style="width: calc(25% - 10px)">
                    <p style="width: 140px">目标值</p>
                    <el-input v-model="searchForm.target" placeholder="请输入"></el-input>
                </div>
                <div class="searchInputone" style="width: calc(25% - 40px)">
                    <section class="query_button" @click="install" size="small">
                        设置
                    </section>
                </div>
            </div>
            <div style="display: flex; height: calc(100% - 100px)">
                <div style="height: calc(100% - 50px); width: 50%">
                    <div
                            id="twChart"
                            style="width: 100%; height: calc(100% + 0px)"
                            class="twChart"
                    ></div>
                </div>
                <div style="height: calc(100% - 50px); width: 50%">
                    <div
                            id="oneChart"
                            style="width: 100%; height: calc(100% + 0px)"
                            class="oneChart"
                    ></div>
                </div>
            </div>
        </div>
        <div style="height: calc(50% - 200px); margin-top: 15px">
            <div class="baseTable padding">
                <div style="overflow-y: auto">
                    <el-table
                            :data="tableData"
                            style="width: 100%"
                            ref="multipleTable"
                            highlight-current-row
                            :header-cell-style="{
              background: '#1888fa',
              color: '#FFFFFF',
              height: '40px',
            }"
                            show-overflow-tooltip
                            :height="tableHeight"
                            class="table"
                    >
                        <el-table-column
                                type="index"
                                label="序号"
                                align="center"
                                width="80px"
                        ></el-table-column>
                        <el-table-column
                                prop="workshop"
                                label="车间"
                                min-width="120px"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                prop="productionLine"
                                label="产线"
                                min-width="120px"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                prop="productProcess"
                                label="产品工序"
                                min-width="120px"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                prop="project"
                                label="项目"
                                min-width="120px"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                prop="aggregate"
                                label="总计"
                                min-width="120px"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                v-for="(item, key, index) in title"
                                :key="index"
                                :label="item.keyFiled"
                                :prop="item.keyFiled"
                                align="center"
                                min-width="120"
                        >
                            <template slot-scope="scope">{{
                                scope.row.typeValue[key]
                                }}
                            </template>
                            <template scope=""></template>
                        </el-table-column>
                    </el-table>
                </div>
                <div>
                    <page-nation
                            :pageNum="page"
                            :pageSize="pageSize"
                            :total="total"
                            @handleSizeChange="handleSizeChange"
                            @handleCurrentChange="handleCurrentChange"
                    ></page-nation>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import echarts from "echarts";
    import bus from "../../../bus";
    import {
        JHDC_ProductionPATendencyselectPage,
        JCSJ_getVSite,
        JCSJ_getVWorkline,
        JCSJ_getVProducttype,
        JCSJ_getVSpecification
    } from "../../../api/yjl";

    export default {
        data() {
            return {
                radio: "1",
                tableData: [],
                tableHeight: window.innerHeight - 350,
                page: 1,
                pageSize: 10,
                total: 0,
                count: 0,
                status: 0,
                rowData: [],
                cjOptions: [],
                cxOptions: [],
                cpOptions: [],
                gxOptions: [],
                targetarr: [],
                searchForm: {
                    rq: [],
                    cj: "",
                    cx: "",
                    cpmc: "",
                    bc: "",
                    sjd: "ZT",
                    period: '',
                    productionLineFk: '',//产线外键
                    productProcessFk: '',//产品工序外键
                    target: '',//目标值
                    gxFk: '',
                },
                pickerOptions2: {
                    shortcuts: [
                        {
                            text: "最近三个月",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 92);
                                picker.$emit("pick", [start, end]);
                            },
                        },
                        {
                            text: "最近半年",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 184);
                                picker.$emit("pick", [start, end]);
                            },
                        },
                        {
                            text: "最近一年",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                                picker.$emit("pick", [start, end]);
                            },
                        },
                    ],
                },
                sjdOption: [
                    {value: "W", label: "未设置"},
                    {value: "ZT", label: "昨天"},
                    {value: "BZ", label: "本周"},
                    {value: "BY", label: "本月"},
                    {value: "SZ", label: "上周"},
                    {value: "SY", label: "上月"},
                ],
                title: [],
                xZhou: [], //x轴折线图
                jharr: [], //计划折线图
                sjarr: [], //实际折线图
                cyarr: [], //差异折线图
                dclarr: [], //达成率折线图
            };
        },
        mounted() {
            this.searchForm.rq = this.sjjs('ZT')
            this.getMsg();
            this.getcj()
            this.getcp()
            this.getgx()
        },
        methods: {
            reset() {
                this.searchForm.sjd = 'W'
                this.searchForm.rq = []
                this.searchForm.cj = ''
                this.searchForm.period = ''
                this.searchForm.productionLineFk = ''
                this.searchForm.productProcessFk = ''
                this.searchForm.gxFk = ''
                // this.getMsg();
            },
            getcj() {
                JCSJ_getVSite().then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.cjOptions = res.data;
                    }
                });
            },
            getcx() {
                JCSJ_getVWorkline(this.searchForm.cj).then(res => {
                    if (res.code == 200) {
                        this.cxOptions = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            getcp() {
                JCSJ_getVProducttype().then(res => {
                    if (res.code == 200) {
                        this.cpOptions = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            getgx() {
                JCSJ_getVSpecification().then(res => {
                    if (res.code == 200) {
                        this.gxOptions = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                })
            },
            cjSelect() {
                this.cxOptions = []
                this.getcx()
            },
            getMsg() {
                console.log(this.searchForm.rq)
                if (this.searchForm.rq == [] || this.searchForm.rq == null) {
                    this.$message.error('请先选择时间段');
                    return
                }
                if (this.searchForm.rq.length < 1) {
                    this.$message.error('请先选择时间段');
                    return
                }
                //定义局部变量rq为接收查询条件中的时间段，防止为空，后面代码报错
                var startTime = "";
                var endTime = "";
                if (this.searchForm.rq != [] && this.searchForm.rq != "") {
                    startTime = this.searchForm.rq[0];
                    endTime = this.searchForm.rq[1];
                }
                let para = {
                    data: {
                        endTime: endTime,
                        gross: this.searchForm.gross,
                        period: this.searchForm.period,
                        gxFk: this.searchForm.gxFk,
                        productProcessFk: this.searchForm.productProcessFk,
                        productionLineFk: this.productionLineFk,
                        startTime: startTime,
                        workshopFk: this.searchForm.cj,
                    },
                    pageNum: this.page,
                    pageSize: this.pageSize,
                };
                JHDC_ProductionPATendencyselectPage(para).then((res) => {
                    if (res.code == 200) {
                        if (res.data.records.length > 0) {
                            this.tableData = res.data.records;
                            this.total = res.data.total;
                            this.title = res.data.records[0].dynamic;
                            //定义一个数组用来转换图形数据
                            var temporary = res.data.records[0].dynamic;
                            //清空图形展示数据
                            this.jharr = [];
                            this.sjarr = [];
                            this.cyarr = [];
                            this.dclarr = [];
                            this.xZhou = [];
                            for (var i = 0; i < temporary.length; i++) {
                                this.xZhou.push(temporary[i].keyFiled);
                                this.jharr.push(temporary[i].reviewValueB);
                                this.sjarr.push(temporary[i].reviewValueC);
                                this.cyarr.push(temporary[i].reviewValueD);
                                this.dclarr.push(temporary[i].reviewValueE);
                                this.myLine();
                            }
                        }
                    }
                });
            },
            install() {
                var re = /^[0-9]+[0-9]*[0-9]*$/;
                if (re.test(this.searchForm.target)) {
                    if (this.dclarr.length > 0) {
                        this.targetarr = []
                        for (var i = 0; i < this.dclarr.length; i++) {
                            this.targetarr.push(this.searchForm.target)
                        }
                        this.myLine()
                    }

                } else {
                    this.$message.error('目标值应为正整数');
                }

            },
            myLine() {
                //左边的图
                var option = {
                    tooltip: {
                        trigger: "axis",
                    },
                    color: ["#4472C5", "#ED7C30", "#80FF80", "#FF8096", "#800080"],
                    legend: {
                        data: ["计划", "实际", "差异"],
                        textStyle: {
                            //图例文字的样式
                            color: "#E9F4FF",
                            fontSize: 14,
                        },
                        x: "right",
                        y: "top",
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "5%",
                        containLabel: true,
                    },
                    toolbox: {
                        feature: {},
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: this.xZhou,
                        axisLine: {
                            lineStyle: {
                                color: "#E9F4FF",
                                width: 0, //这里是为了突出显示加上的
                            },
                        },
                        //去掉刻度线
                        axisTick: {
                            show: false,
                        },
                    },
                    yAxis: {
                        type: "value",
                        name: '单位:%',
                        axisLine: {
                            lineStyle: {
                                color: "#E9F4FF",
                                width: 0, //这里是为了突出显示加上的
                            },
                            //去掉刻度线
                            axisTick: {
                                show: false,
                            },
                        },
                    },
                    series: [
                        {
                            name: "计划",
                            type: "line",
                            stack: "计划",
                            symbol: "none",
                            data: this.jharr,
                            itemStyle: {
                                normal: {
                                    //color:'#8cd5c2', //改变折线点的颜色
                                    // lineStyle: {
                                    //   color: "#00ff00", //改变折线颜色
                                    // },
                                },
                            },
                        },
                        {
                            name: "实际",
                            type: "line",
                            stack: "实际",
                            symbol: "none",
                            data: this.sjarr,
                        },
                        {
                            name: "差异",
                            type: "line",
                            symbol: "none",
                            stack: "差异",
                            data: this.cyarr,
                        },
                    ],
                };
                //右边的图
                var option2 = {
                    tooltip: {
                        trigger: "axis",
                    },
                    color: ["#4472C5", "#ED7C30", "#80FF80", "#FF8096", "#800080"],
                    legend: {
                        data: ["达成率", "目标值"],
                        textStyle: {
                            //图例文字的样式
                            color: "#E9F4FF",
                            fontSize: 14,
                        },
                        x: "right",
                        y: "top",
                    },
                    grid: {
                        left: "3%",
                        right: "4%",
                        bottom: "5%",
                        containLabel: true,
                    },
                    toolbox: {
                        feature: {},
                    },
                    xAxis: {
                        type: "category",
                        boundaryGap: false,
                        data: this.xZhou,
                        axisLine: {
                            lineStyle: {
                                color: "#E9F4FF",
                                width: 0, //这里是为了突出显示加上的
                            },
                        },
                        //去掉刻度线
                        axisTick: {
                            show: false,
                        },
                    },
                    yAxis: {
                        type: "value",
                        name: '单位:%',
                        min: 0,
                        splitNumber: 5,
                        axisLine: {
                            lineStyle: {
                                color: "#E9F4FF",
                                width: 0, //这里是为了突出显示加上的
                            },
                            //去掉刻度线
                            axisTick: {
                                show: false,
                            },
                        },
                    },
                    series: [
                        {
                            name: "达成率",
                            type: "line",
                            symbol: "none",
                            data: this.dclarr,
                            itemStyle: {
                                //   normal: {
                                //     //color:'#8cd5c2', //改变折线点的颜色
                                //     lineStyle: {
                                //       color: "#00ff00", //改变折线颜色
                                //     },
                                //   },
                            },
                        },
                        {
                            name: "目标值",
                            type: "line",
                            symbol: "none",
                            data: this.targetarr,
                        },
                    ],
                };

                var twChart = echarts.init(document.getElementById("twChart"));
                twChart.setOption(option);
                //     window.onresize = function () {

                // }
                var oneChart = echarts.init(document.getElementById("oneChart"));
                oneChart.setOption(option2);
                window.onresize = function () {
                    oneChart.resize();
                    twChart.resize();
                };
            },
            handleSizeChange(val) {
                this.page = 1
                this.pageSize = val
                this.getMsg()
            },
            handleCurrentChange(val) {
                this.page = val
                this.getMsg()
            },


            //从这开始及后面都是用来计算时间的

            //根据出入的lb判定需要哪种日期再进行返回
            sjjs(lb) {
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
                    var startsj = this.timeD(monday); //将标准时间转换年月日
                    var startime =
                        startsj.year + "-" + startsj.month + "-" + startsj.day + " 00:00:00";
                    var endsj = this.timeD(sunday); //将标准时间转换年月日
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

                    var startsj = this.timeD(firstDay); //将标准时间转换年月日
                    var startime =
                        startsj.year + "-" + startsj.month + "-" + startsj.day + " 00:00:00";
                    var endsj = this.timeD(lastDay); //将标准时间转换年月日
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

                    var startsj = this.timeD(priorWeekFirstDay); //将标准时间转换年月日
                    var startime =
                        startsj.year + "-" + startsj.month + "-" + startsj.day + " 00:00:00";
                    var endsj = this.timeD(priorWeekLastDay); //将标准时间转换年月日
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

                    var startsj = this.timeD(priorMonthFirstDay); //将标准时间转换年月日
                    var startime =
                        startsj.year + "-" + startsj.month + "-" + startsj.day + " 00:00:00";
                    var endsj = this.timeD(priorMonthLastDay); //将标准时间转换年月日
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
            },

            //将标准时间转换年月日格式
            timeD(time) {
                let d = new Date(time),
                    data = {
                        year: d.getFullYear(),
                        month: this.timeP(d.getMonth() + 1),
                        day: this.timeP(d.getDate()),
                        // 'hour': this.timeP(d.getHours()),
                        // 'min': this.timeP(d.getMinutes()),
                        // 'sec': this.timeP(d.getSeconds()),
                    };
                return data;
            },
            timeP(s) {
                return s < 10 ? "0" + s : s;
            },
        },
        watch: {
            "searchForm.sjd": function (val) {
                this.searchForm.rq = this.sjjs(val);
            },
        },
    };
</script>
<style scoped>
    @keyframes show {
        0% {
            opacity: 0;
            left: 532px;
            /* // 从何处开始 */
        }

        100% {
            opacity: 1;
            left: 0;
        }
    }

    @keyframes hide {
        0% {
            opacity: 1;
            left: 0;
        }

        100% {
            opacity: 0;
            left: -532px;
            /* // 从何处开始 */
        }
    }

    .wrap {
        position: relative;
        height: 100%;
    }

    .query >>> .el-input--small .el-input__inner {
        height: 34px !important;
        line-height: 34px !important;
    }

    ul > li > p {
        width: 110px;
        text-align: left;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    .table >>> .has-gutter div {
        white-space: nowrap;
        overflow: hidden;
    }

    .table >>> .has-gutter div:hover {
        width: auto;
    }

    .tableDiv /deep/ .el-table,
    .el-table__expanded-cell {
        background-color: transparent !important;
    }

    .tableDiv /deep/ .el-table tr {
        background-color: transparent !important;
    }

    .tableDiv /deep/ .el-table--enable-row-transition .el-table__body td,
    .el-table .cell {
        background-color: transparent;
    }

    .searchInputone /deep/ .el-range-editor--small .el-range-separator {
        color: #1888fa;
    }

    /* .searchInputone /deep/ .el-checkbox__inner{
            background: #1888fa;
        } */
    .basediv {
        color: #E9F4FF;
        margin-left: 20px;
        margin-top: 10px;
        font-size: 14px;
    }

    .showdiv {
        color: #44D7B6;
        margin-left: 20px;
        margin-top: 5px;
        font-size: 14px;
    }
</style>