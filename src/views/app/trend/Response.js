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
import React from "react";
import { Button, Card, CardBody, Form, FormGroup, Input, Row } from "reactstrap";
import { Field, Formik } from "formik";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { Colxx } from "../../../components/common/CustomBootstrap";
import CompareLine from "../../../components/charts/CompareLine";
import "react-datepicker/dist/react-datepicker.css";
import { addMonths } from "date-fns";
import { post } from "axios";
import { UserInfo } from "../../../services/LoginService";
import { changeDate } from "../../../helpers/DevUtils";

// FIXME: 차트 안맞음
// FIXME: 지표 선택시 컬러 안맞음(v0.5 16-4, 지표 선택시 진한 회색)
// FIXME: Response 이상함.. 더미라 그런가..? 두 API 응답값이 같음 ㅡㅡ

// eslint-disable-next-line react/prefer-stateless-function
class Response extends React.Component {
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행
    let loginYN = (UserInfo() !== null);
    let userData = UserInfo();
    /// Default 6개월 전
    const startDate = addMonths(new Date(), -6);
    const endDate = new Date();
    this.state = {
      startDate: startDate,
      endDate: endDate,
      loginCheck : loginYN,
      userData: userData,
      checkInfo: [
        { id: 1, value: "7days", isChecked: false },
        { id: 2, value: "15days", isChecked: true },   /// Default
        { id: 3, value: "30days", isChecked: false },
        { id: 4, value: "45days", isChecked: false },
        { id: 5, value: "60days", isChecked: false },
        { id: 6, value: "90days", isChecked: false },
      ],
      keywords: '',
      Selected_Index: 0,
      Selected_Index_Title: 'Total',
      totalGraph : {
        series: [],
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
            categories: [],
            tickPlacement: 'between'
          },
          yaxis: {
            show: false
          },
        },
      },

    }; // State

  }

  componentDidMount = () => {
    const stateItem = this.state;
    if (!stateItem.loginCheck){
      document.location.href = "/user/login";
    }
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
    if (!this.state.keywords) {
      error = 'No Keywords';
    }
    return error;
  }

  handleOneChecked = (evt) => {
    // eslint-disable-next-line prefer-const
    let { checkInfo } = this.state;
    checkInfo.forEach(item => {
      /// 라디오 처럼 동작하도록
      item.isChecked = item.value === evt.target.value
      // if (item.value === evt.target.value){
      //   // eslint-disable-next-line no-param-reassign
      //   item.isChecked = evt.target.checked;
      // }
    });
    this.setState({ checkInfo });
  }

  /// Response Limit 의 선택된 값의 오브젝트를 리턴.
  filterRL = () => {
    return this.state.checkInfo.filter((el) =>
      el.isChecked == true
    )
  }

  /// ENTER, 초기 로딩 시
  RequestTrendResponse = (e) => {
    console.log('[REQ] RequestTrendResponse', e);

    this.setState({
      Selected_Index : 0
    });

    /// Reqeust Data
    const reqData = {}
    reqData.FromDate = changeDate(this.state.startDate);
    reqData.ToDate = changeDate(this.state.endDate);
    reqData.Company = this.state.userData.Company;
    reqData.CompanyCode = this.state.userData.CompanyCode;
    reqData.Response_Limit = this.filterRL()[0].value;
    reqData.Keyword = this.state.keywords;
    console.log('[REQ DATA]', reqData);

    /// 지표 초기화
    post('/trendresponse/GetTrend_Response_Init_Info', reqData).
    then((response) => {
      console.log('[RES]\n', response.data.ChartData[0].SubData[0]);
      /// xaxis > categories
      let categories = [];
      let trSeries = [];
      /// 토탈 Data
      response.data.ChartData[0].SubData[0].SubData.map( (subData, idx) => {
        let seriesData = [];
        subData.Data.map( (data) => {
          if (idx === 0) {
            /// X_axis 뽑아내기
            categories.push(Number(data.X_Axis));
          }
          seriesData.push(data.Y_Axis);
        });
        /// Series 추출
        let series = {
          name: subData.Name,
          data: seriesData
        }
        trSeries.push(series);
      });
      console.log("categories : ", categories);
      this.setState({
        totalGraph: {
          series: trSeries,
          options: {
            xaxis: {
              categories: categories
            }
          }
        }
      });
    });
  }

  RequestTrendResponseSelectedInfo = () => {
    console.log('[REQ] RequestTrendResponseSelectedInfo');
    /// Reqeust Data
    const reqData = {}
    reqData.FromDate = changeDate(this.state.startDate);
    reqData.ToDate = changeDate(this.state.endDate);
    reqData.Company = this.state.userData.Company;
    reqData.CompanyCode = this.state.userData.CompanyCode;
    reqData.Response_Limit = this.filterRL()[0].value;
    reqData.Keyword = this.state.keywords;
    reqData.Selected_Index = this.state.Selected_Index;
    console.log('[REQ DATA]', reqData);

    post('/trendresponse/GetTrend_Response_Selected_Info', reqData).
    then((response) => {
      console.log('[RES]\n', response);

      let subDatas = []
      response.data.ChartData.map((subData, idx) => {
        subData.SubData.map((subData2) => {
          subDatas.push([subData2]);
        })
      });

      let categories = [];
      let trSeries = [];

      let selected = subDatas[this.state.Selected_Index];
      console.log("selected", selected[0]);
      selected[0].SubData.map( (subData) => {
        let seriesData = [];
        subData.Data.map((data, idx) => {
          if (idx === 0) {
            /// X_axis 뽑아내기
            categories.push(Number(data.X_Axis));
          }
          seriesData.push(data.Y_Axis);
        });
        /// Series 추출
        let series = {
          name: subData.Name,
          data: seriesData
        }
        trSeries.push(series);
      });

      console.log("categories : ", categories);

      this.setState({
        totalGraph: {
          series: trSeries,
          options: {
            xaxis: {
              categories: categories
            }
          }
        }
      });
    });
  }

  /// 지표 선택시
  selectIndicator = (value) => {
    console.log(value);

    let title = 'Total';
    switch (value) {
      case 1:
        title = "Buzz";
        break;
      case 2:
        title = "Comment";
        break;
      case 3:
        title = "View";
        break;
      case 4:
        title = "View";
        break;
      case 5:
        title = "Product";
        break;
      case 6:
        title = "Ratings";
        break;
      case 7:
        title = "Users";
        break;
      case 8:
        title = "Sessions";
        break;
      case 9:
        title = "Conversion";
        break;
      case 10:
        title = "Bounce";
        break;
      default:
        title = "Total";
        break;
    }

    this.setState({
      Selected_Index : value,
      Selected_Index_Title: title,
    }, function() {
      this.RequestTrendResponseSelectedInfo();
    });

  };

  render() {
    const statesItems = this.state;

    const onKeywordpress = (e) =>{
      if (e.keyCode === 13){
        e.preventDefault();
        this.RequestTrendResponse(e);
      }
    };

    /// 키워드 변경시 State에 넣어줌.
    const onKeywordsChange = (e) =>{
      this.setState({
        keywords : e.target.value
      });
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
                                  onKeyDown={onKeywordpress}
                                  onChange={onKeywordsChange}
                                  value={statesItems.keywords}
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
                    <Button className="btn-xl mt-4" color="gray" onClick={this.RequestTrendResponse}>
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
                    <p className='bx_name'>{statesItems.Selected_Index_Title}</p>
                    <CompareLine options={statesItems.totalGraph.options} series={statesItems.totalGraph.series} height={statesItems.totalGraph.height} />
                  </div>
                  <div className='graph-area total-area title-type box-right'>
                    <p className='tit'>Total</p>
                    <div className="channel_cont">
                      <ul className="list_tag">
                        {/* 활성화 클래스 active */}
                        <li className={ statesItems.Selected_Index == 0 ? "active" : "" } onClick={() => this.selectIndicator(0)}>Total <Button close /></li>{/* eslint-disable-line */}
                      </ul>
                    </div>
                    <p className='tit'>Social</p>
                    <div className="channel_cont">
                      <ul className="list_tag">
                        <li className={statesItems.Selected_Index == 1 ? "active" : ""} onClick={() => this.selectIndicator(1)}>Buzz <Button close /></li>{/* eslint-disable-line */}
                        <li className={statesItems.Selected_Index == 2 ? "active" : ""} onClick={() => this.selectIndicator(2)}>Comment <Button close /></li>{/* eslint-disable-line */}
                        <li className={statesItems.Selected_Index == 3 ? "active" : ""} onClick={() => this.selectIndicator(3)}>Likes <Button close /></li>{/* eslint-disable-line */}
                        <li className={statesItems.Selected_Index == 4 ? "active" : ""} onClick={() => this.selectIndicator(4)}>View <Button close /></li>{/* eslint-disable-line */}
                      </ul>
                    </div>
                    <p className='tit'>Online Shopping</p>
                    <div className="channel_cont">
                      <ul className="list_tag">
                        <li className={statesItems.Selected_Index == 5 ? "active" : ""} onClick={() => this.selectIndicator(5)}>Product <Button close /></li>{/* eslint-disable-line */}
                        <li className={statesItems.Selected_Index == 6 ? "active" : ""} onClick={() => this.selectIndicator(6)}>Ratings <Button close /></li>{/* eslint-disable-line */}
                      </ul>
                    </div>
                    <p className='tit'>Google Analytics</p>
                    <div className="channel_cont">
                      <ul className="list_tag">
                        <li className={statesItems.Selected_Index == 7 ? "active" : ""} onClick={() => this.selectIndicator(7)}>Users <Button close /></li>{/* eslint-disable-line */}
                        <li className={statesItems.Selected_Index == 8 ? "active" : ""} onClick={() => this.selectIndicator(8)}>Sessions <Button close /></li>{/* eslint-disable-line */}
                        <li className={statesItems.Selected_Index == 9 ? "active" : ""} onClick={() => this.selectIndicator(9)}>Conversion <Button close /></li>{/* eslint-disable-line */}
                        <li className={statesItems.Selected_Index == 10 ? "active" : ""} onClick={() => this.selectIndicator(10)}>Bounce <Button close /></li>{/* eslint-disable-line */}
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