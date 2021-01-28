import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/ZHKB",
    },
    {
      path: "/",
      component: () => import("../components/common/Home.vue"),
      meta: { title: "home" },
      children: [
        {
          path: "/loginSuccess",
          component: () => import("../components/page/loginSuccess.vue"),
          meta: { title: "首页" },
        },
        {
          // 批次追溯
          path: "/PCZS",
          component: () => import("../components/page/PCCX/PCZS.vue"),
          meta: { title: "批次追溯" },
        },
        {
          // 批次追溯流程表
          path: "/PCZSLCB",
          component: () => import("../components/page/PCCX/PCZSLCB.vue"),
          meta: { title: "批次追溯流程表" },
        },
        {
          path: "/YDSCHZ",
          component: () => import("../components/page/JHDC/YDSCHZ.vue"),
          meta: { title: "月度生产计划达成(汇总)" },
        },
        {
          path: "/YDSCXQ",
          component: () => import("../components/page/JHDC/YDSCXQ.vue"),
          meta: { title: "月度生产计划达成(详情)" },
        },
        {
          path: "/RKJHDC",
          component: () => import("../components/page/JHDC/RKJHDC.vue"),
          meta: { title: "入库计划达成" },
        },
        {
          path: "/CPFSDCC",
          component: () => import("../components/page/SCZX/CPFSDCC.vue"),
          meta: { title: "产品分时段查询" },
        },
        {
          path: "/SCYXZBCX",
          component: () => import("../components/page/JHDC/SCYXZBCX.vue"),
          meta: { title: "生产运行指标查询（批次）" },
        },
        {
          path: "/SCYXPCCX",
          component: () => import("../components/page/JHDC/SCYXPCCX.vue"),
          meta: { title: "生产运行批次查询" },
        },
        {
          path: "/SCYXZBQSCX",
          component: () => import("../components/page/JHDC/SCYXZBQSCX.vue"),
          meta: { title: "生产运行指标趋势查询" },
        },
        {
          path: "/SCJHDCQST",
          component: () => import("../components/page/JHDC/SCJHDCQST.vue"),
          meta: { title: "生产计划达成趋势图" },
        },
        {
          path: "/CJZZP",
          component: () => import("../components/page/SCZX/CJZZP.vue"),
          meta: { title: "车间在制品查询" },
        },
        {
          path: "/CJZZPQS",
          component: () => import("../components/page/SCZX/CJZZPQS.vue"),
          meta: { title: "车间在制品趋势查询" },
        },
        {
          path: "/FCPCX",
          component: () => import("../components/page/SCZX/FCPCX.vue"),
          meta: { title: "副产品查询" },
        },
        {
          path: "/CJKBCX",
          component: () => import("../components/page/SCZX/CJKBCX.vue"),
          meta: { title: "车间看板查询" },
        },
        {
          path: "/CJKBCXQP",
          component: () => import("../components/page/SCZX/CJKBCXQP.vue"),
          meta: { title: "车间看板查询" },
        },
        {
          path: "/SBBYJCXYJ",
          component: () => import("../components/page/SBGL/SBBYJCXYJ.vue"),
          meta: { title: "设备保养查询及预警" },
        },
        {
          path: "/SBGZCX",
          component: () => import("../components/page/SBGL/SBGZCX.vue"),
          meta: { title: "设备故障查询" },
        },
        {
            path: "/SYSTJSJB",
            component: () => import("../components/page/ZLXX/SYSTJSJB.vue"),
            meta: { title: "实验室数据统计表" },
        },
        {
            path: "/SYSTJSJBIPQC",
            component: () => import("../components/page/ZLXX/SYSTJSJBIPQC.vue"),
            meta: { title: "实验室数据统计表(IPQC)" },
        },
        {
            path: "/CPGXHGLTJ",
            component: () => import("../components/page/ZLXX/CPGXHGLTJ.vue"),
            meta: { title: "产品/工序合格率统计报表" },
        },
        {
          path: "/CKGL",
          component: () => import("../components/page/CKGL.vue"),
          meta: { title: "仓库管理" },
        },
        {
          path: "/PJGZWX",
          component: () => import("../components/page/SBGL/PJGZWX.vue"),
          meta: { title: "平均故障维修时间" },
        },
        {
          path: "/PJGZJG",
          component: () => import("../components/page/SBGL/PJGZJG.vue"),
          meta: { title: "平均故障间隔时间" },
        },
        {
          path: "/ZHKB",
          component: () => import("../components/page/ZHKB.vue"),
          meta: { title: "综合看板" },
        },
        {
          path: "/KLCX",
          component: () => import("../components/page/CKGL/KLCX.vue"),
          meta: { title: "库龄查询" },
        },
        {
          path: "/BPBJKLCX",
          component: () => import("../components/page/CKGL/BPBJKLCX.vue"),
          meta: { title: "备品备件库龄查询" },
        },
        {
          path: "/BPBJCX",
          component: () => import("../components/page/CKGL/BPBJCX.vue"),
          meta: { title: "备品备件查询" },
        },
        {
          path: "/YLTJCX",
          component: () => import("../components/page/CKGL/YLTJCX.vue"),
          meta: { title: "窑炉产出统计查询" },
        },
      ],
    },
    {
      path: "*",
      redirect: "/404",
    },
  ],
});
