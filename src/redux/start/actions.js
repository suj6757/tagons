import {
    SEARCH_CONDITION ,
    SEARCH_TYPE ,
} from '../actions';

export const getSearchCondition = (param) => ({
    type: SEARCH_CONDITION,
    payload: param
});
export const getSearchType = (param) => ({
    type: SEARCH_TYPE,
    payload: param
});