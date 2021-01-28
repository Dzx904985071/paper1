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
                <p style="width:140px">执行标准名称</p>
                <el-select v-model="searchForm.operativeNormFk" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in zxbzOptions"
                            :key="item.operativeNormId"
                            :label="item.operativeNormName"
                            :value="item.operativeNormId">
                    </el-option>
                </el-select>
            </div>
            <div class="searchInput">
                <p>检验项目</p>
                <el-select v-model="searchForm.inspectionItemFk" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in jyxmOptions"
                            :key="item.operativeNormItemId"
                            :label="item.itemName"
                            :value="item.operativeNormItemId">
                    </el-option>
                </el-select>
            </div>
            <div class="searchInput">
                <p style="width:112px">原材料名称</p>
                <el-select v-model="searchForm.rawMaterialFk" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in yclOptions"
                            :key="item.productFamilyId"
                            :label="item.productFamilyName"
                            :value="item.productFamilyId">
                    </el-option>
                </el-select>
            </div>
            <div class="searchInput">
                <p style="width:140px">供应商编号</p>
                <el-select v-model="searchForm.supplierFk" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in gysOptions"
                            :key="item.vendorId"
                            :label="item.vendorName"
                            :value="item.vendorId">
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
        <div class="baseTable padding all_top" style="height:calc(100% - 140px)">
            <div style="overflow-y:auto;height:calc(100% - 70px)">
                <el-table :data="tableData" style="width: 100%;" ref="multipleTable" @select="selectRow"
                          @select-all="selectAll"
                          highlight-current-row
                          @row-click="openDetails"
                          :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                          show-overflow-tooltip
                          :height='tableHeight' class="table">
                    <el-table-column prop="supplier" label="供应商名称" min-width="120px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="checkResult" label="检验结果" min-width="120px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="incomingBatches" label="来料批次" min-width="120px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="testDate" label="检验日期" min-width="120px"
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
                    <!-- <el-table-column prop="mainContent1" label="主体含量1（wt%）" min-width="160px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="mainContent2" label="主体含量2（wt%）" min-width="160px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="mainContent3" label="主体含量3（wt%）" min-width="160px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="volatilityWithinLots" label="批次内波动率(%)" min-width="160px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ni" label="NI（mol%）" min-width="120px"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="c0" label="Co（mol%）" min-width="120px"
                                     show-overflow-tooltip></el-table-column> -->
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
    import {
        ZLXX_selectPage,
        JCSJ_getOperativenorm,
        JCSJ_getProductproduce,
        JCSJ_getSupplier,
        JCSJ_getOperativeNormItem
    } from "../../../api/yjl.js";

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
                    inspectionItemFk: '',
                    operativeNormFk: '',
                    rawMaterialFk: '',
                    supplierFk: '',
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
                rowData: [],
                page: 1,
                pageSize: 10,
                total: 0,
                cjOptions: [],
                zxbzOptions: [],
                jyxmOptions: [],
                gysOptions: [],
                yclOptions: [],
                tableData: [],
            }
        },
        mounted() {
            this.timeNow()
            this.getMsg()
            this.getzxbz()
            this.getjyxm()
            this.getycl()
            this.getgys()
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
            getzxbz() {
                JCSJ_getOperativenorm().then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.zxbzOptions = res.data;
                    }
                });
            },
            getjyxm() {
                JCSJ_getOperativeNormItem().then(res => {
                    console.log(res);
                    if (res.code == 200) {
                        this.jyxmOptions = res.data;
                    }
                })
            },
            getycl() {
                JCSJ_getProductproduce().then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.yclOptions = res.data;
                    }
                });
            },
            getgys() {
                JCSJ_getSupplier().then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.gysOptions = res.data;
                    }
                });
            },
            reset() {
                this.searchForm.rq = []
                this.searchForm.inspectionItemFk = ''
                this.searchForm.operativeNormFk = ''
                this.searchForm.rawMaterialFk = ''
                this.searchForm.supplierFk = ''
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
                }
                const para = {
                    data: {
                        endTime: endTime,
                        inspectionItemFk: this.searchForm.inspectionItemFk,
                        operativeNormFk: this.searchForm.operativeNormFk,
                        rawMaterialFk: this.searchForm.rawMaterialFk,
                        startTime: startTime,
                        supplierFk: this.searchForm.supplierFk
                    },
                    pageNum: this.page,
                    pageSize: this.pageSize,
                }
                this.tableData=[]
                ZLXX_selectPage(para).then(res => {
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