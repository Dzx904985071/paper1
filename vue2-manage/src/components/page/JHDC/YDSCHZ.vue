<template>
    <div style="height:100%;width:100%;" class="table">
        <div class="searchForm padding">
            <div class="searchInput">
                <p>月份</p>
                <el-date-picker
                        v-model="searchForm.rq"
                        type="month"
                        value-format="yyyy-MM"
                        format="yyyy-MM"
                        placeholder="选择月">
                </el-date-picker>
            </div>
            <div class="searchInput">
                <p>车间</p>
                <el-select v-model="searchForm.cj" placeholder="请选择" :popper-append-to-body="false" clearable @change="cjSelect">
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
                <el-select v-model="searchForm.cx" placeholder="请选择" :popper-append-to-body="false" clearable>
                    <el-option
                            v-for="item in cxOptions"
                            :key="item.workcenterId"
                            :label="item.workLineCode+'-'+ item.workLineName"
                            :value="item.workcenterId">
                    </el-option>
                </el-select>
            </div>
            <div class="searchInput">
                <p>批次类型</p>
                <el-select v-model="searchForm.pclx" placeholder="请选择" :popper-append-to-body="false" clearable>
                    <el-option
                            v-for="item in pclxOptions"
                            :key="item.piciTypeCode"
                            :label="item.piciTypeCode+'-'+item.piciTypeName"
                            :value="item.piciTypeCode">
                    </el-option>
                </el-select>
            </div>
            <div class="searchInput">
                <p>产品名称</p>
                <el-input v-model="searchForm.cpmc" clearable></el-input>
            </div>
            <div class="searchInput">
                <p>班次</p>
                <el-checkbox v-model="searchForm.bc"></el-checkbox>
            </div>
            <div class="searchDiv">
                <section class="reset_button" @click="reset" size="small">重置</section>
                <section class="query_button" @click="getMsg" size="small">查询</section>
            </div>
        </div>
        <div class="baseLine"></div>
        <div class="baseTable padding">
            <div style="overflow-y:auto;">
                <el-table :data="tableData" style="width: 100%;" ref="multipleTable" @select="selectRow"
                          @select-all="selectAll"
                          highlight-current-row
                          @row-click="openDetails"
                          :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                          show-overflow-tooltip
                          :height='tableHeight' class="table">
                    <el-table-column prop="number" label="序号" min-width="100px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="workshop" label="车间" min-width="120px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="production" label="产线" min-width="120px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="productsProcesses" label="产品及工序" min-width="120px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="item" label="项目" min-width="120px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="lastMonth" label="上月(吨)" min-width="120px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="oneWeek" label="第一周" min-width="100px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="twoWeek" label="第二周" min-width="100px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="threeWeek" label="第三周" min-width="100px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="fourWeek" label="第四周" min-width="100px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="fiveWeek" label="第五周" min-width="100px"
                                     show-overflow-tooltip></el-table-column>
                </el-table>
            </div>
            <div>
                <page-nation :pageNum="page" :pageSize="pageSize" :total="total"
                             @handleSizeChange="handleSizeChange"
                             @handleCurrentChange="handleCurrentChange"></page-nation>
            </div>
        </div>
    </div>
</template>

<script>
    import bus from '../../../bus'
    import {JCSJ_getVSite, JCSJ_getVWorkline, JCSJ_getPicitype, JHDC_selectSituation} from '../../../api/index.js'

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
                cjOptions: [],
                cxOptions: [],
                pclxOptions: [],
                searchForm: {
                    rq: '',
                    cj: '',
                    pclx: '',
                    cx: '',
                    cpmc: '',
                    bc: '',
                },
                currentPage: 0,
                total: 0,
                whsj: new Date(),
                disabled: false,
            }
        },
        created() {
            this.timeNow()
            this.buttonxs()
            this.getMsg()
            this.getcjOptions()
            this.getcxOptions()
            this.getpclxOptions()
        },
        mounted() {

        },
        methods: {
            timeNow() {
                this.searchForm.rq = []
                var d = new Date(), str = '';
                str += d.getFullYear() + '-';
                str += d.getMonth() + 1;
                this.searchForm.rq = str
            },
            reset() {
                this.searchForm = {
                    rq: [],
                    cj: '',
                    pclx: '',
                    cx: '',
                    cpmc: '',
                    bc: '',
                }
            },
            buttonxs() {
            },
            cjSelect() {
                this.getcxOptions()
            },
            getMsg() {

                console.log(this.searchForm.rq)
                if (this.searchForm.rq == [] || this.searchForm.rq == null || this.searchForm.rq == '') {
                    this.$message.error('请先选择月份');
                    return
                }
                const para = {
                    data: {
                        classes: this.searchForm.bc,
                        workshopFK: this.searchForm.cj,
                        productionLineFk: this.searchForm.cx,
                        batchType: this.searchForm.pclx,
                        productName: this.searchForm.cpmc,
                        month: this.searchForm.rq
                    },
                    pageNum: this.page,
                    pageSize: this.pageSize
                }
                JHDC_selectSituation(para).then((res) => {
                    if (res.code == 200) {
                        this.tableData = res.data.records;
                        this.total = res.data.total
                    }
                })
            },
            getcjOptions() {
                JCSJ_getVSite().then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.cjOptions = res.data
                    }
                })
            },
            getcxOptions() {
                let cjId = this.searchForm.cj
                JCSJ_getVWorkline(cjId).then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.cxOptions = res.data
                    }
                })
            },
            getpclxOptions() {
                JCSJ_getPicitype().then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.pclxOptions = res.data
                    }
                })
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
</style>
