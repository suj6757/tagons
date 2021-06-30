import {
    SEARCH_CONDITION
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
    }
};

export default (state = INIT_STATE, action) => {
    switch(action.type){
        case SEARCH_CONDITION:
            return {...state, SearchCondition: {...action.payload}};
        default: 
            return state;
    }
};