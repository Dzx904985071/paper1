<template>
  <div class="dialog">
      <div>
          <!-- <el-button @click="inquire" type="warning" size="small">
            查询
          </el-button> -->
          <el-button @click="sure" class="button_blue" style="color:#FFFFFF" size="small">
            确认
          </el-button>

      </div>
      <div style="height: 62%;">
          <el-table
            :data="tableData"
            style="width: 100%;margin-top:20px;"
            @row-click="openDetails"
            ref="multipleTable"
            @select="selectRow"
            @select-all="selectAll"
            :header-cell-style="{ background:'#2581DE',color:'#FFFFFF',height:'48px'}"
            highlight-current-row
            @selection-change="handleSelectionChange"
          >

            <el-table-column type="index" label="序号" align="center"></el-table-column>
            <el-table-column prop="cpbm" label="产品编码" show-overflow-tooltip></el-table-column>
            <el-table-column prop="cpmc" label="产品名称"></el-table-column>
            <el-table-column prop="scgy" label="生产工艺"></el-table-column>
            <el-table-column prop="ggxh" label="规格型号"></el-table-column>
            <el-table-column prop="cz" label="材质"></el-table-column>
            <el-table-column prop="jldw" label="计量单位"></el-table-column>
            <el-table-column prop="cpsx" label="产品属性"></el-table-column>
          </el-table>

      </div>
	  <div class="block" style="text-align:right;margin-top:20px;margin-bottom:20px;margin-right:60px">
	  	<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
	  	 :page-size="pageSize" :total="total" :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper">
	  	</el-pagination>
	  </div>
    <div style="height:66px;background:#D5E7F9;margin-left: -20px;margin-right: -20px;">
              <!-- <el-button  class="button_blue" type="primary" style="margin-left:calc(50% - 75px);width:70px;margin-top:15px;" @click="addSubmit" size="small">保存</el-button> -->
              <el-button class="button_blue" style="margin-left:calc(50% - 75px);width:70px;margin-top:15px;color:#4090E2;background: #ffffff;" type="primary" @click="close" size="small">关闭</el-button>
            </div>
  </div>
</template>


<script>
import bus from '../../bus'
export default {
    data(){
        return{
            jldw:'',
            wlid:'',
            wlmc:'',
            gg:'',
            cl:'',
            tz:'',
            tableData:[],
            total:0,
            page:1,
            pageSize:10,
            rowData:[],
        }
    },
    created(){
      this.getmsg()
    },
    methods: {
      getmsg(){

          let para={
			  data:{
				  cpbm:'',
				  scgy:''

			  },
			  pageSize:'100',
			  pageNum:'1'
		  }
          // getCpxx(para).then(res=>{
          //     if(res.success===true){
          //         if(res.code!==200){
          //             this.$message.error(res.errormsg)
          //         }
          //     }else{
          //         this.$message.error(res.errormsg)
          //     }
          //     this.tableData=res.data.list
          //     this.total=res.data.total
          // })
      },
        inquire(){
          this.getmsg()
        },
        sure(){
            //console.log(this.rowData)
            if(this.rowData.length == 0){
              bus.$emit('null',[])
            }else{
                if(this.rowData.length !== 1){
                  this.$message.error('请选择一条数据进行确认')
                }else{
                  var wlMsg = this.rowData[0]

                bus.$emit('wlMsg',wlMsg)

              }
            }
        },
        close(){
          bus.$emit('null',[])
        },
    openDetails(row,selected) {
      if(this.rowData.length >= 1){
        this.$refs.multipleTable.clearSelection()
        this.$refs.multipleTable.toggleRowSelection(row)
      }else{
        //console.log(row)
        this.$refs.multipleTable.toggleRowSelection(row)
      }
    },
    selectRow(selection, row) {
      // console.log(row.b_MaterialClassOID)
    //   console.log(selection) //复选框选中行
      this.rowData = selection
    },
    selectAll(selection) {
      // console.log(selection)
      this.rowData = selection
    },
    handleSelectionChange(val) {
      this.rowData = val
    },
    }
}
</script>


<style scoped>
    .dialog{
        /* width:100%; */
    }
    ul {
  display: flex;
  /* justify-content: space-between; */
  white-space: nowrap;
  line-height: 60px;
  flex-flow: row wrap;
  justify-content: space-evenly;
}
li {
  display: flex;
  list-style: none;
  margin-left: 10px;
  width: 30%;
  overflow: hidden;
  /* justify-content: space-between */
  /* border:1px solid red */
}
.block>>> .el-input--small .el-input__inner{
  width: 30px;
  height: 33px;
}
ul > li > p {
  width: 30%;
  text-align: left;
}
ul > li > .el-input {
  width: 70%;
}
</style>
