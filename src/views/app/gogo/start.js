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
import ShowRoom from '../../../containers/pages/ShowRoom';
import RelationImage from '../../../containers/pages/RelationImage';
import Bubble from '../../../components/charts/Bubble';
import Line from '../../../components/charts/Line';
import Bar from '../../../components/charts/Bar';
import Scatter from '../../../components/charts/ScatterDatetime';
import { ReactTableWithPaginationCard } from '../../../containers/ui/ReactTableCards';
import { Colxx } from '../../../components/common/CustomBootstrap';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import { useDispatch, useSelector } from 'react-redux';
import { getSearchCondition, getIndustryTotalcategoryList } from '../../../redux/actions';
import axios from 'axios';

const Start = ({ intl }) => {
  const dispatch = useDispatch();
  const { industryApp } = useSelector(state => state.industryApp);

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

  const [selectPretrendPercent, setPretrendPercent] = useState({ percent : '85.5%', percentStr : '85.5%' });
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

  useEffect(() => {
    var date = new Date();
    var date1 = new Date();
    date.setDate(date.getDate() - 9);
    setStartDateRange(date); //시작일 
    
    date1.setDate(date1.getDate() -2);
    setEndDateRange(date1);// 종료일
      
    axios.post("/api/GetIndustry_TotalCategory_List")
    .then((response) => {
        categoryList = response.data;
        setCategoryList(categoryList);
        setCategory();
    })
    .catch(function (error) {
        console.log(error);
    });
  }, []);

  const setCategory = () => {
    let preKey = '';
    
    var c1value = {label: "패션의류", value: "패션의류"};
    var c2value = {label: "여성의류", value: "여성의류"};
    var c3value = {label: "니트/스웨터", value: "니트/스웨터"};
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
    //setSelectDataTypeStep1("패션의류");
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

  useEffect(() => {
    
  }, [industryApp]);

  //datePicker format 수정
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
  
  //검색조건 엔터버튼 클릭
  const handleSearchClick = (e) => {
    var param = {};
    param.FromDate = dateString(startDateRange);
    param.ToDate = dateString(endDateRange);
    param.Category1 = selectedOptionsStep1.value;
    param.Category2 = selectedOptionsStep2.value;
    param.Category3 = selectedOptionsStep3.value;
    param.Keyword = keyWordtext;
    param.Category_upper = '';
    param.Name = '';
    param.activeFirstTab = activeFirstTab;
    
    // 검색조건 스토어에 저장
    dispatch(getSearchCondition(param));
  }

  //검색조건 엔터버튼 클릭
  const searchActivrClick = () => {
    var param = {};
    param.FromDate = dateString(startDateRange);
    param.ToDate = dateString(endDateRange);
    param.Category1 = selectedOptionsStep1.value;
    param.Category2 = selectedOptionsStep2.value;
    param.Category3 = selectedOptionsStep3.value;
    param.Keyword = keyWordtext;
    param.Category_upper = '';
    param.Name = '';
    param.activeFirstTab = activeFirstTab;
    
    // 검색조건 스토어에 저장
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

  return (
    <>
      <Row>
        <Colxx xxs="12">
          <Card>
            <CardBody>
              { /* s: 검색 조건 일단 여기 */ }
              <Form className="select-box-wrap multi">
              <div className="tbl-vertical-heading">
                <table>
                  <tbody>
                    <tr>
                      {/* vertical유형의 테이블 th 값은 인라인 스타일로 지정 바랍니다. */}
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
                      <th style={{ width:'15%' }}>Product(上) Category</th>
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
                      <th style={{ width:'15%' }}>Product(下) Category</th>
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
              { /* e: 검색 조건 일단 여기 */ }
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
                <button type="button" className="help" id="popover_1" onClick={() => setPopoverOpenHelp1(true)} onKeyDown={() => setPopoverOpenHelp1(true)}><img src="/assets/img/icon/icon_help.png" alt="도움말" /></button>
                <Popover 
                  placement="right"
                  isOpen={popoverOpenHelp1}
                  target="popover_1"
                  toggle={() => setPopoverOpenHelp1(!popoverOpenHelp1)}
                  trigger="legacy"
                >
                  <PopoverBody>조회한 상품(키워드)와 관련한 상위 top14개 상품 이미지</PopoverBody>
                </Popover>
              </div>
              {/* 이미지 갤러리 */}
              <div className="showroom-gallery">
                {/* 이미지 갤러리 */}
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
          {/* s: 탭메뉴 */}
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
          {/* e: 탭메뉴 */}
        </Colxx>
      </Row>
      {/* e:tab menu */}
      
      <Row>
        <Colxx xxs="12">
          <Card>
            <CardBody>
              {/* s:trend-quad */}
              <div className="box-title">
                <h2>Trend-Quad</h2>
                <button type="button" className="help" id="popover_2" onClick={() => setPopoverOpenHelp2(true)} onKeyDown={() => setPopoverOpenHelp2(true)}><img src="/assets/img/icon/icon_help.png" alt="도움말" /></button>
                <Popover 
                  placement="right"
                  isOpen={popoverOpenHelp2}
                  target="popover_2"
                  toggle={() => setPopoverOpenHelp2(!popoverOpenHelp2)}
                  trigger="legacy"
                >
                  <PopoverBody>
                    <div>(가로축) P/R Index는 상품수와 리뷰수의 합을 계산한 것으로, <span className="f-blue">상품수와 리뷰수가 많을수록 우측에 위치함</span></div>
                    <div>(세로축) Rise/Fall 은 요소의 랭킹 변화를 나타내는 지표로써, 네이버 쇼핑 Best100에서 <br />(P-Factor인 경우) <span className="f-blue">상품의 랭킹이 높아질수록 위쪽에 위치함</span><br/>(E-Factor인 경우) <span className="f-blue">요소의중요도가 높아질수록 위쪽에 위치함</span></div>
                    <img src="/assets/img/icon/help.png" alt="도움말 이미지" />
                    <div className="f-red">포인트 클릭시, 우측 그래프가 활성화됩니다.</div>
                  </PopoverBody>
                </Popover>
              </div>
              <div className="clearfix box-line">
                <div className="box left">
                  {/* 각 차트별 height 값은 props로 전달 차트 */}
                  {/* <Bubble height={550} /> */}
                  <Scatter height={500} name="TrendQuadScatter" activeFirstTab={activeFirstTab}/>
                </div>
                <div className="box right">
                  <div className="chart-area">
                    <div className="chart-header">
                      <div className="chart-title">
                        <h4>Post-Trend</h4>
                        <button type="button" className="help" id="popover_3" onClick={() => setPopoverOpenHelp3(true)} onKeyDown={() => setPopoverOpenHelp3(true)}><img src="/assets/img/icon/icon_help_small.png" alt="도움말" /></button>
                        <Popover
                          style={{ maxWidth: '600px' }}
                          placement="right"
                          isOpen={popoverOpenHelp3}
                          target="popover_3"
                          toggle={() => setPopoverOpenHelp3(!popoverOpenHelp3)}
                          trigger="legacy"
                        >
                          <PopoverBody>
                            좌측 포지셔닝 맵에서 선택한 요소에 대하여 트렌드의 흐름을 보여줌 <br/>
                            재생버튼 클릭시, 앞으로의 <span className="f-blue">미래 트렌드를 예측</span>하여 나타내며, 우측 상단으로 뻗어가는 그래프일수록 잠재 트렌드 요소인 것으로 판단됨.<br/>
                            Pre-Trend 퍼센트가 높을수록 향후 트렌드에 있어 변동이 큰 요소라고 볼 수 있음.
                          </PopoverBody>
                        </Popover>
                      </div>
                      <span className="mean" style={{ left: selectPretrendPercent.percentStr }} onClick={() => { showPreTrend == true ? setShowPreTrend(false) : setShowPreTrend(true); }}>Pre-Trend <span className="number">{selectPretrendPercent.percent}</span></span>
                      {/* 전체 100% 기준으로 number 값의 나머지 값을 style 값에 인라인으로 대입바랍니다.  */}
                    </div>
                    {/* 각 차트별 height 값은 props로 전달 */}
                    <Line setPercent={setPretrendPercent} showPreTrend={showPreTrend} height={210} name="PostTrendLine" activeFirstTab={activeFirstTab} />
                  </div>
                  <div className="chart-area mb-0">
                    <div className="chart-header">
                        {/* s: Sentiment Factor 탭 */}
                        <Nav tabs className="card-header-tabs chart-tab">
                          <NavItem>
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
                            <button type="button" className="help" id="popover_4" onClick={() => setPopoverOpenHelp4(true)} onKeyDown={() => setPopoverOpenHelp4(true)}><img src="/assets/img/icon/icon_help_small.png" alt="도움말" /></button>
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
                                - 좌측 포지셔닝 맵에서 선택한 요소에 대하여 소비자가 느낀 이미지 상위 10개<br/>
                                - 빨간색: 소비자가 가장 많이 연상하는 이미지 / 파란색: 소비자가 10번째로 연상하는 이미지 <br/>
                                (Brand) <br/>
                                - 좌측 포지셔닝 맵에서 선택한 요소가 가장 많이 언급되는 브랜드 상위 10개 <br/>
                                - 빨간색: 해당 요소가 가장 많이 언급된 브랜드 / 파란색: 해당요소가 10번째로 언급된 브랜드 
                              </PopoverBody>
                            </Popover>
                          </NavItem>
                        </Nav>
                        {/* e: Sentiment Factor 탭 */}
                        {/* <h4>Sentiment Factor | <span>Brand</span></h4> */}
                    </div>
                    {/* 각 차트별 height 값은 props로 전달 */}
                    <Bar height={210} name="TrendQuadBar" activeFirstTab={activeFirstTab} activeTab={activeSentiment}/>
                  </div>
                </div>
              </div>
              {/* e:trend-quad */}

              {/* s:grobal index analysis */}
              <div className="box-title mt-5">
                <h2>GI(Global Index) Analysis</h2>
                <button type="button" className="help" id="popover_5" onClick={() => setPopoverOpenHelp5(true)} onKeyDown={() => setPopoverOpenHelp5(true)}><img src="/assets/img/icon/icon_help.png" alt="도움말" /></button>
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
                      Global Index는 온라인 소비자 글과 패션 주요 속성 간의 연관성을 측정하여 나타내는 지표이며, 구매요인, 만족요인, 불만족요인에 따라 GI값을 보기위해 PGI(Purchase GI), SGI(Satisfaction GI), DGI(Dis-satisfaction GI) 지표를 생성함.
                    </div>
                    <div>
                      <span className="f-blue">(Purchase Factor)</span> 상품의 잠재적 구매 요인 랭킹을 보여주며, PGI를 구성하는 요인 <br/>
                      - 랭킹이 높을수록, 조회한 상품을 구매할 때 많이 고려하는 요소임
                    </div>
                    <div>
                      <span className="f-blue">(Satisfaction Factor)</span> 상품의 만족요인 랭킹을 보여주며, SGI를 구성하는 요인 <br/>
                      - 랭킹이 높을수록, 상품 구매 후 만족도가 높게 나타나는 요소임
                    </div>
                    <div>
                      <span className="f-blue">(Dis-satisfaction Factor)</span> 상품의 불만족 요인 랭킹을 보여주며, DGI를 구성하는 요인<br/>
                      - 랭킹이 높을수록, 상품 구매 후 불만족도가 높게 나타나는 요소임
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
                  <button type="button" className="help" id="popover_6" onClick={() => setPopoverOpenHelp6(true)} onKeyDown={() => setPopoverOpenHelp6(true)}><img src="/assets/img/icon/icon_help_small.png" alt="도움말" /></button>
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
                        (가로축) DGI, 불만족을 나타내는 정도 <br/>
                        (세로축) SGI, 만족을 나타내는 정도 <br/>
                        (버블크기) PGI, 잠재 구매욕구를 나타내는 정도
                      </div>     
                      <img src="/assets/img/icon/help2.png" alt="도움말 이미지" />
                      <p className="f-red">버블 클릭시, 그래프 아래에 연관된 이미지가 활성화됩니다.</p>
                    </PopoverBody>
                  </Popover>
                    <Bubble height={400} className="relation-bubble" name="GiBubble" activeFirstTab={activeFirstTab}/>
                  </div>
                </div>
                {/* s: 연관 이미지 영역 */}
                <div className="showroom-gallery relation-gallery" style={{overflow: 'hidden'}}>
                   <RelationImage activeTab={activeSentiment}/> 
                </div>
                {/* e: 연관 이미지 영역 */}
                
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

// const mapStateToProps = ({ authUser }) => {
//   const { loading, error } = authUser;

//   return { loading, error };
// }

// export default connect(mapStateToProps, {
//     loginUserAction : loginUser,
// })(Start);