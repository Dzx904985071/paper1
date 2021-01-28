<template>
<div style="height:100%;width:100%" class="CJZZP">
     <div class="baseTable" style="overflow-y:auto;height:calc(100% - 70px);margin-top:15px;">
                <el-table :data="tableData" ref="multipleTable"
                          highlight-current-row
                          :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                          show-overflow-tooltip
                          height="calc(100% - 60px)" class="table">
                    <el-table-column prop="lineOther" label="产线" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="packageNumber" label="吨包编号" min-width="180"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="packageWeight" label="吨包重量" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="productName" label="产品名称" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="process" label="工序" min-width="120"
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
import './fcp.css'
import {SCZX_selectFcpMX} from '../../../../api/yjl'
export default {
    props: {
    fcpmxData: Object,
  },
    data(){
        return{
            zzl:0,
            tableHeight: window.innerHeight - 550,
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
            let para={
                data: this.fcpmxData.productionId,
                pageNum: this.page,
                pageSize: this.pageSize
            }
            SCZX_selectFcpMX(para).then(res=>{
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
</style>