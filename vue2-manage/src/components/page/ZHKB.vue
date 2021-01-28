<template>
    <div style="height:100%;width:100%;position:relative" class="ZHKB">
        <div class="searchForm padding">
            <div class="searchInputs" style="width: calc(50% - 10px)">
                <p>时间段</p>
                <el-select v-model="searchForm.sjd" clearable placeholder="请选择"
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
            <div class="searchInputs">
                <p>车间</p>
                <el-select v-model="searchForm.workshopFk" :popper-append-to-body="false" clearable placeholder="请选择">
                    <el-option
                            v-for="item in cjOptions"
                            :key="item.siteId"
                            :label="item.siteCode+'-'+item.siteName"
                            :value="item.siteId">
                    </el-option>
                </el-select>
            </div>
            <div class="searchDiv2">
                <section class="reset_button" @click="reset" size="small">重置</section>
                <section class="query_button" @click="getMsg" size="small">查询</section>
            </div>
        </div>
        <div class="baseLine"></div>
        <el-row class="zhkbBox">
            <el-col :span="16" style="height: 100%;padding:10px;border-right: 2px #1888fa dashed;">
                <div class="flex" style="width: 100%;height: 50%;margin-bottom: 5px">
                    <div class="kbsmall smallwork" style="margin-right: 5px">
                        <div class="flex" style="padding-top: 15px">
                            <div class="text weight" style="padding-left: 15px;padding-bottom: 5px">车间产收率</div>
                            <div style="margin-left: 5px"><img src="../../assets/img/dian.png" alt="image"
                                                               style="height: 4px;"/></div>
                        </div>
                        <div class="flex roundBox" style="width: 90%;justify-content: flex-end;">
                            <div class="round" style="margin-top: 7px;background: #1888FA;"></div>
                            <div class="text">目标值</div>
                        </div>
                        <div class="flex" style="width: 100%;height: calc(100% - 70px);">
                            <div id="zxChart1" style="width:75%;height: 100%;"></div>
                            <div style="width:25%;height:100%;overflow-y:auto;padding-right: 5px">
                                <div class="basediv">直通率</div>
                                <div class="showdiv">{{ztl+'%'}}</div>
                                <div class="basediv">综合收率</div>
                                <div class="showdiv">{{zhsl+'%'}}</div>
                                <div class="basediv">副产品率</div>
                                <div class="showdiv">{{fcpl+'%'}}</div>
                                <div class="basediv">综合产率</div>
                                <div class="showdiv">{{zhcl+'%'}}</div>
                            </div>
                        </div>
                    </div>
                    <div class="kbsmall smallwork" style="margin-left: 5px">
                        <div class="flex" style="padding-top: 15px">
                            <div class="text weight" style="padding-left: 15px;padding-bottom: 5px">车间副产品</div>
                            <div style="margin-left: 5px"><img src="../../assets/img/dian.png" alt="image"
                                                               style="height: 4px;"/></div>
                        </div>
                        <div id="zxChart2" style="width:100%;height: calc(100% - 50px)"></div>
                    </div>
                </div>
                <div class="kbbig bigwork">
                    <div class="flex" style="padding-top: 15px">
                        <div class="text weight" style="padding-left: 15px;padding-bottom: 5px">车间计划达成率(一周)</div>
                        <div style="margin-left: 5px"><img src="../../assets/img/dian.png" alt="image"
                                                           style="height: 4px;"/></div>
                    </div>
                    <div class="flex" style="width: 100%;height: calc(100% - 70px);">
                        <div style="width: 98%;">
                            <div class="flex" style="height: 20px;justify-content: flex-end">
                                <div class="flex roundBox">
                                    <div class="round green" style="margin-top: 7px"></div>
                                    <div class="text">计划重量</div>
                                </div>
                                <div class="flex roundBox">
                                    <div class="round" style="margin-top: 7px;background: #1888FA;"></div>
                                    <div class="text">实际重量</div>
                                </div>
                                <div class="flex roundBox">
                                    <div class="round yellow" style="margin-top: 7px"></div>
                                    <div class="text">计划达成率</div>
                                </div>
                                <div class="flex roundBox">
                                    <div class="round orange" style="margin-top: 7px"></div>
                                    <div class="text">目标达成率</div>
                                </div>
                            </div>
                            <div id="zxChart3" style="width:100%;height: 100%;margin-top: 5px"></div>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :span="8" style="height: 100%;padding:10px;">
                <div class="kbsmall smallwork" style="height: 50%;margin-bottom: 5px">
                    <div class="flex" style="padding-top: 15px">
                        <div class="text weight" style="padding-left: 15px;padding-bottom: 5px">车间故障维修统计</div>
                        <div style="margin-left: 5px"><img src="../../assets/img/dian.png" alt="image"
                                                           style="height: 4px;"/></div>
                    </div>
                    <div class="padding" style="width: calc(100% - 21px);height: calc(100% - 80px);">
                        <el-table :data="tableData" style="width: 100%;" ref="multipleTable"
                                  highlight-current-row
                                  @row-click="openDetails"
                                  :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'30px'}"
                                  show-overflow-tooltip
                                  height="100%" class="table">
                            <el-table-column prop="workshopId" label="车间" min-width="100"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="meanDownTime" label="平均故障时间" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="meanProcessingTime" label="平均故障处理时间" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                        </el-table>
                    </div>
                </div>
                <div class="kbsmall smallwork" style="height: 50%;margin-top: 5px">
                    <div class="flex" style="padding-top: 15px">
                        <div class="text weight" style="padding-left: 15px;padding-bottom: 5px">车间在制品</div>
                        <div style="margin-left: 5px"><img src="../../assets/img/dian.png" alt="image"
                                                           style="height: 4px;"/></div>
                    </div>
                    <div class="flex" style="width: 100%;height: calc(100% - 50px);">
                        <div id="zxChart5" style="width:70%;height: 100%"></div>
                        <div style="width:30%;;height: 96%;padding-right: 10px">
                            <el-table :data="tableData2" style="width: 100%;" ref="multipleTable"
                                      highlight-current-row
                                      @row-click="openDetails"
                                      :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'30px'}"
                                      show-overflow-tooltip
                                      height='100%' class="table">
                                <el-table-column prop="process" label="工序" min-width="50"
                                                 show-overflow-tooltip></el-table-column>
                                <el-table-column prop="weight" label="质量(吨)" min-width="60"
                                                 show-overflow-tooltip></el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div class="mack" v-if="otherShow">
            <div><i class="iconfont iconguanbi close" @click="guanbi"></i></div>
            <div class="flex" style="margin-top: 30px">
                <div class="text weight" style="padding-left: 15px;">明细</div>
                <div style="margin-left: 5px"><img src="../../assets/img/dian.png" alt="image"
                                                               style="height: 4px;"/></div>
            </div>
            <div class="eltabs">
                <overload :cjzzpData="cjzzpData"></overload>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        pczsgetVSite,
        pczsgetVWorkline,
        pczsgetVSpecification,
        getKanbanWorkshop,
        getKanbanWorkshopCoproduct,
        getKanbanWorkshopFault,
        getKanbanWorkshopMake,
        getKanbanWorkshopReach
    } from '../../api/model'
    import overload from './overload'

    export default {
         components: {
            overload
        },
        data() {
            return {
                cjzzpData: {
                    shopId: '',
                    siteFk: '',
                    weight: '',
                },
                tableData: [],
                tableData2: [],
                count: 0,
                status: 0,
                rowData: [],
                cjOptions: [],
                cxOptions: [],
                gxOptions: [],
                hblOptions: [
                    {label: '白料', value: true},
                    {label: '黑料', value: false},
                ],
                searchForm: {
                    sjd: "",
                    rq: "",
                    workshopFk: ''
                },
                disabled: false,
                otherShow: false,
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
                            text: "最近半年",
                            onClick(picker) {
                                const end = new Date();
                                const start = new Date();
                                start.setTime(
                                    start.getTime() - 3600 * 1000 * 24 * 184
                                );
                                picker.$emit("pick", [start, end]);
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
                        },
                    ]
                },
                sjdOption: [{value: "W", label: "未设置"}, {value: "ZT", label: "昨天"}, {
                    value: "BZ",
                    label: "本周"
                }, {value: "BY", label: "本月"},
                    {value: "SZ", label: "上周"}, {value: "SY", label: "上月"},],
                CJCSdata: [],
                CJFCPdata: [],
                CJFCPdate: [],
                CJZZPdata: [],
                CJZZPname: [],
                CJZZPclz: [], // 超量值
                CJJHdate: [],
                CJJHCYdata: [],
                CJJHdata: [],
                ztl: 0,
                zhsl: 0,
                fcpl: 0,
                splyl: 0,
                zhcl: 0,
                pbcolor:['#ffffff']
            }
        },
        created() {
            this.searchForm.sjd = 'ZT'
            this.searchForm.rq = this.sjjs("ZT")
            this.getCJ()
            this.getCX()
            this.getGX()
            this.getMsg()
        },
        mounted() {
            this.chart()
        },
        methods: {
            reset() {
                this.searchForm = {
                    sjd: "",
                    rq: '',
                    workshopFk: ''
                }
                this.searchForm.rq = ''
            },
            chart() {
                let myChart1 = this.$echarts.init(document.getElementById('zxChart1'))
                let myChart2 = this.$echarts.init(document.getElementById('zxChart2'))
                let myChart3 = this.$echarts.init(document.getElementById('zxChart3'))
                let myChart5 = this.$echarts.init(document.getElementById('zxChart5'))
                // 绘制图表
                const CJZZPclz = this.CJZZPclz
                var option1 = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    grid: {
                        left: '6%',
                        right: '7%',
                        bottom: '2%',
                        height: '85%',
                        width: '88%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: ['产率', '收率', '副产率', '直通率'],
                        axisLine: {
                            lineStyle: {
                                color: '#E9F4FF',
                                width: 0,
                            }
                        },
                        minInterval: 1,
                        axisTick: {
                            show: false
                        },
                    },
                    yAxis: {
                        name: '单位:%',
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#E9F4FF',
                                width: 0,
                            }
                        }

                    },
                    series: this.chartCJCS()
                }
                let option2 = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    grid: {
                        left: '6%',
                        right: '7%',
                        bottom: '2%',
                        height: '85%',
                        width: '88%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: this.CJFCPdate,
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
                            },
                        }
                    ],
                    series: [
                        {
                            type: 'line',
                            stack: '总量',
                            smooth: true,
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
                            data: this.CJFCPdata
                        }
                    ]
                }
                let option3 = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    grid: {
                        left: '6%',
                        right: '7%',
                        bottom: '2%',
                        height: '85%',
                        width: '88%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: this.CJJHdate,
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
                            },
                        },
                        {
                            name: '单位:%',
                            type: 'value',
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#ffffff'
                                }
                            },
                        }
                    ],
                    series: this.chartCJJH()
                }
                let option5 = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    grid: {
                        left: '6%',
                        right: '7%',
                        bottom: '2%',
                        height: '89%',
                        width: '88%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: this.CJJHdate,
                            axisLine: {
                                lineStyle: {
                                    color: '#ffffff'
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            name: '单位:%',
                            type: 'value',
                            axisLine: {
                                show: false,
                                lineStyle: {
                                    color: '#ffffff'
                                }
                            },
                        }
                    ],
                    series: this.chartCJJHCY()
                }
                var option4 = {
                    tooltip: {
                        trigger: 'axis',
                    },
                    grid: {
                        left: '6%',
                        right: '7%',
                        bottom: '2%',
                        height: '85%',
                        width: '88%',
                        containLabel: true
                    },
                    xAxis: {
                        type: 'category',
                        data: this.CJZZPname,
                        axisLine: {
                            lineStyle: {
                                color: '#E9F4FF',
                                width: 0,
                            }
                        },
                        axisTick: {
                            show: false
                        },
                    },
                    yAxis: {
                        name: '单位:吨',
                        type: 'value',
                        axisLine: {
                            lineStyle: {
                                color: '#E9F4FF',
                                width: 0,
                            }
                        }

                    },
                    series: [{
                        data:this.CJZZPdata,
                        type: 'bar',
                        barWidth: 10,
                        itemStyle: {
                                color: function(params) {
                                    var colorList = ['#5c89ff', '#DC143C'];
                                    if (CJZZPclz[params.dataIndex] > params.value) {
                                        return colorList[1]
                                    } else {
                                        return colorList[0]
                                    }
                                }
                            },
                }]
                }
                myChart1.setOption(option1)
                myChart2.setOption(option2)
                myChart3.setOption(option3)
                myChart5.setOption(option4)
                window.onresize = function () {
                    myChart1.resize()
                    myChart2.resize()
                    myChart3.resize()
                    myChart5.resize()
                }
                myChart5.on('click', this.open)
            },
            open() {
              this.otherShow = true
            },
            guanbi() {
              this.otherShow = false
            },
            chartCJCS() {
                let overdata = []
                this.ztl = 0
                this.zhsl = 0
                this.fcpl = 0
                this.splyl = 0
                this.zhcl = 0
                let parm = []
                this.CJCSdata.forEach(item => {
                    this.ztl += item.rolledYield
                    this.zhsl += item.synthesizeReapYield
                    this.fcpl += item.byproductYield
                    this.splyl += item.spUseYield
                    this.zhcl += item.synthesizeOutputYield
                    overdata = [item.mbz,item.mbz,item.mbz,item.mbz]
                    parm.push({
                        data: [item.synthesizeOutputYield, item.synthesizeReapYield, item.byproductYield, item.rolledYield],
                        type: 'bar',
                        barWidth: 10,
                        itemStyle: {
                            color: function (params) {
                                var colorList = ['#5c89ff', '#33c5ff', '#F7B500', '#43D7B5'];
                                return colorList[params.dataIndex]
                            }
                        },
                    })
                })
                parm.push({
                    data: overdata,
                    type: "bar",
                    barWidth: 10,
                    itemStyle: {
                        color: '#1888FA',
                    }
                })
                this.ztl = Math.floor(this.ztl * 100) / 100
                this.zhsl = Math.floor(this.zhsl * 100) / 100
                this.fcpl = Math.floor(this.fcpl * 100) / 100
                this.splyl = Math.floor(this.splyl * 100) / 100
                this.zhcl = Math.floor(this.zhcl * 100) / 100
                return parm
            },
            chartCJJH() {
                let parm = []
                this.CJJHdata.forEach((item, i) => {
                    let data = []
                    const colorList = ['#43D7B5', '#1888FA']
                    item[0].dynamic.forEach(item2 => {
                        data.push(item2.reviewValueA)
                    })
                    parm.push(
                        {
                            type: 'bar',
                            barWidth: 10,
                            itemStyle: {
                                color: colorList[i],
                            },
                            data: data
                        })
                })
                this.CJJHCYdata.forEach((item, i) => {
                    if (i < 2) {
                        let data = []
                        const colorList = ['#F7B500', '#f76303']
                        item[0].dynamic.forEach(item2 => {
                            data.push(item2.reviewValueA)
                        })
                        parm.push(
                            {
                                type: 'line',
                                smooth: true,
                                label: {
                                    normal: {
                                        show: true,
                                        position: 'top'
                                    }
                                },
                                yAxisIndex: 1,
                                lineStyle: {color: colorList[i]},
                                itemStyle: {
                                    color: colorList[i],
                                    borderType: "solid",
                                    borderColor: "#46d7b8",
                                },
                                data: data
                            })
                    }
                })
                return parm
            },
            chartCJJHCY() {},
            getCJ() {
                pczsgetVSite().then(res => {
                    if (res.code === 200) {
                        this.cjOptions = res.data
                    }
                })
            },
            getCX() {
                pczsgetVWorkline().then(res => {
                    if (res.code === 200) {
                        this.cxOptions = res.data
                    }
                })
            },
            getGX() {
                pczsgetVSpecification().then(res => {
                    if (res.code === 200) {
                        this.gxOptions = res.data
                    }
                })
            },
            getCJCS() {
                let parm = {
                    startTime: this.searchForm.rq ? this.searchForm.rq[0] : '',
                    entTime: this.searchForm.rq ? this.searchForm.rq[1] : '',
                    workshopFk: this.searchForm.workshopFk
                }
                this.CJCSdata = []
                getKanbanWorkshop(parm).then(res => {
                    if (res.code === 200) {
                        this.CJCSdata = res.data
                        this.chart()
                    }
                })
            },
            getCJFCP() {
                let parm = {
                    startTime: this.searchForm.rq ? this.searchForm.rq[0] : '',
                    entTime: this.searchForm.rq ? this.searchForm.rq[1] : '',
                    workshopFk: this.searchForm.workshopFk
                }
                this.CJFCPdate = []
                this.CJFCPdata = []
                getKanbanWorkshopCoproduct(parm).then(res => {
                    if (res.code === 200) {
                        let data = []
                        res.data.forEach(item => {
                            data.push(JSON.parse(item.intervalDate).returnedValue)
                        })
                        data[0][0].dynamic.forEach(item2 => {
                            this.CJFCPdate.push(item2.keyFiled)
                            this.CJFCPdata.push(item2.reviewValueA)
                        })
                        this.chart()
                    }
                })
            },
            getCJJH() {
                let parm = {
                    startTime: this.searchForm.rq ? this.searchForm.rq[0] : '',
                    entTime: this.searchForm.rq ? this.searchForm.rq[1] : '',
                    workshopFk: this.searchForm.workshopFk
                }
                this.CJJHdate = []
                this.CJJHdata = []
                getKanbanWorkshopReach(parm).then(res => {
                    if (res.code === 200) {
                        let data = []
                        let data2 = []
                        res.data.forEach(item => {
                            data.push(JSON.parse(item.planActualDifference).returnedValue)
                            data2.push(JSON.parse(item.objectiveReach).returnedValue)
                        })
                        this.CJJHdata = data
                        this.CJJHCYdata = data2
                        data[0][0].dynamic.forEach(item2 => {
                            this.CJJHdate.push(item2.keyFiled)
                        })
                        this.chart()
                    }
                })
            },
            getCJZZP() {
                let parm = {
                    startTime: this.searchForm.rq ? this.searchForm.rq[0] : '',
                    entTime: this.searchForm.rq ? this.searchForm.rq[1] : '',
                    workshopFk: this.searchForm.workshopFk
                }
                this.CJZZPname = []
                this.CJZZPclz = []
                this.CJZZPdata = []
                getKanbanWorkshopMake(parm).then(res => {
                    if (res.code === 200) {
                        this.tableData2 = res.data
                        res.data.forEach(item => {
                            this.CJZZPname.push(item.process)
                            this.CJZZPdata.push(item.weight)
                            this.CJZZPclz.push(item.clz)
                            this.cjzzpData = item
                        })
                        this.chart()
                    }
                })
            },
            getMsg() {
                if (this.searchForm.rq === '' || this.searchForm.rq === [] || this.searchForm.rq === null) {
                    this.$message.error('请先选择时间')
                    return
                }
                if (this.searchForm.rq.length < 1) {
                    this.$message.error('请先选择时间')
                    return
                }
                let parm = {
                    startTime: this.searchForm.rq ? this.searchForm.rq[0] : '',
                    entTime: this.searchForm.rq ? this.searchForm.rq[1] : '',
                    workshopFk: this.searchForm.workshopFk
                }
                this.tableData = []
                this.tableData2 = []
                getKanbanWorkshopFault(parm).then(res => {
                    if (res.code === 200) {
                        this.tableData = res.data
                    }
                })
                this.getCJCS()
                this.getCJFCP()
                this.getCJJH()
                this.getCJZZP()
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
            }
           
        },
        watch: {
            'searchForm.sjd': function (val) {
                this.searchForm.rq = this.sjjs(val);
            },
        },
    }
</script>


<style scoped>
    .query >>> .el-input--small .el-input__inner {
        height: 34px !important;
        line-height: 34px !important;
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

    .zhkbBox {
        height: calc(100% - 73px);
        border: 2px #1888fa dashed;
        font-size: 14px;
    }
    .mack {
        z-index: 20;
        position: fixed;
        width: 60%;
        height: 60%;
        overflow: hidden;
        top: 20%;
        left: 20%;
        /* background: rgba(21, 21, 21, 0.7); */
        background-image: url('../../assets/img/tanchuang.png');
        background-size: 100% 100%;
    }
    .eltabs {
        margin-top: 30px;
        height: calc(100% - 30px);
        width: calc(100% - 50px);
        margin-left: 15px;
    }
    .close {
        float: right;
        color: #FFFFFF;
        font-size: 25px;
        margin-right: 5px;
    }
    .zhkbBox /deep/ .el-table {
        border: 1px #168afb solid;
    }

    .zhkbBox /deep/ .el-table td {
        border-bottom: 1px #168afb solid;
    }

    .zhkbBox /deep/ .el-table th {
        border-bottom: 1px #168afb solid;
    }

    .kbsmall {
        height: 100%;
        width: 100%;
    }

    .kbbig {
        margin-top: 5px;
        height: 50%;
        width: 100%;
    }

    .basediv {
        color: #E9F4FF;
        margin-left: 20px;
        margin-top: 5px;
        font-size: 13px;
    }

    .showdiv {
        color: #44D7B6;
        margin-left: 20px;
        margin-top: 3px;
        font-size: 13px;
    }
</style>
