import React, { useState , useEffect ,createRef } from 'react'; // eslint-disable-line no-unused-vars
import { 
  Row, 
  Card, 
  CardBody, 
  Form, 
  FormGroup, 
  Nav,
  NavItem,
  
  Button } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import axios from 'axios';// eslint-disable-line no-unused-vars
import classnames from 'classnames';
import Select from 'react-select';
// import IntlMessages from '../../../helpers/IntlMessages';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import 'react-datepicker/dist/react-datepicker.css';
import ShowRoom from '../../../containers/pages/ShowRoom';
import Bubble from '../../../components/charts/Bubble';
import Line from '../../../components/charts/Line';
import Bar from '../../../components/charts/Bar';
import Scatter from '../../../components/charts/ScatterDatetime';
import { ReactTableWithPaginationCard } from '../../../containers/ui/ReactTableCards';
import { Colxx } from '../../../components/common/CustomBootstrap';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import showroomp from '../../../data/showroomp';  // eslint-disable-line no-unused-vars
import efactorgip from '../../../data/efactorgip';  // eslint-disable-line no-unused-vars
import efactorgirelatedwordsp from '../../../data/efactorgirelatedwordsp';  // eslint-disable-line no-unused-vars
import efactortrendandfactorp from '../../../data/efactortrendandfactorp';  // eslint-disable-line no-unused-vars
import efactortrendquadp from '../../../data/efactortrendquadp';  // eslint-disable-line no-unused-vars
import pfactorgip from '../../../data/pfactorgip';  // eslint-disable-line no-unused-vars
import pfactorgirelatedwordsp from '../../../data/pfactorgirelatedwordsp';  // eslint-disable-line no-unused-vars
import pfactortrendandfactorp from '../../../data/pfactortrendandfactorp';  // eslint-disable-line no-unused-vars
import pfactortrendquadp from '../../../data/pfactortrendquadp';  // eslint-disable-line no-unused-vars
import { useDispatch, useSelector } from 'react-redux';
import { getSearchCondition } from '../../../redux/actions';

// import Breadcrumb from '../../../containers/navs/Breadcrumb';

const callPFactorTrendQuadApi = async (paramValue,setPFactorTrendQuad) =>{ // eslint-disable-line no-unused-vars
  await axios.post("/api/GetIndustry_PFactor_TrendQuad",paramValue)
    .then(function (response) {
      setPFactorTrendQuad(JSON.stringify(response) );
      /* ???????????? ????????? ?????? ?????? ??? */ // ????????? ????????? ??????
    })
    .catch(function (error) {
      console.log(error);
    });
};

const callPFactorTrendAndFactorApi = async (paramValue,setPFactorTrendAndFactor) =>{ // eslint-disable-line no-unused-vars
  await axios.post("/api/GetIndustry_PFactor_TrendAndFactor",paramValue)
    .then(function (response) {
      setPFactorTrendAndFactor(JSON.stringify(response) );
      /* ???????????? ????????? ?????? ?????? ??? */ // ????????? ????????? ??????
    })
    .catch(function (error) {
      console.log(error);
    });
};

const callEFactorTrendQuadApi = async (paramValue,setEFactorTrendQuad) =>{ // eslint-disable-line no-unused-vars
  await axios.post("/api/GetIndustry_EFactor_TrendQuad",paramValue)
    .then(function (response) {
      setEFactorTrendQuad(JSON.stringify(response) );
      /* ???????????? ????????? ?????? ?????? ??? */ // ????????? ????????? ??????
    })
    .catch(function (error) {
      console.log(error);
    });
};

const callEFactorTrendAndFactorApi = async (paramValue,setEFactorTrendAndFactor) =>{ // eslint-disable-line no-unused-vars
  await axios.post("/api/GetIndustry_EFactor_TrendAndFactor",paramValue)
    .then(function (response) {
      setEFactorTrendAndFactor(JSON.stringify(response) );
      /* ???????????? ????????? ?????? ?????? ??? */ // ????????? ????????? ??????
    })
    .catch(function (error) {
      console.log(error);
    });
};

const callPFactorGIApi = async (paramValue,setPFactorGI) =>{ // eslint-disable-line no-unused-vars
  await axios.post("/api/GetIndustry_PFactor_GI",paramValue)
    .then(function (response) {
      setPFactorGI(JSON.stringify(response) );
      /* ???????????? ????????? ?????? ?????? ??? */ // ????????? ????????? ??????
    })
    .catch(function (error) {
      console.log(error);
    });
};

const callEFactorGIApi = async (paramValue,setEFactorGI) =>{ // eslint-disable-line no-unused-vars
  await axios.post("/api/GetIndustry_EFactor_GI",paramValue)
    .then(function (response) {
      setEFactorGI(JSON.stringify(response) );
      /* ???????????? ????????? ?????? ?????? ??? */ // ????????? ????????? ??????
    })
    .catch(function (error) {
      console.log(error);
    });
};
const showRoonGetData = React.createRef(); // eslint-disable-line no-unused-vars
  const showRoomChange = (objShowroom) =>{ // eslint-disable-line no-unused-vars
    
    if (showRoonGetData.current)
    {
      showRoonGetData.current.showRoonGetCallApi(objShowroom);
      
    }
  }
  
const callShowroomApi =  async (paramValue,setShowroom) =>{ // eslint-disable-line no-unused-vars
   
   await axios.post("/api/GetIndustry_Showroom",paramValue)
    .then(function (response) {
      if (response.data.ErrorCode === 'OK') {
        
        showRoomChange(response.data);
      }
      /*
      else{
        showRoomChange(showroomdata);
      } */
      /* ???????????? ????????? ?????? ?????? ??? */ // ????????? ????????? ??????
    })
    .catch(function (error) {
      console.log(error);
    });
};

const Start = ({ intl }) => {
    const dispatch = useDispatch();
    const { industryApp } = useSelector(state => state);

    let param1 = {};
    const [startDateRange, setStartDateRange] = useState(new Date());
    const [endDateRange, setEndDateRange] = useState(new Date());
    const [selectedOptionsStep1, setSelectedOptionsStep1] = useState([]);// eslint-disable-line no-unused-vars
    const [selectedOptionsStep2, setSelectedOptionsStep2] = useState([]);// eslint-disable-line no-unused-vars
    const [selectedOptionsStep3, setSelectedOptionsStep3] = useState([]);// eslint-disable-line no-unused-vars
    const [selectKeyword, setKeyword] = useState('');// eslint-disable-line no-unused-vars
    const [selectCategoryUpper , setCategoryUpper] = useState([]);// eslint-disable-line no-unused-vars
    const [selectName , setName] = useState('');// eslint-disable-line no-unused-vars
    const [selectCategoryList, setCategoryList] = useState([]);// eslint-disable-line no-unused-vars
    let categoryList = [];
    let categoryList1 = []; // eslint-disable-line no-unused-vars
    let categoryList2 = []; // eslint-disable-line no-unused-vars
    const categoryList3 = [] ; // eslint-disable-line no-unused-vars
    const { messages } = intl;

    /*  ?????? ?????? ?????????    */
    const [selectShowroom, setShowroom] = useState([]);// eslint-disable-line no-unused-vars
    const [selectPFactorTrendQuad, setPFactorTrendQuad] = useState([]);// eslint-disable-line no-unused-vars
    const [selectPFactorTrendAndFactor, setPFactorTrendAndFactor] = useState([]);// eslint-disable-line no-unused-vars
    const [selectEFactorTrendQuad, setEFactorTrendQuad] = useState([]);// eslint-disable-line no-unused-vars
    const [selectEFactorTrendAndFactor, setEFactorTrendAndFactor] = useState([]);// eslint-disable-line no-unused-vars
    const [selectPFactorGI, setPFactorGI] = useState([]);// eslint-disable-line no-unused-vars
    const [selectEFactorGI, setEFactorGI] = useState([]);// eslint-disable-line no-unused-vars

    // Category select data step1 
    const [selectDataTypeStep1,setSelectDataTypeStep1] = useState([]); // eslint-disable-line no-unused-vars

    // Category select data step2 
    const [selectDataTypeStep2,setSelectDataTypeStep2] = useState([]); // eslint-disable-line no-unused-vars

    // Category select data step3
    const [selectDataTypeStep3,setSelectDataTypeStep3] = useState([]); // eslint-disable-line no-unused-vars

    const [activeFirstTab, setActiveFirstTab] = useState('1');
  
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
          retStr = retStr.concat('-0', dateValue.getDate() + 1);
        }
        else {
          retStr = retStr.concat('-', dateValue.getDate() + 1);
        }

        return retStr;
    }

  const setCategory = () => {   // eslint-disable-line no-unused-vars       
    // console.log(categoryList.Data.length);
    let preKey = '';
    categoryList1 = [];
    let categoryData = {}; // eslint-disable-line no-unused-vars
    categoryList.Data.forEach(function(item,index){ // eslint-disable-line no-unused-vars
      if ( index === 0 ){
         categoryData = item; // eslint-disable-line no-unused-vars
      }
      if (preKey !== item.Category1 ){
          preKey = item.Category1 ;
          categoryList1.push({label:preKey,value:preKey});
      }
    });
    setSelectDataTypeStep1(categoryList1);
    

    /*
    const param1  = {
      FromDate : dateString(startDateRange), 
      ToDate :dateString(endDateRange), 
      Category1 : categoryData.Category1 ,
      Category2 : categoryData.Category2 ,
      Category3 : categoryData.Category3 ,
      Keyword :selectKeyword
    } ; // callShowroomApi , callPFactorTrendQuadApi , callEFactorTrendQuadApi , callEFactorGIApi
   const param2 = { // eslint-disable-line no-unused-vars
      FromDate : dateString(startDateRange), 
      ToDate : dateString(endDateRange), 
      Category1 : categoryData.Category1 ,
      Category2 : categoryData.Category2 ,
      Category3 : categoryData.Category3 ,
      Keyword : selectKeyword ,
      Category_upper : selectCategoryUpper,
      Name :selectName
    } ; */ // callPFactorTrendAndFactorApi , callEFactorTrendAndFactorApi , callEFactorGIApi   
    param1 = showroomp; // ????????? ?????? ????????? ???????????? ????????? ??????
    callShowroomApi(param1,setShowroom);
    // console.log(activeFirstTab);
    if (activeFirstTab === '1') {
      param1 = pfactortrendquadp; // ????????? ?????? ????????? ???????????? ????????? ??????
      callPFactorTrendQuadApi(param1,setPFactorTrendQuad);
      param1 = pfactortrendandfactorp; // ????????? ?????? ????????? ???????????? ????????? ??????
      callPFactorTrendAndFactorApi(param1,setPFactorTrendAndFactor);
      param1 = pfactorgip; // ????????? ?????? ????????? ???????????? ????????? ??????
      callPFactorGIApi(param1,setPFactorGI);
    }
    else{
      param1 = efactortrendquadp; // ????????? ?????? ????????? ???????????? ????????? ??????
      callEFactorTrendQuadApi(param1,setEFactorTrendQuad);
      param1 = efactortrendandfactorp; // ????????? ?????? ????????? ???????????? ????????? ??????
      callEFactorTrendAndFactorApi(param1,setEFactorTrendAndFactor);
      param1 = efactorgip; // ????????? ?????? ????????? ???????????? ????????? ??????
      callEFactorGIApi(param1,setEFactorGI);
    }
  }
  useEffect(() => {
      axios.post("/api/GetIndustry_TotalCategory_List")
      .then(function (response) {
        
        // console.log(response);
        categoryList = response.data; // eslint-disable-line no-unused-vars
        setCategoryList(categoryList);
        setCategory();
        // 
        // loginUserAction(values, history); // ????????? ????????? ??????
      })
      .catch(function (error) {
        console.log(error);
      });
  },[industryApp]);

  const category1Change = value =>{
    setSelectedOptionsStep1(value);
    setSelectedOptionsStep2([]); 
    setSelectedOptionsStep3([]); 
    // console.log(value);
    let preKey = '-1';
    categoryList1 = [];
    // console.log(selectCategoryList);
    selectCategoryList.Data.forEach(function(item,index){ // eslint-disable-line no-unused-vars
      if (value.value === item.Category1 && preKey !== item.Category2 ){
          preKey = item.Category2 ;
          categoryList1.push({label:preKey,value:preKey});
      }
    });
    setSelectDataTypeStep2(categoryList1);
    // console.log(categoryList1);
  }
  const category2Change = value =>{

    // console.log(value);
    // console.log(selectedOptionsStep1);
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
    // console.log(categoryList2); 
  }

    //???????????? ????????? ??????
    const setParam = (value) => {
        dispatch(getSearchCondition(value));
    }
    
    //???????????? ???????????? ??????
    const handleSearchClick = (e) => {
        /*
        {
          FromDate : "2021-06-15", 
          ToDate : "2021-06-20", 
          Category1 : "????????????",
          Category2 : "????????????",
          Category3 : "??????/?????????",
          Keyword : "",
          Category_upper : "?????????",
          Name : "?????????"
        }
        */
        
        var param = {};
        param.FromDate = dateString(startDateRange);
        param.ToDate = dateString(endDateRange);
        param.Category1 = selectedOptionsStep1.value;
        param.Category2 = selectedOptionsStep2.value;
        param.Category3 = selectedOptionsStep3.value;
        param.Keyword = selectKeyword;
        param.Category_upper = '?????????';
        param.Name = '?????????';
        //setParam(param);
        dispatch(getSearchCondition(param));

        console.log(industryApp);
    }

    //keyword check(validate) ? setState
    const onSearchKey = e => {
        setKeyword(e.target.value);
    }

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
                      <th style={{ width:'10%' }}>Period</th>
                      <td style={{ width:'90%' }} colSpan="3">
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
                      <th style={{ width:'10%' }}>Product(???) Category</th>
                      <td style={{ width:'40%' }}>
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
                      <th style={{ width:'10%' }}>Product(???) Category</th>
                      <td style={{ width:'40%' }}> <input type="text"
                                                          name="keyword"
                                                          id="search"
                                                          placeholder='No Keywords'
                                                          onKeyPress={(e) => onSearchKey(e)}
                                                          /></td>
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
                <span className="help"><img src="/assets/img/icon/icon_help.png" alt="?????????" /></span>
              </div>
              {/* ????????? ????????? */}
              <div className="showroom-gallery">
                {/* ????????? ????????? */}
                <ShowRoom  ref={showRoonGetData} />
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
      {/* s:trend-quad */}
      <Row className="mt-5">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <div className="box-title">
                 <h2>Trend-Quad</h2>
                 <span className="help"><img src="/assets/img/icon/icon_help.png" alt="?????????" /></span>
              </div>
              <div className="clearfix box-line">
                <div className="box left">
                  {/* ??? ????????? height ?????? props??? ?????? ?????? */}
                  {/* <Bubble height={550} /> */}
                  <Scatter height={550} />
                </div>
                <div className="box right">
                  <div className="chart-area">
                    <div className="chart-header">
                      <div className="chart-title">
                        <h4>Post-Trend</h4>
                        <span className="help"><img src="/assets/img/icon/icon_help_small.png" alt="?????????" /></span>
                      </div>
                      <span className="mean">Pre-Trend <span className="number">85.5%</span></span>
                    </div>
                    {/* ??? ????????? height ?????? props??? ?????? */}
                    <Line height={210} />
                  </div>
                  <div className="chart-area mb-0">
                    <div className="chart-header">
                      <div className="chart-title">
                        <h4>Sentiment Factor | <span>Brand</span></h4>
                        <span className="help"><img src="/assets/img/icon/icon_help_small.png" alt="?????????" /></span>
                      </div>
                    </div>
                    {/* ??? ????????? height ?????? props??? ?????? */}
                    <Bar height={210} />
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      {/* e:trend-quad */}
      {/* s:grobal index analysis */}
      <Row className="mt-5">
        <Colxx xxs="12">
          <Card>
            <CardBody>
              <div className="box-title">
                <h2>GI(Global Index) Analysis</h2>
                  <span className="help"><img src="/assets/img/icon/icon_help_small.png" alt="?????????" /></span>
                </div>
                <div className="table-sort-area">
                  <div className="clearfix box-line">
                    <div className="box left">
                      <ReactTableWithPaginationCard />
                    </div>
                    <div className="box right">
                      <Bubble height={400} />
                    </div>
                  </div>
                </div>
            </CardBody>
          </Card>
        </Colxx>
      </Row>
      {/* e:grobal index analysis */}
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