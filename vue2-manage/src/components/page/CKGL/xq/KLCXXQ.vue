<template>
<div style="height:100%;width:100%" class="CJZZP">
     <div class="baseTable" style="overflow-y:auto;height:calc(100% - 70px);margin-top:15px;">
                <el-table :data="tableData" ref="multipleTable"
                          highlight-current-row
                          :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                          show-overflow-tooltip
                          height="calc(100% - 0px)" class="table">
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

</template>
<script>
import {CKGLgetWarehouseAge} from '../../../../api/model'
export default {
    props: {
    fcpmxData: Object,
  },
    data(){
        return{
            zzl:0,
            tableHeight: window.innerHeight - 490,
            activeName:'blackMaterial',
            workLineName:'',
            cxOptions:[],
            gxarr:[],
            page: 1,
            pageSize: 10,
            total: 0,
            tableData:[],
            pagebl: 1,
            pageSizebl: 10,
            totalbl: 0,
            tableDatabl:[],
        }
    },
    mounted(){
        this.getMsg()
    },
    created(){    
    },
    methods:{
        getMsg(){
            this.tableData=[]
            const para = {
                    id: this.fcpmxData.productionId
                }
            CKGLgetWarehouseAge(para).then(res=>{
                if(res.code==200)
                {
                    this.tableData=res.data
                }
                else{
                    this.tableData=[]
                    this.$message.error(res.msg);
                }
            })
        },
        handleSizeChange(val) {
                this.page = 1;
                this.pageSize = val;
                this.getMsg();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getMsg();
            },
    },
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
.weight{
    color:#ffffff;
    font-size:16px;
    padding-top:5px;
    font-weight: 400;
}
.weight_value{
    color:#F7B500;
    font-size:16px;
    padding-top:8px;
    font-weight: 400;
}
</style>