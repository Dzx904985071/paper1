<template>
<div style="height:100%;width:100%" class="CJZZP">
    <div>
        <div class="searchInputone" style="width:60%">
                <p style="width:58px;text-align: left;">生产线</p>
                <el-select v-model="workLineName" placeholder="请选择" :popper-append-to-body="false" clearable style="width:calc(100% - 250px)" @change="scxSelect">
                    <el-option
                                        v-for="item in cxOptions"
                                        :key="item.workLineId"
                                        :label="item.workLineCode+'-'+ item.workLineName"
                                        :value="item.workLineName">
                                </el-option>
                    </el-select>
                <span class="weight">总重量&nbsp;&nbsp;</span>
                <span class="weight_value">{{zzl}}</span>
            </div>
    </div>
        

    <el-tabs v-model="activeName" style="height:calc(100% - 120px)" class="el-tab-pane" @tab-click="handleClick" type="card">
        <el-tab-pane label="黑料" name="blackMaterial" style="height:100%;width:100%">
            <div class="baseTable" style="overflow-y:auto;height:calc(100% - 50px);">
                <el-table :data="tableData" ref="multipleTable"
                          highlight-current-row
                          :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                          show-overflow-tooltip
                          height="calc(100% - 60px)" class="table">
                    <el-table-column prop="productionLineName" label="线别" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="productName" label="产品名称" min-width="180"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="batchNumber" label="批次号" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="batchWeight" label="批次重量" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="startTime" label="领料日期" min-width="120"
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
        </el-tab-pane>
        <el-tab-pane label="白料" name="whiteMaterial" style="height:100%;width:100%">
            <div class="baseTable" style="overflow-y:auto;height:calc(100% - 50px);">
                <el-table :data="tableDatabl" ref="multipleTable"
                          highlight-current-row
                          :header-cell-style="{ background:'#1888fa',color:'#FFFFFF',height:'40px'}"
                          show-overflow-tooltip
                          height="calc(100% - 60px)" class="table">
                    <el-table-column prop="productionLineName" label="线别" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="productName" label="产品名称" min-width="180"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="batchNumber" label="批次号" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="batchWeight" label="批次重量" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                    <el-table-column prop="startTime" label="领料日期" min-width="120"
                                     show-overflow-tooltip></el-table-column>
                </el-table>
            <div>
                <page-nation
                        :pageNum="pagebl"
                        :pageSize="pageSizebl"
                        :total="totalbl"
                        @handleSizeChange="handleSizeChangebl"
                        @handleCurrentChange="handleCurrentChangebl"
                ></page-nation>
            </div>
        </div>
        </el-tab-pane>
    </el-tabs>
</div>
    
</template>
<script>
import {CJKB_selectShopMx,JCSJ_getVWorkline} from '../../../../api/yjl'
export default {
    props: {
    cjzzpData: Object,
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
        this.zzl=this.cjzzpData.weight
        this.getcx()
        if(this.activeName=='blackMaterial')
        {
            this.getMsghl()
        }
        else if(this.activeName=='whiteMaterial')
        {
            this.getMsgbl()
        }
    },
    created(){    
    },
    methods:{
        scxSelect(){
            if(this.activeName=='blackMaterial')
                {
                    this.getMsghl()
                }
                else if(this.activeName=='whiteMaterial')
                {
                    this.getMsgbl()
                }
        },
        getcx(){
            JCSJ_getVWorkline(this.cjzzpData.siteFk).then(res=>{
                        if (res.code == 200) {
                            this.cxOptions = res.data;
                        } else {
                            this.$message.error(res.msg);
                        }
                })
            },
        handleClick()
        {
            if(this.activeName=='blackMaterial')
                {
                    this.getMsghl()
                }
                else if(this.activeName=='whiteMaterial')
                {
                    this.getMsgbl()
                }
                else if(this.activeName=='additive')
                {
                    this.getMsgtjj()
                }
        },
        //黑料
        getMsghl(){
            let para={
                data: {
                    productionLineName: this.workLineName,
                    shopFk: this.cjzzpData.shopId,
                    type: this.activeName
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
        handleSizeChange(val) {
                this.page = 1;
                this.pageSize = val;
                this.getMsghl();
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getMsghl();
            },
        //白料
        getMsgbl(){
            let para={
                data: {
                    productionLineName: this.workLineName,
                    shopFk: this.cjzzpData.shopId,
                    type: this.activeName
                },
                pageNum: this.pagebl,
                pageSize: this.pageSizebl
            }
            CJKB_selectShopMx(para).then(res=>{
                    if(res.code==200)
                {
                    this.tableDatabl=res.data.records
                    this.totalbl=res.data.total
                }
                else{
                    this.tableDatabl=[]
                    this.totalbl=0
                    this.$message.error(res.msg);
                }
            })
        },
        handleSizeChangebl(val) {
                this.pagebl = 1;
                this.pageSizebl = val;
                this.getMsgbl();
            },
            handleCurrentChangebl(val) {
                this.pagebl = val;
                this.getMsgbl();
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
.CJZZP /deep/ .el-tabs__content{
    height:100%;
}
</style>