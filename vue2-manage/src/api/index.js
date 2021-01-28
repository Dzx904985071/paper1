import request from "../utils/request";

const baseurl = window.urlConfig.base;

export const qc0101selectPage = (para) => {
    return request({
        url: baseurl + "API/WorkFeedback/WorkOrder?OrderNumber=" + para,
        method: "post",
        data: para,
    });
};
export const SBGL_selectEquipmentMain = (para) => {//设备保养查询及预警
    return request({
        url:
            baseurl + "equipmentmanagement/betweenFailures/selectEquipmentMain",
        method: "post",
        data: para,
    });
};
export const SBGL_selectFailures = (para) => {
    return request({
        url: baseurl + "equipmentmanagement/betweenFailures/selectFailures",
        method: "post",
        data: para,
    });
};
export const SBGL_selectFailuresMX = (para) => {
    return request({
        url: baseurl + "equipmentmanagement/betweenFailures/selectFailuresMx",
        method: "post",
        data: para,
    });
};
export const SBGL_selectEquipment = (para) => {//设备故障查询
    return request({
        url: baseurl + "equipmentmanagement/betweenFailures/selectEquipment",
        method: "post",
        data: para,
    });
};
export const JCSJ_getEquipment = (para) => {//设备表
    return request({
        url: baseurl + "basicdata/jcsj/getEquipment",
        method: "get",
        data: para,
    });
};
//车间
export const JCSJ_getVSite = (para) => {
    return request({
        url: baseurl + "basicdata/jcsj/getVSite",
        method: "get",
        data: para,
    });
};
//产线
export const JCSJ_getVWorkline = (para) => {
    return request({
        url: baseurl + "basicdata/jcsj/getVWorkline?cjId=" + para,
        method: "get",
        data: para,
    });
};
export const JCSJ_getRepairrecordstatus = (para) => {
    return request({
        url: baseurl + "basicdata/jcsj/getRepairrecordstatus",
        method: "get",
        data: para,
    });
};
export const SBGL_selectMaintenance = (para) => {//平均故障维修时间查询
    return request({
        url: baseurl + "equipmentmanagement/betweenFailures/selectMaintenance",
        method: "post",
        data: para,
    });
};
export const SBGL_selectBreakdownMx = (para) => {//平均故障维修时间明细查询
    return request({
        url: baseurl + "equipmentmanagement/betweenFailures/selectBreakdownMx",
        method: "post",
        data: para,
    });
};
export const JCSJ_getPicitype = (para) => {//批次类型
    return request({
        url: baseurl + "basicdata/jcsj/getPicitype",
        method: "get",
        data: para,
    });
};
export const JCSJ_getVProducttype = (para) => {//产品分类列表
    return request({
        url: baseurl + "basicdata/jcsj/getVProducttype",
        method: "get",
        data: para,
    });
};
export const JHDC_selectSituation = (para) => {//月度生产计划汇总
    return request({
        url: baseurl + "planachieve/situation/selectSituation",
        method: "post",
        data: para,
    });
};
export const JHDC_selectSituationMx = (para) => {//月度生产计划汇总明细
    return request({
        url: baseurl + "planachieve/situation/selectSituationMx",
        method: "post",
        data: para,
    });
};
export const SCZX_selectworkShop = (para) => {
    return request({
        url: baseurl + "productionimplementation/sectionQuery/selectworkShop",
        method: "post",
        data: para,
    });
};
export const JHDC_selectTreasury = (para) => {
    return request({
        url: baseurl + "planachieve/situation/selectTreasury",
        method: "post",
        data: para,
    });
};
export const SCZX_selectShop = (para) => {//生产执行=>在制品查询
    return request({
        url: baseurl + "productionimplementation/sectionQuery/selectShop",
        method: "post",
        data: para,
    });
};
// export default {
//     qc0101selectPage: function(para) {
//         return request({
//           url: baseurl + 'mes/qc/qc01/qc0101/selectPage',
//           method: 'post',
//           data: para
//         })
//       },
// };
