/* eslint-disable react/no-unused-state */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import {
    Row,
    Card,
    CardBody,
    Form,
    Button,
    FormGroup,
    Nav,
    NavLink,
    NavItem,
    TabContent,
    TabPane,
    Input
} from 'reactstrap';
import { Formik, Field } from 'formik';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import { Colxx } from '../../../components/common/CustomBootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import CompareLine from '../../../components/charts/CompareLine';
import ChannelButton from '../../../components/applications/ChannelButton'
import BrushChart from '../../../components/charts/BrushChart';
import { login, UserInfo, logout } from '../../../services/LoginService';
import { post } from 'axios';

class Ecommerce extends React.Component {

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
      activeTab: '1',
      searchBtnClick : false ,
      searchStart : false ,
      SearchCondition: {} ,
      selectedOptions: [],
      keyWordtext : "",
      PriceDistributionData : [],
      ChannelData : [] ,
      MerchandiseData : [],
      MerchandiseChannelData : [] ,
      AgeData : [],
      AgeChannelData : [] ,
      totalGraph: {
          series: [
          ],
          height: 500,
          options: {
              chart: {
                  type: 'line',
                  dropShadow: {
                      enabled: false,
                      color: '#000',
                      top: 18,
                      left: 7,
                      blur: 10,
                      opacity: 0.2,
                  },
                  toolbar: {
                      show: false
                  },
                  zoom: {
                      enabled: false,
                  }
              },
              colors: ['#4774c5', '#3a3b3b', '#a1a1a1', '#ffc104', '#5597d3',],
              dataLabels: {
                  enabled: true,
                  background: {
                      foreColor: '#000',
                      padding: 0,
                      borderRadius: 0,
                      borderColor: 'transparent',
                  },
                  style: {
                      fontSize: '14px',
                      fontFamily: 'Helvetica, Arial, sans-serif',
                      fontWeight: 'bold',
                      colors: ['transparent'],
                  },
                  offsetY: -10,
              },
              markers: {
                  size: 5,
                  hover: {
                      size: 5,
                      sizeOffset: 5,
                      fillColor: '#000',
                  },
                  discrete: [{
                      fillColor: '#e3e3e3',
                      strokeColor: '#fff',
                      size: 5
                  }]
              },
              stroke: {
                  curve: 'smooth'
              },
              grid: {
                  show: false,
              },
              xaxis: {
                  categories: [],
                  tickPlacement: 'between'
              },
              yaxis: {
                  show: false
              },
              legend: {
                  position: 'top',
                  horizontalAlign: 'left', 
              },
          },
      },
      brushGraph: {
          series: [
              {
                  name: "Coupang",
                  data: [0.77, 0.88, 0.99, 0.11, 0.12, 0.34, 0.56, 0.4, 0.56, 0.41, 0.42, 0.44, 0.55, 0.66, 0.77, 0.99, 0.11, 0.55, 0.11, 0.12, 0.13, 0.15, 0.46, 0.79, 0.53, 0.12, 0.86, 0.77, 0.2, 0.55, 0.44]
              },
              {
                  name: "11st",
                  data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55,0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
              },
              {
                  name: "G-market",
                  data: [0.7, 0.1, 0.12, 0.5, 0.1, 0.22, 0.30, 0.8, 0.05, 0.11, 0.49, 0.49, 0.83, 0.43, 0.33, 0.99, 0.56, 0.91, 0.03, 0.18, 0.56, 0.39, 0.45, 0.88, 0.77, 0.13, 0.85, 0.24, 0.44, 0.18, 0.17]
              },
              {
                  name: "Acuction",
                  data: [0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.4, 0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.28, 0.24,0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.77]
              },
          ],
            height: 230,
            options: {
              chart: {
                id: 'chart2',
                toolbar: {
                  show: false
                },
                zoom: {
                  enabled: false,
                  }, 
              },
              colors: ['#3a3b3b','#404141','#ed7d31', '#ffc104'],
              stroke: {
                width: 3
              },
              dataLabels: {
                enabled: false
              },
              markers: {
                size: 0
              },
              xaxis: {
                  categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
              },
              legend: {
                  show: false
              },
            },
            seriesLine: [
                {
                    name: "Coupang",
                    data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55,0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
                  },
                  {
                      name: "11st",
                      data: [0.7, 0.1, 0.12, 0.5, 0.1, 0.22, 0.30, 0.8, 0.05, 0.11, 0.49, 0.49, 0.83, 0.43, 0.33, 0.99, 0.56, 0.91, 0.03, 0.18, 0.56, 0.39, 0.45, 0.88, 0.77, 0.13, 0.85, 0.24, 0.44, 0.18, 0.17]
                  },
                  {
                      name: "G-market",
                      data: [0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.4, 0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.28, 0.24,0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.77]
                  },
                  {
                      name: "Acuction",
                      data: [0.77, 0.88, 0.99, 0.11, 0.12, 0.34, 0.56, 0.4, 0.56, 0.41, 0.42, 0.44, 0.55, 0.66, 0.77, 0.99, 0.11, 0.55, 0.11, 0.12, 0.13, 0.15, 0.46, 0.79, 0.53, 0.12, 0.86, 0.77, 0.2, 0.55, 0.44]
                  },
            ],
            heightLine: 130,
            optionsLine: {
              chart: {
                id: 'chart1',
                brush:{
                  target: 'chart2',
                  enabled: true, 
                  autoScaleYaxis: true
                },
                selection: {
                  enabled: true,
                },
                zoom: {
                      enabled: false,
                  }
              },
              colors: ['#3a3b3b','#404141','#ed7d31', '#ffc104'],
              xaxis: {
                tooltip: {
                  enabled: false
                }
              },
              yaxis: {
                tickAmount: 2
              }, 
              toolbar: {
                  show: false
              },
              legend: {
                  position: 'top',
                  horizontalAlign: 'center', 
              },
            },
      },
      checkInfo: [
          { id: 1, value: "Daily", isChecked: true },
          { id: 2, value: "Weekly", isChecked: false },
          { id: 3, value: "Monthly", isChecked: false },
          { id: 4, value: "Yearly", isChecked: false }
      ],

    }
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
  }

  generateData = (count, yrange) => {
      let i = 0;
      const series = [];
      while (i < count) {
          const x = (i + 1).toString();
          const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
          series.push({
              x,
              y
          });
          // eslint-disable-next-line no-plusplus
          i++;
      }
      console.log(series);
      return series;
  }

  SearchClick = (e) => {
    console.log('Ecommerce SearchClick !!');
    this.setState({  
      searchBtnClick: true
    });
  }

  render() {

    const statesItems = this.state;
    const validateKeyword = (value) => {
        let error;
        if (!statesItems.keyWordtext) {
            error = 'No Keywords';
        }
        return error;
    };
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

    const setECommerceTrendChartNumOfMerchandise = (ResponseData) => {
        var dataList = [];
        var channelList = [];
        let i = 0;
        var colorvalue = "";
        console.log('setECommerceTrendChartNumOfMerchandise' , ResponseData );
        ResponseData.Data.forEach(function(item,idx){
          if (item.Channel=== "Total"){
            item.Data.forEach(function(item1,idx1){
              dataList.push({name:item1.date.substring(0,10) , Total: item1.value});
            });
          }          
        });
        channelList.push("Tatal");
        ResponseData.Data.forEach(function(item,idx){
          colorvalue = "#" + Math.floor(Math.random() * 16777215).toString(16);
            channelList.push({Channel : item.Channel , ChannelColor : colorvalue });
            item.Data.forEach(function(item1,idx1){
                i = 0;
                while ( i < dataList.length ) {
                  if (dataList[i].name === item1.date.substring(0,10) ) {
                    dataList[i][item.Channel] = item1.value;
                    break;
                  }
                  i += 1;
                }
            });
        });
        console.log('setECommerceTrendChartNumOfMerchandise' , ResponseData , dataList   );
        this.setState({  
          MerchandiseData : dataList ,
          MerchandiseChannelData : channelList ,
        });
     
    }

    const setECommerceTrendChartAvgOfRatings = (ResponseData) => {
      var dataList = [];
      var channelList = [];
        let i = 0;
        var colorvalue = "";
        console.log('setECommerceTrendChartNumOfMerchandise' , ResponseData );
        ResponseData.Data.forEach(function(item,idx){
          if (item.Channel=== "Total"){
            item.Data.forEach(function(item1,idx1){
              dataList.push({name:item1.date.substring(0,10) , Total: item1.value});
            });
          }          
        });
        channelList.push("Tatal");
        ResponseData.Data.forEach(function(item,idx){
          colorvalue = "#" + Math.floor(Math.random() * 16777215).toString(16);
            channelList.push({Channel : item.Channel , ChannelColor : colorvalue });
            item.Data.forEach(function(item1,idx1){
                i = 0;
                while ( i < dataList.length ) {
                  if (dataList[i].name === item1.date.substring(0,10) ) {
                    dataList[i][item.Channel] = item1.value;
                    break;
                  }
                  i += 1;
                }
            });
        });
        console.log('setECommerceTrendChartAvgOfRatings' , ResponseData , dataList   );
        this.setState({  
          AgeData : dataList ,
          AgeChannelData : channelList ,
        });
    }

    const getECommerceTrendChartNumOfMerchandise = (searchCondition) => {
      post('/ecommerce/GetECommerce_TrendChart_NumOfMerchandise', searchCondition).
      then((response) => {
        setECommerceTrendChartNumOfMerchandise(response.data , searchCondition );
      })
      .catch(function (error) {
          console.log(error);         
      });

    }
    const getECommerceTrendChartAvgOfRatings = (searchCondition) => {
      post('/ecommerce/GetECommerce_TrendChart_AvgOfRatings', searchCondition).
      then((response) => {
        setECommerceTrendChartAvgOfRatings(response.data , searchCondition );
      })
      .catch(function (error) {
          console.log(error);         
      });

    }
    const setECommerceTrendChart = (ResponseData,searchCondition) => {
      var trendChartSeries = [];
      var trendChartCategory = [];
      var totalGraphOpt = statesItems.totalGraph;
      var SsearchCondition = {} ;

      console.log('setECommerceTrendChart', ResponseData,totalGraphOpt);
      ResponseData.Data.forEach(function(item,idx){
        trendChartSeries.push({name:item.Channel , data:[]});
        item.Data.forEach(function(item1,idx1){
          if (item.Channel === "Total"){
            trendChartCategory.push(item1.date.substring(8,10));
          }
          trendChartSeries[idx].data.push(item1.value);
        });
      });
      console.log('trendChartSeries', trendChartSeries,trendChartCategory,totalGraphOpt);
      totalGraphOpt.options.xaxis.categories = trendChartCategory;
      totalGraphOpt.series = trendChartSeries;
      
      this.setState({  
        totalGraph: totalGraphOpt,
      });
      SsearchCondition.FromDate = searchCondition.FromDate;
      SsearchCondition.ToDate = searchCondition.ToDate;
      SsearchCondition.Period_Unit = searchCondition.Period_Unit;
      SsearchCondition.Channel = searchCondition.Channel;
      SsearchCondition.Keyword = searchCondition.Keyword;
      getECommerceTrendChartNumOfMerchandise(SsearchCondition);
    }

    const getECommerceTrendChart = (searchCondition) => {
      post('/ecommerce/GetECommerce_TrendChart', searchCondition).
      then((response) => {
        setECommerceTrendChart(response.data , searchCondition );
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
        searchBtnClick: false
      });
      this.setState({  
        SearchCondition: {} ,
        searchStart : false , 
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
        console.log('채널 선택 없음');
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
      searchCondition.Channel = ChannelLower;
      searchCondition.Keyword = statesItems.keyWordtext;
      console.log('Ecommerce', searchCondition);
      this.setState({  
        SearchCondition: searchCondition ,
        activeTab: '1' ,
      });
      getECommerceTrendChart(searchCondition);
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

    const toggle = (tab) => {
        const  { activeTab } = this.state;
        const { SearchCondition } = this.state;
        var SearchConditionStr = JSON.stringify(SearchCondition);
        var SsearchCondition = {} ;

        if (activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
            if (SearchCondition != '{}'){
              SsearchCondition.FromDate = SearchCondition.FromDate;
              SsearchCondition.ToDate = SearchCondition.ToDate;
              SsearchCondition.Period_Unit = SearchCondition.Period_Unit;
              SsearchCondition.Channel= SearchCondition.Channel;
              SsearchCondition.Keyword = SearchCondition.Keyword;
              if (tab === '1'){
                this.setState({
                  MerchandiseData : [],
                  MerchandiseChannelData : [] ,
                });
                getECommerceTrendChartNumOfMerchandise(SsearchCondition);
              }
              else if (tab === '2'){
                this.setState({
                  AgeData : [],
                  AgeChannelData : [] ,
                });
                getECommerceTrendChartAvgOfRatings(SsearchCondition);
              }
            }
        }
    }

    return (
      <div className='social_area'>
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
                          <th style={{ width: '15%' }}>Period</th>
                          <td style={{ width: '35%' }}>
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
                          <th style={{ width: '15%' }}>Period Unit</th>
                          <td style={{ width: '35%' }}>
                            {statesItems.checkInfo.map(items => {
                              return (
                                <FormGroup check inline className='check-box lookup-area' key={items.id}>
                                    <Input
                                        id={items.id}
                                        key={items.id}
                                        onChange={this.handleOneChecked}
                                        checked={items.isChecked}
                                        type="checkbox"
                                        value={items.value}
                                        className='check-single-box'
                                    />{' '}
                                    <label htmlFor={items.id} className='bx_check_oran'>
                                        <span>{items.value}</span>
                                    </label>
                                </FormGroup>
                              )
                            })}
                          </td>
                      </tr>
                      <tr>
                          <th style={{ width: '15%' }}>Channel</th>
                          <td style={{ width: '85%' }} colSpan="3">
                              <ChannelButton searchStart={searchStart} searchBtnClick={statesItems.searchBtnClick} tabAtribute={[false,true,false]}/>
                          </td>
                      </tr>
                      <tr>
                          <th style={{ width: '15%' }}>Keywords</th>
                          <td style={{ width: '85%' }} colSpan="3">
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
                                              onKeyDown={onKeywordpress}
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

        <Row className='mt-5'>
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className="chart_area">
                  <div className='box-title'>
                      <h2>E-Commerce Trend Chart</h2>
                  </div>
                  <div className='chart-cont mt-5'>
                      <CompareLine options={statesItems.totalGraph.options} series={statesItems.totalGraph.series} height={statesItems.totalGraph.height} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>

        <Row className="mt-5">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div>
                  <Nav tabs>
                    <NavItem>
                      <NavLink
                          className={classnames({ active: statesItems.activeTab === '1' })}
                          onClick={() => { toggle('1'); }}>
                          Num of merchandise
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink
                          className={classnames({ active: statesItems.activeTab === '2' })}
                          onClick={() => { toggle('2'); }}>
                          Avg of ratings
                      </NavLink>
                    </NavItem>
                  </Nav>
                  <TabContent activeTab={statesItems.activeTab}>
                    <TabPane tabId="1">
                      <Row className='mt-5'>
                        <Colxx xxs="12">
                          <Card>
                              <CardBody>
                                <div className='box-title'>
                                    <h2>E-Commerce Channel Trend Chart</h2>
                                </div>
                                <div className='graph-area ecommerce-chart'>
                                    <BrushChart priceDistributionData = {statesItems.MerchandiseData} channelData= {statesItems.MerchandiseChannelData} />
                                </div>
                            </CardBody>
                          </Card>
                        </Colxx>
                      </Row>
                    </TabPane>
                    <TabPane tabId="2">
                      <Row className='mt-5'>
                        <Colxx xxs="12">
                          <Card>
                            <CardBody>
                              <div className='box-title'>
                                  <h2>E-Commerce Channel Trend Chart</h2>
                              </div>
                              <div className='graph-area ecommerce-chart'>
                                  <BrushChart priceDistributionData = {statesItems.AgeData} channelData= {statesItems.AgeChannelData} />
                              </div>
                            </CardBody>
                          </Card>
                        </Colxx>
                      </Row>
                    </TabPane>
                  </TabContent>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </div>
    )
  }
}

export default Ecommerce;