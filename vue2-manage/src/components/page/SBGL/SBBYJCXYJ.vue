<template>
    <div style="height:100%;width:100%;" class="table">
        <!-- 表单 -->
        <div class="searchForm padding" style="z-index:1;opacity:1">
            <div class="searchInputs">
                <p style="padding-right: 10px;">车间</p>
                <el-select v-model="searchForm.cj" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in cjOptions"
                            :key="item.siteId"
                            :label="item.siteCode + '-' + item.siteName"
                            :value="item.siteId"
                    >
                    </el-option>
                </el-select>
            </div>
            <div class="searchInputs" >
                <p style="margin-left: 1%; width: 96px; padding-right: 10px;">
                    设备编码
                </p>
                <el-select v-model="searchForm.sbbm" :popper-append-to-body="false" placeholder="请选择">
                    <el-option
                            v-for="item in sbbmOptions"
                            :key="item.equipmentNumber"
                            :label="item.equipmentNumber"
                            :value="item.equipmentNumber"
                    >
                    </el-option>
                </el-select>
            </div>
            <div style="margin-top: 2px; margin-left: ;">
                <section class="query_button" @click="getMsg" size="small">
                    查询
                </section>
                <section class="reset_button" @click="reset()" size="small">
                    重置
                </section>
            </div>
        </div>
        <div class="baseLine"></div>
        <!-- 表格 -->
        <div class="baseTable padding">
            <div style="overflow-y:auto;">
                <el-table
                        :data="tableData"
                        style="width: 100%; font-size: 16px;"
                        ref="multipleTable"
                        highlight-current-row
                        :header-cell-style="{
                        background: '#156BC6',
                        color: '#FFFFFF',
                        height: '40px',
                    }"
                        show-overflow-tooltip
                        :height="tableHeight"
                        class="table"
                >
                    <el-table-column
                            prop="workshop"
                            label="车间名称"
                            min-width="100px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="equipmentCode"
                            label="设备编号"
                            min-width="100px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="equipmentSort"
                            label="设备类别"
                            min-width="100px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="equipmentSpecification"
                            label="规格型号"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="maintenanceType"
                            label="保养类型"
                            min-width="100px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="maintenanceProject"
                            label="保养项目"
                            min-width="100px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="maintenanceBenchmark"
                            label="保养基准"
                            min-width="100px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="cycle"
                            label="周期（天）"
                            min-width="100px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="warningDay"
                            label="提前预警天数"
                            min-width="140px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="nextTime"
                            label="下次保养日期"
                            min-width="140px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="lastTime"
                            label="上次保养日期"
                            min-width="140px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="createTime"
                            label="创建日期"
                            min-width="120px"
                            show-overflow-tooltip
                    ></el-table-column>
                    <el-table-column
                            prop="lastDays"
                            label="距上次保养天数"
                            min-width="140px"
                            show-overflow-tooltip
                    ></el-table-column>
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
</template>

<script>
    import {SBGL_selectEquipmentMain} from "../../../api/index.js";
    import {JCSJ_getEquipment} from "../../../api/index.js";
    import {JCSJ_getVSite} from "../../../api/index.js";
    import bus from "../../../bus";

    export default {
        data() {
            return {
                tableData: [],
                tableHeight: window.innerHeight - 240,
                page: 1,
                pageSize: 10,
                count: 0,
                status: 0,
                rowData: [],
                cjOptions: [],
                sbbmOptions: [],
                searchForm: {
                    cj: "",
                    sbbm: "",
                },
                currentPage: 0,
                total: 0,
                whsj: new Date(),
                disabled: false,
            };
        },
        created() {
            this.getMsg();
        },
        mounted() {
            this.getSBBM();
            this.getCJLB();
        },
        methods: {
            // 设备编码
            getSBBM() {
                JCSJ_getEquipment().then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.sbbmOptions = res.data;
                    }
                });
            },
            // 车间接口
            getCJLB() {
                JCSJ_getVSite().then((res) => {
                    console.log(res);
                    if (res.code == 200) {
                        this.cjOptions = res.data;
                    }
                });
            },
            // 表格接口
            getMsg() {
                // console.log(123);
                const para = {
                    data: {
                        // equipmentCode: "",
                        workshop: this.searchForm.cj,
                        equipmentCode: this.searchForm.sbbm,
                    },
                    pageNum: this.page,
                    pageSize: this.pageSize,
                    // workshop: "string",
                    // equipmentId: "0",
                };
                console.log();

                SBGL_selectEquipmentMain(para).then((res) => {
                    console.log(res);

                    if (res.code == 200) {
                        if (res.data.records == []) {
                            this.tableData = res.data.records;
                            this.total = 0
                        } else {
                            this.tableData = res.data.records;
                            this.total = res.data.total;
                        }
                    }
                });
            },
            // 重置
            reset() {
                this.searchForm.sbbm = "";
                this.searchForm.cj = "";
                // this.getMsg();
            },

            // 分页
            handleSizeChange(val) {
                this.page = 1;
                this.pageSize = val;
                this.getMsg();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getMsg();
            },
            // 选择框
            openDetails(row, selected) {
                if (this.rowData.length >= 1) {
                    this.$refs.multipleTable.clearSelection();
                    this.$refs.multipleTable.toggleRowSelection(row);
                } else {
                    this.$refs.multipleTable.toggleRowSelection(row);
                }
                this.b_VehicleClassOID = row.b_VehicleClassOID;
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
        width: 96px;
        text-align: right;
        font-size: 16px;
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
        background: #2581de !important;
        height: 23px;
        padding: 18px 0px 16px 20px;
        font-size: 16px;
        color: #ffffff !important;
    }

    .div1 /deep/ .el-dialog__title {
        font-size: 16px;
        color: #ffffff !important;
    }

    .div1 >>> .el-input--small .el-input__inner {
        height: 40px;
        line-height: 40px;
        font-size: 14px;
    }

    /* .tableDiv /deep/ .el-table--fit{
        padding: 20px;
    } */
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

    .searchInput p {
        text-align: right;
        width: 100px;
        padding-right: 20px;
        margin-left: 0px;
        font-size: 16px;
        max-width: 96px;
    }

    .searchForm {
        opacity: 0.7;
    }
</style>
