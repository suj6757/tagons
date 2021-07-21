/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Row, Card, CardBody, Form, Button, FormGroup } from 'reactstrap';
import { Formik, Field } from 'formik';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import { Colxx } from '../../../components/common/CustomBootstrap';
import CompareBar from '../../../components/charts/CompareBar';
import CompareLine from '../../../components/charts/CompareLine';
import 'react-datepicker/dist/react-datepicker.css';
import ChannelButton from '../../../components/applications/ChannelButton'
import { login, UserInfo, logout } from '../../../services/LoginService';
import axios from 'axios';

// eslint-disable-next-line react/prefer-stateless-function
class Prime extends React.Component {
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행
    let date1 = new Date();
    let date2 = new Date();
    let loginYN = (UserInfo() !== null);
    let userData = UserInfo();
    date1.setDate(date1.getDate() - 9);
    date2.setDate(date2.getDate() - 2);

    this.state = {
      barChart : {
        options: {
          chart: {
            height: 350,
            type: 'bar',
            toolbar: {
              show: false
            }
          },
          colors: ['#8faadc' ,'#fb9874'],
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
            }
          },
          dataLabels: {
            enabled: false
          },
          legend: {
            show: false
          },
          xaxis: {
            categories: ['Past', 'Present'],
            labels: {
              style: {
                colors: ['#8faadc' ,'#fb9874'],
                fontSize: '12px'
              }
            },
            title : {
              text : 'Period',
              offsetX: 100,
              offsetY: 0,
              style: {
                color: undefined,
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-title',
              },
            }
          },
          yaxis: {
            title : {
              text : 'Post',
              offsetX: 0,
              offsetY: -110,
              style: {
                color: undefined,
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-title',
              },
            }
          }
        },
      },
      
      startDate: date1,
      endDate: date2,
      activeId: 0, 
      searchBtnClick : false ,
      searchStart : false ,
      keyWordtext :'' ,
      searchCondition : {} ,
      loginBefore : loginYN ,
      userInfo : userData ,
      indiCont : [
                  {id: 1, title :  'Key-Rank.', count: '-'},
                  {id: 2, title :  'Click', count: '-'},
                  {id: 3, title :  'Social Buzz', count: '-'},
                  {id: 4, title :  'Num of Product', count: '-'},
                  {id: 5, title :  'Num of Conversion', count: '-'},
                ] , 
      chartDataArray : [] ,
    };
  }

  ChangeStartDate = (e) => { 
    this.setState({  
      startDate: e,
    });
  };  
  
  ChangeEndDate = (e) => { 
    this.setState({  
      endDate: e
    });  
  }; 

  SearchClick = (e) => {
    console.log('SearchClick !!');
    this.setState({  
      searchBtnClick: true
    });
    
  }

  render() {

    const statesItems = this.state;

    const keyChartData = [
      {id: 1, title: 'Post', count: 1000, series: [{data: [17, 15]}]},
      {id: 2, title: 'Comment', count: 2000, series: [{data: [17, 15]}]},
      {id: 3, title: 'Positive', count: 3000, series: [{data: [17, 15]}], class: 'blue'},
      {id: 4, title: 'Negative', count: 4000, series: [{data: [17, 15]}], class: 'red'},
    ]

    const clickChartData = [
      {id: 1, title: 'Buzz', count: 1000,series: [{data: [17, 15]}]},
      {id: 2, title: 'Product', count: 2000,series: [{data: [17, 15]}]},
      {id: 3, title: 'Conversion', count: 3000,series: [{data: [17, 15]}], class: 'blue'},
    ]

    const socialChartData = [
      {id: 1, title: 'Post', count: 1000,series: [{data: [17, 15]}]},
      {id: 2, title: 'Comment', count: 2000,series: [{data: [17, 15]}]},
      {id: 3, title: 'Positive', count: 3000,series: [{data: [17, 15]}], class: 'blue'},
      {id: 4, title: 'Negative', count: 3000,series: [{data: [17, 15]}], class: 'red'},
    ]

    const productChartData = [
      {id: 1, title: 'Product', count: 1000,series: [{data: [17, 15]}]},
      {id: 2, title: 'Review', count: 2000,series: [{data: [17, 15]}]},
    ]

    const converChartData = [
      {id: 1, title: 'User', count: 1000,series: [{data: [17, 15]}]},
      {id: 2, title: 'Session', count: 1000,series: [{data: [17, 15]}]},
      {id: 3, title: 'Conver-sion', count: 1000,series: [{data: [17, 15]}], class: 'blue'},
      {id: 4, title: 'Bounce', count: 1000,series: [{data: [17, 15]}], class: 'red'},
    ]
    
    const genderChartData = {
      series: [
            {name: 'Male',  data: [45, 10]}, 
            {name: 'Female', data: [21, 50]}
        ],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#f69200', '#000'], 
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          xaxis: {
            categories: ['Male', 'Female'],
            tickPlacement: 'between'
          },
          legend: {
            show: false
          },
        },
        areaTitle : 'Gender'
    }

    const ageChartData = {
      series: [
            {name: 'Search',  data: [0.45, 0.1, 0.51, 0.94, 0.23, 0.65]}, 
            {name: 'Google Analyitcs', data: [0.21, 0.5, 0.45, 0.1, 0.51, 0.23,]}
        ],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#ea6910', '#000'], 
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'smooth'
          },
          xaxis: {
            categories: ['10s', '20s', '30s', '40s', '50s', '60s+'],
            tickPlacement: 'between'
          },
          legend: {
            position: 'top'
          },
        },
        areaTitle : 'Ages'
    }

    const deviceChartData = {
      series: [
            {name: 'PC',  data: [45, 10]}, 
            {name: 'Mobile', data: [21, 50]}
        ],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            },
            toolbar: {
              show: false
            }
          },
          colors: ['#f69200', '#000'], 
          dataLabels: {
            enabled: false
          },
          stroke: {
            curve: 'straight'
          },
          xaxis: {
            categories: ['PC', 'Mobile'],
            tickPlacement: 'between'
          },
          legend: {
            show: false
          }
        },
        areaTitle : 'Device'
    }
    // Search Flag Set 
    const setSearchFlag = (flag) => {
      this.setState({  
        searchStart : flag , 
      });
    }
    // get Chart Data
    const getChartData = (clickId) => {    
      var callUrl = "";
      var cChartlist = []; 
      var cChartData = [];  
      var chartData = {};
      if (clickId === 1){ // Key-Rank
        console.log('Key-Rank 아무것도 안한다.');
        callUrl = "";
      }
      else if (clickId === 2){ // Click
        callUrl = "/prime/GetState_Total_Indicator_Click";
      }
      else if (clickId === 3){ // Social Buzz
        callUrl = "/prime/GetState_Total_Indicator_SocialBuzz";
      }
      else if (clickId === 4){ // Num of Product
        callUrl = "/prime/GetState_Total_Indicator_NumofProduct";
      }
      else if (clickId === 5){ // Num of Conversion
        callUrl = "/prime/GetState_Total_Indicator_NumofConversion";
      }
      
      if (callUrl !== ""){
        axios.post(callUrl,statesItems.searchCondition)
        .then((response) => {
            if (response.data.ErrorCode === 'OK'){    
              let retJson = JSON.stringify(response.data);
              if (retJson.indexOf("Data1") !== -1){
                chartData = {id: 1, title: response.data.Data1.Indicator_Name, count: response.data.Data1.Indicator_Value, series: [{data: [response.data.Data1.Past, response.data.Data1.Present]}]} ;
                cChartData.push(chartData);
              }
              chartData = {};
              if (retJson.indexOf("Data2") !== -1){
                chartData = {id: 2, title: response.data.Data2.Indicator_Name, count: response.data.Data2.Indicator_Value, series: [{data: [response.data.Data2.Past, response.data.Data2.Present]}]} ;
                cChartData.push(chartData);
              }
              chartData = {};
              if (retJson.indexOf("Data3") !== -1){
                if (response.data.Data3.Indicator_Name === 'Positive'){
                  chartData = {id: 3, title: response.data.Data3.Indicator_Name, count: response.data.Data3.Indicator_Value, series: [{data: [response.data.Data3.Past, response.data.Data3.Present]}], class: 'blue'} ;
                }
                else{
                  chartData = {id: 3, title: response.data.Data3.Indicator_Name, count: response.data.Data3.Indicator_Value, series: [{data: [response.data.Data3.Past, response.data.Data3.Present]}]} ;
                }
                
                cChartData.push(chartData);
              }
              chartData = {};
              if (retJson.indexOf("Data4") !== -1){
                if (response.data.Data4.Indicator_Name === 'Negative'){
                  chartData = {id: 4, title: response.data.Data4.Indicator_Name, count: response.data.Data4.Indicator_Value, series: [{data: [response.data.Data4.Past, response.data.Data4.Present]}], class: 'red'} ;
                }
                else{
                  chartData = {id: 4, title: response.data.Data4.Indicator_Name, count: response.data.Data4.Indicator_Value, series: [{data: [response.data.Data4.Past, response.data.Data4.Present]}]} ;
                }
                
                cChartData.push(chartData);
              }
              cChartlist.push(cChartData);
              statesItems.chartDataArray = cChartData;
              this.setState({  
                chartDataArray: [statesItems.chartDataArray,statesItems.chartDataArray,statesItems.chartDataArray,statesItems.chartDataArray,statesItems.chartDataArray] ,
              });
              console.log('chartDataArray - ' , statesItems.chartDataArray,cChartData);
            }
            else{
              console.log('prime GetState4TrendIndicator click error!');
            }
            
            setSearchFlag(false);
            
        })
        .catch(function (error) {
            console.log(error);
            setSearchFlag(false);
        });
        
      } 

    }
    // 4-Trend indidcator
    const getGetState4TrendIndicator = (param) =>{
      axios.post("/prime/GetState_4_Trend_Indicator",param)
      .then((response) => {
          if (response.data.ErrorCode === 'OK'){    
            //console.log('prime getGetState4TrendIndicator - ' , response);
            statesItems.indiCont[0].count = response.data.KeyRank;//Key-Rank.
            statesItems.indiCont[1].count = response.data.Click;//Click
            statesItems.indiCont[2].count = response.data.SocialBuzz;//Social Buzz
            statesItems.indiCont[3].count = response.data.Num_Of_Product;//Num of Product
            statesItems.indiCont[4].count = response.data.Num_Of_Conversion;//Num of Conversion
            this.setState({  
              indiCont: statesItems.indiCont,
            });
            console.log('prime getGetState4TrendIndicator set - ' , statesItems.indiCont);
          }
          else{
            console.log('prime getGetState4TrendIndicator error');
          }
          setSearchFlag(false);
      })
      .catch(function (error) {
          console.log(error);
          setSearchFlag(false);
      });

    }
    //4-Trend indidcator Click Event 
    const listClickEvt = (evt) => {
      const getNum = Number(evt.currentTarget.className.replace('item-',''));
      if (getNum > 1){
        this.setState({
          activeId : getNum ,
        });
        getChartData(getNum);
        
      }
      
    }
    // 날짜 포맷
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
    const chartDataArray = [keyChartData, clickChartData, socialChartData, productChartData, converChartData];
    // const linechartDataArray = [genderChartData , ageChartData, deviceChartData];
    const searchStart = (searchChannel) =>{
      var searchCondition = {} ;
      var ChannelUpper = [];
      var ChannelLower = [];
      this.setState({  
        searchBtnClick: false
      });
      this.setState({  
        searchCondition: {} ,
        searchStart : false , 
      });
      if (searchChannel.length > 0 ){
         searchChannel.forEach(function(item,idx){
           ChannelUpper.push(item.type);
           ChannelLower.push(item.name);
         });
      }
      else{
        console.log('채널 선택 없음');
      }
      searchCondition.FromDate = dateString(statesItems.startDate); 
      searchCondition.ToDate = dateString(statesItems.endDate); 
      searchCondition.Period_Unit = "Daily";
      searchCondition.Channel_Upper = ChannelUpper;
      searchCondition.Channel_Lower = ChannelLower;
      searchCondition.Keyword = statesItems.keyWordtext;
      searchCondition.Company = statesItems.userInfo.CompanyName;
      searchCondition.CompanyCode = statesItems.userInfo.CompanyCode;
      // console.log('searchCondition',searchCondition);
      this.setState({  
        searchCondition: searchCondition ,
        searchStart : true , 
      });
      getGetState4TrendIndicator(statesItems.searchCondition);
    };  
    const validateKeyword = (value) => {
      let error;
      if (!statesItems.keyWordtext) {
        error = 'No Keywords';
      } 
      return error;
    };
    const onKeywordChange = (e) =>{
      this.setState({
        keyWordtext : e.target.value
      }); 
    };
    // eslint-disable-next-line prefer-const
    return (
      <>
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
                          <th style={{ width:'15%' }}>Period</th>
                          <td style={{ width:'85%' }} colSpan="3">
                            <div className="date-picker-wrap">
                              <DatePicker className="form-control"  
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
                              <DatePicker className="form-control"  
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
                        </tr>
                        <tr>
                          <th style={{ width:'15%' }}>Channel</th>
                          <td style={{ width:'85%' }}>
                            <ChannelButton searchStart={searchStart} searchBtnClick={statesItems.searchBtnClick}/>                             
                          </td>
                        </tr>
                        <tr>
                          <th style={{ width:'15%' }}>Keywords</th>
                          <td style={{ width:'85%' }}>
                            <Formik
                              initialValues={{
                                keyword: '',
                              }}
                              // onSubmit={onSubmit}
                            >
                            {({ errors, touched }) => (
                              <FormGroup className="keyword-area">
                                <Field
                                  className="form-control"
                                  name="keyword"
                                  value={statesItems.keyWordtext}
                                  onChange={onKeywordChange}
                                  validate={validateKeyword}
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
        <Row className="mt-5">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className='box-title'>
                  <h2>4-Trend indidcator</h2>
                </div>
                <div className='indi-wrap'>
                  <ul className='lst-indi'>
                    {statesItems.indiCont.map((item, idx) => {
                      const countNumberDot = item.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                      return (
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                        <li 
                          // eslint-disable-next-line react/no-array-index-key
                          key={idx} 
                          onClick={listClickEvt} // 여기서 클릭 이벤트 없애자
                          className={`item-${item.id} ${statesItems.activeId === Number(item.id) ? ' active' : ""}` }
                        >
                          <div>
                            <p>
                              <span className='title'>{item.title}</span>
                              <span className='count'>{countNumberDot}</span>
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <p className='cont-noti'>* 각 수치는 기간 내 일평균 값을 의미</p>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        <Row className="mt-5">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className='box-title'>
                  <h2>Total Indicator</h2>
                </div>
                <div className='graph-area bar'>
                  {/* <ul className='item-1 graph-list' > */}
                  {statesItems.chartDataArray.map((list , indx) => {
                    return(
                      <ul 
                        // eslint-disable-next-line react/no-array-index-key
                        key={indx} 
                        className={`item-${indx} graph-list`} style={statesItems.activeId === Number(`${indx + 1}`) ? {display : 'flex'} : {display : 'none'}}>
                        {list.map((item, idx) => {
                          const countNumberDot = item.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                          return(
                            <li 
                              // eslint-disable-next-line react/no-array-index-key
                              key={idx}
                            >
                              <div className='count-area'>
                                <p className='area-title'>{item.title}</p>
                                <p className={`count ${item.class}`}>{countNumberDot}</p>
                              </div>
                              <div className='chart-area'>
                                <div id="chart">
                                  <CompareBar options={statesItems.barChart.options} series={item.series} type="bar" height={350} />
                                </div>
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    )
                  })}
                  <p className='cont-noti'>* 각 수치는 기간 내 총 합계를 의미</p>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
       {/* 
        <Row className="mt-5">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className='box-title'>
                  <h2>Demographics Comparison</h2>
                </div>
                <div className='graph-area line'>
                  <ul className='graph-list'>
                    {linechartDataArray.map((item, idx)=>{
                      return(
                        // eslint-disable-next-line react/no-array-index-key
                        <li key={idx} className={idx === 1 ? 'center_graph' : ''}>
                          <div className='chart-area'>
                            <div id="chart">
                              <CompareLine options={item.options} series={item.series} type="line" height={350} />
                            </div>
                          </div>
                          <div className='txt-area'>
                            <p className='area-title'>{item.areaTitle}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <p className='cont-noti'>* 각 수치는 기간 내 총 비율을 의미</p>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        */}
      </>
    ) // render end
  }
}

export default Prime;
