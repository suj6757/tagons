/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
/* eslint no-unused-vars: "off" */
/* eslint no-undef: "off" */
/* eslint no-plusplus : "off" */
/* eslint react/no-unused-state: "off" */
/* eslint prefer-template: "off" */
/* eslint react/no-array-index-key: "off" */
/* eslint-disable jsx-a11y/label-has-for */
import React from "react";
import {
  Row,
  Card,
  CardBody,
  Form,
  Button,
  FormGroup,
  Input,
} from "reactstrap";
import { Formik, Field } from "formik";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { ko } from "date-fns/esm/locale";
import { Colxx } from "../../../components/common/CustomBootstrap";
import ChannelButton from "../../../components/applications/ChannelButton";
import CustomSelectInput from "../../../components/common/CustomSelectInput";
import TagInput from "../../../components/applications/TagInput";
import {
  fullStackBarGraph,
  positiveChartGraph,
  negativeChartGraph,
} from "../../../components/charts/config";
import FullStackBar from "../../../components/charts/FullStackBar";
import "react-datepicker/dist/react-datepicker.css";
import CompareLine from "../../../components/charts/CompareLine";
import { ReactTableNor } from "../../../containers/ui/ReactTableNormal";
import { TableSentimantData } from "../trend/data";
import { login, UserInfo, logout } from '../../../services/LoginService';
import { post } from 'axios';

class Sentimentanalysis extends React.Component {
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행
    let date1 = new Date();
    let date2 = new Date();
    let loginYN = (UserInfo() !== null);
    let userData = UserInfo();
    date1.setDate(date1.getDate() - 9);
    date2.setDate(date2.getDate() - 2);
    this.state = {
      startDate: date1,
      endDate: date2,
      searchBtnClick : false ,
      tagSearchBtnClick : false,
      searchStart : false , 
      userInfo : userData ,
      loginCheck : loginYN,
      defaultTagNum : 3 ,
      tagInput : [] ,
      keyWordtext : "",
      selectedOptionsBase :[] ,
      checkInfo: [
        { id: 1, value: "Daily", isChecked: true },
        { id: 2, value: "Weekly", isChecked: false },
        { id: 3, value: "Monthly", isChecked: false },
        { id: 4, value: "Yearly", isChecked: false },
      ],
      selectedOptions: [],
      fullStackBarGraphSeries:[] ,
      fullStackBarGraphOptions:fullStackBarGraph.options,
      positiveGraphOptions : positiveChartGraph.options,
      positiveChartSeries:[] ,
      negativeGraphOptions : negativeChartGraph.options,
      negativeGraphSeries:[] ,
      positiveTableSentimantData:[] ,
      negativeTableSentimantData:[] ,
      positiveColumns : [
      {
        Header: "Rank",
        accessor: "id",
        cellClass: "list-item-heading text-center w-10",
      },
      {
        Header: "",
        accessor: "title",
        cellClass: "text-muted text-center w-60",
      },
      {
        Header: "TF",
        accessor: "TF",
        cellClass: "text-muted text-center w-10",
      },
      {
        Header: "DF",
        accessor: "DF",
        cellClass: "text-muted text-center w-10",
      },
      {
        Header: "TF-IDF",
        accessor: "TF-IDF",
        cellClass: "text-muted text-center w-10",
      },
    ] ,
      negativeColumns :  [
      {
        Header: "Rank",
        accessor: "id",
        cellClass: "list-item-heading text-center w-10",
      },
      {
        Header: "",
        accessor: "title",
        cellClass: "text-muted text-center w-60",
      },
      {
        Header: "TF",
        accessor: "TF",
        cellClass: "text-muted text-center w-10",
      },
      {
        Header: "DF",
        accessor: "DF",
        cellClass: "text-muted text-center w-10",
      },
      {
        Header: "TF-IDF",
        accessor: "TF-IDF",
        cellClass: "text-muted text-center w-10",
      },
    ] ,
      totalGraph: {
        series: [
          {
            name: "Users",
            data: [
              0.77, 0.88, 0.99, 0.11, 0.12, 0.34, 0.56, 0.4, 0.56, 0.41, 0.42,
              0.44, 0.55, 0.66, 0.77, 0.99, 0.11, 0.55, 0.11, 0.12, 0.13, 0.15,
              0.46, 0.79, 0.53, 0.12, 0.86, 0.77, 0.2, 0.55, 0.44,
            ],
          },
          {
            name: "Sessions",
            data: [
              0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55, 0.12, 0.13, 0.76, 0.45,
              0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2,
              0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45,
            ],
          },
        ],
        height: 503,
        options: {
          chart: {
            type: "line",
            dropShadow: {
              enabled: false,
              color: "#000",
              top: 18,
              left: 7,
              blur: 10,
              opacity: 0.2,
            },
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false,
            },
          },
          legend: {
            position: "top",
            horizontalAlign: "left",
          },
          colors: ["#404141", "#ed7d31"],
          dataLabels: {
            enabled: true,
            background: {
              foreColor: "#000",
              padding: 0,
              borderRadius: 0,
              borderColor: "transparent",
            },
            style: {
              fontSize: "14px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "bold",
              colors: ["transparent"],
            },
            offsetY: -10,
          },
          markers: {
            size: 5,
            hover: {
              size: 5,
              sizeOffset: 5,
              fillColor: "#000",
            },
            discrete: [
              {
                fillColor: "#e3e3e3",
                strokeColor: "#fff",
                size: 5,
              },
            ],
          },
          stroke: {
            curve: "smooth",
          },
          grid: {
            show: false,
          },
          xaxis: {
            categories: [
              1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
              20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
            ],
            tickPlacement: "between",
          },
          yaxis: {
            show: false,
          },
        },
      },
    };
  }

  componentDidMount = () => {
    const stateItem = this.state;
    if (!stateItem.loginCheck){
      document.location.href = "/user/login";
    }
  }

  ChangeStartDate = (e) => {
    this.setState({
      startDate: e,
    });
  };

  ChangeEndDate = (e) => {
    this.setState({
      endDate: e,
    });
  };


  handleOneChecked = (evt) => {
    let { checkInfo } = this.state;
    checkInfo.forEach(item => {
      if (item.value === evt.target.value){
        if (!item.isChecked ){
          item.isChecked = evt.target.checked;
        }         
      }
      else{
        item.isChecked = false;
      }
    });
    this.setState({ checkInfo });
  };

  SearchClick = (e) => {
    console.log('Sentimentanalysis SearchClick !!');
    /* 
    this.setState({  
      searchBtnClick: true
    });
    */ 
    this.setState({  
      tagInput : [] ,
      tagSearchBtnClick: true ,
    });
  }

  render() {
    const statesItems = this.state;
    const validateKeyword = (value) => {
      let error;
      if (!statesItems.keyWordtext) {
        error = "No Keywords";
      }
      return error;
    };

    const selectedOptionsBase = [
      { label: "Total", value: "social_val01", key: 0 },
      { label: "Naver_news", value: "social_val02", key: 1 },
      { label: "Naver_blog", value: "social_val03", key: 2 },
    ];

    const columns = [
      {
        Header: "Rank",
        accessor: "id",
        cellClass: "list-item-heading text-center w-10",
      },
      {
        Header: "Naver News",
        accessor: "title",
        cellClass: "text-muted text-center w-60",
      },
      {
        Header: "TF",
        accessor: "TF",
        cellClass: "text-muted text-center w-10",
      },
      {
        Header: "DF",
        accessor: "DF",
        cellClass: "text-muted text-center w-10",
      },
      {
        Header: "TF-IDF",
        accessor: "TF-IDF",
        cellClass: "text-muted text-center w-10",
      },
    ];
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
    const setSentimentFactor = (ResponseData , searchCondition , selectedOptions) => {
      var PositiveTableSentimantData = [] ;
      var NegativeTableSentimantData = [] ;

      console.log('setSentimentFactor' , ResponseData );
      ResponseData.Positive.forEach(function(item,idx){
        PositiveTableSentimantData.push({ id: idx + 1 , title: item.Value, TF: item.TF, DF: item.DF,'TF-IDF': item.IDF });
      });

      ResponseData.Negative.forEach(function(item,idx){
        NegativeTableSentimantData.push({ id: idx + 1 , title: item.Value, TF: item.TF, DF: item.DF,'TF-IDF': item.IDF });
      });
      this.setState({  
        positiveTableSentimantData : PositiveTableSentimantData,
        negativeTableSentimantData : NegativeTableSentimantData,
      });

    };

    const getSentimentFactor = (searchCondition , selectedOptions) => {
      var searchConditionFactor = {};
      post('/sociallistening/GetSentiment_Factor', searchConditionFactor).
      then((response) => {
        setSentimentFactor(response.data , searchConditionFactor , selectedOptions);
      })
      .catch(function (error) {
          console.log(error);         
      });

    }

    const setChannelSentimentAnalysis = (ResponseData , searchCondition , selectedOptions) => {
     
      var PositiveArr = [];
      var CategoryArr = [];
      var NegativeArr = [];
      var categoryLen = 0;
      var positiveChartGraphOption = positiveChartGraph.options;
      var negativeChartGraphOption = negativeChartGraph.options;
      var columInfo = JSON.parse(JSON.stringify(statesItems.positiveColumns)); 
      console.log('setChannelSentimentAnalysis',ResponseData);
      ResponseData.Positive.forEach(function(item,idx){
        PositiveArr.push({name: item.Channel , data:[]});
        categoryLen = item.Data.length ;
        item.Data.forEach(function(item1,idx1){
          PositiveArr[idx].data.push(item1.value);
          if (CategoryArr.length < categoryLen ){
            CategoryArr.push(item1.date.substring(8,10));
          }
        });
        
      });
      
      ResponseData.Negative.forEach(function(item,idx){
        NegativeArr.push({name: item.Channel , data:[]});
        item.Data.forEach(function(item1,idx1){
          NegativeArr[idx].data.push(item1.value);         
        });
      });
      
      positiveChartGraphOption.xaxis.categories = CategoryArr;
      negativeChartGraphOption.xaxis.categories = CategoryArr;
      columInfo[1].Header = selectedOptions.value;
      console.log('columInfo' , columInfo , columInfo[1] , selectedOptions);
      this.setState({  
        positiveChartSeries: PositiveArr,
        positiveGraphOptions : positiveChartGraphOption,
        negativeGraphSeries: NegativeArr ,
        negativeGraphOptions : negativeChartGraphOption , 
        positiveColumns : columInfo ,
        negativeColumns : columInfo , 
      });
      getSentimentFactor(searchCondition , selectedOptions) ;

    }

    const getChannelSentimentAnalysis = (searchCondition , selectedOptions) => {
      var searchConditionAnalysis = {};
      searchConditionAnalysis.FromDate  = searchCondition.FromDate ;
      searchConditionAnalysis.ToDate  = searchCondition.ToDate ;
      searchConditionAnalysis.Period_Unit   = searchCondition.Period_Unit  ;
      searchConditionAnalysis.Channel_Upper   = selectedOptions.channelUp ;
      searchConditionAnalysis.Channel_Lower   = selectedOptions.value  ;
      searchConditionAnalysis.Competitors   = searchCondition.Competitors  ;
      searchConditionAnalysis.Keyword   = searchCondition.Keyword  ;
      post('/sociallistening/GetChannel_Sentiment_Analysis', searchConditionAnalysis).
      then((response) => {
        setChannelSentimentAnalysis(response.data , searchCondition , selectedOptions);
      })
      .catch(function (error) {
          console.log(error);         
      });


    }
    const setSentimentAnalysis = (searchCondition,ResponseData ,selectedOptions) => {
      var fullStackBarGraphOption = fullStackBarGraph.options;
      var fullStackBarGraphSerie = fullStackBarGraph.series;
      var XaxisCategories = [];
      var NegativeArr = [];
      var NeutralArr = [];
      var PositiveArr = [];
      
      ResponseData.Data.forEach(function(item,idx){
           XaxisCategories.push(item.name); 
           NegativeArr.push(item.Negative);
           NeutralArr.push(item.Neutral);
           PositiveArr.push(item.Positive);
      });
      fullStackBarGraphSerie[0].data = PositiveArr; 
      fullStackBarGraphSerie[1].data = NeutralArr; 
      fullStackBarGraphSerie[2].data = NegativeArr; 
      fullStackBarGraphOption.xaxis.categories = XaxisCategories;
      // console.log('GetSentiment_Analysis', fullStackBarGraphOption);
      this.setState({  
        fullStackBarGraphSeries: fullStackBarGraphSerie,
        fullStackBarGraphOptions: fullStackBarGraphOption ,
      });
      getChannelSentimentAnalysis(searchCondition , selectedOptions );
    }
    const getSentimentAnalysis = (searchCondition , selectedOptions ) =>{
      post('/sociallistening/GetSentiment_Analysis', searchCondition).
      then((response) => {
        setSentimentAnalysis(searchCondition,response.data , selectedOptions);
      })
      .catch(function (error) {
          console.log(error);         
      });
    }

    const searchStart = (searchChannel) =>{
      var searchCondition = {} ;
      var ChannelUpper = [];
      var ChannelLower = [];
      var selectList = [];
      var periodUnit = "";

      this.setState({  
        searchBtnClick: false, 
        searchCondition: {} ,
        searchStart : false , 
        selectedOptionsBase : [] ,
      });
      if (searchChannel.length > 0 ){
         selectList.push({ label: 'Total', value: 'Total' , channelUp : "Total" , key: 0 });
         searchChannel.forEach(function(item,idx){
           ChannelUpper.push(item.type);
           ChannelLower.push(item.name);
           selectList.push({ label: item.name, value: item.name, channelUp : item.type , key: idx + 1});
         });
      }
      else{
        alert('채널 선택 없음');
        return;
      }
      if (statesItems.tagInput.length == 0){
        alert('Competitors 없음');
        return;
      }
      statesItems.checkInfo.forEach(item => {
        if (item.isChecked){
          periodUnit = item.value;
        }
      });
      this.setState({  
        selectedOptionsBase: selectList ,
      });
      searchCondition.FromDate = dateString(statesItems.startDate); 
      searchCondition.ToDate = dateString(statesItems.endDate); 
      searchCondition.Period_Unit = periodUnit;
      searchCondition.Channel_Upper = ChannelUpper[0]; // 나중에 확인하ㅕ ChannelUpper 으로 바꿔야 됨
      searchCondition.Channel_Lower = ChannelLower;
      searchCondition.Competitors = statesItems.tagInput;
      searchCondition.Keyword = statesItems.keyWordtext;
      //searchCondition.Company = statesItems.userInfo.CompanyName;
      //searchCondition.CompanyCode = statesItems.userInfo.CompanyCode;
      console.log('searchCondition',searchCondition);
      this.setState({  
        searchCondition: searchCondition ,
        searchStart : true , 
        selectedOptions: selectList[0], 
      });
      //여기서 조회 API 구현하면 됨     
      getSentimentAnalysis(searchCondition , selectList[0]);
    };

    const tagSearchStart = (tagInputs) => {
      console.log('tagSearchStart' , tagInputs );
      this.setState({  
        tagSearchBtnClick: false,
        searchBtnClick: true ,
        tagInput : tagInputs,
      });
    }
    const onKeywordChange = (e) =>{
      this.setState({
        keyWordtext : e.target.value
      }); 
    };
    const onKeywordpress = (e) =>{
      if (e.keyCode === 13){
        e.preventDefault();
        // 조회조건 Validation 체크
        this.setState({  
          searchBtnClick: true , 
        });
      }
    };

    const setSelectedOptions = (val) => {
      var searchCondition = {} ;
      var columInfo = JSON.parse(JSON.stringify(statesItems.positiveColumns)); 
      console.log('setSelectedOptions', val);
      searchCondition.FromDate  = statesItems.searchCondition.FromDate ;
      searchCondition.ToDate  = statesItems.searchCondition.ToDate ;
      searchCondition.Period_Unit   = statesItems.searchCondition.Period_Unit  ;
      searchCondition.Channel_Upper   = val.channelUp ;
      searchCondition.Channel_Lower   = val.value  ;
      searchCondition.Competitors   = statesItems.searchCondition.Competitors  ;
      searchCondition.Keyword   = statesItems.searchCondition.Keyword  ;
      columInfo[1].Header = val.value;
      
      this.setState({
        selectedOptions: val,
        positiveColumns : columInfo ,
        negativeColumns : columInfo , 
      });
      getSentimentFactor(searchCondition , val) ;
    };

    return (
      <div className='sentiment_wrap'>
        <Row>
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <Form className="check-box-wrap multi">
                  <div className="tbl-vertical-heading">
                    <table>
                      <tbody>
                        <tr>
                          {/* vertical유형의 테이블 th 값은 인라인 스타일로 지정 바랍니다. */}
                          <th style={{ width: "15%" }}>Period</th>
                          <td style={{ width: "35%" }}>
                            <div className="date-picker-wrap">
                              <DatePicker
                                className="form-control"
                                locale={ko}
                                dateFormat="yyyy.MM.dd"
                                selected={statesItems.startDate}
                                selectsStart
                                startDate={statesItems.startDate}
                                endDate={statesItems.endDate}
                                onChange={this.ChangeStartDate}
                                placeholderText="Select Time"
                              />
                              <span className="cal-range"> ~ </span>
                              <DatePicker
                                className="form-control"
                                locale={ko}
                                dateFormat="yyyy.MM.dd"
                                selected={statesItems.endDate}
                                selectsEnd
                                startDate={statesItems.startDate}
                                endDate={statesItems.endDate}
                                onChange={this.ChangeEndDate}
                                placeholderText="Select Time"
                              />
                            </div>
                          </td>
                          <th style={{ width: "15%" }}>Period Unit</th>
                          <td style={{ width: "35%" }}>
                            {statesItems.checkInfo.map((items) => {
                              return (
                                <FormGroup
                                  check
                                  inline
                                  className="check-box lookup-area"
                                  key={items.id}
                                >
                                  <Input
                                    id={items.id}
                                    key={items.id}
                                    onChange={this.handleOneChecked}
                                    checked={items.isChecked}
                                    type="checkbox"
                                    value={items.value}
                                    className="check-single-box"
                                  />{" "}
                                  <label
                                    htmlFor={items.id}
                                    className="bx_check_oran"
                                  >
                                    <span>{items.value}</span>
                                  </label>
                                </FormGroup>
                              );
                            })}
                          </td>
                        </tr>
                        <tr>
                          <th style={{ width: "15%" }}>Channel</th>
                          <td style={{ width: "85%" }} colSpan="3">
                            <ChannelButton searchStart={searchStart} searchBtnClick={statesItems.searchBtnClick} tabAtribute={[true,true,true]} />
                          </td>
                        </tr>
                        <tr>
                          <th style={{ width: "15%" }}>Competitors</th>
                          <td style={{ width: "85%" }} colSpan="3">
                            <TagInput defaultTagNum={statesItems.defaultTagNum} searchStart={tagSearchStart}  searchBtnClick={statesItems.tagSearchBtnClick} suggestions={suggestions}/>
                          </td>
                        </tr>
                        <tr>
                          <th style={{ width: "15%" }}>Keywords</th>
                          <td style={{ width: "85%" }} colSpan="3">
                            <Formik
                              initialValues={{
                                keyword: "",
                              }}
                              // onSubmit={onSubmit}
                            >
                              {({ errors, touched }) => (
                                <FormGroup className="keyword-area">
                                  <Field
                                    className="form-control"
                                    name="keyword"
                                    onChange={onKeywordChange}
                                    value={statesItems.keyWordtext}
                                    validate={validateKeyword}
                                    onKeyDown={onKeywordpress}
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
                    <Button className="btn-xl mt-4" color="gray" onClick={this.SearchClick}>
                      ENTER
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        {/* s: GA Keyword Gap */}
        <Row className="mt-5">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className="box-title">
                  <h2>Sentiment Analysis(P/N)</h2>
                </div>
                <div className="graph-area">
                  <FullStackBar
                    options={statesItems.fullStackBarGraphOptions}
                    series={statesItems.fullStackBarGraphSeries}
                    height={fullStackBarGraph.height}
                  />
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <Row className="mt-5">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className="box-title">
                  <h2>Channel Sentiment Analysis</h2>
                </div>
                <div className="graph-area mt-5">
                  <div className="bx_select_area">
                    <span className="select-title">Channel</span>
                    <FormGroup className="select-box">
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={statesItems.selectedOptions}
                        onChange={(val) => setSelectedOptions(val)}
                        options={statesItems.selectedOptionsBase}
                      />
                    </FormGroup>
                  </div>
                  <div className="graph-area">
                    <div className="clearfix box-line">
                      <div className="box left">
                        <div className="chart-area">
                          <div className="chart-header blue">
                            <div className="chart-title t-c">
                              <h4 className='t-c'>Positive</h4>
                            </div>
                          </div>
                          <div className="chart-cont">
                            <CompareLine
                              options={statesItems.positiveGraphOptions }
                              series={statesItems.positiveChartSeries}
                              height={330}
                            />
                          </div>
                        </div>
                        <ReactTableNor
                          data={statesItems.positiveTableSentimantData}
                          columns={statesItems.positiveColumns}
                          className='tbl_basic'
                        /> 
                      </div>
                      <div className="box right">
                        <div className="chart-area">
                          <div className="chart-header red">
                            <div className="chart-title t-c">
                              <h4>Negative</h4>
                            </div>
                          </div>
                          <div className="chart-cont">
                            <CompareLine
                              options={statesItems.negativeGraphOptions }
                              series={statesItems.negativeGraphSeries}
                              height={330}
                            />
                          </div>
                        </div>
                        <ReactTableNor
                          data={statesItems.negativeTableSentimantData}
                          columns={statesItems.negativeColumns}
                          className='tbl_basic'
                        /> 
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        {/* e: GA Keyword Gap */}
      </div>
    );
  }
}

export default Sentimentanalysis;
