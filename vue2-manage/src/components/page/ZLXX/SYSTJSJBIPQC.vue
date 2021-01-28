<template>
    <div style="height:100%;width:100%;" class="table">
        <div class="searchForm padding">
            <div class="searchInput">
                <p style="width:112px">日期</p>
                <el-date-picker
                        v-model="searchForm.rq"
                        type="daterange"
                        value-format="yyyy-MM-dd"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        align="right">
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
                <p style="width:112px">工序名称</p>
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
            <div class="searchDiv3-3" style="width:calc(66% - 0px)">
                <section class="reset_button" @click="reset()" size="small">
                    重置
                </section>
                <section class="query_button" @click="getMsg()" size="small">
                    查询
                </section>
            </div>
        </div>
        <div class="baseTable padding all_top" style="height:calc(100% - 140px)">
            <div style="overflow-y:auto;height:calc(100% - 70px)">
                <el-table :data="tableData" style="width: 100%;" ref="multipleTable" @select="selectRow"
                          @select-all="selectAll"
                          highlight-current-row
                          @row-click="openDetails"
                          :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                          show-overflow-tooltip
                          :height='tableHeight' class="table">
                    <el-table-column prop="inspectionBatch" label="送检批次" min-width="120px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="submissionDate" label="送检日期" min-width="120px"
                                     show-overflow-tooltip></el-table-column>
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
                    <!-- <el-table-column prop="t" label="T%（百分比）" min-width="120px" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{ scope.row.typeValueList[0] }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="q" label="Q%()" min-width="120px" show-overflow-tooltip>
                        <template slot-scope="scope">
                            <span>{{ scope.row.typeValueList[1] }}</span>
                        </template>
                    </el-table-column> -->
                    <el-table-column prop="gross" label="总量(百分比)" min-width="120px"
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
    import {ZLXX_ipqcselectPage, JCSJ_getVSite, JCSJ_getVWorkline, JCSJ_getVSpecification} from "../../../api/yjl.js";

    export default {
        data() {
            return {
                dynamicList:[],
                tableHeight: window.innerHeight - 320,
                searchForm: {
                    rq: [],
                    cj: '',
                    cx: '',
                    cpmc: '',
                    bc: '',
                    sjd: 'W',
                    productProcessFk: '',
                    productionLineFk: '',
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
                    ],

                },
                page: 1,
                pageSize: 10,
                total: 0,
                cjOptions: [],
                cxOptions: [],
                gxOptions: [],
                tableData: [],
            }
        },
        mounted() {
            this.timeNow()
            this.getMsg()
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
                this.searchForm.productProcessFk = ''
                this.searchForm.productionLineFk = ''
                this.searchForm.cj = ''
                this.getMsg()
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
                } else {
                    this.$message.error('请先选择日期')
                }
                const para = {
                    data: {
                        endTime: endTime,
                        productProcessFk: this.searchForm.productProcessFk,
                        productionLineFk: this.searchForm.productionLineFk,
                        startTime: startTime,
                        workshopFk: this.searchForm.cj
                    },
                    pageNum: this.page,
                    pageSize: this.pageSize,
                }
                this.tableData=[]
                ZLXX_ipqcselectPage(para).then(res => {
                    if (res.code == 200) {
                        this.tableData = res.data.records
                        this.total = res.data.total
                        if(this.tableData.length>0)
                        {
                            this.dynamicList=this.tableData[0].dynamicList
                        }
                    } else {
                        this.tableData=[]
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

</style>