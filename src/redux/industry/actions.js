import {
    TREND_INDUSTRY_EFACTOR_GI,
    TREND_INDUSTRY_EFACTOR_GI_RELATEDWORDS,
    TREND_INDUSTRY_EFACTOR_TRENDANDFACTOR,
    TREND_INDUSTRY_EFACTOR_TRENDQUAD,
    TREND_INDUSTRY_PFACTOR_GI,
    TREND_INDUSTRY_PFACTOR_GI_RELATEDWORDS,
    TREND_INDUSTRY_PFACTOR_TRENDANDFACTOR,
    TREND_INDUSTRY_PFACTOR_TRENDQUAD,
    TREND_INDUSTRY_SHOWROOM,
    TREND_INDUSTRY_TOTALCATEGORY_LIST,
    TREND_SUCCESS_INDUSTRY_TOTALCATEGORY_LIST,
    TREND_INDUSTRY_GI_BUBBLE,
} from '../actions';

export const getIndustryEfactorGi = (param) => ({
  type: TREND_INDUSTRY_EFACTOR_GI,
  payload: param,
});

export const getIndustryEfactorGiRelatedwords = (param) => ({
  type: TREND_INDUSTRY_EFACTOR_GI_RELATEDWORDS,
  payload: param, 
});

export const getIndustryEfactorTrendandfactor = (param) => ({
  type: TREND_INDUSTRY_EFACTOR_TRENDANDFACTOR,
  payload: param,   
});

export const getIndustryEfactorTrendquad = (param) => ({
  type: TREND_INDUSTRY_EFACTOR_TRENDQUAD, 
  payload: param, 
});

export const getIndustryPfactorGi = (param) => ({
  type: TREND_INDUSTRY_PFACTOR_GI,
  payload: param,
});

export const getIndustryPfactorGiRelatedwords = (param) => ({
  type: TREND_INDUSTRY_PFACTOR_GI_RELATEDWORDS,
  payload: param,
});

export const getIndustryPfactorTrendandfactor = (searchCondition) => ({
  type: TREND_INDUSTRY_PFACTOR_TRENDANDFACTOR,
  payload: searchCondition,
});

export const getIndustryPfactorTrendquad = (param) => ({
  type: TREND_INDUSTRY_PFACTOR_TRENDQUAD,
  payload: param,
});

export const getIndustryShowroom = (param) => ({
  type: TREND_INDUSTRY_SHOWROOM,
  payload: param,
});

//검색조건 카테고리
export const getIndustryTotalcategoryList = (param) => ({
  type: TREND_INDUSTRY_TOTALCATEGORY_LIST,
  payload: param,
});
export const getSuccessIndustryTotalcategoryList = (param) => ({
  type: TREND_SUCCESS_INDUSTRY_TOTALCATEGORY_LIST,
  payload: param,
});
export const getGiBubble = (param) => ({
  type: TREND_INDUSTRY_GI_BUBBLE,
  payload: param,
});