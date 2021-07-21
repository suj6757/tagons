import React from 'react';
import { Row, Card, CardBody, Form, Button, FormGroup } from 'reactstrap';
import { Formik, Field } from 'formik';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import { Colxx } from '../../../components/common/CustomBootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import ChannelButton from '../../../components/applications/ChannelButton'
import ChannelTable from '../../../components/applications/ChannelTable'
import { login, UserInfo, logout } from '../../../services/LoginService';
import axios from 'axios';

class Channels extends React.Component {
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
        searchStartFlag : false ,
        keyWordtext :'' ,
        searchCondition : {} ,
        loginBefore : loginYN ,
        userInfo : userData ,
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
    
    SearchClick = (e) => {
      console.log('Channels SearchClick !!');
      this.setState({  
        searchBtnClick: true , 
      });
      
    }

    render() {

      const statesItems = this.state;

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
      const setSearchStartFlag = (flagValue) => {
        this.setState({  
          searchStartFlag: flagValue ,
        });
      }
      const searchStart = (searchChannel) =>{
        var searchCondition = {} ;
        var ChannelUpper = [];
        var ChannelLower = [];
        this.setState({  
          searchBtnClick: false
        });
        /* this.setState({  
          searchCondition: {} ,
          searchStartFlag : false , 
        }); */
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
        console.log('11111');
        this.setState({  
          searchCondition: searchCondition ,
          searchStartFlag : true , 
        });
          console.log('2222');
        //여기서 조회 API 구현하면 됨


      };

      return(
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
                              <ChannelButton  searchStart={searchStart} searchBtnClick={statesItems.searchBtnClick}/>                             
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
                          <h2>Posting Indicator</h2>
                      </div>
                      <ChannelTable setSearchStartFlag={setSearchStartFlag} searchStartFlag={statesItems.searchStartFlag} searchCondition={statesItems.searchCondition} />
                  </CardBody>
              </Card>
              </Colxx>
          </Row>
        </>
      )
    }
}

export default Channels;