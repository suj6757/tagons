import {
    SEARCH_CONDITION
} from '../actions';

export const getSearchCondition = (param) => ({
    type: SEARCH_CONDITION,
    payload: param
});