import request from "../utils/request";

const baseurl = window.urlConfig.base;

export const ZLXX_selectPage = para => {
  return request({
    url: baseurl + "qualitynfIormation/iqc/selectPage",
    method: "post",
    data: para
  });
};
export const ZLXX_ipqcselectPage = para => {
  return request({
    url: baseurl + "qualitynfIormation/ipqc/selectPage",
    method: "post",
    data: para
  });
};
export const ZLXX_processselectPage = para => {
  return request({
    url: baseurl + "qualitynfIormation/processqualification/selectPage",
    method: "post",
    data: para
  });
};
//车间
export const JCSJ_getVSite = para => {
  return request({
    url: baseurl + "basicdata/jcsj/getVSite",
    method: "get",
    data: para
  });
};
//产线
export const JCSJ_getVWorkline = para => {
  return request({
    url: baseurl + "basicdata/jcsj/getVWorkline?cjId=" + para,
    method: "get",
    data: para
  });
};
//工序名称
export const JCSJ_getVSpecification = para => {
  return request({
    url: baseurl + "basicdata/jcsj/getVSpecification",
    method: "get",
    data: para
  });
};
//产品名称
export const JCSJ_getVProducttype = para => {
  return request({
    url: baseurl + "basicdata/jcsj/getVProducttype",
    method: "get",
    data: para
  });
};
//检验项目列表
export const JCSJ_getOperativeNormItem = para => {
  return request({
    url: baseurl + "basicdata/jcsj/getOperativeNormItem",
    method: "get",
    data: para
  });
};
//执行标准名称
export const JCSJ_getOperativenorm = para => {
  return request({
    url: baseurl + "basicdata/jcsj/getOperativenorm",
    method: "get",
    data: para
  });
};
//原材料列表
export const JCSJ_getProductproduce = para => {
  return request({
    url: baseurl + "basicdata/jcsj/getProductproduce",
    method: "get",
    data: para
  });
};
//供应商
export const JCSJ_getSupplier = para => {
  return request({
    url: baseurl + "basicdata/jcsj/getSupplier",
    method: "get",
    data: para
  });
};
//副产品阶段
export const JCSJ_getFcpTest = para => {
  return request({
    url: baseurl + "basicdata/jcsj/getFcpTest",
    method: "get",
    data: para
  });
};
//副产品类型
export const JCSJ_getVByproducttypeitem = para => {
  return request({
    url: baseurl + "basicdata/jcsj/getVByproducttypeitem",
    method: "get",
    data: para
  });
};
//生产运行指标重量分页查询
export const JHDC_ProductionOIselectPage = para => {
  return request({
    url: baseurl + "planachieve/ProductionOI/selectList",
    method: "post",
    data: para
  });
};
//生产运行指标重量车间数据分页查询
export const JHDC_ProductionOIworkselectList = para => {
  return request({
    url: baseurl + "planachieve/ProductionOI/workselectList",
    method: "post",
    data: para
  });
};
//生产运行指标批次分页查询
export const JHDC_ProductionOIBatchselectPage = para => {
  return request({
    url: baseurl + "planachieve/ProductionOIBatch/selectList",
    method: "post",
    data: para
  });
};
//生产运行指标重量车间数据分页查询
export const JHDC_ProductionOIBatchworkselectList = para => {
  return request({
    url: baseurl + "planachieve/ProductionOIBatch/workselectList",
    method: "post",
    data: para
  });
};
//生产运行指标趋势分页查询
export const JHDC_ProductionOITendencyselectPage = para => {
  return request({
    url: baseurl + "planachieve/ProductionOITendency/selectPage",
    method: "post",
    data: para
  });
};
//生产计划达成趋势分页查询
export const JHDC_ProductionPATendencyselectPage = para => {
  return request({
    url: baseurl + "planachieve/ProductionPATendency/selectPage",
    method: "post",
    data: para
  });
};

//分页查询副产品信息
export const SCZX_spinoffselectPage = para => {
  return request({
    url: baseurl + "productionimplementation/spinoff/selectPage",
    method: "post",
    data: para
  });
};
//分页查询副产品详细信息
export const SCZX_selectFcpMX = para => {
  return request({
    url: baseurl + "productionimplementation/spinoff/selectFcpMX",
    method: "post",
    data: para
  });
};

  //破碎筛工序分页查询
  export const CJKB_selectBroken = (para) => {
    return request({
      url: baseurl + "productionimplementation/spinoff/selectBroken",
      method: "post",
      data: para
    });
  };
  //投料工序分页查询
  export const CJKB_selectFeeding = (para) => {
    return request({
      url: baseurl + "productionimplementation/spinoff/selectFeeding",
      method: "post",
      data: para
    });
  };
  //混料工序分页查询
  export const CJKB_selectMixing = (para) => {
    return request({
      url: baseurl + "productionimplementation/spinoff/selectMixing",
      method: "post",
      data: para
    });
  };
  //焙烧工序分页查询
  export const CJKB_selectProcess = (para) => {
    return request({
      url: baseurl + "productionimplementation/spinoff/selectProcess",
      method: "post",
      data: para
    });
  };
  //包装工序分页查询
  export const CJKB_selectPackage = (para) => {
    return request({
      url: baseurl + "productionimplementation/spinoff/selectPackage",
      method: "post",
      data: para
    });
  };
  //车间在制品明细查询
  export const CJKB_selectShopMx = (para) => {
    return request({
      url: baseurl + "productionimplementation/sectionQuery/selectShopMx",
      method: "post",
      data: para
    });
  };
  /* 备品备件查询 */
export const CCGL_selectbpbjmx = para => {
  return request({
    url: baseurl + "newdemand/spareParts/kilnselectList",
    method: "post",
    data: para
  })
};
export const CCGL_getCK = para => {
  return request({
    url: baseurl + "newdemand/cktable/getck",
    method: "get",
    data: para
  })
};
export const CCGL_getBM = para => {
  return request({
    url: baseurl + "newdemand/dmtable/getbm",
    method: "get",
    data: para
  })
};
export const CCGL_getFL = para => {
  return request({
    url: baseurl + "newdemand/fltable/getfl",
    method: "get",
    data: para
  })
  };

  //窑炉产出数和产出率统计
  export const CKGL_kilnselectList = (para) => {
    return request({
      url: baseurl + "newdemand/kilnQuery/kilnselectList",
      method: "post",
      data: para
    });
  };
  //备品备件库龄查询
  //备品备件库龄
  export const CKGL_partsStoragekilnselectList = (para) => {
    return request({
      url: baseurl + "newdemand/partsStorage/kilnselectList",
      method: "post",
      data: para
    });
  };
  //备品备件库龄趋势
  export const CKGL_partsStoragestorageList = (para) => {
    return request({
      url: baseurl + "newdemand/partsStorage/storageList",
      method: "post",
      data: para
    });
  };
  //备品备件库龄明细查询
  export const CKGL_storagemxAgekilnselectList = (para) => {
    return request({
      url: baseurl + "newdemand/storagemxAge/kilnselectList",
      method: "post",
      data: para
    });
  };
  //通过批次号查询检验详情
  export const PCCX_selectJyxq = para => {
    return request({
      url: baseurl + "batchselect/batchTraceability/selectJyxq?pch="+para,
      method: "get",
      data: para
    })
  };
