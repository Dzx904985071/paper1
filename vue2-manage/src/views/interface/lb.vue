<template>
  <div class="dialog">
      <div>
          <el-button @click="inquire" type="warning" size="small">
            查询
          </el-button>
          <el-button @click="sure" type="warning" size="small">
            确认
          </el-button>
          <ul>
              <li>                  
                  <p>分类编码</p>
                  <el-input placeholder="请输入" v-model="piid"></el-input></li>
              <li>                  
                  <p>分类名称</p>
                  <el-input placeholder="请输入" v-model="mc"></el-input></li>
              <li>                  
                  <p>计量单位</p>
                  <el-input placeholder="请输入" v-model="jldw"></el-input></li>
          </ul>
      </div>
      <div>
          <el-table
            :data="tableData"
            style="width: 100%;margin-top:20px;"
            @row-click="openDetails"
            ref="multipleTable"
            @select="selectRow"
            @select-all="selectAll"
            highlight-current-row
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" min-width="5%" @row-click="openDetails"></el-table-column>
            <el-table-column type="index" label="序号"></el-table-column>
            <el-table-column prop="piid" label="物料分类编码" min-width="10%"></el-table-column>
            <el-table-column prop="mc" label="物料分类名称" min-width="10%"></el-table-column>
            <el-table-column prop="jldw" label="计量单位" min-width="10%"></el-table-column>
          </el-table>
          <!-- <div class="block" style="text-align:center;margin-top:20px;">
            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next, jumper"
              :total="total"
              :page-size="pageSize"
            ></el-pagination>
          </div> -->
      </div>
  </div>
</template>

<script>
import bus from '../../bus'
export default {
    data(){
        return{
            jldw:'',
            piid:'',
            mc:'',
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
        this.$axios.post(this.url.root + 'SP0301/GetMaterialClass?' + 'api_key=' + localStorage.getItem('token'),{
          piid:this.piid,
          mc:this.mc,
          jldw:this.jldw,
        })
        .then(res=>{
            //console.log(res)
            if(res.data.msgCode == 200){
                this.tableData = res.data.data
            }
        })
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
ul > li > p {
  width: 30%;
  text-align: left;
}
ul > li > .el-input {
  width: 70%;
}
</style>
