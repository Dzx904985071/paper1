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
                <el-select v-model="searchForm.cj" :popper-append-to-body="false" placeholder="请选择" @change="cjSelect">
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
            <div class="searchDiv" style="width: calc(100% - 5px);">
                <section class="reset_button" @click="reset()" size="small">
                    重置
                </section>
                <section class="query_button" @click="getMsg" size="small">
                    查询
                </section>
            </div>
        </div>
        <div style=" margin-top: 15px" class="baseChart all_background">
            <div class="flex">
                        <div class="text weight" style="padding-left: 15px;padding-bottom: 5px">趋势图</div>
                        <div style="margin-left: 5px"><img src="../../../assets/img/dian.png" alt="image"
                                                           style="height: 4px;"/></div>
                    </div>
            <div style="display: flex; height: calc(100% - 10px)">
                <div style="height: calc(100% - 50px); width: 50%">
                    <div
                            id="twChart"
                            style="width: 100%; height: 255px"
                            class="twChart"
                    ></div>
                </div>
                <div style="height: calc(100% - 50px); width: 50%">
                    <div
                            id="oneChart"
                            style="width: 100%; height: 255px"
                            class="oneChart"
                    ></div>
                </div>
            </div>
        </div>
        <div style="margin-top: 15px">
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
                                min-width="130px"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                prop="productsProcesses"
                                label="产品工序"
                                min-width="130px"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                prop="item"
                                label="项目"
                                min-width="130px"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                prop="total"
                                label="总计"
                                min-width="120px"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                v-for="(item, index) in title"
                                :key="index"
                                :label="item.keyFiled"
                                :prop="item.keyFiled"
                                align="center"
                                min-width="120"
                        >
                            <template slot-scope="scope">
                                    <span>{{scope.row.typeValue[index]}}</span>
                                </template>
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
        CKGL_kilnselectList,
        JCSJ_getVSite,
        JCSJ_getVWorkline,
    } from "../../../api/yjl";
    import { sjjs } from '../../common/sjd'
    export default {
        data() {
            return {
                test:[1,2,3,4,5],
                radio: "1",
                tableData: [],
                tableHeight: window.innerHeight - 580,
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
            this.searchForm.rq = sjjs('ZT')
            this.getMsg();
            this.getcj()
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
                        jssj: endTime,
                        xb: this.searchForm.productionLineFk,
                        kssj: startTime,
                        cj: this.searchForm.cj,
                    },
                    pageNum: this.page,
                    pageSize: this.pageSize,
                };
                CKGL_kilnselectList(para).then((res) => {
                    if (res.code == 200) {
                        if (res.data.records.length > 0) {
                            this.tableData = res.data.records;
                            this.total = res.data.total;
                            this.title = res.data.records[0].dynamic;
                            //定义一个数组用来转换图形数据
                            let temporary = res.data.records[0].dynamic;
                            //清空图形展示数据
                            this.jharr = [];//窑炉产出数的重量
                            this.sjarr = [];//目标值
                            this.cyarr = [];//窑炉产出率
                            this.dclarr = [];//目标值
                            this.xZhou = [];
                            for (var i = 0; i < temporary.length; i++) {
                                this.xZhou.push(temporary[i].keyFiled);
                                this.jharr.push(temporary[i].reviewValueB);
                                this.sjarr.push(temporary[i].reviewValueC);
                                this.cyarr.push(temporary[i].reviewValueD);
                                this.dclarr.push(temporary[i].reviewValueE);
                            }
                            this.myLine();
                        }
                    }
                });
            },
            myLine() {
                //左边的图
                var option = {
                    tooltip: {
                        trigger: "axis",
                    },
                    color: ["#4472C5", "#44D7B6", "#80FF80", "#FF8096", "#800080"],
                    legend: {
                        data: ["窑炉产出数的重量", "目标值"],
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
                        boundaryGap: true,
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
                            name: "窑炉产出数的重量",
                            type: "bar",
                            stack: "窑炉产出数的重量",
                            symbol: "none",
                            barWidth: 30, //柱图宽度
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
                            name: "目标值",
                            type: "line",
                            stack: "目标值",
                            symbol: "none",
                            data: this.sjarr,
                            itemStyle: {
                                normal: {
                                    //color:'#8cd5c2', //改变折线点的颜色
                                    // lineStyle: {
                                    //   color: "#00ff00", //改变折线颜色
                                    // },
                                },
                            },
                        },                   
                    ],
                };
                //右边的图
                var option2 = {
                    tooltip: {
                        trigger: "axis",
                    },
                    color: ["#F7B500", "#44D7B6", "#80FF80", "#FF8096", "#800080"],
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
                            data: this.cyarr,
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
                            data: this.dclarr,
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
        },
        watch: {
            "searchForm.sjd": function (val) {
                this.searchForm.rq = sjjs(val);
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