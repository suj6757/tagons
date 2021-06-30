import axios from 'axios';
import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
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
  TREND_INDUSTRY_TOTALCATEGORY_LIST_SUCCESS,
  TREND_INDUSTRY_TOTALCATEGORY_LIST_ERROR,
} from '../actions';

import {
  getIndustryEfactorGi,
  getIndustryEfactorGiRelatedwords,
  getIndustryEfactorTrendandfactor,
  getIndustryEfactorTrendquad,
  getIndustryPfactorGi,
  getIndustryPfactorGiRelatedwords,
  getIndustryPfactorTrendandfactor,
  getIndustryPfactorTrendquad,
  getIndustryShowroom,
  getIndustryTotalcategoryList,
  getIndustryTotalcategoryListSuccess,
  getIndustryTotalcategoryListError,
} from './actions';

function* industryEfactorGi({ payload }){
  // eslint-disable-next-line no-use-before-define
  console.log('industryEfactorGi');
}

export function* watchIndustryEfactorGi() {
  
  yield takeEvery(TREND_INDUSTRY_EFACTOR_GI, industryEfactorGi);
}

function* industryEfactorGiRelatedwords({ payload }){
  console.log('industryEfactorGiRelatedwords');
}

export function* watchIndustryEfactorGiRelatedwords() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(TREND_INDUSTRY_EFACTOR_GI_RELATEDWORDS, industryEfactorGiRelatedwords);
}

function* industryEfactorTrendandfactor({ payload }){
  console.log('industryEfactorTrendandfactor');
}

export function* watchIndustryEfactorTrendandfactor() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(TREND_INDUSTRY_EFACTOR_TRENDANDFACTOR, industryEfactorTrendandfactor);
}



export function* watchIndustryEfactorTrendquad() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(TREND_INDUSTRY_EFACTOR_TRENDQUAD, industryEfactorTrendquad);
}

function* industryEfactorTrendquad({ payload }){
  console.log('industryEfactorTrendquad');
}

export function* watchIndustryPfactorGi() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(TREND_INDUSTRY_PFACTOR_GI, industryPfactorGi);
}

function* industryPfactorGi({ payload }){
  console.log('industryPfactorGi');
}

export function* watchIndustryPfactorGiRelatedwords() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(TREND_INDUSTRY_PFACTOR_GI_RELATEDWORDS, industryPfactorGiRelatedwords);
}

function* industryPfactorGiRelatedwords({ payload }){
  console.log('industryPfactorGiRelatedwords');
}

//우측 차트(바, 컬럼)
export function* watchIndustryPfactorTrendandfactor() {
    yield takeEvery(TREND_INDUSTRY_PFACTOR_TRENDANDFACTOR, industryPfactorTrendandfactor);
}
function* industryPfactorTrendandfactor({ payload }) {
    axios.post("/api/GetIndustry_PFactor_TrendAndFactor", payload)
    .then(function (response) {
        console.log(response);
    })
    .catch(function (error) {
        console.log(error);
    });
}

export function* watchIndustryPfactorTrendquad() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(TREND_INDUSTRY_PFACTOR_TRENDQUAD, industryPfactorTrendquad);
}

function* industryPfactorTrendquad({ payload }){
  console.log('industryPfactorTrendquad');
}

function* industryShowroom({ payload }){
  console.log('industryShowroom');
}

export function* watchIndustryShowroom() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(TREND_INDUSTRY_SHOWROOM, industryShowroom);
}

//검색조건 카테고리

const industryTotalcategoryListAsync = async() => {
    return axios.post("/api/GetIndustry_TotalCategory_List");
}

function* industryTotalcategoryList({ payload }) {
    try {
        const result = yield call(industryTotalcategoryListAsync);
        yield put(getIndustryTotalcategoryListSuccess(result));
    }
    catch(error) {
        yield put(getIndustryTotalcategoryListError());
    }
}
export function* watchIndustryTotalcategoryList() {
    yield takeEvery(TREND_INDUSTRY_TOTALCATEGORY_LIST, industryTotalcategoryList);
}

export default function* rootSaga() {
  yield all([
    fork(watchIndustryEfactorGi),
    fork(watchIndustryEfactorGiRelatedwords),
    fork(watchIndustryEfactorTrendandfactor),
    fork(watchIndustryEfactorTrendquad),
    fork(watchIndustryPfactorGi),
    fork(watchIndustryPfactorGiRelatedwords),
    fork(watchIndustryPfactorTrendandfactor),
    fork(watchIndustryPfactorTrendquad),
    fork(watchIndustryShowroom),
    fork(watchIndustryTotalcategoryList),
  ]);
}
