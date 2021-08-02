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
import { post } from 'axios';
import 'react-datepicker/dist/react-datepicker.css';

// eslint-disable-next-line react/prefer-stateless-function
class Needspatterns extends React.Component {
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
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
      selectedOptions: null,
    };
  }

  //test용도
  componentDidMount = () => {
    console.log('search : ', this.state.searchCondition);

    let responseTotal = [
      {
        data: [
          { x: 'Group1', y: 80 },
          { x: 'Group2', y: 5 },
          { x: 'Group3', y: 10 },
          { x: 'Group4', y: 20 },
          { x: 'Group5', y: 5 },
          { x: 'Group6', y: 25 },
          { x: 'Group7', y: 5 },
          { x: 'Group8', y: 10 },
          { x: 'Group9', y: 15 },
          { x: 'Group10', y: 10 }
        ]
      }
    ]

    let responseSelect = [
      {
        data: [
          { x: 'Group1', y: 35.8 },
          { x: 'Group2', y: 25.8 },
          { x: 'Group3', y: 10.9 },
          { x: 'Group4', y: 25 },
          { x: 'Group5', y: 5 },
          { x: 'Group6', y: 25 },
          { x: 'Group7', y: 8 },
          { x: 'Group8', y: 13 },
          { x: 'Group9', y: 23 },
          { x: 'Group10', y: 15 }
        ]
      }
    ]

    this.setState(prev => ({
      ...prev,
      treemapTotal : {
        ...prev.treemapTotal,
        series : responseTotal
      },
      treemapSelect : {
        ...prev.treemapSelect,
        series : responseSelect
      }
    }), () => {
      console.log('setting : ', this.state);
    });
  };

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

  validateKeyword = (value) => {
    let error;
    if (!value) {
      error = 'No Keywords';
    } 
    return error;
  }

  changeOption = (...args) => {
    this.setState({
      selectedOptions: [args[0]]
    });
  }
  
  render() {
    const statesItems = this.state;
    const { channelOptionSelected } = this.state;

    const getNeedPatternInit = (searchCondition) => {
      /*
      this.setState(prev => ({
          ...prev,
          searchCondition : {

          }
      }),
      () => {
        console.log('search : ' , this.state.searchCondition);

        post('/sociallistening/GetNeeds_Pattern_Init', this.state.searchCondition).
        then((response) => {
            console.log(response);
        });
      });
      */
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

    const channelOption = [
      { label: 'Naver Blog', value: 'naverblog', key: 0 },
      { label: 'Coupang', value: 'Coupang', key: 1 },
      { label: 'Test', value: 'test', key: 2 }
    ]

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
                          <ChannelButton />                             
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
                                      validate={this.validateKeyword}
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
                    <Button className="btn-xl mt-4" color="gray" type="submit">
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
                          onChange={this.changeOption}
                          options={channelOption}
                        />
                      </FormGroup>
                    </div>
                    <ReactApexChart options={statesItems.treemapSelect.options} series={statesItems.treemapSelect.series} type="treemap" height={540} className="chart-box" />
                  </div>
                </div>2
                <div className="box-area tbl-no-page">
                  <div className="box-left">
                    <ReactTable
                      className='table'
                      data={TableData}
                      columns={columns}
                      defaultPageSize={10}
                      sortable={false}
                    />
                  </div>
                  <div className="box-right">
                    <ReactTable
                      className='table'
                      data={TableData}
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