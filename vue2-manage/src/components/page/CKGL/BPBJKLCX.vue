<template>
    <div style="height:100%;width:100%;" class="table">
        <transition name="move" mode="out-in">
            <div v-if="count === 0" key="0">
                <div class="searchForm padding">
                    <div class="searchInputs">
                        <p>产品分类</p>
                        <el-select v-model="searchFormbase.productClassifyFk" :popper-append-to-body="false" placeholder="请选择">
                            <el-option
                                    v-for="item in flOptions"
                                    :key="item.produceProductTypeCode"
                                    :label="item.produceProductTypeCode+'-'+item.produceProductTypeName"
                                    :value="item.produceProductTypeCode">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="searchInputs">
                        <p>产品名称</p>
                        <el-select v-model="searchFormbase.productFk" :popper-append-to-body="false" placeholder="请选择">
                            <el-option
                                    v-for="item in mcOptions"
                                    :key="item.productId"
                                    :label="item.productCode + '-' + item.productName"
                                    :value="item.productId">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="searchDiv3">
                        <section class="reset_button" @click="reset" size="small">重置</section>
                        <section class="query_button" @click="getMsg" size="small">查询</section>
                    </div>
                </div>
                <div class="baseLine"></div>
                <div class="baseChart padding">
                    <div class="flex">
                        <div class="text weight" style="padding-left: 15px;padding-bottom: 5px">趋势图</div>
                        <div style="margin-left: 5px"><img src="../../../assets/img/dian.png" alt="image"
                                                           style="height: 4px;"/></div>
                    </div>
                    <div class="searchForm">
                        <div class="searchInputs">
                            <p>产品分类</p>
                            <el-select v-model="searchForm.productClassifyFk" :popper-append-to-body="false" placeholder="请选择">
                                <el-option
                                        v-for="item in flOptions"
                                        :key="item.produceProductTypeCode"
                                        :label="item.produceProductTypeCode+'-'+item.produceProductTypeName"
                                        :value="item.produceProductTypeCode">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="searchInputs">
                            <p>产品名称</p>
                            <el-select v-model="searchForm.cpmc" :popper-append-to-body="false" placeholder="请选择">
                                <el-option
                                        v-for="item in mcOptions"
                                        :key="item.productCode"
                                        :label="item.productCode + '-' + item.productName"
                                        :value="item.productName">
                                </el-option>
                            </el-select>
                        </div>
                        <div class="searchInputs" style="width: calc(50% - 10px)">
                            <p>时间</p>
                            <el-select v-model="searchForm.sjd" clearable :popper-append-to-body="false" placeholder="请选择"
                                       style="width: calc(30% + 110px);">
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
                                    style="width: 70%;">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="flex" style="height: 40px;justify-content: space-between">
                        <div class="flex" style="margin-left:10px;">
                            <div class="flex roundBox" style="width: 110px;">
                                <div class="round yellow" style="margin-top: 7px"></div>
                                <div class="text">0-30天</div>
                            </div>
                            <div class="flex roundBox" style="width: 110px;">
                                <div class="round blue" style="margin-top: 7px"></div>
                                <div class="text">30-60天</div>
                            </div>
                            <div class="flex roundBox" style="width: 110px;">
                                <div class="round cyan" style="margin-top: 7px"></div>
                                <div class="text">60-180天</div>
                            </div>
                            <div class="flex roundBox" style="width: 110px;">
                                <div class="round green" style="margin-top: 7px"></div>
                                <div class="text">180-360天</div>
                            </div>
                            <div class="flex roundBox" style="width: 110px;">
                                <div class="round orange" style="margin-top: 7px"></div>
                                <div class="text">360天以上</div>
                            </div>
                        </div>
                        <div class="searchDiv" style="margin-right: 5px">
                            <section class="query_button" @click="getMsgEcharts" size="small">查询</section>
                        </div>
                    </div>
                    <div style="width:100%;">
                        <div id="zxChart" style="width:100%;height: 200px;"></div>
                    </div>
                </div>
                <div class="baseLine"></div>
                <div class="baseTable padding">
                    <div style="overflow-y:auto">
                        <el-table :data="tableData" style="width: 100%;" ref="multipleTable"
                                  highlight-current-row
                                  @row-click="openDetails"
                                  :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                                  show-overflow-tooltip
                                  :height='tableHeight' class="table">
                            <el-table-column type="index" label="序号" width="100"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="cpbm" label="产品编码" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="cpms" label="产品描述" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="ggxh" label="规格型号" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column
                                    v-for="(item,index) in ageValue"
                                    :key="index"
                                    :prop="item"
                                    :label="item"
                                    width="120">
                                <template slot-scope="scope">
                                    <span>{{scope.row.dynamic[index]}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" width="130px">
                                <template slot-scope="scope">
                                    <section class="table_button" @click="viewXQ(scope.row)" size="small">详情</section>
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
                <div class="mack" v-if="bpbjklcxxq">
                <div><i class="iconfont iconguanbi close" @click="guanbi"></i>
                </div>
                <div
                    style="
                    height: 16px;
                    margin-top: 25px;
                    margin-left: 15px;
                    color: #ffffff;
                    font-size: 16px;
                    "
                >
                    <span>详情 </span>
                    <span style="margin-left: 5px"
                    ><img
                        src="../../../assets/img/dian.png"
                        alt="image"
                        style="height: 4px"
                    /></span>  
                </div>
                    <div class="eltabs">
                        <BPBJKLCXXQ :fcpmxData="fcpmxData"></BPBJKLCXXQ>
                    </div>
            </div>
            </div>          
        </transition>
    </div>
</template>

<script>
    import bus from '../../../bus'
    import {CKGLgetWarehouseAge, getProductproducecp} from '../../../api/model'
    import {JCSJ_getVProducttype} from '../../../api/index'
    import { CKGL_partsStoragekilnselectList,CKGL_partsStoragestorageList } from '../../../api/yjl'
    import { sjjs } from '../../common/sjd'
    import BPBJKLCXXQ from "./xq/BPBJKLCXXQ";

    export default {
        components: {
    BPBJKLCXXQ,
  },
        data() {
            return {
                tableData: [],
                tableData2: [],
                dynamicList: [],
                ageValue: [],
                tableHeight: window.innerHeight - 580,
                tableHeight2: window.innerHeight - 150,
                page: 1,
                pageSize: 10,
                count: 0,
                status: 0,
                rowData: [],
                currentPage: 0,
                username: '',
                total: 0,
                timeList: [],
                bpbjklcxxq:false,
                valueList: {
                    lowList : [],
                    minList : [],
                    smaList : [],
                    midList : [],
                    bigList : []
                },
                flOptions: [],
                mcOptions: [],
                searchFormbase: {
                    sjd: '',
                    rq: '',
                    cpmc: '',
                    productFk: '',
                    cpfl: '',
                    productClassifyFk: '',
                },
                searchForm: {
                    sjd: '',
                    rq: '',
                    cpmc: '',
                    productFk: '',
                    cpfl: '',
                    productClassifyFk: '',
                },
                sjdOption: [{value: "W", label: "未设置"}, {value: "ZT", label: "昨天"}, {
                    value: "BZ",
                    label: "本周"
                }, {value: "BY", label: "本月"},
                    {value: "SZ", label: "上周"}, {value: "SY", label: "上月"},],
                pickerOptions: {
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
                fcpmxData: {
                    productionId: "",
                },
            }
        },
        mounted() {
            this.searchForm = {
                sjd: 'ZT',
                rq: '',
                cpmc: '',
                cpfl: '',
            }
            this.searchForm.rq = sjjs("ZT")
            this.getCP()
            this.getbanMsg()
            this.getMsg()
            this.getMsgEcharts()
        },
        methods: {
            reset() {
                this.searchFormbase = {
                    sjd: '',
                    rq: '',
                    cpmc: '',
                    cpfl: '',
                }
                // this.getMsg()
            },
            getCP() {
                getProductproducecp().then(res => {
                    if (res.code === 200) {
                        this.mcOptions = res.data
                    }
                })
            },
            getbanMsg() {
                JCSJ_getVProducttype().then(res => {
                    if (res.code === 200) {
                        this.flOptions = res.data
                    }
                })
            },
            back() {
                this.count = 0
                this.getMsg()
            },
            guanbi()
            {
                this.bpbjklcxxq = false
            },
            viewXQ(row) {
                this.bpbjklcxxq = true
                this.fcpmxData.productionId=row.storageId
                // this.getXQMsg(row.warehouseAgeId)
            },
            getMsg() {
                const para = {
                    data: {
                        cpfl: this.searchFormbase.productClassifyFk,
                        cpmc: this.searchFormbase.productFk,
                    },
                    pageNum: this.page,
                    pageSize: this.pageSize
                }
                this.tableData = []                 
                CKGL_partsStoragekilnselectList(para).then(res => {
                    if (res.code === 200) {
                        this.total = res.data.total
                        this.tableData = res.data.records
                        if (this.tableData.length > 0) {
                            this.ageValue = this.tableData[0].tvalue
                            this.dynamicList = this.tableData[0].dynamic
                        }
                    }
                })
            },
            getMsgEcharts(){
                //定义局部变量rq为接收查询条件中的时间段，防止为空，后面代码报错
                var startTime = "";
                var endTime = "";
                if (this.searchForm.rq != [] && this.searchForm.rq != "") {
                    startTime = this.searchForm.rq[0];
                    endTime = this.searchForm.rq[1];
                }
                let para={
                        data: {
                        cpfl: this.searchForm.productClassifyFk,
                        cpmc: this.searchForm.cpmc,
                        jssj: startTime,
                        kssj: endTime
                    },
                    pageNum: 1,
                    pageSize: 10
                }
                this.valueList.lowList = []
                this.valueList.minList = []
                this.valueList.smaList = []
                this.valueList.midList = []
                this.valueList.bigList = []
                this.timeList = []  
                CKGL_partsStoragestorageList(para).then(res=>{
                        if(res.code===200)
                        {
                            if(res.data.records.length>0)
                            {
                                res.data.records.forEach(element => {
                                        this.timeList.push(element.rq)
                                        this.valueList.lowList.push(element.dynamic[0])
                                        this.valueList.minList.push(element.dynamic[1])
                                        this.valueList.smaList.push(element.dynamic[2])
                                        this.valueList.midList.push(element.dynamic[3])
                                        this.valueList.bigList.push(element.dynamic[4])
                                });
                                this.chart()
                            }
                        }               
                })
                
            },
            getXQMsg(data) {
                const para = {
                    id: data
                }
                this.tableData2 = []
                CKGLgetWarehouseAge(para).then(res => {
                    if (res.code === 200) {
                        this.tableData2 = res.data
                    }
                })
            },
            chart() {
                let myChart = this.$echarts.init(document.getElementById('zxChart'))
                // 绘制图表
                let option1 = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    grid: {
                        left: '6%',
                        right: '6%',
                        bottom: '2%',
                        height: '83%',
                        width: '88%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: this.timeList,
                            axisLine: {
                                lineStyle: {
                                    color: '#ffffff'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: '单位:吨',
                            type: 'value',
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#ffffff'
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            smooth: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            lineStyle: {
                                color: "#f9b501"
                            },
                            itemStyle: {
                                color: "#f9b501",
                                borderType: "solid",
                                borderColor: "#f9b501",
                            },
                            data: this.valueList.lowList
                        },
                        {
                            type: 'line',
                            smooth: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            lineStyle: {
                                color: "#168afb"
                            },
                            itemStyle: {
                                color: "#168afb",
                                borderType: "solid",
                                borderColor: "#168afb",
                            },
                            data: this.valueList.minList
                        },
                        {
                            type: 'line',
                            smooth: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            lineStyle: {
                                color: "#42b7fa"
                            },
                            itemStyle: {
                                color: "#42b7fa",
                                borderType: "solid",
                                borderColor: "#42b7fa",
                            },
                            data: this.valueList.smaList
                        },
                        {
                            type: 'line',
                            smooth: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            lineStyle: {
                                color: "#46d7b8"
                            },
                            itemStyle: {
                                color: "#46d7b8",
                                borderType: "solid",
                                borderColor: "#46d7b8",
                            },
                            data: this.valueList.midList
                        },
                        {
                            type: 'line',
                            smooth: false,
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            },
                            lineStyle: {
                                color: "#f76303"
                            },
                            itemStyle: {
                                color: "#f76303",
                                borderType: "solid",
                                borderColor: "#f76303",
                            },
                            data: this.valueList.bigList
                        },
                    ]
                }
                myChart.setOption(option1)
                window.onresize = function () {
                    myChart.resize()
                }
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
        },
        watch: {
            'searchForm.sjd': function (val) {
                this.searchForm.rq = sjjs(val);

            },
        },

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
    .mack {
        position: fixed;
        width: 60%;
        height: 60%;
        overflow: hidden;
        top: 20%;
        left: 20%;
        /* background: rgba(21, 21, 21, 0.7); */
        background-image: url("../../../assets/img/tanchuang.png");
        background-size: 100% 100%;
        }
        .close {
        float: right;
        color: #ffffff;
        font-size: 25px;
        margin-right: 5px;
        }
        .eltabs {
        margin-top: 30px;
        height: calc(100% - 30px);
        width: calc(100% - 50px);
        margin-left: 15px;
        }
</style>
