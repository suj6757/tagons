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

const INIT_STATE = {
    iEfactorGiData : null ,
    iEfactorGiRelatedwordsData : null ,
    iEfactorTrendandfactorData : null ,
    iEfactorTrendquadData : null,
    iPfactorGiData : null ,
    iPfactorGiRelatedwordsData : null ,
    iPfactorTrendandfactorData : null ,
    iPfactorTrendquadData : null ,
    iShowroomData : null ,
    iTotalcategoryListData : null ,
    iTrendquadSelectData : null ,
    iGiAnalysisSelectData : null ,
    iGiBubbleelectData : null ,
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case TREND_INDUSTRY_EFACTOR_GI:
            return {...state, iEfactorGiData: {...action.payload}};
        case TREND_INDUSTRY_EFACTOR_GI_RELATEDWORDS:
            return {...state, iEfactorGiRelatedwordsData: {...action.payload}};
        case TREND_INDUSTRY_EFACTOR_TRENDANDFACTOR:
            return {...state, iEfactorTrendandfactorData: {...action.payload}};
        case TREND_INDUSTRY_EFACTOR_TRENDQUAD:
            return {...state, iEfactorTrendquadData: {...action.payload}};
        case TREND_INDUSTRY_PFACTOR_GI:
            return {...state, iPfactorGiData: {...action.payload}};
        case TREND_INDUSTRY_PFACTOR_GI_RELATEDWORDS:
            return {...state, iPfactorGiRelatedwords: {...action.payload}};
        case TREND_INDUSTRY_PFACTOR_TRENDANDFACTOR:
            return {...state, iPfactorTrendandfactor: {...action.payload}};
        case TREND_INDUSTRY_PFACTOR_TRENDQUAD:
            return {...state, iPfactorTrendquad: {...action.payload}};
        case TREND_INDUSTRY_SHOWROOM:
            return {...state, iShowroomData: {...action.payload}};
        case TREND_INDUSTRY_TOTALCATEGORY_LIST:
            return {...state, iTotalcategoryListData: {...action.payload}};
        case TREND_SUCCESS_INDUSTRY_TOTALCATEGORY_LIST:
            return {...state, iTotalcategoryListData: {...action.payload}};
        case TREND_INDUSTRY_GI_BUBBLE:
            return {...state, iGiBubbleelectData: {...action.payload}};
        default: 
            return state;
    }
};