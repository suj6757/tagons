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
import { Row, Card, CardBody, Form, Button, FormGroup, Input, Nav, NavLink, NavItem, TabContent, TabPane, } from 'reactstrap';
import classnames from 'classnames';
import { Formik, Field } from 'formik';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import { Colxx } from '../../../components/common/CustomBootstrap';
import {ReactTable} from '../../../containers/ui/ReactTableCards';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import CompareBar from '../../../components/charts/CompareBar';
import CompareLine from '../../../components/charts/CompareLine';
import 'react-datepicker/dist/react-datepicker.css';
import { TableData } from './data';

// eslint-disable-next-line react/prefer-stateless-function
class Response extends React.Component {
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      checkInfo: [
        { id: 1, value: "7days", isChecked: false },
        { id: 2, value: "15days", isChecked: false },
        { id: 3, value: "30days", isChecked: false },
        { id: 4, value: "45days", isChecked: false },
        { id: 5, value: "60days", isChecked: false },
        { id: 6, value: "90days", isChecked: false },
      ],
      totalGraph : {
        series: [
          {
            name: "Users",
            data: [0.77, 0.88, 0.99, 0.11, 0.12, 0.34, 0.56, 0.4, 0.56, 0.41, 0.42, 0.44, 0.55, 0.66, 0.77, 0.99, 0.11, 0.55, 0.11, 0.12, 0.13, 0.15, 0.46, 0.79, 0.53, 0.12, 0.86, 0.77, 0.2, 0.55, 0.44]
          },
          {
            name: "Sessions",
            data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55,0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
          },
        ],
          height: 503,
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
            legend: {
              position: 'top',
              horizontalAlign: 'left',
            },
            colors: ['#404141','#ed7d31'],
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

  validateKeyword = (value) => {
    let error;
    if (!value) {
      error = 'No Keywords';
    } 
    return error;
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
  
  render() {
    const statesItems = this.state;


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
                          <th style={{ width:'15%' }}>Period</th>
                          <td style={{ width:'85%' }}>
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
                          <th style={{ width:'15%' }}>Response Limit</th>
                          <td style={{ width:'85%' }}>
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
                  <h2>Trend Response</h2>
                </div>

                <div className="box-area response-area">
                  <div className='graph-area total-area title-type box-left'>
                    <p className='bx_name'>Total</p>
                    <CompareLine options={statesItems.totalGraph.options} series={statesItems.totalGraph.series} height={statesItems.totalGraph.height} />
                  </div>
                  <div className='graph-area total-area title-type box-right'>
                    <p className='tit'>Total</p>
                    <div className="channel_cont">
                      <ul className="list_tag">
                        {/* 활성화 클래스 active */}
                        <li className="active">Naver_News <Button close /></li> 
                      </ul>
                    </div>
                    <p className='tit'>Social</p>
                    <div className="channel_cont">
                      <ul className="list_tag">
                        <li>Buzz <Button close /></li>
                        <li>Comment <Button close /></li>
                        <li>Likes <Button close /></li>
                        <li>View <Button close /></li>
                      </ul>
                    </div>    
                    <p className='tit'>Online Shopping</p>
                    <div className="channel_cont">
                      <ul className="list_tag">
                        <li>Product <Button close /></li>
                        <li>Ratings <Button close /></li>
                      </ul>
                    </div>    
                    <p className='tit'>Google Analytics</p>
                    <div className="channel_cont">
                      <ul className="list_tag">
                        <li>Users <Button close /></li>
                        <li>Sessions <Button close /></li>
                        <li>Conversion <Button close /></li>
                        <li>Bounce <Button close /></li>
                      </ul>
                    </div>

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

export default Response;