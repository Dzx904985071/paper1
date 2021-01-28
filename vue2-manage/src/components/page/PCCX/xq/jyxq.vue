<template>
<div style="height:100%;width:100%" class="CJZZP">
     <div class="baseTable" style="overflow-y:auto;height:calc(100% - 70px);margin-top:15px;">
                <el-table :data="tableData" ref="multipleTable"
                          highlight-current-row
                          :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                          show-overflow-tooltip
                          height="calc(100% - 60px)" class="table">
                          <el-table-column prop="dynamicList" label="质检项目" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="typeValueList" label="质检值" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="typeValue" label="规格上限" min-width="180"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="dynamic" label="规格下限" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="resultValue" label="质检结果" min-width="120"
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
import {PCCX_selectJyxq} from '../../../../api/yjl'
export default {
    props: {
    fcpmxData: String,
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
            totalData:[],
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
            this.totalData=[]
            let para=this.fcpmxData
            PCCX_selectJyxq(para).then(res=>{
                if(res.code==200)
                {
                    if(res.data.dynamicList.length>0)
                    {
                        for(let i=0;i<res.data.dynamicList.length;i++)
                        {
                            let para={
                                dynamicList:res.data.dynamicList[i].keyFiled,//质检项目
                                typeValueList:res.data.typeValueList[i],//质检值
                                typeValue:res.data.typeValue[i],//规格上限
                                dynamic:res.data.dynamic[i],//规格下限
                                resultValue:res.data.resultValue[i],//质检结果
                            }
                            this.totalData.push(para)
                        }
                        this.total=res.data.dynamicList.length
                        this.falsePagination()
                    }
                    else{
                        this.tableData=[]
                        this.totalData=[]
                        this.total=0
                        this.$message.error('查无数据');
                    }
                }
                else{
                    this.tableData=[]
                    this.total=0
                    this.$message.error(res.msg);
                }
            })
        },
        //此方法为了实现假分页
        falsePagination()
        {
            if(this.total>0)
            {
                if(this.page*this.pageSize<=this.total)
                {
                   this.tableData=this.totalData.slice((this.page-1)*this.pageSize,this.pageSize)
                }
                else{
                   this.tableData=this.totalData.slice((this.page-1)*this.pageSize,this.totalData.length)
                }
            }
        },
        handleSizeChange(val) {
                this.page = 1;
                this.pageSize = val;
                this.falsePagination()
            },
            handleCurrentChange(val) {
                this.page = val;
                this.falsePagination()
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