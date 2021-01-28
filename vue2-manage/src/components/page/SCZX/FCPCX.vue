<template>
  <div style="height: 100%; width: 100%" class="table">
    <div class="searchForm padding">
      <div class="searchInput">
        <p style="width: 112px">日期</p>
        <el-date-picker
          v-model="searchForm.rq"
          type="daterange"
          :picker-options="pickerOptions2"
          value-format="yyyy-MM-dd"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        >
        </el-date-picker>
      </div>
      <div class="searchInput">
        <p style="width: 112px">车间</p>
        <el-select
          v-model="searchForm.cj"
          placeholder="请选择"
          :popper-append-to-body="false"
          @change="cjSelect"
        >
          <el-option
            v-for="item in cjOptions"
            :key="item.siteId"
            :label="item.siteCode + '-' + item.siteName"
            :value="item.siteId"
          >
          </el-option>
        </el-select>
      </div>
      <div class="searchInput">
        <p>产线</p>
        <el-select
          v-model="searchForm.productionLineFk"
          placeholder="请选择"
          @change="cjSelect"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="item in cxOptions"
            :key="item.workLineId"
            :label="item.workLineCode + '-' + item.workLineName"
            :value="item.workLineId"
          >
          </el-option>
        </el-select>
      </div>
      <div class="searchInput">
        <p style="width: 110px">副产品阶段</p>
        <el-select v-model="searchForm.spinoffName" :popper-append-to-body="false" placeholder="请选择">
          <el-option
            v-for="item in spinoffNameOptions"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
      <div class="searchInput">
        <p style="width: 112px">副产品类型</p>
        <el-select v-model="searchForm.spinoffTyep" :popper-append-to-body="false" placeholder="请选择">
          <el-option
            v-for="item in spinoffTyepOptions"
            :key="item.byProductTypeItemId"
            :label="item.byProductTypeItemName"
            :value="item.byProductTypeItemId"
          >
          </el-option>
        </el-select>
      </div>
      <div class="searchDiv3-2" style="width: calc(33% - 1px)">
        <section class="reset_button" @click="reset()" size="small">
          重置
        </section>
        <section class="query_button" @click="getMsg" size="small">
          查询
        </section>
      </div>
    </div>
    <div style="height: 40%; margin-top: 15px; display: flex">
      <div style="height: 100%; width: 50%" class="all_background">
        <div class="all_color all_top" style="margin-left: 15px">
          重量趋势图
        </div>
        <div
          id="twChart"
          style="width: 100%; height: calc(100% - 42px)"
          class="twChart"
        ></div>
      </div>
      <div
        style="height: 100%; width: calc(50% - 15px); margin-left: 15px"
        class="all_background"
      >
        <div class="all_color all_top" style="margin-left: 15px">
          副产品率时间推移趋势图
        </div>
        <div
          id="oneChart"
          style="width: 100%; height: calc(100% - 42px)"
          class="oneChart"
        ></div>
      </div>
    </div>

    <div style="margin-top: 15px">
      <div class="baseTable padding">
        <div style="overflow-y: auto">
          <el-table
            :data="tableData"
            style="width: 100%"
            ref="multipleTable"
            @select="selectRow"
            @select-all="selectAll"
            highlight-current-row
            @row-click="openDetails"
            :header-cell-style="{
              background: '#1888fa',
              color: '#FFFFFF',
              height: '40px',
            }"
            show-overflow-tooltip
            :height="tableHeight"
            class="table"
          >
            <el-table-column
              prop="shopName"
              label="车间"
              min-width="120px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="spinoffName"
              label="副产品阶段"
              min-width="120px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="spinoffType"
              label="副产品类型"
              min-width="120px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="spinoffWeight"
              label="副产品重量"
              min-width="120px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="surplusWeight"
              label="剩余重量"
              min-width="120px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="bigPackage"
              label="是否合并大包"
              min-width="120px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{ scope.row.bigPackage === true ? "是" : "否" }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="generateDate"
              label="生成日期(D/C)"
              min-width="120px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="lineOther"
              label="线别"
              min-width="120px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="createDate"
              label="创建日期"
              min-width="120px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column label="详情" width="100px">
              <template slot-scope="scope">
                <section
                  class="table_button"
                  @click="viewXQ(scope.row)"
                  size="small"
                >
                  查看
                </section>
              </template>
            </el-table-column>
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
    <div class="mack" v-if="fcpmxShow">
      <div><i class="iconfont iconguanbi close" @click="guanbi"></i></div>
      <div
        style="
          height: 16px;
          margin-top: 25px;
          margin-left: 15px;
          color: #ffffff;
          font-size: 16px;
        "
      >
        <span>{{ cjmcShow }} </span>
        <span style="margin-left: 5px"
          ><img
            src="../../../assets/img/dian.png"
            alt="image"
            style="height: 4px"
        /></span>
      </div>
      <div class="eltabs">
        <fcpmx :fcpmxData="fcpmxData"></fcpmx>
      </div>
    </div>
  </div>
</template>
<script>
import {
  SCZX_spinoffselectPage,
  JCSJ_getVSite,
  JCSJ_getVWorkline,
  JCSJ_getFcpTest,
  JCSJ_getVByproducttypeitem,
} from "../../../api/yjl";
import echarts from "echarts";
import fcpmx from "./FCP/fcp";
export default {
  components: {
    fcpmx,
  },
  data() {
    return {
      fcpmxShow: false,
      tableData: [],
      sjtime: [],
      dateTimearr: [],
      dataZlarr: [],
      dataCplarr: [],
      tableHeight: window.innerHeight - 420,
      page: 1,
      pageSize: 10,
      total: 0,
      searchForm: {
        rq: [],
        cj: "",
        cx: "",
        cpmc: "",
        bc: "",
        sjd: "W",
        productionLineFk: "",
        spinoffName: "",
        spinoffTyep: "",
        workshopFk: "",
      },
      pickerOptions2: {
        shortcuts: [
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 92);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近半年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 184);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: "最近一年",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      cjOptions: [],
      cxOptions: [],
      spinoffNameOptions: [],
      spinoffTyepOptions: [],
      xZhou: [],
      leftarr: [],
      rightarr: [],
      fcpmxData: {
        productionId: "",
      },
    };
  },
  created() {
    this.timeNow();
    this.getMsg();
    this.getcj();
    this.getfcpkjd();
    this.getfcplx();
  },
  mounted() {},
  methods: {
    viewXQ(row) {
      this.cjmcShow = row.shopName;
      this.fcpmxData.productionId = row.productionId;
      this.fcpmxShow = true;
    },
    guanbi() {
      this.fcpmxShow = false;
    },
    timeNow() {
      this.searchForm.rq = [];
      var d = new Date(),
        str = "";
      str += d.getFullYear() + "-";
      str += d.getMonth() + 1 + "-";
      str += d.getDate();
      this.searchForm.rq.push(str);
      this.searchForm.rq.push(str);
    },
      timeNow() {
        this.searchForm.rq = [];
        var d = new Date(),
          str = "";
        str += d.getFullYear() + "-";
        str += d.getMonth() + 1 + "-";
        str += d.getDate();
        this.searchForm.rq.push(str);
        this.searchForm.rq.push(str);
      },
      getfcpkjd() {
        JCSJ_getFcpTest().then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.spinoffNameOptions = res.data;
          }
        });
      },
      getfcplx() {
        JCSJ_getVByproducttypeitem().then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.spinoffTyepOptions = res.data;
          }
        });
      },
      getcj() {
        JCSJ_getVSite().then((res) => {
          console.log(res);
          if (res.code == 200) {
            this.cjOptions = res.data;
          }
        });
      },
      getcx() {
        JCSJ_getVWorkline(this.searchForm.cj).then((res) => {
          if (res.code == 200) {
            this.cxOptions = res.data;
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      cjSelect() {
        this.cxOptions = [];
        this.getcx();
      },
      reset() {
        this.searchForm.rq = [];
        this.searchForm.productionLineFk = "";
        this.searchForm.spinoffName = "";
        this.searchForm.spinoffTyep = "";
        this.searchForm.cj = "";
        //  this.getMsg()
      },
      getMsg() {
        if (this.searchForm.rq == [] || this.searchForm.rq == null) {
          this.$message.error("请先选择日期");
          return;
        }
        var startTime = "";
        var endTime = "";
        if (this.searchForm.rq != [] && this.searchForm.rq != null) {
          startTime = this.searchForm.rq[0];
          endTime = this.searchForm.rq[1];
        }
        let para = {
          data: {
            entTime: endTime,
            productionLineFk: this.searchForm.productionLineFk,
            spinoffName: this.searchForm.spinoffName,
            spinoffTyep: this.searchForm.spinoffTyep,
            startTime: startTime,
            workshopFk: this.searchForm.cj,
          },
          pageNum: this.page,
          pageSize: this.pageSize,
        };
        SCZX_spinoffselectPage(para).then((res) => {
          if (res.code == 200) {
            this.tableData = res.data.records;
            this.total = res.data.total;
            this.xZhou = [];
            this.leftarr = [];
            this.rightarr = [];
            if (res.data.records.length > 0) {
              var dynamicList = res.data.records[0].dynamicList;
              for (var i = 0; i < dynamicList.length; i++) {
                this.xZhou.push(dynamicList[i].value);
                this.leftarr.push(dynamicList[i].reviewValueA);
                this.rightarr.push(dynamicList[i].reviewValueB);
              }
            }
            this.myLine();
          }
        });
      },

      myLine() {
        var option = {
          tooltip: {
            trigger: "axis",
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "5%",
            containLabel: true,
          },
          toolbox: {
            feature: {},
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.xZhou,
            axisLine: {
              lineStyle: {
                color: "#E9F4FF",
                width: 0, //这里是为了突出显示加上的
              },
            },
            //去掉刻度线
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            type: "value",
            name: "单位:吨",
            min: 0,
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                color: "#E9F4FF",
                width: 0, //这里是为了突出显示加上的
              },
              //去掉刻度线
              axisTick: {
                show: false,
              },
            },
          },
          series: [
            {
              name: "产率",
              type: "line",
              symbol: "none",
              data: this.leftarr,
              itemStyle: {
                // normal : {
                // //color:'#8cd5c2', //改变折线点的颜色
                //         lineStyle:{
                //         color:'#44D7B6' //改变折线颜色
                //         }
                // }
              },
            },
          ],
        };
        var optiontwo = {
          tooltip: {
            trigger: "axis",
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "5%",
            containLabel: true,
          },
          toolbox: {
            feature: {},
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: this.xZhou,
            axisLine: {
              lineStyle: {
                color: "#E9F4FF",
                width: 0, //这里是为了突出显示加上的
              },
            },
            //去掉刻度线
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            name: "单位:%",
            type: "value",
            min: 0,
            splitNumber: 5,
            axisLine: {
              lineStyle: {
                color: "#E9F4FF",
                width: 0, //这里是为了突出显示加上的
              },
              //去掉刻度线
              axisTick: {
                show: false,
              },
            },
          },
          series: [
            {
              name: "产率",
              type: "line",
              symbol: "none",
              data: this.rightarr,
              itemStyle: {
                // normal : {
                // //color:'#8cd5c2', //改变折线点的颜色
                //         lineStyle:{
                //         color:'#F1B102' //改变折线颜色
                //         }
                // }
              },
            },
          ],
        };
        var twChart = echarts.init(document.getElementById("twChart"));
        twChart.setOption(option);
        var oneChart = echarts.init(document.getElementById("oneChart"));
        oneChart.setOption(optiontwo);
        window.onresize = function () {
          oneChart.resize();
          twChart.resize();
        };
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
      },
    
  },
};
</script>
<style scoped>
@keyframes show {
  0% {
    opacity: 0;
    left: 532px;
    /* // 从何处开始 */
  }

  100% {
    opacity: 1;
    left: 0;
  }
}

@keyframes hide {
  0% {
    opacity: 1;
    left: 0;
  }

  100% {
    opacity: 0;
    left: -532px;
    /* // 从何处开始 */
  }
}

.wrap {
  position: relative;
  height: 100%;
}

.query >>> .el-input--small .el-input__inner {
  height: 34px !important;
  line-height: 34px !important;
}

ul > li > p {
  width: 110px;
  text-align: left;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.table >>> .has-gutter div {
  white-space: nowrap;
  overflow: hidden;
}

.table >>> .has-gutter div:hover {
  width: auto;
}

.tableDiv /deep/ .el-table,
.el-table__expanded-cell {
  background-color: transparent !important;
}

.tableDiv /deep/ .el-table tr {
  background-color: transparent !important;
}

.tableDiv /deep/ .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
}

.searchInputone /deep/ .el-range-editor--small .el-range-separator {
  color: #1888fa;
}

.basediv {
  color: #e9f4ff;
  margin-left: 20px;
  margin-top: 10px;
  font-size: 14px;
}

.showdiv {
  color: #44d7b6;
  margin-left: 20px;
  margin-top: 5px;
  font-size: 14px;
}
.mack {
  position: fixed;
  width: 60%;
  height: 60%;
  overflow: hidden;
  top: 20%;
  left: 20%;
  /* background: rgba(21, 21, 21, 0.7); */
  background-image: url("../../../assets/img/tanchuang.png");
  background-size: 100% 100%;
}
.close {
  float: right;
  color: #ffffff;
  font-size: 25px;
  margin-right: 5px;
}
.eltabs {
  margin-top: 30px;
  height: calc(100% - 30px);
  width: calc(100% - 50px);
  margin-left: 15px;
}
</style>