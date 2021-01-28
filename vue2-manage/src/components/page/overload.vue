<template>
<div style="height:100%;width:100%" class="CJZZP">
    <div class="baseTable" style="overflow-y:auto;height:calc(100% - 70px);margin-top:-10px;">
            <el-table :data="tableData" ref="multipleTable"
                          highlight-current-row
                          :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'30px'}"
                          show-overflow-tooltip
                          height="calc(100% - 60px)" class="table">
                <el-table-column prop="batchNumber" label="批次号" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                <el-table-column prop="productName" label="产品编码" min-width="180"
                                     show-overflow-tooltip></el-table-column>
                <el-table-column prop="batchWeight" label="重量" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                <el-table-column prop="startTime" label="开始时间" min-width="120"
                                     show-overflow-tooltip></el-table-column>
            </el-table>
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
import {CJKB_selectShopMx} from '../../api/yjl'
export default {
    props: {
      cjzzpData: Object,
    },
    data(){
        return{
            tableHeight: window.innerHeight - 550,
            activeName:'blackMaterial',
            workLineName:'',
            page: 1,
            pageSize: 10,
            total: 0,
            tableData:[],
        }
    },
    mounted(){
        this.getMsg()
    },
    methods: {
        handleSizeChange() {
          this.page = 1;
          this.pageSize = val;
          this.getMsg();
        },
        handleCurrentChange() {
          this.page = val;
                this.getMsg();
        },
        getMsg(){
            let para={
                data: {
                    productionLineName:this.cjzzpData.process,
                    shopFk: this.cjzzpData.sessionFk,
                },
                pageNum: this.page,
                pageSize: this.pageSize
            }

            CJKB_selectShopMx(para).then(res=>{
                if(res.code==200)
                {
                    this.tableData=res.data.records
                    this.total=res.data.total
                }
                else{
                    this.tableData=[]
                    this.total=0
                    this.$message.error(res.msg);
                }
            })
        },
    }
}
</script>

<style scoped>
.CJZZP /deep/ .el-tabs__item{
    color:#FFFFFF !important;
    font-weight: 400 !important;
    font-size: 16px !important;
}
.CJZZP /deep/ .el-tabs__item:hover{
    color:#F7B500 !important;
}
.CJZZP /deep/ .el-tabs__item.is-active{
    color:#F7B500 !important;
    border-bottom: 1px solid #F7B500;
}
.CJZZP /deep/ .el-tabs--card>.el-tabs__header {
    border-bottom: 1px solid #dcdee3;
}
.CJZZP /deep/ .el-tabs--card>.el-tabs__header .el-tabs__nav {
     border: none !important;
}
.CJZZP /deep/ .el-tabs--card>.el-tabs__header .el-tabs__item{
    border-left:none !important;
}
</style>