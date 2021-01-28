<template>
    <div style="height:100%;width:100%;" class="table">
        <transition name="move" mode="out-in">
            <div v-if="count === 0" key="0">
                <div class="searchForm padding">
                    <div class="searchInputs">
                        <p>产品分类</p>
                        <el-select v-model="searchFormbase.productClassifyFk" placeholder="请选择">
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
                        <div style="margin-left: 5px"><img src="../../assets/img/dian.png" alt="image"
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
                            <section class="query_button" @click="getMsg" size="small">查询</section>
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
                            <el-table-column prop="productCode" label="产品编码" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="productDescription" label="产品描述" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="specifications" label="规格型号" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="totalWeight" label="总重量" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column
                                    v-for="(item,index) in ageValue"
                                    :key="index"
                                    :prop="item"
                                    :label="item"
                                    width="120">
                                <template slot-scope="scope">
                                    <span>{{scope.row.typeValue[index]}}</span>
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
            </div>
            <div v-if="count === 1" key="1">
                <div class="baseTable padding">
                    <section class="query_button" style="margin-bottom: 7px" @click="back" size="small">返回</section>
                    <div style="overflow-y:auto">
                        <el-table :data="tableData2" style="width: 100%;" ref="multipleTable"
                                  highlight-current-row
                                  @row-click="openDetails"
                                  :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                                  show-overflow-tooltip
                                  :height='tableHeight2' class="table">
                            <el-table-column type="index" label="序号" width="100"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="productCode" label="产品编码" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="productDescription" label="产品描述" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="specifications" label="规格型号" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="warehouse" label="仓库" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="goodsShelf" label="货架" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="goodsAllocation" label="货位" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="batchNumber" label="批号" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="tonsOfPackages" label="吨包号" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="weight" label="重量" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="warehouseEntryTime" label="入库时间" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="safeStorageDays" label="安全存放天数" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="warehouseAge" label="库龄" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="supplier" label="供应商" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                            <el-table-column prop="creationTime" label="创建时间" min-width="120"
                                             show-overflow-tooltip></el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import bus from '../../bus'
    import {CKGLselectPage, CKGLgetWarehouseAge, getProductproducecp} from '../../api/model'
    import {JCSJ_getVProducttype} from '../../api/index'

    export default {
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
                valueList: {},
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
            }
        },
        mounted() {
            this.searchForm = {
                sjd: 'ZT',
                rq: '',
                cpmc: '',
                cpfl: '',
            }
            this.searchForm.rq = this.sjjs("ZT")
            this.getCP()
            this.getbanMsg()
            this.getMsg()
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
            viewXQ(row) {
                this.count = 1
                this.getXQMsg(row.warehouseAgeId)
            },
            getMsg() {
                const para = {
                    data: {
                        startTime: this.searchForm.rq ? this.searchForm.rq[0] : '',
                        entTime: this.searchForm.rq ? this.searchForm.rq[1] : '',
                        productFk: this.searchFormbase.productFk ? 
                        this.searchFormbase.productFk : this.searchForm.productFk,
                        productClassifyFk: this.searchFormbase.productClassifyFk ? 
                        this.searchFormbase.productClassifyFk : this.searchForm.productClassifyFk
                    },
                    pageNum: this.page,
                    pageSize: this.pageSize
                }
                this.tableData = []
                this.dynamicList = []
                this.timeList = []
                this.valueList = {}
                this.valueList.lowList = []
                this.valueList.minList = []
                this.valueList.smaList = []
                this.valueList.midList = []
                this.valueList.bigList = []
                this.total = 0
                CKGLselectPage(para).then(res => {
                    if (res.code === 200) {
                        this.total = res.data.total
                        this.tableData = res.data.records
                        if (this.tableData.length > 0) {
                            this.ageValue = this.tableData[0].tvalue
                            this.dynamicList = this.tableData[0].dynamic
                        }
                        this.dynamicList.forEach(item => {
                            this.timeList.push(item.keyFiled)
                            this.valueList.lowList.push(item.reviewValueA)
                            this.valueList.minList.push(item.reviewValueB)
                            this.valueList.smaList.push(item.reviewValueC)
                            this.valueList.midList.push(item.reviewValueD)
                            this.valueList.bigList.push(item.reviewValueE)
                        })
                        this.chart()
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
            'searchForm.sjd': function (val) {
                this.searchForm.rq = this.sjjs(val);
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
</style>
