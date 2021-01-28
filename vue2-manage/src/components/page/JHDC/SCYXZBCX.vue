<template>
  <div style="height: 100%; width: 100%" class="table">
    <div class="searchForm padding">
      <div class="searchInputs" style="width: calc(50% - 10px)">
        <p style="width: 140px">时间段</p>
        <el-select
          v-model="searchForm.sjd"
          style="width: calc(30% + 110px)"
          :popper-append-to-body="false"
          placeholder="请选择"
        >
          <el-option
            v-for="item in sjdOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="searchForm.rq"
          type="datetimerange"
          :picker-options="pickerOptions2"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          align="right"
        >
        </el-date-picker>
      </div>
      <div class="searchInputs">
        <p>车间</p>
        <el-select v-model="searchForm.cj" :popper-append-to-body="false" placeholder="请选择">
          <el-option
            v-for="item in cjOptions"
            :key="item.siteId"
            :label="item.siteCode + '-' + item.siteName"
            :value="item.siteId"
          >
          </el-option>
        </el-select>
      </div>
      <div class="searchInputs">
        <p style="width: 200px">是否统计总量</p>
        <el-checkbox v-model="searchForm.gross"></el-checkbox>
      </div>
      <div class="searchDiv">
        <section class="reset_button" @click="reset()" size="small">
          重置
        </section>
        <section class="query_button" @click="getMsg" size="small">
          查询
        </section>
      </div>
      <!-- <div class="searchInputone">
                <section class="query_button" @click="getMsg" size="small">查询</section>
                <section class="reset_button" @click="getMsg" size="small">重置</section>  
            </div> -->
    </div>
    <div style="display: flex; margin-top: 15px; height: calc(100% - 120px)">
      <div class="baseTable padding" style="width: 70%; height: calc(100% 0px)">
        <div style="overflow-y: auto">
          <el-table
            :data="tableData"
            style="width: 100%; height: 100%"
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
              prop="workshop"
              label="车间名称"
              min-width="120px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.workshop }}
                </div>
                <div v-else>
                  {{ scope.row.workshop }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="productName"
              label="产品名称"
              min-width="120px"
              show-overflow-tooltip
            ></el-table-column>
            <el-table-column
              prop="numberOfInput"
              label="投入数（kg）"
              min-width="120px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.numberOfInput }}
                </div>
                <div v-else>
                  {{ scope.row.numberOfInput }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="theoryOutput"
              label="理论产出（kg）"
              min-width="140px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.theoryOutput }}
                </div>
                <div v-else>
                  {{ scope.row.theoryOutput }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="actualOutput"
              label="实际产出（kg）"
              min-width="140px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.actualOutput }}
                </div>
                <div v-else>
                  {{ scope.row.actualOutput }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="actualOutput"
              label="未检验产出数(kg)"
              min-width="140px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.ccs }}
                </div>
                <div v-else>
                  {{ scope.row.ccs }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="actualOutput"
              label="产出数（kg）"
              min-width="140px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.wjyccs }}
                </div>
                <div v-else>
                  {{ scope.row.wjyccs }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="workInProcess"
              label="在制品数Δ（kg）"
              min-width="150px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.workInProcess }}
                </div>
                <div v-else>
                  {{ scope.row.workInProcess }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="inventoryQuantity"
              label="入库数（kg）"
              min-width="140px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.inventoryQuantity }}
                </div>
                <div v-else>
                  {{ scope.row.inventoryQuantity }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="coproductNumber"
              label="副产品数（kg）"
              min-width="140px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.coproductNumber }}
                </div>
                <div v-else>
                  {{ scope.row.coproductNumber }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="spInputNumber"
              label="SP投入数（kg）"
              min-width="140px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.spInputNumber }}
                </div>
                <div v-else>
                  {{ scope.row.spInputNumber }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="spUseYield"
              label="SP利用率"
              min-width="120px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.spUseYield }}
                </div>
                <div v-else>
                  {{ scope.row.spUseYield }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="rolledYield"
              label="直通率"
              min-width="120px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.rolledYield }}
                </div>
                <div v-else>
                  {{ scope.row.rolledYield }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="rolledThroughputYield"
              label="综合收率"
              min-width="120px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.rolledThroughputYield }}
                </div>
                <div v-else>
                  {{ scope.row.rolledThroughputYield }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="coproductYield"
              label="副产品率"
              min-width="120px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.coproductYield }}
                </div>
                <div v-else>
                  {{ scope.row.coproductYield }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="synthesisYield"
              label="综合产率"
              min-width="120px"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <div
                  style="color: #1888fa"
                  v-if="
                    scope.row.productName == '' || scope.row.productName == null
                  "
                >
                  {{ scope.row.synthesisYield }}
                </div>
                <div v-else>
                  {{ scope.row.synthesisYield }}
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div
        style="
          width: calc(30% - 15px);
          margin-left: 15px;
          background: rgb(4, 26, 54);
        "
      >
        <div style="padding: 30px 0px 0px 10px">
          <span style="color: #e9f4ff">车间产收率</span>
          <!-- <span style="color:#1888fa;margin-left:20px">{{cjcsl}}</span> -->
        </div>
        <div style="height: 50%; width: 100%">
          <div class="flex roundBox" style="width: 90%;justify-content: flex-end">
            <div class="round" style="margin-top: 7px;background: #1888FA;"></div>
            <div class="text">目标值</div>
          </div>
          <div
            id="twChart"
            style="width: 100%; height: calc(100% + 0px)"
            class="twChart"
          ></div>
        </div>
        <div>
          <div class="basediv">
            <span>直通率</span
            ><span class="showdiv">{{ rolledYield + "%" }}</span>
          </div>
          <div class="basediv">
            <span>综合收率</span
            ><span class="showdiv">{{ synthesizeReapYield + "%" }}</span>
          </div>
          <div class="basediv">
            <span>副产品率</span
            ><span class="showdiv">{{ byproductYield + "%" }}</span>
          </div>
          <div class="basediv">
            <span>SP产品率</span
            ><span class="showdiv">{{ spUseYield + "%" }}</span>
          </div>
          <div class="basediv">
            <span>综合产率</span
            ><span class="showdiv">{{ synthesizeOutputYield + "%" }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  JHDC_ProductionOIBatchselectPage,
  JHDC_ProductionOIBatchworkselectList,
  JCSJ_getVSite,
} from "../../../api/yjl";
import echarts from "echarts";
import bus from "../../../bus";

export default {
  name: "eCharts",
  data() {
    return {
      byproductYield: 0, //副产率
      outputYield: 0, //产率
      reapYield: 0, //收率
      rolledYield: 0, //直通率
      spUseYield: 0, //sp利用率
      synthesizeOutputYield: 0, //综合产率
      synthesizeReapYield: 0, //综合收率
      echartsdata: [0, 0, 0, 0],
      overdata: [],
      cjcsl: "17.9%",
      tableData: [],
      tableHeight: window.innerHeight - 320,
      page: 1,
      pageSize: 10,
      total: 0,
      count: 0,
      status: 0,
      rowData: [],
      cjOptions: [],
      searchForm: {
        rq: [],
        cj: "",
        cx: "",
        cpmc: "",
        gross: false,
        sjd: "ZT",
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
      sjdOption: [
        { value: "W", label: "未设置" },
        { value: "ZT", label: "昨天" },
        {
          value: "BZ",
          label: "本周",
        },
        { value: "BY", label: "本月" },
        { value: "SZ", label: "上周" },
        { value: "SY", label: "上月" },
      ],
    };
  },
  mounted() {
    //this.myLine();
    this.getcj();
  },
  created() {
    this.searchForm.rq = this.sjjs("ZT");
  },
  methods: {
    getcj() {
      JCSJ_getVSite().then((res) => {
        console.log(res);
        if (res.code == 200) {
          this.cjOptions = res.data;
          if (this.cjOptions.length > 0) {
            this.searchForm.cj = this.cjOptions[0].siteId;
            this.getMsg();
          }
        }
      });
    },
    reset() {
      this.searchForm.sjd = "W";
      this.searchForm.rq = [];
      // this.searchForm.cj=""
      this.searchForm.gross = false;
    },
    query() {
      this.getMsg();
      this.getMsgCj();
    },
    getMsg() {
      if (this.searchForm.cj == "") {
        this.$message.error("请选择车间");
        return;
      }
      if (this.searchForm.rq == [] || this.searchForm.rq == null) {
        this.$message.error("请先选择时间段");
        return;
      }
      if (this.searchForm.rq.length < 1) {
        this.$message.error("请先选择时间段");
        return;
      }
      //定义局部变量rq为接收查询条件中的时间段，防止为空，后面代码报错
      var startTime = "";
      var endTime = "";
      if (this.searchForm.rq != [] && this.searchForm.rq != "") {
        startTime = this.searchForm.rq[0];
        endTime = this.searchForm.rq[1];
      }

      const para = {
        endTime: endTime,
        gross: this.searchForm.gross,
        startTime: startTime,
        workshopFk: this.searchForm.cj,
      };
      JHDC_ProductionOIBatchselectPage(para).then((res) => {
        if (res.code == 200) {
          this.tableData = res.data;
          //   this.total = res.data.total;
        }
        this.getMsgCj();
      });
    },
    getMsgCj() {
      this.overdata = [];
      this.echartsdata = [];
      //定义局部变量rq为接收查询条件中的时间段，防止为空，后面代码报错
      var startTime = "";
      var endTime = "";
      if (this.searchForm.rq != [] && this.searchForm.rq != null) {
        startTime = this.searchForm.rq[0];
        endTime = this.searchForm.rq[1];
      }

      const para = {
        endTime: endTime,
        gross: this.searchForm.gross,
        startTime: startTime,
        workshopFk: this.searchForm.cj,
      };
      JHDC_ProductionOIBatchworkselectList(para).then((res) => {
        if (res.code == 200) {
          this.rolledYield = res.data[0].rolledYield;
          this.synthesizeReapYield = res.data[0].synthesizeReapYield;
          this.byproductYield = res.data[0].byproductYield;
          this.spUseYield = res.data[0].spUseYield;
          this.synthesizeOutputYield = res.data[0].synthesizeOutputYield;
          this.echartsdata.push(res.data[0].synthesizeOutputYield);
          this.echartsdata.push(res.data[0].synthesizeReapYield);
          this.echartsdata.push(res.data[0].byproductYield);
          this.echartsdata.push(res.data[0].rolledYield);
          this.echartsdata.forEach(() => {
            this.overdata.push(res.data[0].mbz)
          })
          this.myLine();
        }
      });
    },
    myLine() {
      var option = {
        xAxis: {
          type: "category",
          data: ["产率", "收率", "副产品率", "直通率"],
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
          axisLine: {
            lineStyle: {
              color: "#E9F4FF",
              width: 0, //这里是为了突出显示加上的
            },
          },
        },
        series: [
          {
            data: this.echartsdata,
            type: "bar",
            barWidth: 20, //柱图宽度
            itemStyle: {
              // normal:{
              //     color:['#5c89ff','#33c5ff','F7B500','43D7B5']
              // }
              color: function (params) {
                //注意，如果颜色太少的话，后面颜色不会自动循环，最好多定义几个颜色
                var colorList = ["#5c89ff", "#33c5ff", "#F7B500", "#43D7B5"];
                return colorList[params.dataIndex];
              },
            },
          },
          {
            data: this.overdata,
            type: "bar",
            barWidth: 20,
            itemStyle: {
              color: '#1888FA',
            },
          },
        ],
      };

      var twChart = echarts.init(document.getElementById("twChart"));
      twChart.setOption(option);
      window.onresize = function () {
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

    //从这开始及后面都是用来计算时间的

    //根据出入的lb判定需要哪种日期再进行返回
    sjjs(lb) {
      var now = new Date(); //当前日期
      var startStop = new Array();

      //获取当前时间
      var currentDate = new Date();
      if (lb == "BZ") {
        //返回date是一周中的某一天
        var week = currentDate.getDay();
        //返回date是一个月中的某一天
        var month = currentDate.getDate();

        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数
        var minusDay = week != 0 ? week - 1 : 6;
        //alert(minusDay);
        //本周 周一
        var monday = new Date(currentDate.getTime() - minusDay * millisecond);
        //本周 周日
        var sunday = new Date(monday.getTime() + 6 * millisecond);
        //添加本周时间
        var startsj = this.timeD(monday); //将标准时间转换年月日
        var startime =
          startsj.year + "-" + startsj.month + "-" + startsj.day + " 00:00:00";
        var endsj = this.timeD(sunday); //将标准时间转换年月日
        var endtime =
          endsj.year + "-" + endsj.month + "-" + endsj.day + " 23:59:59";
        startStop.push(startime); //本周起始时间
        //添加本周最后一天时间
        startStop.push(endtime); //本周终止时间
        //返回
        return startStop;
      } else if (lb == "BY") {
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //求出本月第一天
        var firstDay = new Date(currentYear, currentMonth, 1);

        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (currentMonth == 11) {
          currentYear++;
          currentMonth = 0; //就为
        } else {
          //否则只是月份增加,以便求的下一月的第一天
          currentMonth++;
        }

        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
        //求出上月的最后一天
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

        var startsj = this.timeD(firstDay); //将标准时间转换年月日
        var startime =
          startsj.year + "-" + startsj.month + "-" + startsj.day + " 00:00:00";
        var endsj = this.timeD(lastDay); //将标准时间转换年月日
        var endtime =
          endsj.year + "-" + endsj.month + "-" + endsj.day + " 23:59:59";
        startStop.push(startime); //本周起始时间
        //添加本周最后一天时间
        startStop.push(endtime); //本周终止时间
        //返回
        return startStop;
      }
      //上周
      else if (lb == "SZ") {
        //返回date是一周中的某一天
        var week = currentDate.getDay();
        //返回date是一个月中的某一天
        var month = currentDate.getDate();
        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数
        var minusDay = week != 0 ? week - 1 : 6;
        //获得当前周的第一天
        var currentWeekDayOne = new Date(
          currentDate.getTime() - millisecond * minusDay
        );
        //上周最后一天即本周开始的前一天
        var priorWeekLastDay = new Date(
          currentWeekDayOne.getTime() - millisecond
        );
        //上周的第一天
        var priorWeekFirstDay = new Date(
          priorWeekLastDay.getTime() - millisecond * 6
        );

        var startsj = this.timeD(priorWeekFirstDay); //将标准时间转换年月日
        var startime =
          startsj.year + "-" + startsj.month + "-" + startsj.day + " 00:00:00";
        var endsj = this.timeD(priorWeekLastDay); //将标准时间转换年月日
        var endtime =
          endsj.year + "-" + endsj.month + "-" + endsj.day + " 23:59:59";

        //添加至数组
        startStop.push(startime);
        startStop.push(endtime);

        return startStop;
      }
      //上月
      else if (lb == "SY") {
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        if (currentMonth == 0) {
          currentYear--;
          currentMonth = 11;
        } else {
          currentMonth--;
        }
        //获取某月的天数
        var monthStartDate = new Date(currentYear, currentMonth, 1);
        var monthEndDate = new Date(currentYear, currentMonth + 1, 1);
        var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);

        //获得上一个月的第一天
        var priorMonthFirstDay = new Date(currentYear, currentMonth, 1);
        //获得上一月的最后一天
        var priorMonthLastDay = new Date(currentYear, currentMonth, days);
        //添加至数组

        var startsj = this.timeD(priorMonthFirstDay); //将标准时间转换年月日
        var startime =
          startsj.year + "-" + startsj.month + "-" + startsj.day + " 00:00:00";
        var endsj = this.timeD(priorMonthLastDay); //将标准时间转换年月日
        var endtime =
          endsj.year + "-" + endsj.month + "-" + endsj.day + " 23:59:59";

        startStop.push(startime);
        startStop.push(endtime);
        //返回
        return startStop;
      } else if (lb == "ZT") {
        var timenow = new Date();
        timenow.setDate(timenow.getDate() - 1); //设置天数 -1 天，昨天的日期
        var y = timenow.getFullYear(); //年
        var m = timenow.getMonth() + 1; //月
        m = m < 10 ? "0" + m : m;
        var d = timenow.getDate(); //日
        d = d < 10 ? "0" + d : d;
        var yesterdayTime = y + "-" + m + "-" + d; //字符串拼接成自己想要的时间格式，现在是yyyy/mm/dd格式
        startStop.push(yesterdayTime + " 00:00:00");
        startStop.push(yesterdayTime + " 23:59:59");
        return startStop;
      } else {
        return [];
      }
    },

    //将标准时间转换年月日格式
    timeD(time) {
      let d = new Date(time),
        data = {
          year: d.getFullYear(),
          month: this.timeP(d.getMonth() + 1),
          day: this.timeP(d.getDate()),
          // 'hour': this.timeP(d.getHours()),
          // 'min': this.timeP(d.getMinutes()),
          // 'sec': this.timeP(d.getSeconds()),
        };
      return data;
    },
    timeP(s) {
      return s < 10 ? "0" + s : s;
    },
  },

  watch: {
    "searchForm.sjd": function (val) {
      this.searchForm.rq = this.sjjs(val);
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

/* .searchInputone /deep/ .el-checkbox__inner{
        background: #1888fa;
    } */
.basediv {
  color: #e9f4ff;
  margin-left: 20px;
  margin-top: 10px;
  font-size: 16px;
}

.showdiv {
  color: #44d7b6;
  margin-left: 20px;
  font-size: 16px;
}
</style>