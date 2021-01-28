<template>
  <div style="height: 35px;text-align:right;margin-top:20px">
    <el-row class="pageBox">
      <el-pagination
        v-if="pageshow"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNums"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="pageSizes"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totals">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
  import bus from '../../bus'

  export default {
    data() {
      return {
        pageshow: true,
        pageNums: parseInt(this.pageNum),
        pageSizes: parseInt(this.pageSize),
        totals: 0
      }
    },
    props: ['total','pageNum','pageSize'],
    mounted() {
    },
    watch: {
      total: {
        handler: function(val) {
          this.$nextTick(()=> {
            this.totals = parseInt(val)
          })
        },
        deep: true
      }
    },
    methods: {
      handleSizeChange(val) {
        this.pageSizes = val
        this.pageshow = false
        this.$nextTick(()=> {
          this.pageshow = true
        })
        this.$emit('handleSizeChange', val)
      },
      handleCurrentChange(val) {
        this.pageNums = val
        this.pageshow = false
        this.$nextTick(()=> {
          this.pageshow = true
        })
        this.$emit('handleCurrentChange', val)
      },
    },
  }
</script>

<style scoped>
  .pageBox >>> .el-input--suffix input {
    background-color: #1C7EE1;
    color: #ffffff;
  }
  .pageBox {
    /*position: absolute;*/
    /*top: 0;*/
    /*right: 0;*/
  }
</style>
