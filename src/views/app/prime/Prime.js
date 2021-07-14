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
// eslint-disable-next-line react/prefer-stateless-function
class Prime extends React.Component {
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행

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
      
      startDate: new Date(),
      // eslint-disable-next-line react/no-unused-state
      endDate: new Date(),
      // eslint-disable-next-line react/no-unused-state
      activeId: 1, 
      
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

  validateKeyword = (value) => {
    let error;
    if (!value) {
      error = 'No Keywords';
    } 
    return error;
  };

  listClickEvt = (evt) => {
    const getNum = Number(evt.currentTarget.className.replace('item-',''));
    this.setState({
      activeId : getNum
    });
  }

  render() {

    const statesItems = this.state;

    const indiCont = [
      {id: 1, title :  'Key-Rank.', count: '-'},
      {id: 2, title :  'Click', count: 99},
      {id: 3, title :  'Social Buzz', count: 824},
      {id: 4, title :  'Num of Product', count: 11485},
      {id: 5, title :  'Num of Conversion', count: 2345},
    ]

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
      {id: 3, title: 'Negative', count: 3000,series: [{data: [17, 15]}], class: 'red'},
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
    
    const validateKeyword = (value) => {
      let error;
      if (!value) {
        error = 'No Keywords';
      } 
      return error;
    };
    
    const chartDataArray = [keyChartData, clickChartData, socialChartData, productChartData, converChartData] 
    const linechartDataArray = [genderChartData , ageChartData, deviceChartData]

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
                              <ChannelButton />                             
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
                      <Button className="btn-xl mt-4" color="gray" type="submit">
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
                      {indiCont.map((item, idx) => {
                        const countNumberDot = item.count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        return (
                          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                          <li 
                            // eslint-disable-next-line react/no-array-index-key
                            key={idx} 
                            onClick={this.listClickEvt}
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
                    {chartDataArray.map((list , indx) => {
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
        </>
      )
  }
}

export default Prime;
