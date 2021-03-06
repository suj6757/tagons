import React, { useState , useEffect} from 'react';
import { 
  Row, 
  Card, 
  CardBody, 
  Form, 
  FormGroup,
  Nav,
  NavItem,
  TabContent,
  TabPane,
  Button,
  Popover, 
  PopoverBody } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { injectIntl } from 'react-intl';
import classnames from 'classnames';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import ShowRoom from '../../../containers/pages/ShowRoom';
import RelationImage from '../../../containers/pages/RelationImage';
import Bubble from '../../../components/charts/Bubble';
import Line from '../../../components/charts/Line';
import Bar from '../../../components/charts/Bar';
import Scatter from '../../../components/charts/ScatterDatetime';
import { ReactTableWithPaginationCard } from '../../../containers/ui/ReactTableCards';
import { Colxx } from '../../../components/common/CustomBootstrap';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import { getSearchCondition, getIndustryTotalcategoryList , getSearchType,
         getIndustryPfactorGiRelatedwords,getGiBubble,getIndustryPfactorTrendandfactor} from '../../../redux/actions';

const Start = ({ intl }) => {
  const dispatch = useDispatch();
  const { industryApp } = useSelector(state => state.industryApp);
  const store = useSelector(state => state.startApp);
  const param1 = {};
  const [startDateRange, setStartDateRange] = useState(new Date());
  const [endDateRange, setEndDateRange] = useState(new Date());

  const [selectedOptionsStep1, setSelectedOptionsStep1] = useState([]);// eslint-disable-line no-unused-vars
  const [selectedOptionsStep2, setSelectedOptionsStep2] = useState([]);// eslint-disable-line no-unused-vars
  const [selectedOptionsStep3, setSelectedOptionsStep3] = useState([]);// eslint-disable-line no-unused-vars

  const [popoverOpenHelp1, setPopoverOpenHelp1] = useState(false);
  const [popoverOpenHelp2, setPopoverOpenHelp2] = useState(false);
  const [popoverOpenHelp3, setPopoverOpenHelp3] = useState(false);
  const [popoverOpenHelp4, setPopoverOpenHelp4] = useState(false);
  const [popoverOpenHelp5, setPopoverOpenHelp5] = useState(false);
  const [popoverOpenHelp6, setPopoverOpenHelp6] = useState(false);
 
  const [selectDataTypeStep1,setSelectDataTypeStep1] = useState([]); // eslint-disable-line no-unused-vars
  const [selectDataTypeStep2,setSelectDataTypeStep2] = useState([]); // eslint-disable-line no-unused-vars
  const [selectDataTypeStep3,setSelectDataTypeStep3] = useState([]); // eslint-disable-line no-unused-vars

  const [selectCategoryUpper , setCategoryUpper] = useState([]);// eslint-disable-line no-unused-vars
  const [selectName , setName] = useState('');// eslint-disable-line no-unused-vars
  const [selectCategoryList, setCategoryList] = useState([]);// eslint-disable-line no-unused-vars

  const [selectPretrendPercent, setPretrendPercent] = useState('0.0%');
  const [showPreTrend, setShowPreTrend] = useState(false);

  let categoryList = [];
  let categoryList1 = [];
  let categoryList2 = [];
  const categoryList3 = [];

  const { messages } = intl;
  const [selectTableData, setTableData] = useState([]);
  const [keyWordtext , setKeyWordtext] = useState('');
  const [selectKeyword, setKeyword] = useState('');      
  const [activeFirstTab, setActiveFirstTab] = useState('1');
  const [activeSentiment, setActiveSentiment] = useState('1');
  // api ????????? ????????? ?????? ?????????
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [loaderror, setLoadError] = useState(null);

  useEffect(() => {
    var date = new Date();
    var date1 = new Date();
    date.setDate(date.getDate() - 9);
    setStartDateRange(date); //????????? 
    
    date1.setDate(date1.getDate() -2);
    setEndDateRange(date1);// ?????????
    setLoading(true);  
    axios.post("/industry/GetIndustry_TotalCategory_List")
    .then((response) => {
        categoryList = response.data;
        setCategoryList(categoryList);
        setCategory();
        setLoading(false);
    })
    .catch(function (error) {
        console.log(error);
        setLoading(false);
    });
  }, []);


  const setCategory = () => {
    let preKey = '';
    
    var c1value = {label: "????????????", value: "????????????"};
    var c2value = {label: "????????????", value: "????????????"};
    var c3value = {label: "??????/?????????", value: "??????/?????????"};
    var tempcategoryList2 = [];
    let categoryData = {};
    categoryList1 = [];
    categoryList.Data.forEach(function(item, index) {
        if ( index === 0 ) {
            categoryData = item;
        }
        if (preKey !== item.Category1 ){
            preKey = item.Category1 ;
            categoryList1.push({ label : preKey, value : preKey });
        }
    });
    setSelectDataTypeStep1(categoryList1);
    //setSelectDataTypeStep1("????????????");
    setSelectedOptionsStep1(c1value);
    preKey = '-1';
    setSelectedOptionsStep2([]); 
    setSelectedOptionsStep3([]);
    categoryList.Data.forEach(function(item,index){ // eslint-disable-line no-unused-vars
        if (c1value.value === item.Category1 && preKey !== item.Category2 ){
            preKey = item.Category2 ;
            tempcategoryList2.push({label:preKey,value:preKey});
        }
    });
    setSelectDataTypeStep2(tempcategoryList2);
    setSelectedOptionsStep2(c2value); 

    setSelectedOptionsStep3([]);
    tempcategoryList2 = [];
    preKey = '-1';

    categoryList.Data.forEach(function(item,index){ // eslint-disable-line no-unused-vars
        if (c1value.value === item.Category1 && c2value.value === item.Category2 && preKey !== item.Category3 ){
            preKey = item.Category3 ; 
            tempcategoryList2.push({label:preKey,value:preKey});
        }
    });
    setSelectDataTypeStep3(tempcategoryList2);
    setSelectedOptionsStep3(c3value);
  }
  
  const category1Change = value =>{
    setSelectedOptionsStep1(value);
    setSelectedOptionsStep2([]); 
    setSelectedOptionsStep3([]);
  
    let preKey = '-1';
    categoryList1 = [];
    selectCategoryList.Data.forEach(function(item,index){ // eslint-disable-line no-unused-vars
        if (value.value === item.Category1 && preKey !== item.Category2 ){
            preKey = item.Category2 ;
            categoryList1.push({label:preKey,value:preKey});
        }
    });
    setSelectDataTypeStep2(categoryList1);
  }
  const category2Change = value =>{
    setSelectedOptionsStep2(value); 
    setSelectedOptionsStep3([]);
    let preKey = '-1';
    categoryList2 = []; 
    selectCategoryList.Data.forEach(function(item,index){ // eslint-disable-line no-unused-vars
        if (selectedOptionsStep1.value === item.Category1 && value.value === item.Category2 && preKey !== item.Category3 ){
            preKey = item.Category3 ;
            categoryList2.push({label:preKey,value:preKey});
        }
    });
    setSelectDataTypeStep3(categoryList2);
  }
  //datePicker format ??????
  const dateString = (dateValue) => {
    let retStr = '';
    //Year
    retStr = retStr.concat(dateValue.getFullYear());
    //Month
    if(dateValue.getMonth() < 10) {
        retStr = retStr.concat('-0', dateValue.getMonth() + 1);
    }
    else {
        retStr = retStr.concat('-', dateValue.getMonth() + 1);
    }
    //Date
    if(dateValue.getDate() < 10) {
        retStr = retStr.concat('-0', dateValue.getDate());
    }
    else {
        retStr = retStr.concat('-', dateValue.getDate());
    }
    return retStr;
  }
  //
  const preTrendClick = () => {
    console.log('preTrendClick',showPreTrend);
    if (showPreTrend){
      setShowPreTrend(false) ;
    }
    else{
      setShowPreTrend(true) ;
    }
  }
  //???????????? ???????????? ??????
  const handleSearchClick = (e) => {
    var param = {};
    var searchType = {};
    param.FromDate = dateString(startDateRange);
    param.ToDate = dateString(endDateRange);
    param.Category1 = selectedOptionsStep1.value;
    param.Category2 = selectedOptionsStep2.value;
    param.Category3 = selectedOptionsStep3.value;
    param.Keyword = keyWordtext;
    param.Category_upper = '';
    param.Name = '';
    param.activeFirstTab = activeFirstTab;

    searchType.ShowRoom = true;
    searchType.TrendQuad  = true;
    searchType.PostTrend  = false;
    searchType.FactorNBrand  = false;
    searchType.GiAnalysis  = true;
    searchType.GiAnalysisBubble  = true;
    searchType.RelationWord = false;
    setShowPreTrend(false);
    // ???????????? ???????????? ??????
    dispatch(getSearchType(searchType)); // ?????? ?????? ??????
    dispatch(getSearchCondition(param));
  }
  const chageShowTrend = (showVal) =>{
    setShowPreTrend(showVal) ;
  }
  //???????????? ???????????? ??????
  const searchActivrClick = () => {
    var param = {};
    var searchType = {};
    param.FromDate = dateString(startDateRange);
    param.ToDate = dateString(endDateRange);
    param.Category1 = selectedOptionsStep1.value;
    param.Category2 = selectedOptionsStep2.value;
    param.Category3 = selectedOptionsStep3.value;
    param.Keyword = keyWordtext;
    param.Category_upper = '';
    param.Name = '';
    param.activeFirstTab = activeFirstTab;

    searchType.ShowRoom = false;
    searchType.TrendQuad  = true;
    searchType.PostTrend  = false;
    searchType.FactorNBrand  = false;
    searchType.GiAnalysis  = true;
    searchType.GiAnalysisBubble  = true;
    searchType.RelationWord = false;
    // ???????????? ???????????? ??????
    setShowPreTrend(false);
    dispatch(getIndustryPfactorTrendandfactor(null));
    dispatch(getIndustryPfactorGiRelatedwords(null));
    dispatch(getGiBubble(null));
    dispatch(getSearchType(searchType)); // ?????? ?????? ??????
    dispatch(getSearchCondition(param));
  }
  const validateKeyword = (value) => {
    let error;
    if (!keyWordtext) {
      error = 'No Keywords';
    }
    return error;
  };
  const onKeywordChange = (e) =>{
    setKeyWordtext(e.target.value);
  };
  useEffect(() => {
    searchActivrClick();
  }, [activeFirstTab]);  
  if (loading) return <div className="loading" />;
  if (loaderror) return <div>????????? ??????????????????</div>;
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Card>
            <CardBody>
              { /* s: ?????? ?????? ?????? ?????? */ }
              <Form className="select-box-wrap multi">
              <div className="tbl-vertical-heading">
                <table>
                  <tbody>
                    <tr>
                      {/* vertical????????? ????????? th ?????? ????????? ???????????? ?????? ????????????. */}
                      <th style={{ width:'15%' }}>Period</th>
                      <td style={{ width:'85%' }} colSpan="3">
                        <div className="date-picker-wrap">
                          <DatePicker
                            locale={ko}
                            dateFormat="yyyy.MM.dd"
                            selected={startDateRange}
                            selectsStart
                            startDate={startDateRange}
                            endDate={endDateRange}
                            onChange={setStartDateRange}
                            placeholderText={messages['form-components.start']}
                          />
                          <span className="cal-range"> ~ </span>
                          <DatePicker
                            locale={ko}
                            dateFormat="yyyy.MM.dd"
                            selected={endDateRange}
                            selectsEnd
                            startDate={startDateRange}
                            endDate={endDateRange}
                            onChange={setEndDateRange}
                            placeholderText={messages['form-components.end']}
                          />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th style={{ width:'15%' }}>Product(???) Category</th>
                      <td style={{ width:'35%' }}>
                        <FormGroup className="select-box">
                          <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={selectedOptionsStep1 }
                            onChange={category1Change}
                            options={selectDataTypeStep1}
                          />
                        </FormGroup>
                        <FormGroup className="select-box">
                          <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={selectedOptionsStep2}
                            onChange={category2Change}
                            options={selectDataTypeStep2}
                          />
                        </FormGroup>
                        <FormGroup className="select-box">
                          <Select
                            components={{ Input: CustomSelectInput }}
                            className="react-select"
                            classNamePrefix="react-select"
                            name="form-field-name"
                            value={selectedOptionsStep3}
                            onChange={(val) => setSelectedOptionsStep3(val)}
                            options={selectDataTypeStep3}
                          />
                        </FormGroup>
                      </td>
                      <th style={{ width:'15%' }}>Product(???) Category</th>
                      <td style={{ width:'35%' }}>
                      <Formik
                        initialValues={{
                          keyword: '',
                        }}
                         //onSubmit={onSubmit}
                      >
                      {({ errors, touched }) => (
                        <FormGroup className="keyword-area">
                          <Field
                            className="form-control"
                            name="keyword"
                            validate={validateKeyword}
                            value={keyWordtext}
                            onChange={onKeywordChange}
                          />
                          {errors.keyword && touched.keyword && (
                            <div className="d-block noti-text">
                              {errors.keyword}
                            </div>
                          )}
                        </FormGroup>
                      )}
                      </Formik>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="text-center">
                <Button className="btn-xl mt-4" color="gray" onClick={handleSearchClick} >
                  ENTER
                </Button>
              </div>
              </Form>
              { /* e: ?????? ?????? ?????? ?????? */ }
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      {/* s:showwoom */}
      <Row className="mt-5">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <div className="box-title">
                <h2>Showroom</h2>
                <button type="button" className="help" id="popover_1" onClick={() => setPopoverOpenHelp1(true)} onKeyDown={() => setPopoverOpenHelp1(true)}><img src="/assets/img/icon/icon_help.png" alt="?????????" /></button>
                <Popover 
                  placement="right"
                  isOpen={popoverOpenHelp1}
                  target="popover_1"
                  toggle={() => setPopoverOpenHelp1(!popoverOpenHelp1)}
                  trigger="legacy"
                >
                  <PopoverBody>????????? ??????(?????????)??? ????????? ?????? top14??? ?????? ?????????</PopoverBody>
                </Popover>
              </div>
              {/* ????????? ????????? */}
              <div className="showroom-gallery">
                {/* ????????? ????????? */}
                {/* <ShowRoom  ref={showRoonGetData} /> */}
                <ShowRoom name="Showroom"/>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      {/* e:showwoom */}
      {/* s:tab menu */}
      <Row className="mt-5">
        <Colxx xxs="12">
          {/* s: ????????? */}
          <Nav tabs className="card-header-tabs ">
            <NavItem>
              <NavLink
                to="#"
                location={{}}
                className={classnames({
                  active: activeFirstTab === '1',
                  'nav-link': true,
                })}
                onClick={() => {
                  setActiveFirstTab('1');
                }}
              >
                P-Factor Analysis
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                to="#"
                location={{}}
                className={classnames({
                  active: activeFirstTab === '2',
                  'nav-link': true,
                })}
                onClick={() => {
                  setActiveFirstTab('2');
                }}
              >
                E-Factor Analysis
              </NavLink>
            </NavItem>
          </Nav>
          {/* e: ????????? */}
        </Colxx>
      </Row>
      {/* e:tab menu */}
      
      <Row>
        <Colxx xxs="12">
          <Card className="bor-top-radius0">
            <CardBody>
              {/* s:trend-quad */}
              <div className="box-title">
                <h2>Trend-Quad</h2>
                <button type="button" className="help" id="popover_2" onClick={() => setPopoverOpenHelp2(true)} onKeyDown={() => setPopoverOpenHelp2(true)}><img src="/assets/img/icon/icon_help.png" alt="?????????" /></button>
                <Popover 
                  placement="right"
                  isOpen={popoverOpenHelp2}
                  target="popover_2"
                  toggle={() => setPopoverOpenHelp2(!popoverOpenHelp2)}
                  trigger="legacy"
                >
                  <PopoverBody>
                    <div>(?????????) P/R Index??? ???????????? ???????????? ?????? ????????? ?????????, <span className="f-blue">???????????? ???????????? ???????????? ????????? ?????????</span></div>
                    <div>(?????????) Rise/Fall ??? ????????? ?????? ????????? ???????????? ????????????, ????????? ?????? Best100?????? <br />(P-Factor??? ??????) <span className="f-blue">????????? ????????? ??????????????? ????????? ?????????</span><br/>(E-Factor??? ??????) <span className="f-blue">????????????????????? ??????????????? ????????? ?????????</span></div>
                    <img src="/assets/img/icon/help.png" alt="????????? ?????????" />
                    <div className="f-red">????????? ?????????, ?????? ???????????? ??????????????????.</div>
                  </PopoverBody>
                </Popover>
              </div>
              <div className="clearfix box-line">
                <div className="box left">
                  <p className="desc">- ?????????(dot) ?????????, ?????? ???????????? ??????????????????.</p>
                  {/* ??? ????????? height ?????? props??? ?????? ?????? */}
                  {/* <Bubble height={550} /> */}
                  <Scatter height={600} name="TrendQuadScatter" chageShowTrend={chageShowTrend} activeFirstTab={activeFirstTab} className="scatter-chart"/>
                </div>
                <div className="box right">
                  <p className="desc">- Pre-Trend ?????? ???, ?????????????????? ???????????????.</p>
                  <div className="chart-area">
                    <div className="chart-header">
                      <div className="chart-title">
                        <h4>Post-Trend</h4>
                        <button type="button" className="help" id="popover_3" onClick={() => setPopoverOpenHelp3(true)} onKeyDown={() => setPopoverOpenHelp3(true)}><img src="/assets/img/icon/icon_help_small.png" alt="?????????" /></button>
                        <Popover
                          style={{ maxWidth: '600px' }}
                          placement="right"
                          isOpen={popoverOpenHelp3}
                          target="popover_3"
                          toggle={() => setPopoverOpenHelp3(!popoverOpenHelp3)}
                          trigger="legacy"
                        >
                          <PopoverBody>
                            ?????? ???????????? ????????? ????????? ????????? ????????? ???????????? ????????? ????????? <br/>
                            ???????????? ?????????, ???????????? <span className="f-blue">?????? ???????????? ??????</span>?????? ????????????, ?????? ???????????? ???????????? ?????????????????? ?????? ????????? ????????? ????????? ?????????.<br/>
                            Pre-Trend ???????????? ???????????? ?????? ???????????? ?????? ????????? ??? ???????????? ??? ??? ??????.
                          </PopoverBody>
                        </Popover>
                      </div>
                      <span className="mean" style={{ left: '70.0%' }} onClick={preTrendClick} aria-hidden="true">Pre-Trend <span className="number">{selectPretrendPercent}</span></span>
                      {/* ?????? 100% ???????????? number ?????? ????????? ?????? style ?????? ??????????????? ??????????????????.  */}
                    </div>
                    {/* ??? ????????? height ?????? props??? ?????? */}
                    <Line setPercent={setPretrendPercent} showPreTrend={showPreTrend} height={210} name="PostTrendLine" activeFirstTab={activeFirstTab} className="linetrend-chart"/>
                  </div>
                  <div className="chart-area mb-0">
                    <div className="chart-header">
                        {/* s: Sentiment Factor ??? */}
                        <Nav tabs className="card-header-tabs chart-tab">
                          <NavItem>
                          {activeFirstTab === '1'?
                            <NavLink
                              to="#"
                              location={{}}
                              className={classnames({
                                active: activeSentiment === '1',
                                'nav-link': true,
                              })}
                              onClick={() => {
                                setActiveSentiment('1');
                              }}
                            >
                              Sentiment Factor
                            </NavLink>
                            :
                            <NavLink
                              to="#"
                              location={{}}
                              className={classnames({
                                active: activeSentiment === '1',
                                'nav-link': true,
                              })}
                              onClick={() => {
                                setActiveSentiment('1');
                              }}
                            >
                              Product Factor
                            </NavLink>
                          }
                          </NavItem>
                          <NavItem>
                            <NavLink
                              to="#"
                              location={{}}
                              className={classnames({
                                active: activeSentiment === '2',
                                'nav-link': true,
                              })}
                              onClick={() => {
                                setActiveSentiment('2');
                              }}
                            >
                              Brand
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <button type="button" className="help" id="popover_4" onClick={() => setPopoverOpenHelp4(true)} onKeyDown={() => setPopoverOpenHelp4(true)}><img src="/assets/img/icon/icon_help_small.png" alt="?????????" /></button>
                            <Popover 
                              style={{ maxWidth: '600px' }}
                              placement="right"
                              isOpen={popoverOpenHelp4}
                              target="popover_4"
                              toggle={() => setPopoverOpenHelp4(!popoverOpenHelp4)}
                              trigger="legacy"
                            >
                              <PopoverBody>
                                (Sentiment Factor) <br/>
                                - ?????? ???????????? ????????? ????????? ????????? ????????? ???????????? ?????? ????????? ?????? 10???<br/>
                                - ?????????: ???????????? ?????? ?????? ???????????? ????????? / ?????????: ???????????? 10????????? ???????????? ????????? <br/>
                                (Brand) <br/>
                                - ?????? ???????????? ????????? ????????? ????????? ?????? ?????? ???????????? ????????? ?????? 10??? <br/>
                                - ?????????: ?????? ????????? ?????? ?????? ????????? ????????? / ?????????: ??????????????? 10????????? ????????? ????????? 
                              </PopoverBody>
                            </Popover>
                          </NavItem>
                        </Nav>
                        {/* e: Sentiment Factor ??? */}
                        {/* <h4>Sentiment Factor | <span>Brand</span></h4> */}
                    </div>
                    {/* ??? ????????? height ?????? props??? ?????? */}
                    <Bar height={210} name="TrendQuadBar" activeFirstTab={activeFirstTab} activeTab={activeSentiment}/>
                  </div>
                </div>
              </div>
              {/* e:trend-quad */}

              {/* s:grobal index analysis */}
              <div className="box-title mt-5">
                <h2>GI(Global Index) Analysis</h2>
                <button type="button" className="help" id="popover_5" onClick={() => setPopoverOpenHelp5(true)} onKeyDown={() => setPopoverOpenHelp5(true)}><img src="/assets/img/icon/icon_help.png" alt="?????????" /></button>
                <Popover
                  style={{ maxWidth: '700px' }}
                  placement="right"
                  isOpen={popoverOpenHelp5}
                  target="popover_5"
                  toggle={() => setPopoverOpenHelp5(!popoverOpenHelp5)}
                  trigger="legacy"
                >
                  <PopoverBody>
                    <div>
                      Global Index??? ????????? ????????? ?????? ?????? ?????? ?????? ?????? ???????????? ???????????? ???????????? ????????????, ????????????, ????????????, ?????????????????? ?????? GI?????? ???????????? PGI(Purchase GI), SGI(Satisfaction GI), DGI(Dis-satisfaction GI) ????????? ?????????.
                    </div>
                    <div>
                      <span className="f-blue">(Purchase Factor)</span> ????????? ????????? ?????? ?????? ????????? ????????????, PGI??? ???????????? ?????? <br/>
                      - ????????? ????????????, ????????? ????????? ????????? ??? ?????? ???????????? ?????????
                    </div>
                    <div>
                      <span className="f-blue">(Satisfaction Factor)</span> ????????? ???????????? ????????? ????????????, SGI??? ???????????? ?????? <br/>
                      - ????????? ????????????, ?????? ?????? ??? ???????????? ?????? ???????????? ?????????
                    </div>
                    <div>
                      <span className="f-blue">(Dis-satisfaction Factor)</span> ????????? ????????? ?????? ????????? ????????????, DGI??? ???????????? ??????<br/>
                      - ????????? ????????????, ?????? ?????? ??? ??????????????? ?????? ???????????? ?????????
                    </div>
                  </PopoverBody>
                </Popover>
              </div>
              
              <div className="table-sort-area">
                <div className="clearfix box-line">
                  <div className="box left">
                    <ReactTableWithPaginationCard  activeFirstTab={activeFirstTab}/>
                  </div>
                  <div className="box right relation-img">
                  {/* <button type="button" className="help" id="popover_6" onClick={() => setPopoverOpenHelp6(true)} onKeyDown={() => setPopoverOpenHelp6(true)}><img src="/assets/img/icon/icon_help_small.png" alt="?????????" /></button>
                  <Popover
                    className="pop-left"
                    style={{ maxWidth: '700px'}}
                    placement="left"
                    isOpen={popoverOpenHelp6}
                    target="popover_6"
                    toggle={() => setPopoverOpenHelp6(!popoverOpenHelp6)}
                    trigger="legacy"
                  >
                    <PopoverBody className="help-popup-body">
                      <div>
                        (?????????) DGI, ???????????? ???????????? ?????? <br/>
                        (?????????) SGI, ????????? ???????????? ?????? <br/>
                        (????????????) PGI, ?????? ??????????????? ???????????? ??????
                      </div>     
                      <img src="/assets/img/icon/help2.png" alt="????????? ?????????" />
                      <p className="f-red">?????? ?????????, ????????? ????????? ????????? ???????????? ??????????????????.</p>
                    </PopoverBody>
                  </Popover> */}
                    <Bubble height={470} className="relation-bubble" name="GiBubble" activeFirstTab={activeFirstTab}/>
                    <p className="desc text-right">- ??? ?????? ?????? ???, ?????? ????????? ???????????????.</p>
                  </div>
                </div>
                {/* s: ?????? ????????? ?????? */}
                <div className="showroom-gallery relation-gallery" style={{overflow: 'hidden'}}>
                   <RelationImage activeTab={activeSentiment}/> 
                </div>
                {/* e: ?????? ????????? ?????? */}
                
              </div>
              {/* e:grobal index analysis */}
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      
    </>
  );
};

export default injectIntl(Start);
