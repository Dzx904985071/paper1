<template>
  <div style="height:100%;width:100%;" class="table">
    <div class="searchForm padding" style="">
      <div class="searchInput" style="margin-left: -160px;">
        <p style="width:400px">仓库</p>
        <el-select v-model="searchForm.ck" :popper-append-to-body="false" placeholder="请选择">
          <el-option
            v-for="item in ck"
            :key="item.ckFk"
            :label="item.ck"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="searchInput" style="margin-left: -70px;">
        <p style="width:410px">备品备件分类</p>
        <el-select v-model="searchForm.bpbjfl" :popper-append-to-body="false" placeholder="请选择">
          <el-option
            v-for="item in bpbjfl"
            :key="item.bpbjflFk"
            :label="item.fl"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="searchInput" style="margin-left: -50px;">
        <p style="width:450px">备品备件物料代码</p>
        <el-select v-model="searchForm.bpbjwlbm" :popper-append-to-body="false" placeholder="请选择">
          <el-option
            v-for="item in bpbjwlbm"
            :key="item.operativeNormItemId"
            :label="item.dm"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div style="width: 200px;margin-left: 80px">
        <section class="query_button" @click="getMsg()" size="small">
          查询
        </section>
        <section class="reset_button" @click="reset()" size="small">
          重置
        </section>
      </div>
    </div>
    <div class="baseTable padding all_top" style="overflow-y:auto;height:calc(100% - 95px)">
      <div style="overflow-y:auto">
        <el-table
          :data="tableData"
          style="width: 100%;"
          ref="multipleTable"
          @select="selectRow"
          @select-all="selectAll"
          highlight-current-row
          @row-click="openDetails"
					:default-sort = "{prop: 'date', order: 'descending'}"
          :header-cell-style="{
            background: '#1888fa',
            color: '#FFFFFF',
            height: '40px'
          }"
          show-overflow-tooltip
          :height="tableHeight"
          class="table"
        >
          <el-table-column
            prop="bm"
            label="备品备件编码"
            min-width="120px"
						sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="name"
            label="备品备件名称"
            min-width="120px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="total"
            label="库存数量合计"
            min-width="120px"
						sortable
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="ggxh"
            label="规格型号"
            min-width="120px"
            show-overflow-tooltip
          ></el-table-column>
          <el-table-column
            prop="cjrq"
            label="创建日期"
            min-width="120px"
						sortable
            show-overflow-tooltip
          ></el-table-column>
        </el-table>
      </div>
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
import {
  ZLXX_selectPage,
  JCSJ_getOperativenorm,
  JCSJ_getProductproduce,
  JCSJ_getSupplier,
  JCSJ_getOperativeNormItem,
	CCGL_selectbpbjmx,
	CCGL_getCK,
	CCGL_getBM,
	CCGL_getFL,
} from "@/api/yjl";

export default {
  data() {
    return {
      tableHeight: window.innerHeight - 260,
      searchForm: {
        rq: [],
        ck: "",
        cx: "",
        cpmc: "",
        bc: "",
        sjd: "W",
        inspectionItemFk: "",
        operativeNormFk: "",
        rawMaterialFk: "",
        supplierFk: ""
      },
      rowData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      ck: [],
      zxbzOptions: [],
      bpbjfl: [],
      gysOptions: [],
      yclOptions: [],
			bpbjwlbm: [],
      tableData: []
    };
  },
  mounted() {
    this.getMsg();
    this.getCK();
    this.getBM();
    this.getFL()
  },
  methods: {
    reset() {
      this.searchForm.ck = "";
      this.searchForm.bpbjfl = "";
      this.searchForm.bpbjwlbm = "";
      this.getMsg();
    },
		getCK() {
  		CCGL_getCK().then((res) => {
  			if (res.code === 200) {
  				this.ck = res.data
				}
			})
		},
		getBM() {
			CCGL_getBM().then((res) => {
				if (res.code === 200) {
					this.bpbjfl = res.data
				}
			})
		},
		getFL() {
			CCGL_getFL().then((res) => {
				if (res.code === 200) {
					this.bpbjwlbm = res.data
				}
			})
		},
    getMsg() {
      const para = {
        data: {
          bpbjfl: this.searchForm.bpbjflFk,
          ck: this.searchForm.ckid,
          operativeNormFk: this.searchForm.operativeNormFk,
					bmzt: this.bmzt,
					cjrqzt: this.cjrqzt,
					kcslhjzt: this.kcslhjzt
        },
        pageNum: this.page,
        pageSize: this.pageSize
      };
			CCGL_selectbpbjmx(para).then(res => {
        if (res.code === 200) {
          this.tableData = res.data.records;
          this.total = res.data.total;
        }
      });
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
    openDetails(row, selected) {
      if (this.rowData.length >= 1) {
        this.$refs.multipleTable.clearSelection();
        this.$refs.multipleTable.toggleRowSelection(row);
      } else {
        this.$refs.multipleTable.toggleRowSelection(row);
      }
      this.b_VehicleClassOID = row.b_VehicleClassOID;
    },
    selectRow(selection, row) {
      // console.log(selection) //复选框选中行
      this.rowData = selection;
    },
    selectAll(selection) {
      this.rowData = selection;
    }
  }
};
</script>
<style scoped>

</style>
