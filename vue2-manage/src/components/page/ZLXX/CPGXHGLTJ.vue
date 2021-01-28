<template>
    <div style="height: 100%; width: 100%" class="table">
        <div class="searchForm padding">
            <div class="searchInput">
                <p>日期</p>
                <el-date-picker
                        v-model="searchForm.rq"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right"
                >
                </el-date-picker>
            </div>
            <div class="searchInput">
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
            <div class="searchInput">
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
            <div class="searchInput">
                <p>周期</p>
                <el-radio-group v-model="searchForm.period">
                    <el-radio v-model="radio" label="1">周别</el-radio>
                    <el-radio v-model="radio" label="2">月别</el-radio>
                    <el-radio v-model="radio" label="3">日别</el-radio>
                </el-radio-group>
            </div>
            <div class="searchInput">
                <p>工序名称</p>
                <el-select v-model="searchForm.productProcessFk" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in gxOptions"
                            :key="item.specificationRootId"
                            :label="item.specificationName"
                            :value="item.specificationRootId"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="searchDiv3-2" style="width:calc(33% - 2px)">
                <section class="reset_button" @click="reset()" size="small">
                    重置
                </section>
                <section class="query_button" @click="getMsg()" size="small">
                    查询
                </section>
            </div>
        </div>
        <div style="height: 40%; margin-top: 15px" class="all_background">
            <div style="height: 50px" class="searchForm padding">
                <div class="flex" style="margin-bottom: 5px">
                    <div class="text weight" style="padding-left: 5px;padding-bottom: 5px">合格率趋势</div>
                    <div style="margin-left: 5px"><img src="../../../assets/img/dian.png" alt="image"
                                                       style="height: 4px;"/></div>
                </div>
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
            <div style="height: calc(100% - 100px); width: 100%">
                <div
                        id="twChart"
                        style="width: 100%; height: calc(100% + 0px)"
                        class="twChart"
                ></div>
            </div>
        </div>
        <div style="height: calc(60% - 160px);  margin-top: 15px" class="all_background">
            <div class="baseTable padding">
                <div style="overflow-y: auto; ">
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
                            :height='tableHeight'
                            class="table"
                    >
                        <el-table-column
                                type="index"
                                label="序号"
                                align="center"
                                width="60"
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
                                prop="productName"
                                label="产品名称"
                                min-width="120px"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                prop="productDescription"
                                label="产品描述"
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
                                prop="total"
                                label="合计"
                                min-width="120px"
                                show-overflow-tooltip
                        ></el-table-column>
                        <el-table-column
                                v-for="(item,key,index) in title"
                                :key="index"
                                :label="item.keyFiled"
                                :prop="item.keyFiled"
                                align="center"
                                min-width="150"
                        >
                            <template slot-scope="scope">{{ scope.row.typeValue[key] }}</template>
                            <template scope="">

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
    import {
        ZLXX_processselectPage,
        JCSJ_getVSite,
        JCSJ_getVWorkline,
        JCSJ_getVSpecification
    } from "../../../api/yjl.js";
    import echarts from "echarts";

    export default {
        data() {
            return {
                tableHeight: window.innerHeight - 350,
                radio: '1',
                searchForm: {
                    rq: [],
                    cj: "",
                    cx: "",
                    cpmc: "",
                    bc: "",
                    sjd: "W",
                    productionLineFk: '',
                    productProcessFk: '',
                    period: '',
                    target: '',
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
                page: 1,
                pageSize: 10,
                total: 0,
                cjOptions: [],
                cxOptions: [],
                gxOptions: [],
                tableData: [],
                title: [],
                hglarr: [],
                xZhou: [],
                targetarr: [],
            };
        },
        mounted() {
            this.timeNow()
            this.getMsg();
            this.getcj()
            this.getgx()
        },
        methods: {
            timeNow() {
                this.searchForm.rq = []
                var d = new Date(), str = '';
                str += d.getFullYear() + '-';
                str += d.getMonth() + 1 + '-';
                str += d.getDate();
                this.searchForm.rq.push(str)
                this.searchForm.rq.push(str)
            },
            install() {
                var re = /^[0-9]+[0-9]*[0-9]*$/;
                if (re.test(this.searchForm.target)) {
                    if (this.xZhou.length > 0) {
                        this.targetarr = []
                        for (var i = 0; i < this.xZhou.length; i++) {
                            this.targetarr.push(this.searchForm.target)
                        }
                        this.myLine()
                    }

                } else {
                    this.$message.error('目标值应为正整数');
                }
            },
            getgx() {
                JCSJ_getVSpecification().then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.gxOptions = res.data;
                    }
                });
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
            reset() {
                this.searchForm.rq = []
                this.searchForm.period = ''
                this.searchForm.productProcessFk = ''
                this.searchForm.productionLineFk = ''
                this.searchForm.cj = ''
            },
            getMsg() {
                var startTime = "";
                var endTime = "";
                if (this.searchForm.rq === null) {
                    this.$message.error('请先选择日期')
                }
                if (this.searchForm.rq != [] && this.searchForm.rq != "") {
                    startTime = this.searchForm.rq[0];
                    endTime = this.searchForm.rq[1];
                }
                const para = {
                    data: {
                        endTime: endTime,
                        period: this.searchForm.period,
                        productFk: '',
                        productProcessFk: this.searchForm.productProcessFk,
                        productionLineFk: this.searchForm.productionLineFk,
                        startTime: startTime,
                        workshopFk: this.searchForm.cj
                    },
                    pageNum: this.page,
                    pageSize: this.pageSize,
                }
                ZLXX_processselectPage(para).then(res => {
                    if (res.code == 200) {
                        this.tableData = res.data.records
                        this.total = res.data.total
                        this.hglarr = []
                        if (res.data.records.length > 0) {
                            this.title = res.data.records[0].dynamic
                            this.hglarr = res.data.records[0].typeValue
                            this.xZhou = []

                            for (var i = 0; i < this.title.length; i++) {
                                this.xZhou.push(this.title[i].keyFiled)
                            }
                            this.myLine()
                        }
                    } else {

                    }
                })
            },
            myLine() {
                var option = {
                    tooltip: {
                        trigger: "axis",
                    },
                    color: ["#4472C5", "#ED7C30", "#80FF80", "#FF8096", "#800080"],
                    legend: {
                        data: ["合格率", "目标值"],
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
                            name: "合格率",
                            type: "line",
                            stack: "合格率",
                            symbol: "none",
                            data: this.hglarr,
                            itemStyle: {
                                // normal: {
                                //   //color:'#8cd5c2', //改变折线点的颜色
                                //   lineStyle: {
                                //     color: "#00ff00", //改变折线颜色
                                //   },
                                // },
                            },
                        },
                        {
                            name: "目标值",
                            type: "line",
                            symbol: "none",
                            stack: "目标值",
                            data: this.targetarr,
                        },
                    ],
                };
                var twChart = echarts.init(document.getElementById("twChart"));
                twChart.setOption(option);
                window.onresize = function () {
                    twChart.resize();
                };
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