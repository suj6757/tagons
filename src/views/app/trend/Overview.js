/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Row,
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
     Table, 
     Input 
    } from 'reactstrap';
import { Formik, Field } from 'formik';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { ko } from "date-fns/esm/locale";
import { Colxx } from '../../../components/common/CustomBootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import CompareLine from '../../../components/charts/CompareLine';
import NegativeBar from '../../../components/charts/NegativeBar';
import HeatMap from '../../../components/charts/HeatMap';
import ChannelButton from '../../../components/applications/ChannelButton'
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import { 
  heatMapGraphData,
  columeNegativeGraph, 
  columeNegativeGraphMix,
  gapTotalGraph, 
  channelChartGraph,
  gapChartGraph
} from '../../../components/charts/config'

class Overview extends React.Component {
    constructor(props) {
        super(props); // React.Component의 생성자 메소드를 먼저 실행
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            activeTab: '1',
            // eslint-disable-next-line react/no-unused-state
            selectedOptions : [],
            // eslint-disable-next-line react/no-unused-state
            totalGraph : {
                series: [
                    {
                      name: "Total Graph",
                      data: [2.4, 4.4, 1.8, 2.8, 2.4, 4.4, 1.8, 4, 2.4, 4.4, 1.8, 2.8, 2.4, 4.4, 1.8, 2.8, 2.4,4.4, 1.8, 2.8, 2.4, 4.4, 1.8, 2.8, 2.4, 4.4, 1.8, 2.8, 2.4, 4.4]
                    },
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
                    colors: ['#b9b9b9'],
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
                      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                      tickPlacement: 'between'
                    },
                    yaxis: {
                      show: false
                    }, 
                    
                  },
            }, 
            // eslint-disable-next-line react/no-unused-state
            checkInfo: [
              { id: 1, value: "Daily", isChecked: false },
              { id: 2, value: "Weekly", isChecked: false },
              { id: 3, value: "Monthly", isChecked: false },
              { id: 4, value: "Yearly", isChecked: false }
            ], 
            // eslint-disable-next-line react/no-unused-state
            overviewTableData : [
              { 'No': 1, 'Channel1': "Naver", 'Channel2' : 'Naver', "Gap": 0.56, },
              { 'No': 2, 'Channel1': "Naver News", 'Channel2' : 'Naver', "Gap": 0.56, },
              { 'No': 3, 'Channel1': "Naver Blog", 'Channel2' : 'Naver', "Gap": 0.56,},
              { 'No': 4, 'Channel1': "Instargram", 'Channel2' : 'Naver', "Gap": 0.56,},
              { 'No': 5, 'Channel1': "Facebook", 'Channel2' : 'Naver', "Gap": 0.56,},
              { 'No': 6, 'Channel1': "Youtube", 'Channel2' : 'Naver', "Gap": 0.56,},
              { 'No': 7, 'Channel1': "Navete shopping", 'Channel2' : 'Naver', "Gap": 0.56,},
              { 'No': 8, 'Channel1': "Coupang", 'Channel2' : 'Naver', "Gap": 0.56,},
              { 'No': 9, 'Channel1': "Coupang", 'Channel2' : 'Naver', "Gap": 0.56,},
              { 'No': 10, 'Channel1': "Coupang", 'Channel2' : 'Naver', "Gap": 0.56,},
            ]
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
    
    toggle = (tab) => {
        const { activeTab } = this.state;

        if(activeTab !== tab){
            this.setState({
                activeTab : tab
            })
        }
    }

    handleOneChecked = (evt) => {
      // eslint-disable-next-line prefer-const
      let { checkInfo } = this.state;
      checkInfo.forEach(item => {
        if (item.value === evt.target.value){
          // eslint-disable-next-line no-param-reassign
          item.isChecked = evt.target.checked;
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

      setSelectedOptions = (val) => {
        this.setState({  
          selectedOptions: val
        }); 
      }

      getKeys = () => {
        const { overviewTableData } = this.state;
        return Object.keys(overviewTableData[0]);
      };

      getHeader = () => {
        const keys = this.getKeys();
        return keys.map((key) => {
          return <th key={key}>{key}</th>;
        });
      };

    render() {


      const statesItems = this.state;

        const selectedOptionsBase = [
          { label: 'Total', value: 'social_val01', key: 0 },
          { label: 'Naver_news', value: 'social_val02', key: 1 },
          { label: 'Naver_blog', value: 'social_val03', key: 2 },
        ];
    
        const validateKeyword = (value) => {
            let error;
            if (!value) {
              error = 'No Keywords';
            } 
            return error;
        };

        return(
            <div className='overview_area'>
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
                                    <td style={{ width:'35%' }}>
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
                                    <th style={{ width:'15%' }}>Period Unit</th>
                                    <td  style={{ width:'35%' }}>
                                    {statesItems.checkInfo.map(items => {
                                        return(
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
                                    <th style={{ width:'15%' }}>Channel</th>
                                    <td style={{ width:'85%' }} colSpan="3">
                                    <ChannelButton />                             
                                    </td>
                                </tr>
                                <tr>
                                    <th style={{ width:'15%' }}>Keywords</th>
                                    <td style={{ width:'85%' }} colSpan="3">
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
                            <div>
                                <Nav tabs>
                                    <NavItem>
                                    <NavLink
                                        className={classnames({ active: statesItems.activeTab === '1' })}
                                        onClick={() => { this.toggle('1'); }}
                                    >
                                        Total
                                    </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: statesItems.activeTab === '2' })}
                                            onClick={() => { this.toggle('2'); }}
                                        >
                                            I/D RATE
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: statesItems.activeTab === '3' })}
                                            onClick={() => { this.toggle('3'); }}
                                        >
                                            GAP
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={statesItems.activeTab}>
                                    <TabPane tabId="1">
                                        <Row className='mt-5'>
                                            <Colxx xxs="12">
                                                <Card>
                                                    <CardBody>
                                                        <div className='graph-area total-area'>
                                                            <CompareLine options={statesItems.totalGraph.options} series={statesItems.totalGraph.series} height={statesItems.totalGraph.height} />
                                                            <p className='cont-noti'>* 모든 채널의 값을 지수화하여 표시</p>
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Colxx>
                                        </Row>
                                        <Row className='mt-5'>
                                            <Colxx xxs="12">
                                                <Card>
                                                    <CardBody>
                                                        <div className='box-title'>
                                                            <h2>Heat Map</h2>
                                                        </div>
                                                        <div className='graph-area Heat-Map'>
                                                          <HeatMap options={heatMapGraphData.options} series={heatMapGraphData.series} height={heatMapGraphData.height} />
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
                                                      <div className='bx_select_area'>
                                                        <span className='select-title'>Channel</span>
                                                        <FormGroup className="select-box">
                                                          <Select
                                                            components={{ Input: CustomSelectInput }}
                                                            className="react-select"
                                                            classNamePrefix="react-select"
                                                            name="form-field-name"
                                                            value={statesItems.selectedOptions}
                                                            onChange={(val) => this.setSelectedOptions(val)}
                                                            options={selectedOptionsBase}
                                                          />
                                                        </FormGroup>
                                                      </div>
                                                      <div className='graph-area negative-chart title-type'>
                                                        <p className='bx_name'>{statesItems.selectedOptions.label}</p>
                                                        <NegativeBar options={columeNegativeGraph.options} series={columeNegativeGraph.series} height={columeNegativeGraph.height} />
                                                      </div>
                                                    </CardBody>
                                                </Card>
                                            </Colxx>
                                        </Row>
                                        <Row className='mt-5'>
                                            <Colxx xxs="12">
                                                <Card>
                                                    <CardBody>
                                                        <div className='box-title'>
                                                            <h2>Heat Map</h2>
                                                        </div>
                                                        <div className='graph-area Heat-Map'>
                                                            <HeatMap options={heatMapGraphData.options} series={heatMapGraphData.series} height={heatMapGraphData.height} />
                                                        </div>
                                                    </CardBody>
                                                </Card>
                                            </Colxx>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="3">
                                      <Row className='mt-5'>
                                          <Colxx xxs="12">
                                              <Card>
                                                  <CardBody>
                                                      <div className='graph-area grap-area'>
                                                          <CompareLine options={gapTotalGraph.options} series={gapTotalGraph.series} height={gapTotalGraph.height} />
                                                          <p className='cont-noti'>* 모든 채널의 값을 지수화하여 표시</p>
                                                      </div>
                                                  </CardBody>
                                              </Card>
                                          </Colxx>
                                      </Row>
                                      <Row className='mt-5'>
                                          <Colxx xxs="12">
                                              <Card>
                                                  <CardBody>
                                                      <div className='clearfix box-line'>
                                                        <div className='box left'>
                                                          <Table hover bordered>
                                                            <thead>
                                                              <tr>{this.getHeader()}</tr>
                                                            </thead>
                                                            <tbody>     
                                                                {statesItems.overviewTableData.map(item => {
                                                                  return(
                                                                    <tr key={item.No}>
                                                                      <td>{item.No}</td>
                                                                      <td>{item.Channel1}</td>
                                                                      <td>{item.Channel2}</td>
                                                                      <td>{item.Gap}</td>
                                                                    </tr>
                                                                  )
                                                                })}
                                                            </tbody>
                                                          </Table>
                                                        </div>
                                                        <div className='box right'>
                                                          <div className="chart-area">
                                                            <div className='chart-header'>
                                                              <div className='chart-title'>
                                                                <h4>Channel Chart</h4>
                                                              </div>
                                                            </div>
                                                            <div className='chart-cont'>
                                                              <CompareLine options={channelChartGraph.options} series={channelChartGraph.series} height={330} />
                                                            </div>
                                                          </div>
                                                          <p className='cont-noti mt0'>* 모든 채널의 값을 지수화하여 표시</p>
                                                          <div className="chart-area">
                                                            <div className='chart-header'>
                                                              <div className='chart-title'>
                                                                <h4>GAP Chart</h4>
                                                              </div>
                                                            </div>
                                                            <div className='chart-cont'>
                                                              <CompareLine options={gapChartGraph.options} series={gapChartGraph.series} height={330} />
                                                            </div>
                                                          </div>
                                                        </div>
                                                      </div>
                                                  </CardBody>
                                              </Card>
                                          </Colxx>
                                      </Row>
                                      <Row className='mt-5'>
                                          <Colxx xxs="12">
                                              <Card>
                                                  <CardBody>
                                                      <div className='graph-area grap-area'>
                                                        <div className='box-title'>
                                                            <h2>Keyword GAP Comparison Chart</h2>
                                                        </div>
                                                        <CompareLine options={columeNegativeGraphMix.options} series={columeNegativeGraphMix.series} height={330} />
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

export default Overview;