<template>
<!-- 任务小类选择 -->
  <div class="dialog">
      <div style="height: calc(100% - 140px);">
        <div style="margin-top: 10px;font-size: 16px;font-weight: 700">任务大类:</div>
          <el-table
            :data="tableData"
            style="width: 100%;margin-top:10px;"
            @row-click="openDetails"
            ref="multipleTable"
            @select="selectRow"
            @select-all="selectAll"
            :header-cell-style="{ background:'#2581DE',color:'#FFFFFF',height:'48px'}"
            highlight-current-row height="40%"
          >

            <el-table-column type="selection" min-width="5%" show-overflow-tooltip></el-table-column>
                <el-table-column type="index" label="序号" width="70%" show-overflow-tooltip></el-table-column>
                <el-table-column prop="rwlxbm" label="任务大类编码" show-overflow-tooltip></el-table-column>
                <el-table-column prop="rwlxmc" label="任务大类名称" show-overflow-tooltip></el-table-column>
          </el-table>
        <div>
          <page-nation :pageNum="page" :pageSize="pageSize" :total="total" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"></page-nation>
        </div>
        <div v-if="this.pese!==1" style="margin-top: 10px;font-size: 16px;font-weight: 700">任务小类:</div>
          <el-table
            v-if="this.pese!==1"
            :data="tableData1"
            style="width: 100%;margin-top:10px;"
            @row-click="openDetails1"
            ref="multipleTable1"
            @select="selectRow1"
            @select-all="selectAll1"
            :header-cell-style="{ background:'#2581DE',color:'#FFFFFF',height:'48px'}"
            highlight-current-row height="60%"
          >

            <el-table-column type="selection" min-width="5%" show-overflow-tooltip></el-table-column>
                <el-table-column type="index" label="序号" width="70%" show-overflow-tooltip></el-table-column>
                <el-table-column prop="smallCode" label="任务小类编码" show-overflow-tooltip></el-table-column>
                <el-table-column prop="smallName" label="任务小类名称" show-overflow-tooltip></el-table-column>
          </el-table>

      </div>
        <div class="diaFoot">
          <section class="close_button" @click="close">关闭</section>
          <section class="save_button" @click="sure">选中关闭</section>
        </div>
  </div>
</template>


<script>
import bus from '../../bus'
export default {
    data(){
        return{
            rwlxbm:'',
            rwlxmc:'',
            id:'',
            tableData:[],
            tableData1:[],
            total:0,
            page:1,
            pageSize:10,
            rowData:{},
          rowData1:{},
        }
    },
    created(){
      this.getmsg()
    },
    methods: {
      getmsg(){
          let para={
            data:{
            },
            pageSize:this.pageSize,
            pageNum:this.page
          }
        this.tableData = []
          // getRwlxSizePagechoose(para).then(res=>{
          //     if(res.code!==200){
          //         this.$message.error(res.msg)
          //     }
          //     this.tableData=res.data.records
          //     this.total=res.data.total
          // })
      },
      handleSizeChange(val) {
        this.page = 1
        this.pageSize = val
        this.getmsg()
      },
      handleCurrentChange(val) {
        this.page = val
        this.getmsg()
      },
        inquire(){
          this.getmsg()
        },
      openDetails(row,selected) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(row)
        this.rowData = row
        if (this.pese!==1) {
          this.selXL(this.rowData)
        }
      },
      selectRow(selection, row) {
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(row)
        this.rowData = selection[0]
        this.selXL(this.rowData)
      },
      selectAll(selection) {
        this.rowData = selection[0]
        this.selXL(this.rowData)
      },
        sure(){
            if(this.rowData.id){
              if (this.pese!==1) {
                if (this.rowData1.smallName) {
                  var rwlxMsg = this.rowData
                  rwlxMsg.smallCode = this.rowData1.smallCode
                  rwlxMsg.smallName = this.rowData1.smallName
                  bus.$emit('rwlxMsg',rwlxMsg)
                } else {
                  this.$message.error('请选择任务小类')
                }
              } else {
                bus.$emit('rwlxMsg',this.rowData)
              }
              }else{
              this.$message.error('请先选择任务大类')
            }
        },
        close(){
          bus.$emit('rwlxMsg',[])
        },
      selXL(data) {
        this.tableData1 = []
        this.rowData1 = {}
        this.api.DLgetSmallList(data.id).then(res=> {
          if (res.code ===200) {
            this.tableData1 = res.data
          } else {
            this.$message.error(res.msg)
          }
        })
      },
    openDetails1(row,selected) {
      this.$refs.multipleTable1.clearSelection()
      this.$refs.multipleTable1.toggleRowSelection(row)
      this.rowData1 = row
    },
    selectRow1(selection, row) {
      this.$refs.multipleTable1.clearSelection()
      this.$refs.multipleTable1.toggleRowSelection(row)
      this.rowData1 = selection[0]
    },
    selectAll1(selection) {
      this.rowData1 = selection[0]
    },
    },
    props: ['pese']
}
</script>


<style>
.dialog {
    height: calc(100% - 200px);
    padding: 0 20px 20px 20px;
}
.dialogclass .el-dialog__body{
    height: 100%;
}
.dialogclass .el-table__body-wrapper{
      overflow-y:scroll;
}
</style>
