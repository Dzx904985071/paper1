<template>
    <div style="height:100%;width:100%;" class="table">
        <div class="searchForm padding">
            <div class="searchInputs" style="width: calc(50% - 10px)">
                <p>时间段</p>
                <el-select
                        v-model="searchForm.sjd"
                        clearable
                        placeholder="请选择"
                        :popper-append-to-body="false"
                        style="width: calc(30% + 110px);"
                >
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
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                        align="right"
                        style="width: 70%;"
                >
                </el-date-picker>
            </div>
            <div class="searchInputs">
                <p>车间</p>
                <el-select
                        v-model="searchForm.cj"
                        placeholder="请选择"
                        @change="cjSelect"
                        :popper-append-to-body="false"
                >
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
                <el-select v-model="searchForm.cx" placeholder="请选择" :popper-append-to-body="false">
                    <el-option
                            v-for="item in cxOptions"
                            :key="item.workcenterId"
                            :label="item.workLineCode + '-' + item.workLineName"
                            :value="item.workcenterId"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="searchInputs">
                <p>产品名称</p>
                <el-input v-model="searchForm.cpmc"></el-input>
            </div>
            <div class="searchInputs">
                <p>班次</p>
                <el-checkbox v-model="searchForm.bc"></el-checkbox>
            </div>
            <div class="searchDiv3">
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
                        @select="selectRow"
                        @select-all="selectAll"
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
                            prop="number"
                            label="序号"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="workshop"
                            label="车间"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="production"
                            label="产线"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="productsProcesses"
                            label="产品及工序"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="item"
                            label="项目"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="productName"
                            label="产品名称"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            v-for="(item, index) in dynamicList"
                            :key="index"
                            :prop="item.keyFiled"
                            :label="item.keyFiled"
                            width="120"
                    >
                        <template slot-scope="scope">
                            <span>{{ scope.row.typeValueList[index] }}</span>
                        </template>
                    </el-table-column>
                    <!--                            <el-table-column label="经销商" align="left" width="150px">-->
                    <!--                                <template slot-scope="scope">-->
                    <!--                                    <el-checkbox v-model="scope.row.jxs" :true-label="1" :false-label="0"></el-checkbox>-->
                    <!--                                </template>-->
                    <!--                            </el-table-column>-->
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
    import {JCSJ_getVSite} from "../../../api/index.js";
    import {JCSJ_getVWorkline} from "../../../api/index.js";
    import {JHDC_selectTreasury} from "../../../api/index.js";

    export default {
        data() {
            return {
                tableData: [],
                tableHeight: window.innerHeight - 280,
                page: 1,
                pageSize: 10,
                count: 0,
                status: 0,
                rowData: [],
                dynamicList: [],
                cjOptions: [],
                cxOptions: [],
                searchForm: {
                    sjd: "ZT",
                    rq: "",
                    cj: "",
                    cx: "",
                    cpmc: "",
                    bc: false,
                },
                currentPage: 0,
                total: 0,
                sjdOption: [
                    {value: "W", label: "未设置"},
                    {value: "ZT", label: "昨天"},
                    {
                        value: "BZ",
                        label: "本周",
                    },
                    {value: "BY", label: "本月"},
                    {value: "SZ", label: "上周"},
                    {value: "SY", label: "上月"},
                ],
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
            this.buttonxs();
            this.getMsg();
        },
        mounted() {
            this.getCJLB();
            // this.getCXLB();
        },
        methods: {
            reset() {
                this.searchForm = {
                    sjd: "",
                    rq: "",
                    cj: "",
                    cx: "",
                    cpmc: "",
                    bc: false,
                };
                this.getMsg();
            },
            buttonxs() {
            },
            // 车间接口
            getCJLB() {
                JCSJ_getVSite().then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.cjOptions = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            cjSelect() {
                this.getCXLB();
            },
            // 产线接口
            getCXLB() {
                let cjId = this.searchForm.cj;
                JCSJ_getVWorkline(cjId).then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.cxOptions = res.data;
                    } else {
                        this.$message.error(res.msg);
                    }
                });
            },
            getMsg() {
                if (
                    this.searchForm.rq == [] ||
                    this.searchForm.rq == null ||
                    this.searchForm.rq == ""
                ) {
                    this.$message.error("请先选择时间段");
                    return;
                }
                const para = {
                    data: {
                        productName: this.searchForm.cpmc,
                        productionLineFk: this.searchForm.cx,
                        workshopFk: this.searchForm.cj,
                        startTime: this.searchForm.rq ? this.searchForm.rq[0] : "",
                        entTime: this.searchForm.rq ? this.searchForm.rq[1] : "",
                        classes: this.searchForm.bc,
                    },
                    pageNum: this.page,
                    pageSize: this.pageSize,
                };
                this.tableData = [];
                this.dynamicList = [];
                JHDC_selectTreasury(para).then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.tableData = res.data.records;
                        if (this.tableData.length > 0) {
                            this.dynamicList = this.tableData[0].dynamicList;
                        }
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
                    var monday = new Date(
                        currentDate.getTime() - minusDay * millisecond
                    );
                    //本周 周日
                    var sunday = new Date(monday.getTime() + 6 * millisecond);
                    //添加本周时间
                    var startsj = this.timeD(monday); //将标准时间转换年月日
                    var startime =
                        startsj.year +
                        "-" +
                        startsj.month +
                        "-" +
                        startsj.day +
                        " 00:00:00";
                    var endsj = this.timeD(sunday); //将标准时间转换年月日
                    var endtime =
                        endsj.year +
                        "-" +
                        endsj.month +
                        "-" +
                        endsj.day +
                        " 23:59:59";
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
                        startsj.year +
                        "-" +
                        startsj.month +
                        "-" +
                        startsj.day +
                        " 00:00:00";
                    var endsj = this.timeD(lastDay); //将标准时间转换年月日
                    var endtime =
                        endsj.year +
                        "-" +
                        endsj.month +
                        "-" +
                        endsj.day +
                        " 23:59:59";
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
                        startsj.year +
                        "-" +
                        startsj.month +
                        "-" +
                        startsj.day +
                        " 00:00:00";
                    var endsj = this.timeD(priorWeekLastDay); //将标准时间转换年月日
                    var endtime =
                        endsj.year +
                        "-" +
                        endsj.month +
                        "-" +
                        endsj.day +
                        " 23:59:59";

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
                    var days =
                        (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);

                    //获得上一个月的第一天
                    var priorMonthFirstDay = new Date(currentYear, currentMonth, 1);
                    //获得上一月的最后一天
                    var priorMonthLastDay = new Date(
                        currentYear,
                        currentMonth,
                        days
                    );
                    //添加至数组

                    var startsj = this.timeD(priorMonthFirstDay); //将标准时间转换年月日
                    var startime =
                        startsj.year +
                        "-" +
                        startsj.month +
                        "-" +
                        startsj.day +
                        " 00:00:00";
                    var endsj = this.timeD(priorMonthLastDay); //将标准时间转换年月日
                    var endtime =
                        endsj.year +
                        "-" +
                        endsj.month +
                        "-" +
                        endsj.day +
                        " 23:59:59";

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
