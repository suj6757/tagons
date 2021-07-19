/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-use-before-define */
/* eslint no-unused-vars: "off" */
/* eslint no-undef: "off" */
/* eslint no-plusplus : "off" */
/* eslint react/no-unused-state: "off" */
/* eslint prefer-template: "off" */
import React from 'react';
import { Row, Card, CardBody, Form, Button, FormGroup, CustomInput, } from 'reactstrap';
import { Formik, Field } from 'formik';
import Select from 'react-select';
import { Colxx } from '../../../components/common/CustomBootstrap';
import {ReactTable} from '../../../containers/ui/ReactTableCards';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import CompareBar from '../../../components/charts/CompareBar';
import { TableData } from './data';

// eslint-disable-next-line react/prefer-stateless-function
class GoogleAnalytics extends React.Component {
  
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행

    this.state = {
      
      horizontal: {
        options: {
          chart: {
            height: 350,
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false
            },
            events: {
              dataPointSelection: (event, chartContext, config) => {
                for(let i = 0; i < event.target.parentNode.childNodes.length; i++){
                  event.target.parentNode.childNodes[i].setAttribute('fill', '#dbdbdb');
                  
                  if(event.target) {
                    event.target.setAttribute('fill', '#f9a21b');
                  }
                }
              }
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                position: 'top',
              },
            }
          },
          dataLabels: {
            enabled: true,
          },
          grid: {
            show: false,
          },
          fill: {
            colors: ['#dbdbdb',],
            opacity: 1
          },
          title: {
            // text: ""
          },
          states: {
            hover: {
              filter: {
                type: 'none',
              }
            },
            active: {
              allowMultipleDataPointsSelection: false,
              filter: {
                type: 'none',
              }
            },
          },
          xaxis: {
            labels:{
              show: false,
            },
            axisTicks: {
              show: false,
            },
            categories: ['폴라니트', '목폴라니트', '에이라인스커트', '플로랄원피스', '하객룩',],
          },
          yaxis: {
            axisTicks: {
              show: false
            },
            axisBorder: {
              show: true,
            },
          },
          tooltip: {
            custom: ({ series, seriesIndex, dataPointIndex, w }) => {
              // console.log(w.config.series[seriesIndex].average[dataPointIndex]);
              return (
                '<div class="arrow_box">' +
                "<span>" +
                w.config.series[seriesIndex].title +
                ": " +
                series[seriesIndex][dataPointIndex] +
                " ("+ w.config.series[seriesIndex].average[dataPointIndex] +"%)" +
                "</span>" +
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
          }
        },
      },

      activeId: 1,
      selectedOptions: null,
    };
  }
  
  listClickEvt = (evt) => {
    const getNum = Number(evt.currentTarget.className.replace('item-',''));
    this.setState({
      activeId : getNum
    });
  };

  validateKeyword = (value) => {
    let error;
    if (!value) {
      error = 'No Keywords';
    } 
    return error;
  };

  changeOption = (...args) => {
    this.setState({
      selectedOptions: [args[0]]
    });
  };

  render() {
    const statesChart = this.state;
    const { internalIndexSelected , externalSelected } = this.state;    

    const internalIndex = [
      { label: 'Users', value: 'internal1', key: 0 },
      { label: 'Buzz', value: 'interna12', key: 1 },
    ];

    const externalIndex = [
      { label: 'Users', value: 'external1', key: 0 },
      { label: 'Buzz', value: 'external2', key: 1 },
    ];

    const indiCont = [
      {id: 1, title :  'Users',},
      {id: 2, title :  'Sessions',},
      {id: 3, title :  'Conversion',},
      {id: 4, title :  'Bounce',},
    ]

    const usersChartData = [
      {id: 1, series: [{data: [17, 15, 50, 120, 30], title: 'Users', average: [5, 50, 20, 1.5, 45.3],}]},
    ]

    const sessionsChartData = [
      {id: 1, series: [{data: [50, 20, 55, 100, 140], title: 'Sessions', average: [5, 50, 20, 1.5, 45.3],}]},
    ]

    const conversionChartData = [
      {id: 1, series: [{data: [23, 10, 82, 35, 100], title: 'Conversion', average: [5, 50, 20, 1.5, 45.3],}]},
    ]

    const bounceChartData = [
      {id: 1, series: [{data: [10, 20, 30, 40, 50], title: 'Bounce', average: [5, 50, 20, 1.5, 45.3],}]},
    ]

    const chartDataArray = [usersChartData, sessionsChartData, conversionChartData, bounceChartData];

    const columns = [
      {
        Header: 'Rank',
        accessor: 'id',
        cellClass: 'list-item-heading text-center w-10',
      },
      {
        Header: 'GA Inflow Keyword',
        accessor: 'title',
        cellClass: 'text-muted text-center w-30',
      },
      {
        Header: 'Users',
        accessor: 'purchase',
        cellClass: 'text-muted text-center w-30',
      },
      {
        Header: 'Buzz',
        accessor: 'satisfaction',
        cellClass: 'text-muted text-center w-30',
      },
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
                          <th style={{ width:'15%' }}>Period Unit</th>
                          <td style={{ width:'85%' }}>
                          <CustomInput
                            type="checkbox"
                            id="period-daily"
                            label="Daily"
                            className="chk-remember"
                          />
                          <CustomInput
                            type="checkbox"
                            id="period-weekly"
                            label="Weekly"
                            className="chk-remember"
                          />
                          <CustomInput
                            type="checkbox"
                            id="period-montly"
                            label="Montly"
                            className="chk-remember"
                          />
                          <CustomInput
                            type="checkbox"
                            id="period-yearly"
                            label="Yearly"
                            className="chk-remember"
                          />
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
                  <h2>GA Keyword Gap</h2>
                </div>

                <ul className="tab-list">
                  {indiCont.map((item, idx) => {
                    return (
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                      <li 
                        // eslint-disable-next-line react/no-array-index-key
                        key={idx} 
                        onClick={this.listClickEvt}
                        className={`item-${item.id} ${statesChart.activeId === Number(item.id) ? 'active' : ""}` }
                      >
                        <span className='title'>{item.title}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="tab-chart-area">
                  {chartDataArray.map((list , indx) => {
                      return(
                        <div 
                          // eslint-disable-next-line react/no-array-index-key
                          key={indx} 
                          className={`item-${indx + 1} graph-list`} style={statesChart.activeId === Number(`${indx + 1}`) ? {display : 'block'} : {display : 'none'}}
                        >
                          {list.map((item, idx) => {
                            return(
                              <div
                                // eslint-disable-next-line react/no-array-index-key
                                key={idx}
                              >
                                <div className='chart-area'>
                                  <CompareBar options={statesChart.horizontal.options} series={item.series} type="bar" height={210} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )
                    })}
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        {/* e: GA Keyword Gap */}

        {/* s: GA-Social Comparison */}
        <Row className="mt-5">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className="box-title">
                  <h2>GA-Social Comparison</h2>
                </div>
                <div className="table-sort-area">
                  <div>
                    <span>Internal Index</span>
                    <FormGroup className="select-box">
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={internalIndexSelected}
                        onChange={this.changeOption}
                        options={internalIndex}
                      />
                    </FormGroup>
                    <span>External Index</span>
                    <FormGroup className="select-box">
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={externalSelected}
                        onChange={this.changeOption}
                        options={externalIndex}
                      />
                    </FormGroup>
                  </div>
                  <ReactTable
                    data={TableData}
                    columns={columns}
                  />
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        {/* e: GA-Social Comparison */}

        {/* s: GA Demographics Analysis */}
        <Row className="mt-5">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className="box-title">
                  <h2>GA Demographics Analysis </h2>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        {/* e: GA Demographics Analysis */}

        {/* s: GA Broad Trend Chart */}
        <Row className="mt-5">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className="box-title">
                  <h2>GA Broad Trend Chart</h2>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        {/* e: GA Broad Trend Chart */}

        {/* s: GA Keyword Gap */}
        <Row className="mt-5">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className="box-title">
                  <h2>GA Keyword Gap</h2>
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

export default GoogleAnalytics;
