/* eslint-disable react/no-unused-state */
/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/label-has-for */
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
    } from 'reactstrap';
import { Formik, Field } from 'formik';
import classnames from 'classnames';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import { Colxx } from '../../../components/common/CustomBootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import CompareLine from '../../../components/charts/CompareLine';
// import NegativeBar from '../../../components/charts/NegativeBar';
// import HeatMap from '../../../components/charts/HeatMap';
import ChannelButton from '../../../components/applications/ChannelButton'
// import CustomSelectInput from '../../../components/common/CustomSelectInput';
import { login, UserInfo, logout } from '../../../services/LoginService';
import axios from 'axios';

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
        // eslint-disable-next-line react/no-unused-state
        selectedOptions : [],
        totalGraph : {
          series: [
              {
                name: "High - 2013",
                data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
              },
            ],
            height: 500,
            options: {
              chart: {
                type: 'line',
                dropShadow: {
                  enabled: true,
                  color: '#000',
                  top: 18,
                  left: 7,
                  blur: 10,
                  opacity: 0.2
                },
                toolbar: {
                  show: false
                }
              },
              colors: ['#77B6EA', '#545454'],
              dataLabels: {
                enabled: true,
              },
              stroke: {
                curve: 'smooth'
              },
              title: {
                text: 'Average High & Low Temperature',
                align: 'left'
              },
              grid: {
                borderColor: '#e7e7e7',
                row: {
                  colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                  opacity: 0.5
                },
              },
              markers: {
                size: 1
              },
              xaxis: {
                categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                title: {
                  text: 'Month'
                }
              },
              yaxis: {
                title: {
                  text: 'Temperature'
                },
                min: 1,
                max: 35
              },
              legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
              }
            },
        }, 
      
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

    //   setSelectedOptions = (val) => {
    //     this.setState({  
    //       selectedOptions: val
    //     }); 
    //   }
    

    render() {

      const statesItems = this.state;

      // const selectedOptionsBase = [
      //   { label: 'Total', value: 'social_val01', key: 0 },
      //   { label: 'Naver_news', value: 'social_val02', key: 1 },
      //   { label: 'Naver_blog', value: 'social_val03', key: 2 },
      // ];
  
      const validateKeyword = (value) => {
          let error;
          if (!value) {
            error = 'No Keywords';
          } 
          return error;
      };
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
        //여기서 조회 API 구현하면 됨
      }; 

      const onKeywordpress = (e) =>{
        if (e.keyCode === 13){
          e.preventDefault();
          // 여기서 Search 로 이동
        }
      };
      return(
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
                                  <h2>Social Keyword Chart - 독특하다</h2>
                              </div>
                                <div className='chart-cont'>
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
                              </Nav>
                              <TabContent activeTab={statesItems.activeTab}>
                                  <TabPane tabId="1">
                                      <Row>
                                          <Colxx xxs="12">
                                              <Card>
                                                  <CardBody>
                                                      test
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
                                                    <div className='graph-area negative-chart'>
                                                      test
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
                                                          test
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