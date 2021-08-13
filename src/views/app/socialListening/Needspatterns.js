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
import React from 'react';
import ReactApexChart from "react-apexcharts";
import { Row, Card, CardBody, Form, Button, FormGroup, Input, Nav, NavLink, NavItem, TabContent, TabPane, } from 'reactstrap';
import classnames from 'classnames';
import { Formik, Field } from 'formik';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import { Colxx } from '../../../components/common/CustomBootstrap';
import {ReactTable} from '../../../containers/ui/ReactTableCards';
import ChannelButton from '../../../components/applications/ChannelButton'
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import CompareBar from '../../../components/charts/CompareBar';
import CompareLine from '../../../components/charts/CompareLine';
// import {ReactTable} from '../../../containers/ui/ReactTable';
import { TableData } from './tableData';
import { login, UserInfo, logout } from '../../../services/LoginService';
import { post } from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

// eslint-disable-next-line react/prefer-stateless-function
class Needspatterns extends React.Component {
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
      searchBtnClick : false,
      searchStart : false,
      userInfo : userData,
      keyWordtext : "",
      selectedOptionsBase : [],
      searchCondition: {},
      // eslint-disable-next-line react/no-unused-state
      selectedOptions : [],
      // eslint-disable-next-line react/no-unused-state
      channelOption : [],
      treemapTotal : {
        series: [],
        height: 540,
        options: {
          chart: {
            type: 'treemap',
            toolbar: {
              show: false
            }, 
            zoom: {
              enabled: false,
            }
          },
          legend: {
            show: false,
          },
          colors: [
            '#58a3b2',
            '#f8c360',
            '#b9decf',
            '#ef597c',
            '#d4ddc1',
            '#da5ca6',
            '#40759d',
            '#caf77d',
            '#5e355f',
            '#f17c55',
          ],
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '14px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
              colors: ['#fff'],
            },
            formatter: (text, op) => {
              return [text, op.value + '%']
            },
            offsetY: -4
          },
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false
            }
          },
          tooltip: {
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
              return (
                "<div class='tootip-box'>" +
                w.globals.categoryLabels[dataPointIndex] +
                ": " +
                series[seriesIndex][dataPointIndex] +"%" +
                "</div>"
              );
            }
          },
          noData: {
            text: '데이터 없음',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              fontSize: '16px',
            }
          },
        }
      },
      treemapTotalTable : [],
      treemapSelect : {
        series: [],
        height: 540,
        options: {
          chart: {
            type: 'treemap',
            toolbar: {
              show: false
            }, 
            zoom: {
              enabled: false,
            }
          },
          legend: {
            show: false,
          },
          colors: [
            '#58a3b2',
            '#f8c360',
            '#b9decf',
            '#ef597c',
            '#d4ddc1',
            '#da5ca6',
            '#40759d',
            '#caf77d',
            '#5e355f',
            '#f17c55',
          ],
          dataLabels: {
            enabled: true,
            style: {
              fontSize: '14px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 'bold',
              colors: ['#fff'],
            },
            formatter: (text, op) => {
              return [text, op.value + '%']
            },
            offsetY: -4
          },
          plotOptions: {
            treemap: {
              distributed: true,
              enableShades: false
            }
          },
          tooltip: {
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
              // console.log(w.globals.categoryLabels[dataPointIndex]);
              // w.config.series[seriesIndex]
              return (
                "<div class='tootip-box'>" +
                w.globals.categoryLabels[dataPointIndex] +
                ": " +
                series[seriesIndex][dataPointIndex] +"%" +
                "</div>"
              );
            }
          },
          noData: {
            text: '데이터 없음',
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0,
            style: {
              fontSize: '16px',
            }
          },
        },
      },
      treemapSelectTable : []
    };
  }
  
  ChangeStartDate = (e) => { 
    this.setState({  
      startDate: e,
    });
  }  
  
  ChangeEndDate = (e) => { 
    this.setState({  
      endDate: e
    });  
  }

  

  setSelectedOptions = (val) => {
    this.setState({  
      selectedOptions: val
    }); 
  }

  SearchClick = (e) => {
    console.log('socialListening SearchClick !!');
    this.setState({  
      searchBtnClick: true
    }); 
  }
  
  render() {
    const statesItems = this.state;
    const { channelOptionSelected } = this.state;

    const onKeywordChange = (e) =>{
      this.setState({
        keyWordtext : e.target.value
      }); 
    };
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
    
    const searchStart = (searchChannel) =>{
      var searchCondition = {} ;
      var ChannelUpper = [];
      var ChannelLower = [];
      var selectList = [];
      var periodUnit = "";
      let ChannelOptions = [];

      this.setState({  
        searchBtnClick: false
      });
      this.setState({  
        searchCondition: {} ,
        searchStart : false , 
      });
      if (searchChannel.length > 0 ){
        selectList.push({ label: 'Total', value: 'Total' , channelUp : "Total" , key: 0 });
        searchChannel.forEach(function(item,idx){
          ChannelUpper.push(item.type);
          ChannelLower.push(item.name);
          ChannelOptions.push({
            label : item.name
          , value : item.name
          , key : idx
          })
          selectList.push({ label: item.name, value: item.name, channelUp : item.type , key: idx + 1});
        });
      }
      else{
        console.log('채널 선택 없음');
      }

      this.setState({  
        selectedOptionsBase: selectList ,
      });
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
        selectedOptions: { label: 'Total', value: 'Total' , channelUp : "Total" , key: 0 } ,
        channelOption : ChannelOptions
      }, () => {
        //여기서 조회 API 구현하면 됨
        getNeedPatternInit();
      });
    };

    const getNeedPatternInit = () => {
      post('/sociallistening/GetNeeds_Pattern_Init', this.state.searchCondition).
      then((response) => {
          let responseTotal = [];
          let responseTable = [];

          if(response.status == "200") {
            response.data.Data.map((data) => {
              responseTotal.push({
                x : data.name,
                y : data.value
              });
            });

            response.data.TableData.map((data, idx) => {
              responseTable.push({
                id : idx
              , category : data.Name
              , keywords : data.Value
              });
            });

            this.setState(prev => ({
              ...prev,
              treemapTotal : {
                ...prev.treemapTotal,
                series : [{
                  data : responseTotal
                }]
              },
              treemapTotalTable : responseTable
            }), () => {
              //console.log(this.state);
            });
          }
      });
    }

    const changeOption = (...args) => {
      /*
      this.setState({
        selectedOptions: [args[0]]
      }, () => {
        console.log(this.state);
      });
      */
      let searchParam = { ...this.state.searchCondition };
      this.state.searchCondition.Channel_Lower.map((data, idx) => {
        if(args[0].value == data) {
          searchParam.Channel_Upper = this.state.searchCondition.Channel_Upper[idx];
          searchParam.Channel_Lower = data;
        }
      });
  
      getNeedPatternSelected(searchParam);
    }

    const getNeedPatternSelected = (searchCondition) => {
      post('/sociallistening/GetNeeds_Pattern_Selected', searchCondition).
      then((response) => {
          console.log(response);

          let responseSelect = [];
          let responseTable = [];

          if(response.status == "200") {
            response.data.Data.map((data) => {
              responseSelect.push({
                x : data.name,
                y : data.value
              });
            });

            response.data.TableData.map((data, idx) => {
              responseTable.push({
                id : idx
              , category : data.Name
              , keywords : data.Value
              });
            });

            this.setState(prev => ({
              ...prev,
              treemapSelect : {
                ...prev.treemapSelect,
                series : [{
                  data : responseSelect
                }]
              },
              treemapSelectTable : responseTable
            }), () => {
              //console.log(this.state);
            });
          }
      });
    }

    const columns = [
      {
        Header: 'Channel Category',
        accessor: 'category',
        cellClass: 'text-center',
        disableSortBy: true
      },
      {
        Header: 'Needs Keywords',
        accessor: 'keywords',
        cellClass: 'text-center',
        disableSortBy: true
      },
    ]

    const searchClick = (data) => {
      this.setState({  
        searchBtnClick: true
      });
    }
    const onKeywordpress = (e) =>{
      if (e.keyCode === 13){
        e.preventDefault();
        // 조회조건 Validation 체크
        this.setState({  
          searchBtnClick: true , 
        });
      }
    };
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
                          <th style={{ width:'10%' }}>Period</th>
                          <td style={{ width:'90%' }}>
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
                          <th style={{ width:'10%' }}>Channel</th>
                          <td style={{ width:'90%' }}>
                          <ChannelButton searchStart={searchStart} searchBtnClick={statesItems.searchBtnClick} tabAtribute={[true,true,true]} />                             
                          </td>
                        </tr>
                        <tr>
                          <th style={{ width:'10%' }}>Keywords</th>
                          <td style={{ width:'90%' }}>
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
                    <Button className="btn-xl mt-4" color="gray" onClick={searchClick}>
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
                  <h2>Needs Pattern Map</h2>
                </div>

                <div className="box-area pattern-map-area">
                  <div className="box-left">
                    <div className="pattern-tit"><span>Total</span></div>
                    <ReactApexChart options={statesItems.treemapTotal.options} series={statesItems.treemapTotal.series} type="treemap" height={540} className="chart-box" />
                  </div>
                  <div className="box-right">
                    <div className="comparison-select-area pattern-tit">
                      <span className="">Channel</span>
                      <FormGroup className="select-box">
                        <Select
                          components={{ Input: CustomSelectInput }}
                          className="react-select"
                          classNamePrefix="react-select"
                          name="form-field-name"
                          value={channelOptionSelected}
                          onChange={changeOption}
                          options={this.state.channelOption}
                        />
                      </FormGroup>
                    </div>
                    <ReactApexChart options={statesItems.treemapSelect.options} series={statesItems.treemapSelect.series} type="treemap" height={540} className="chart-box" />
                  </div>
                </div>
                <div className="box-area tbl-no-page">
                  <div className="box-left">
                    <ReactTable
                      className='table'
                      data={this.state.treemapTotalTable}
                      columns={columns}
                      defaultPageSize={10}
                      sortable={false}
                    />
                  </div>
                  <div className="box-right">
                    <ReactTable
                      className='table'
                      data={this.state.treemapSelectTable}
                      columns={columns}
                      defaultPageSize={10}
                      sortable={false}
                    />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        {/* e: GA Keyword Gap */}
      </>
    )
  }
}

export default Needspatterns;