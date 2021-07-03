import {
    SEARCH_CONDITION,
    SEARCH_TYPE,
} from '../actions';

const INIT_STATE = {  
    SearchCondition : {
        FromDate : null,
        ToDate : null,
        Category1 : null,
        Category2 : null,
        Category3 : null,
        Keyword : null ,
        Category_upper : null , 
        Name : null, 
        Factor : null ,
    },
    SearchChart : {
        ShowRoom : false ,
        TrendQuad : false ,
        PostTrend : false ,
        FactorNBrand : false,
        GiAnalysis : false ,
        GiAnalysisBubble : false ,  
        RelationWord : false ,  
    }
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case SEARCH_CONDITION:
            return {...state, SearchCondition: {...action.payload}};
        case SEARCH_TYPE : 
            return {...state, SearchChart: {...action.payload}};
        default: 
            return state;
    }
};