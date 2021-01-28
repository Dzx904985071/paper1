<template>
    <div style="height:100%;width:100%;" class="table">
        <div class="searchForm padding">
            <div class="searchInput">
                <p>客户名称</p>
                <el-input v-model="cxkhmc"></el-input>
            </div>
            <div class="searchInput">
                <p>客户名称</p>
                <el-input v-model="cxkhmc"></el-input>
            </div>
            <div class="searchInput">
                <p>客户名称</p>
                <el-input v-model="cxkhmc"></el-input>
            </div>
            <div class="searchInput">
                <p>客户</p>
                <el-input v-model="cxkhmc"></el-input>
            </div>
            <div class="searchInput">
                <p>时间</p>
                <el-date-picker
                        v-model="cxkhmc"
                        type="datetime"
                        placeholder="选择日期时间"
                        align="right"
                        :picker-options="pickerOptions">
                </el-date-picker>
            </div>
            <div class="searchInput">
                <p>时间段</p>
                <el-date-picker
                        v-model="cxkhmc"
                        type="datetimerange"
                        :picker-options="pickerOptions2"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
                </el-date-picker>
            </div>
            <div class="searchDiv">
                <section class="reset_button" @click="getMsg" size="small">重置</section>
                <section class="query_button" @click="getMsg" size="small">查询</section>
            </div>
        </div>
        <div class="baseLine"></div>
        <div class="baseChart padding">
            <div id="zxChart" style="width: 100%;height: 200px;"></div>
        </div>
        <div class="baseLine"></div>
        <div class="baseTable padding">
            <transition name="show">
                <div key="0" v-if="count === 0">
                    <div style="overflow-y:auto;margin-top:20px">
                        <el-table :data="tableData" style="width: 100%;" ref="multipleTable" @select="selectRow"
                                  @select-all="selectAll"
                                  highlight-current-row @selection-change="handleSelectionChange"
                                  @row-click="openDetails"
                                  :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                                  show-overflow-tooltip
                                  :height='tableHeight' class="table">
                            <el-table-column type="selection" min-width="5%" show-overflow-tooltip></el-table-column>
                            <el-table-column type="index" label="序号" width="70%"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="khbm" label="客户编码" width="150px"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="khmc" label="客户名称" width="200px"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="khjc" label="客户简称" width="200px"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="dwdz" label="单位地址" min-width="200px"
                                             show-overflow-tooltip></el-table-column>
                            <!-- <el-table-column prop="ywmc" label="英文名称" min-width="10%" show-overflow-tooltip></el-table-column> -->
                            <el-table-column prop="lxr" label="联系人" width="150px"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="lxdh" label="联系电话" width="150px"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column label="经销商" align="left" width="150px">
                                <template slot-scope="scope">
                                    <el-checkbox v-model="scope.row.jxs" :true-label="1" :false-label="0"></el-checkbox>
                                </template>
                            </el-table-column>
                            <!-- <el-table-column prop="jxs" label="经销商" min-width="10%" show-overflow-tooltip :formatter="judge"></el-table-column> -->
                            <el-table-column fixed="right" align="left" label="操作" width="150px">
                                <template slot-scope="scope">
                                    <el-button style="color:#FF9E36;font-size:14px" type="text" size="mini"
                                               @click="editList(scope.$index, scope.row)">编辑
                                    </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                    <div>
                        <page-nation :pageNum="page" :pageSize="pageSize" :total="total"
                                     @handleSizeChange="handleSizeChange"
                                     @handleCurrentChange="handleCurrentChange"></page-nation>
                    </div>
                </div>

            </transition>
        </div>

    </div>
</template>

<script>
    import bus from '../../bus'

    export default {
        data() {
            return {
                tableData: [],
                tableHeight: window.innerHeight - 600,
                page: 1,
                pageSize: 10,
                count: 0,
                status: 0,
                rowData: [],
                currentPage: 0,
                username: '',
                total: 0,
                khbmDisabled: false,
                pickerOptions: {
                    shortcuts: [
                        {
                            text: '今天',
                            onClick(picker) {
                                picker.$emit('pick', new Date().getYear() + new Date().getMonth())
                            }
                        },
                        {
                            text: '昨天',
                            onClick(picker) {
                                const date = new Date()
                                date.setTime(date.getTime() - 3600 * 1000 * 24)
                                picker.$emit('pick', date)
                            }
                        },
                        {
                            text: '一周前',
                            onClick(picker) {
                                const date = new Date()
                                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
                                picker.$emit('pick', date)
                            }
                        }
                    ]
                },
                pickerOptions2: {
                    shortcuts: [
                        {
                            text: '最近三个月',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 92);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '最近半年',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 184);
                                picker.$emit('pick', [start, end]);
                            }
                        },
                        {
                            text: '最近一年',
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                                picker.$emit('pick', [start, end]);
                            }
                        }
                    ]
                },
                whsj: new Date(),
                checkTy: true,
                tybz: false,
                deledhist: [],
                disabled: false,
                checkQy: false,
                centerDialogVisible: false,
                khbm: '',
                khmc: '',
                khjc: '',
                code: '',
                dwdz: '',
                lxr: '',
                lxdh: '',
                jxs: '',
                cxkhmc: '',
                clientOid: '',
                bjtc: false,
                tjanxx: false,
                cxanxx: false,
                scanxx: false
            }
        },
        created() {
            this.buttonxs()
            this.getMsg()
        },
        mounted() {
            this.chart()
        },
        methods: {
            buttonxs() {
            },
            getMsg() {
            },
            chart() {
                let myChart = this.$echarts.init(document.getElementById('zxChart'))
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'axis',
                    },
                    legend: {
                        data: [
                            {name: '计划生产值', textStyle: {color: '#ffffff'}},
                            {name: '实际生产值', textStyle: {color: '#ffffff'}}
                        ],
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {},
                        }
                    },
                    grid: {
                        left: '6%',
                        right: '6%',
                        bottom: '2%',
                        height: '92%',
                        width: '88%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['11-08周日', '11-09周一', '11-10周二', '11-11周三', '11-12周四', '11-13周五', '11-14周六'],
                            axisLine: {
                                lineStyle: {
                                    color: '#ffffff'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            //axisPointer:{show:false},
                            type: 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#ffffff'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name: '计划生产值',
                            type: 'line',
                            stack: '总量',
                            smooth: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            lineStyle: {
                                color: "rgb(24,144,255)"
                            },
                            itemStyle: {
                                color: "rgb(24,144,255)",
                                borderType: "solid",
                                borderColor: "rgb(24,144,255)",
                            },
                            data: [150, 232, 201, 154, 190, 330, 410]
                        }, {
                            name: '实际生产值',
                            type: 'line',
                            stack: '总量',
                            smooth: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            lineStyle: {
                                color: "rgb(236,110,50)"
                            },
                            itemStyle: {
                                color: "rgb(236,110,50)",
                                borderType: "solid",
                                borderColor: "rgb(236,110,50)",
                            },
                            data: [820, 932, 901, 934, 1290, 1330, 1320]
                        }
                    ]
                })
                window.onresize = function () {
                    myChart.resize()
                }
            },
            close() {
                this.centerDialogVisible = false
                this.bjtc = false
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
            editList(index, row) {
            },
            openDetails(row, selected) {
                if (this.rowData.length >= 1) {
                    this.$refs.multipleTable.clearSelection()
                    this.$refs.multipleTable.toggleRowSelection(row)
                } else {
                    this.$refs.multipleTable.toggleRowSelection(row)
                }
                this.b_VehicleClassOID = row.b_VehicleClassOID
            },
            selectRow(selection, row) {
                // console.log(selection) //复选框选中行
                this.rowData = selection
            },
            selectAll(selection) {
                this.rowData = selection
            },
            handleSelectionChange(val) {
                this.rowData = val
            },
           
        }

    }
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
        background: #2581DE !important;
        height: 23px;
        padding: 18px 0px 16px 20px;
        font-size: 16px;
        color: #FFFFFF !important;
    }

    .div1 /deep/ .el-dialog__title {
        font-size: 16px;
        color: #FFFFFF !important;
    }

    .div1 >>> .el-input--small .el-input__inner {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }

    /* .tableDiv /deep/ .el-table--fit{
    padding: 20px;
} */
    .tableDiv /deep/ .el-table, .el-table__expanded-cell {
        background-color: transparent !important;
    }

    .tableDiv /deep/ .el-table tr {
        background-color: transparent !important;
    }

    .tableDiv /deep/ .el-table--enable-row-transition .el-table__body td, .el-table .cell {
        background-color: transparent;
    }

    .tableDiv /deep/ .el-table tr {
        background-color: transparent !important;
    }

    .tableDiv /deep/ .el-table--enable-row-transition .el-table__body td, .el-table .cell {
        background-color: transparent;
    }
</style>
