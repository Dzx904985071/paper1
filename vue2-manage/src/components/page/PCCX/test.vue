<template>
    <div style="height:100%;width:100%;" class="table" @click="closeclick">
        <div class="searchForm padding flex">
            <div class="searchInputs">
                <p>批次编号</p>
                <el-input v-model="searchForm.pch"></el-input>
            </div>
            <!-- <div class="searchInputs">
                <p>工序名称</p>
                <el-input v-model="searchForm.processName"></el-input>
            </div> -->
            <div class="flex" style="margin-top: 3px">
                <section class="reset_button" @click="reset" size="small">重置</section>
                <section class="query_button" @click="getMsg" size="small">查询</section>
            </div>
        </div>
        <div class="text padding searchForm" style="font-size:15px;height: 20px;padding-left: 20px;padding-top:0">{{current}}</div>
        <div class="baseLine"></div>
        <div class="flex">
            <div class="text bianzu">批次追溯</div>
            <div class="flex roundBox">
                <div class="cube blue" style="margin-top: 7px"></div>
                <div class="text">黑料</div>
            </div>
            <div class="flex roundBox">
                <div class="slop slopBox" style="margin-top: 7px"></div>
                <div class="text">白料</div>
            </div>
            <div class="flex roundBox">
                <div class="side blue" style="margin-top: 7px"></div>
                <div class="text">混合料</div>
            </div>
            <div class="flex roundBox">
                <div class="round black shadow" style="margin-top: 7px"></div>
                <div class="text">追溯源</div>
            </div>
            <div class="flex roundBox">
                <div class="round zhijian yellowBox" style="margin-top: 5px"></div>
                <div class="text">质检</div>
            </div>
        </div>
        <div class="baseTable" style=";position: relative">
            <div class="lookband" style="overflow-y:auto;">
                <div id="overbox" v-if="oversnake" class="text" :style="{top:overy+'px',left:overx+'px'}">
                    <div style="padding: 15px;
                     min-width: 200px;
                     padding-bottom: 0;
                     text-align: left;
                     border-radius:5px;
                     background: rgb(4, 26, 54);
                     border: 1px #3C7DE7 solid;">
                        <p>{{'车间产线：'+(overData.shopNameOrProduction?overData.shopNameOrProduction:'')+
                            '-'+(overData.batchNumber?overData.batchNumber:'')}}</p>
                        <p>{{'批次重量：' + (overData.batchWeight?overData.batchWeight:'')}}</p>
                        <p>{{'开始时间：' + (overData.startTime?overData.startTime:'')}}</p>
                        <p style="margin-bottom: 10px">{{'结束时间：' + (overData.endTime?overData.endTime:'')}}</p>
                        <p class="cyan"
                           style="height:30px;line-height:30px;margin-left: -15px;margin-right: -15px;"
                        >
                        <i style="padding-left: 10px;padding-right: 10px" @click="tocamera()"
                            class="iconfont iconshipin"></i>
                        <i v-if="overData.black" style="display:none"></i>
                        <i v-else class="iconfont iconxingzhuang" @click="tocarvens()"></i></p>
                    </div>
                </div>
                <table class="oriTable" style="width: 100%">
                    <tr>
                        <th :colspan="firHandle">一次处理</th>
                        <th :colspan="firHandle">二次处理</th>
                    </tr>
                    <tr class="twoHead">
                        <th v-for="(item, index) in tableDatas" :key="index">{{item.shopNameOrProduction}}</th>
                    </tr>
                    <tr>
                        <td :style="{height: tableHeight}" v-for="(item, index) in tableDatas" :key="index">
                            <div class="flex">
                                <div class="codeBox" style="width: 100%;">
                                    <div v-if="item.current==='true'" class="textblack" style="width: 100%;">
                                        <div v-if="item.black==='0'" class="text black shadow" style="
                                             margin: 10px;min-width: 110px;padding: 10px;
                                             line-height: 15px;"
                                             @dblclick="viewXQ(item)"
                                             @contextmenu.prevent="overclick(item)">
                                            {{item.batchNumber}}
                                        </div>
                                        <div v-else-if="item.black==='1'" class="text slopBox2" style="
                                             margin: 5px 4px;min-width: 120px;padding: 13px;
                                             line-height: 15px;"
                                             @dblclick="viewXQ(item)"
                                             @contextmenu.prevent="overclick(item)">
                                            {{item.batchNumber}}
                                        </div>
                                        <div v-else-if="item.black==='2'" class="text cric black shadow" style="
                                             margin: 10px;min-width: 110px;padding: 10px;
                                             line-height: 15px;"
                                             @dblclick="viewXQ(item)"
                                             @contextmenu.prevent="overclick(item)">
                                            {{item.batchNumber}}
                                        </div>
                                    </div>
                                    <div v-else-if="item.black==='0'" class="textblack" style="width: 100%;">
                                        <div class="text blue" style="
                                             margin: 10px;min-width: 110px;padding: 10px;
                                             line-height: 15px;"
                                             @dblclick="viewXQ(item)"
                                             @contextmenu.prevent="overclick(item)">
                                            {{item.batchNumber}}
                                        </div>
                                    </div>
                                    <div v-else-if="item.black==='1'" class="textblack" style="width: 100%;">
                                        <div class="text slopBox" style="
                                             margin: 10px;min-width: 110px;padding: 10px;
                                             line-height: 15px;"
                                             @dblclick="viewXQ(item)"
                                             @contextmenu.prevent="overclick(item)">
                                            <span class="text">{{item.batchNumber}}</span>
                                        </div>
                                    </div>
                                    <div v-else-if="item.black==='2'" class="textblack" style="width: 100%;">
                                        <div class="text cric blue" style="
                                             margin: 10px;min-width: 110px;padding: 10px;
                                             line-height: 15px;"
                                             @dblclick="viewXQ(item)"
                                             @contextmenu.prevent="overclick(item)">
                                            {{item.batchNumber}}
                                        </div>
                                    </div>
                                    <div v-if="item.checkInformation.length>0">
                                        <div v-for="(item1,i1) in item.checkInformation" :key="i1">
                                            <div v-if="item1.current==='true'" class="textblack" style="width: 100%;">
                                                <div v-if="item.black==='0'" class="text black shadow yellowBox" style="
                                                 margin: 10px;min-width: 110px;padding: 10px;
                                                 line-height: 15px;"
                                                     @dblclick="viewXQ(item1)"
                                                     @contextmenu.prevent="overclick(item1)">
                                                    {{item1.batchNumber}}
                                                </div>
                                                <div v-else-if="item.black==='1'" class="text slopBox3" style="
                                                 margin: 5px 4px;min-width: 120px;padding: 13px;
                                                 line-height: 15px;"
                                                     @dblclick="viewXQ(item1)"
                                                     @contextmenu.prevent="overclick(item1)">
                                                    {{item1.batchNumber}}
                                                </div>
                                                <div v-else-if="item.black==='2'" class="text black shadow cric yellowBox" style="
                                                 margin: 10px;min-width: 110px;padding: 10px;
                                                 line-height: 15px;"
                                                     @dblclick="viewXQ(item1)"
                                                     @contextmenu.prevent="overclick(item1)">
                                                    {{item1.batchNumber}}
                                                </div>
                                            </div>
                                            <div v-else class="textblack" style="width: 100%;">
                                                <div v-if="item.black==='0'" class="text blue yellowBox" style="
                                                 margin: 10px;min-width: 110px;padding: 10px;
                                                 line-height: 15px;"
                                                     @dblclick="viewXQ(item1)"
                                                     @contextmenu.prevent="overclick(item1)">
                                                    {{item1.batchNumber}}
                                                </div>
                                                <div v-else-if="item.black==='1'" class="text slopBox4" style="
                                                 margin: 10px;min-width: 110px;padding: 10px;
                                                 line-height: 15px;"
                                                     @dblclick="viewXQ(item1)"
                                                     @contextmenu.prevent="overclick(item1)">
                                                    {{item1.batchNumber}}
                                                </div>
                                                <div v-else-if="item.black==='2'" class="text cric blue yellowBox" style="
                                                 margin: 10px;min-width: 110px;padding: 10px;
                                                 line-height: 15px;"
                                                     @dblclick="viewXQ(item1)"
                                                     @contextmenu.prevent="overclick(item1)">
                                                    {{item1.batchNumber}}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
<!--                                <img v-if="index+1!==tableDatas.length" :src="jiantou" class="jiantou"/>-->
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="mack" v-if="isShow">
            <div><i class="iconfont iconguanbi close" @click="guanbi"></i></div>
            <div class="diacontent">
                <div class="flex" style="margin-bottom: 5px">
                    <div style="padding-top: 3px"><i class="iconfont iconpicichaxun"></i></div>
                    <div class="text weight" style="padding-left: 5px;padding-bottom: 5px">生产批次</div>
                    <div style="margin-left: 7px"><img src="../../../assets/img/dian.png" alt="image"
                                                       style="height: 4px;"/></div>
                </div>
                <div class="contentfoot" style="overflow-y:auto;">
                    <el-table :data="tableDataXQ" style="width: 100%;" ref="multipleTable"
                              highlight-current-row
                              :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                              show-overflow-tooltip
                              height='calc(100% - 60px)'
                              class="table">
                        <el-table-column prop="batchNumber" label="批次" min-width="120px"
                                         show-overflow-tooltip></el-table-column>
                        <el-table-column prop="productionLineName" label="产线" min-width="120px"
                                         show-overflow-tooltip></el-table-column>
                        <el-table-column prop="randomPeople" label="抽检人员" min-width="120px"
                                         show-overflow-tooltip></el-table-column>
                        <el-table-column prop="processName" label="工序" min-width="120px"
                                         show-overflow-tooltip></el-table-column>
                        <el-table-column prop="productionDate" label="生产日期" min-width="150px"
                                         show-overflow-tooltip></el-table-column>
                    </el-table>
                    <div>
                        <page-nation :pageNum="page" :pageSize="pageSize" :total="total"
                                     @handleSizeChange="handleSizeChange"
                                     @handleCurrentChange="handleCurrentChange"></page-nation>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '../../common/bus'
    import {pczsselectBatchTree, PCZSselectBatch} from '../../../api/model'

    export default {
        data() {
            return {
                tableData: [],
                tableDataXQ: [],
                overview: false,
                takeview: true,
                oversnake: false,
                isShow: false,
                tableHeight: window.innerHeight - 310 + 'px',
                takewidth: window.innerWidth,
                page: 1,
                pageSize: 10,
                count: 0,
                status: 0,
                firHandle: 0,
                secHandle: 0,
                overx: 0,
                overy: 0,
                rowData: [],
                tableDatas: [],
                cjOptions: [],
                cxOptions: [],
                pclxOptions: [],
                searchForm: {
                    pch: '',
                    processName: ''
                },
                jiantou: require('../../../assets/img/jiantou.png'),
                currentPage: 0,
                total: 0,
                current: '',
                overData: {},
                whsj: new Date(),
                disabled: false,
                sjdOption: [{value: "W", label: "未设置"}, {value: "ZT", label: "昨天"}, {
                    value: "BZ",
                    label: "本周"
                }, {value: "BY", label: "本月"},
                    {value: "SZ", label: "上周"}, {value: "SY", label: "上月"},],
            }
        },
        created() {
            this.getMsg()
        },
        mounted() {
            if (sessionStorage.getItem('pczsdata')) {
                this.searchForm.pch = sessionStorage.getItem('pczsdata')
                this.searchForm.processName = sessionStorage.getItem('processName')
                this.getMsg()
            }
            this.overview = false
            bus.$on('collapse-content', data => {
                this.overview = data
            })
        },
        methods: {
            guanbi() {
                this.isShow = false
            },
            reset() {
                this.searchForm = {
                    pch: '',
                    processName: ''
                }
                sessionStorage.removeItem('pczsdata')
                sessionStorage.removeItem('processName')
            },
            handleSizeChange(val) {
                this.page = 1
                this.pageSize = val
                this.roverse()
            },
            handleCurrentChange(val) {
                this.page = val
                this.roverse()
            },
            getMsg() {
                this.tableDatas = []
                const para = {
                   pch: this.searchForm.pch,
                   processType: this.searchForm.processName
                }
                this.current = ''
                this.firHandle = 0
                this.secHandle = 0
                this.tableDatas = []
                pczsselectBatchTree(para).then(res => {
                    if (res.code === 200) {
                        let allList = []
                        let firList = []
                        let secList = []
                        res.data.forEach(item => {
                            allList.push(JSON.parse(item.theChildBatches))
                        })
                        allList.forEach(item => {
                            if (item.current === 'true') {
                                this.current = '批次描述：' +
                                    item.batchMs + '，批次工序：' +
                                    item.gx + '，车间产线：' +
                                    item.shopNameOrProduction + '-' +
                                    item.cx + '，生产时间：' +
                                    item.startTime + '，批次重量：' +
                                    item.batchWeight +
                                    (item.black==='0'?'，黑料':item.black==='1'?
                                        '，白料':item.black==='2'?'，其他':'')
                            }
                            if (item.clfs === '1') {
                                firList.push(item)
                            }
                            if (item.clfs === '2') {
                                secList.push(item)
                            }
                        })
                        this.firHandle = firList.length
                        this.secHandle = secList.length
                        this.tableDatas = firList
                        if (secList.length > 0) {
                            secList.forEach(item => {
                                this.tableDatas.push(item)
                            })
                        }
                    }
                })
            },
            roverse() {
                const para = {
                    data: {
                        bch: this.batchNumber
                    },
                    pageNum: this.page,
                    pageSize: this.pageSize
                }
                this.total = 0
                this.tableDataXQ = []
                PCZSselectBatch(para).then(res => {
                    if (res.code === 200) {
                        this.tableDataXQ = res.data.records
                        this.total = res.data.total
                    }
                })
            },
            viewXQ(item) {
                this.searchForm.pch = item.batchNumber
                this.oversnake = false
                this.getMsg()
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
            overclick(item) {
                this.overData = item
                this.batchNumber = item.batchNumber
                let mercedata = this.darkover()
                this.oversnake = true
                this.darkclear(mercedata)
            },
            tocarvens() {
                this.isShow = true
                this.roverse()
            },
            darkclear(data) {
                if (this.overview) {
                    this.overx = data.x - 180
                } else {
                    this.overx = data.x - 330
                }
                this.overy = data.layerY - 70
            },
            tocamera() {
                alert('该功能暂未开发')
            },
            closeclick() {
                this.oversnake = false
            },
            darkover() {
                return window.event
            },

        },
        beforeDestroy() {
            sessionStorage.removeItem('pczsdata')
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

    .mack {
        position: fixed;
        width: 60%;
        height: 60%;
        overflow: hidden;
        top: 20%;
        left: 20%;
        background-image: url('../../../assets/img/tanchuang.png');
        background-size: 100% 100%;
    }

    .diacontent {
        height: calc(100% - 70px);
        color: #ffffff;
        font-size: 16px;
        padding: 20px;
        padding-top: 40px;
    }

    .contentfoot {
        height: calc(100% - 40px);
        color: #ffffff;
        padding-right: 20px;
    }

    .close {
        float: right;
        color: #FFFFFF;
        font-size: 25px;
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

    #overbox {
        position: absolute;
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

    .tableDiv /deep/ .el-table, .el-table__expanded-cell {
        background-color: transparent !important;
    }

    .tableDiv /deep/ .el-table tr {
        background-color: transparent !important;
    }

    .jiantou {
        margin: auto;
    }

    .tableDiv /deep/ .el-table--enable-row-transition .el-table__body td, .el-table .cell {
        background-color: transparent;
    }
</style>
