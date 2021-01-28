<template>
    <div style="height:100%;width:100%;" class="table">
        <div class="searchForm padding">
            <div class="searchInput" style="width: calc(50% - 10px)">
                <p>日期</p>
                <el-date-picker
                        v-model="searchForm.rq"
                        type="daterange"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                </el-date-picker>
            </div>
            <div class="searchInput">
                <p>车间</p>
                <el-select
                        :popper-append-to-body="false"
                        v-model="searchForm.cj"
                        placeholder="请选择"
                        @change="cjSelect"
                >
                    <el-option
                            v-for="item in cjOptions"
                            :key="item.siteId"
                            :label="item.siteCode+'-'+item.siteName"
                            :value="item.siteId">
                    </el-option>
                </el-select>
            </div>
            <div class="searchInput">
                <p>产线</p>
                <el-select v-model="searchForm.cx" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in cxOptions"
                            :key="item.workcenterId"
                            :label="item.workLineCode + '-' + item.workLineName"
                            :value="item.workcenterId"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="searchInput">
                <p>产品</p>
                <el-select v-model="searchForm.cp" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in cpOptions"
                            :key="item.productCode"
                            :label="item.productCode + '-' + item.productName"
                            :value="item.productName"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="searchInput">
                <p>批次类型</p>
                <el-select v-model="searchForm.pclx" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in pclxOptions"
                            :key="item.piciTypeCode"
                            :label="item.piciTypeCode + '-' + item.piciTypeName"
                            :value="item.piciTypeCode"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="searchInput">
                <p>夜/白班</p>
                <el-radio-group v-model="searchForm.bc">
                    <el-radio :label="0">夜班</el-radio>
                    <el-radio :label="1">白班</el-radio>
                </el-radio-group>
            </div>
            <div class="searchDiv">
                <section class="reset_button" @click="reset" size="small">
                    重置
                </section>
                <section class="query_button" @click="getMsg" size="small">
                    查询
                </section>
            </div>
        </div>
        <div class="baseLine"></div>
        <div class="baseTable padding">
            <div style="overflow-y:auto;">
                <el-table
                        :data="tableData"
                        style="width: 100%;"
                        ref="multipleTable"
                        highlight-current-row
                        @row-click="openDetails"
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
                            prop="lines"
                            label="线别"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="pcType"
                            label="批次类型"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="date"
                            label="日期"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="shift"
                            label="班次"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="type"
                            label="类型"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop=""
                            label="分时段"
                            show-overflow-tooltip
                    >
                        <el-table-column
                                v-for="(item,index) in dynamic"
                                :key="index"
                                :prop="item.keyFiled"
                                :label="item.keyFiled"
                                width="120"
                        >
                            <template slot-scope="scope">
                                <span>{{scope.row.typeValue[index]}}</span>
                            </template>
                        </el-table-column>
                    </el-table-column>
                    <el-table-column
                            prop=""
                            label="分时段累计"
                            show-overflow-tooltip
                    >
                        <el-table-column
                                v-for="(item,index) in dynamicList"
                                :key="index"
                                :prop="item.keyFiled"
                                :label="item.keyFiled"
                                width="120"
                        >
                            <template slot-scope="scope">
                                <span>{{scope.row.typeValueList[index]}}</span>
                            </template>
                        </el-table-column>
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
</template>

<script>
    import bus from "../../../bus";
    import {JCSJ_getVWorkline} from "../../../api/index.js";
    import {JCSJ_getPicitype} from "../../../api/index.js";
    import {JCSJ_getVSite} from "../../../api/index.js";
    import {CPCCselectQuery, getProductproducecp} from "../../../api/model.js";

    export default {
        data() {
            return {
                tableData: [],
                tableHeight: window.innerHeight - 320,
                page: 1,
                pageSize: 10,
                count: 0,
                status: 0,
                rowData: [],
                dynamic: [],
                dynamicList: [],
                cjOptions: [],
                cxOptions: [],
                pclxOptions: [],
                cpOptions: [],
                searchForm: {
                    rq: "",
                    sjd: 'ZT',
                    cjmc: "",
                    cj: "",
                    cx: "",
                    pclx: "",
                    cpmc: "",
                    bc: "",
                    cp: "",
                },
                currentPage: 0,
                total: 0,
                sjdOption: [{value: "W", label: "未设置"}, {value: "ZT", label: "昨天"}, {
                    value: "BZ",
                    label: "本周"
                }, {value: "BY", label: "本月"},
                    {value: "SZ", label: "上周"}, {value: "SY", label: "上月"},],
                pickerOptions: {
                    shortcuts: [
                        {
                            text: "最近三个月",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 92
                                );
                                picker.$emit("pick", [start, end]);
                            },
                        },
                        {
                            text: "最近半年",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 184
                                );
                                picker.$emit("pick", [start, end]);
                            },
                        },
                        {
                            text: "最近一年",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 365
                                );
                                picker.$emit("pick", [start, end]);
                            },
                        },
                    ],
                },
                whsj: new Date(),
                disabled: false,
            };
        },
        created() {
            this.searchForm.rq = this.sjjs('ZT')
            this.getCP();
            this.getMsg();
        },
        mounted() {
            this.getCJLB();
            this.getcjOptions();
            this.getCXLB();
            this.getPCLX();
        },
        methods: {
            reset() {
                this.searchForm = {
                    rq: "",
                    sjd: '',
                    cjmc: "",
                    cj: "",
                    cx: "",
                    pclx: "",
                    cpmc: "",
                    bc: "",
                    cp: "",
                }
                // this.getMsg()
            },
            getCP() {
                getProductproducecp().then(res => {
                    if (res.code === 200) {
                        this.cpOptions = res.data
                    }
                })
            },
            getcjOptions() {//车间接口
                JCSJ_getVSite().then((res) => {
                    if (res.code == 200) {
                        this.cjOptions = res.data;
                    }
                })
            },
            getMsg() {
                if (this.searchForm.rq == [] || this.searchForm.rq == null || this.searchForm.rq == '') {
                    this.$message.error('请先选择日期');
                    return
                }
                const para = {
                    data: {
                        bc: this.searchForm.bc,
                        cjmc: this.searchForm.cjmc,
                        cp: this.searchForm.cp,
                        cx: this.searchForm.cx,
                        // "lb": "string",
                        pclx: this.searchForm.pclx,
                        // "sjlb": "string",
                        startTime: this.searchForm.rq ? this.searchForm.rq[0] : '',
                        entTime: this.searchForm.rq ? this.searchForm.rq[1] : '',
                    },
                    pageNum: this.page,
                    pageSize: this.pageSize,
                };
                this.total = 0
                this.dynamic = []
                this.dynamicList = []
                this.tableData = []
                CPCCselectQuery(para).then(res => {
                    if (res.code === 200) {
                        this.tableData = res.data.records
                        if (res.data.records) {
                            if (res.data.records[0].dynamic) {
                                this.dynamic = res.data.records[0].dynamic
                            }
                            if (res.data.records[0].dynamicList) {
                                this.dynamicList = res.data.records[0].dynamicList
                            }
                        }
                        this.total = res.data.total
                    }
                })
            },
            // 车间接口
            getCJLB() {
                JCSJ_getVSite().then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.cjOptions = res.data;
                    }
                });
            },
            cjSelect() {
                this.cjOptions.forEach(item => {
                    if (item.siteId === this.searchForm.cj) {
                        this.searchForm.cjmc = item.siteName
                    }
                })
                this.getCXLB();
            },
            // 产线接口
            getCXLB() {
                let cjId = this.searchForm.cj;
                JCSJ_getVWorkline(cjId).then((res) => {
                    if (res.code == 200) {
                        this.cxOptions = res.data;
                    }
                });
            },
            getPCLX() {
                JCSJ_getPicitype().then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.pclxOptions = res.data;
                    }
                });
            },
            handleSizeChange(val) {
                this.page = 1;
                this.pageSize = val;
                this.getMsg();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getMsg();
            },
            openDetails(row, selected) {
                if (this.rowData.length >= 1) {
                    this.$refs.multipleTable.clearSelection();
                    this.$refs.multipleTable.toggleRowSelection(row);
                } else {
                    this.$refs.multipleTable.toggleRowSelection(row);
                }
                this.b_VehicleClassOID = row.b_VehicleClassOID;
            },
            selectRow(selection, row) {
                // console.log(selection) //复选框选中行
                this.rowData = selection;
            },
            selectAll(selection) {
                this.rowData = selection;
            },
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
                    var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
                    //本周 周日
                    var sunday = new Date(monday.getTime() + (6 * millisecond));
                    //添加本周时间
                    var startsj = this.timeD(monday)//将标准时间转换年月日
                    var startime = startsj.year + '-' + startsj.month + '-' + startsj.day + ' 00:00:00'
                    var endsj = this.timeD(sunday)//将标准时间转换年月日
                    var endtime = endsj.year + '-' + endsj.month + '-' + endsj.day + ' 23:59:59'
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

                    var startsj = this.timeD(firstDay)//将标准时间转换年月日
                    var startime = startsj.year + '-' + startsj.month + '-' + startsj.day + ' 00:00:00'
                    var endsj = this.timeD(lastDay)//将标准时间转换年月日
                    var endtime = endsj.year + '-' + endsj.month + '-' + endsj.day + ' 23:59:59'
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
                    var currentWeekDayOne = new Date(currentDate.getTime() - (millisecond * minusDay));
                    //上周最后一天即本周开始的前一天
                    var priorWeekLastDay = new Date(currentWeekDayOne.getTime() - millisecond);
                    //上周的第一天
                    var priorWeekFirstDay = new Date(priorWeekLastDay.getTime() - (millisecond * 6));

                    var startsj = this.timeD(priorWeekFirstDay)//将标准时间转换年月日
                    var startime = startsj.year + '-' + startsj.month + '-' + startsj.day + ' 00:00:00'
                    var endsj = this.timeD(priorWeekLastDay)//将标准时间转换年月日
                    var endtime = endsj.year + '-' + endsj.month + '-' + endsj.day + ' 23:59:59'

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

                    var startsj = this.timeD(priorMonthFirstDay)//将标准时间转换年月日
                    var startime = startsj.year + '-' + startsj.month + '-' + startsj.day + ' 00:00:00'
                    var endsj = this.timeD(priorMonthLastDay)//将标准时间转换年月日
                    var endtime = endsj.year + '-' + endsj.month + '-' + endsj.day + ' 23:59:59'

                    startStop.push(startime);
                    startStop.push(endtime);
                    //返回
                    return startStop;
                } else if (lb == "ZT") {
                    var timenow = new Date();
                    timenow.setDate(timenow.getDate() - 1); //设置天数 -1 天，昨天的日期
                    var y = timenow.getFullYear();//年
                    var m = timenow.getMonth() + 1;//月
                    m = m < 10 ? '0' + m : m;
                    var d = timenow.getDate();//日
                    d = d < 10 ? ('0' + d) : d;
                    var yesterdayTime = y + '-' + m + '-' + d;//字符串拼接成自己想要的时间格式，现在是yyyy/mm/dd格式
                    startStop.push(yesterdayTime + ' 00:00:00')
                    startStop.push(yesterdayTime + ' 23:59:59')
                    return startStop;
                } else {
                    return [];
                }
            },
            timeD(time) {
                let d = new Date(time),
                    data = {
                        year: d.getFullYear(),
                        month: this.timeP(d.getMonth() + 1),
                        day: this.timeP(d.getDate()),
                        // 'hour': this.timeP(d.getHours()),
                        // 'min': this.timeP(d.getMinutes()),
                        // 'sec': this.timeP(d.getSeconds()),
                    }
                return data;
            },
            timeP(s) {
                return s < 10 ? '0' + s : s
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

    .div1 /deep/ .el-dialog__header {
        background: #2581de !important;
        height: 23px;
        padding: 18px 0px 16px 20px;
        font-size: 16px;
        color: #ffffff !important;
    }

    .div1 /deep/ .el-dialog__title {
        font-size: 16px;
        color: #ffffff !important;
    }

    .div1 >>> .el-input--small .el-input__inner {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }

    /* .tableDiv /deep/ .el-table--fit{
        padding: 20px;
    } */
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
</style>
