<template>
<div style="height:100%;width:100%" class="CJZZP">
     <div class="baseTable" style="overflow-y:auto;height:calc(100% - 70px);margin-top:15px;">
                <el-table :data="tableData" ref="multipleTable"
                          highlight-current-row
                          :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                          show-overflow-tooltip
                          height="calc(100% - 60px)" class="table">
                          <el-table-column prop="ph" label="批次号" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="xh" label="序号" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cpbm" label="产品编码" min-width="180"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="cpms" label="产品描述" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="hw" label="货位" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                                     <el-table-column prop="hj" label="货架" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="ggxh" label="规格型号" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                                     <el-table-column prop="rksj" label="入库时间" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                                     <el-table-column prop="dbh" label="吨包号" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                                     <el-table-column prop="aqcfts" label="安全存放天数" min-width="120"
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
import {CKGL_storagemxAgekilnselectList} from '../../../../api/yjl'
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
            this.tableData=[]
            let para={
                data: {
                    storageID: this.fcpmxData.productionId
                    },
                pageNum: this.page,
                pageSize: this.pageSize
            }
            CKGL_storagemxAgekilnselectList(para).then(res=>{
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