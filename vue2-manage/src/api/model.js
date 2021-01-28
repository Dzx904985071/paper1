import axios from '../utils/request';

const baseurl = window.urlConfig.base

export const pczsselectPage = params => { return axios.post(baseurl + 'batchselect/batchTraceability/selectPage',  params)};
export const cjzzpselectworkShop = params => { return axios.post(baseurl + 'productionimplementation/sectionQuery/selectworkShop',  params)};
export const getKanbanWorkshop = params => { return axios.post(baseurl + 'synthesizeboard/integratedkanban/getKanbanWorkshop',  params)};
export const getKanbanWorkshopCoproduct = params => { return axios.post(baseurl + 'synthesizeboard/integratedkanban/getKanbanWorkshopCoproduct',  params)};
export const getKanbanWorkshopFault = params => { return axios.post(baseurl + 'synthesizeboard/integratedkanban/getKanbanWorkshopFault',  params)};
export const getKanbanWorkshopMake = params => { return axios.post(baseurl + 'synthesizeboard/integratedkanban/getKanbanWorkshopMake',  params)};
export const getKanbanWorkshopReach = params => { return axios.post(baseurl + 'synthesizeboard/integratedkanban/getKanbanWorkshopReach',  params)};
export const CPCCselectQuery = params => { return axios.post(baseurl + 'productionimplementation/sectionQuery/selectQuery',  params)};
export const getProductproducecp = params => { return axios.get(baseurl + 'basicdata/jcsj/getProductproducecp',  {params})};
export const pczsgetVSite = params => { return axios.get(baseurl + 'basicdata/jcsj/getVSite',  {params})};
export const pczsgetVWorkline = params => { return axios.get(baseurl + 'basicdata/jcsj/getVWorkline',  {params})};
export const pczsgetVSpecification = params => { return axios.get(baseurl + 'basicdata/jcsj/getVSpecification',  {params})};
export const pczsselectBatchTree = params => { return axios.post(baseurl + 'batchselect/batchTraceability/selectBatchTree',  params)};
export const CKGLgetWarehouseAge = params => { return axios.post(baseurl + 'warehousemanagement/WarehouseAge/getWarehouseAge', params)};
export const CKGLselectPage = params => { return axios.post(baseurl + 'warehousemanagement/WarehouseAge/selectPage',  params)};
export const PCZSselectBatch = params => { return axios.post(baseurl + 'batchselect/batchTraceability/selectBatch',  params)};
