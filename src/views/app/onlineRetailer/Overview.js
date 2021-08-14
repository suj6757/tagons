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
import { Row, Card, CardBody, Form, Button, FormGroup, Input, } from 'reactstrap';
import { Formik, Field } from 'formik';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import { Colxx } from '../../../components/common/CustomBootstrap';
import ChannelButton from '../../../components/applications/ChannelButton'
import CompareBar from '../../../components/charts/CompareBar'
import CompareBubble from '../../../components/charts/CompareBubble';
import { barChartOptionsCheck, bubbleChartOptionsType2 } from "../../../components/charts/config";
import { ReactTableNor } from "../../../containers/ui/ReactTableNormal";
import 'react-datepicker/dist/react-datepicker.css';
import { tableOnlineOverviewData } from "../trend/data";
import { addMonths } from "date-fns";
import { post } from "axios";
import { changeDate, numberFormatting } from "../../../helpers/DevUtils";
import { UserInfo } from "../../../services/LoginService";

// eslint-disable-next-line react/prefer-stateless-function
class Overview extends React.Component {
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행

    let loginYN = (UserInfo() !== null);
    let userData = UserInfo();

    /// Default 1개월 전
    const startDate = addMonths(new Date(), -1);
    const endDate = new Date();

    const barChartOptionsCopy = barChartOptionsCheck.options;
    barChartOptionsCopy.xaxis.categories = [];

    const bubbleOptionCopy = bubbleChartOptionsType2.options;
    this.state = {
      startDate: startDate,
      endDate: endDate,
      loginCheck : loginYN,
      searchBtnClick : false,
      searchStart : false,
      checkInfo: [
        { id: 1, value: "Daily", isChecked: true },
        { id: 2, value: "Weekly", isChecked: false },
        { id: 3, value: "Monthly", isChecked: false },
        { id: 4, value: "Yearly", isChecked: false }
      ],
      Channel_Upper: '',
      Channel_Lower: [],
      Keywords: '',
      barChartHeight: 210,
      barChartOptions: barChartOptionsCopy,
      ProductSeries: [{
        data: []
      }],
      PriceSeries: [{
        data: []
      }],
      ReviewsSeries: [{
        data: []
      }],
      DeliverySeries: [{
        data: []
      }],
      BubbleOption: bubbleOptionCopy,
      BubbleSeries: [], //bubbleChartOptionsType2.series,
      TableOnlineOverviewData: []
    };
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
  };

  ChangeEndDate = (e) => {
    this.setState({
      endDate: e
    });
  };

  validateKeyword = (value) => {
    let error;
    if (!this.state.Keywords) {
      error = 'No Keywords';
    }
    return error;
  }

  /// Period Unit
  handleOneChecked = (evt) => {
    // eslint-disable-next-line prefer-const
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

  SearchClick = (e) => {
    console.log('socialListening SearchClick !!');
    this.setState({
      searchBtnClick: true
    });
  }

  render() {
    const statesItems = this.state;

    const searchStart = (searchChannel) => {
      var ChannelUpper = '';
      var ChannelLower = [];
      var periodUnit = "";

      this.setState({
        searchBtnClick: false,
        searchCondition: {} ,
        searchStart : false ,
        selectedOptionsBase : [] ,
      });

      if (searchChannel.length > 0 ){
        searchChannel.forEach(function(item,idx){
          ChannelUpper = item.type;
          ChannelLower.push(item.name);
        });
      }
      else{
        console.log('채널 선택 없음');
      }

      this.setState({
        searchStart : true,
        Channel_Upper: ChannelUpper,
        Channel_Lower: ChannelLower,
      });
      //여기서 조회 API 구현하면 됨
      getRequestGetRetailers();
    };

    const onKeywordpress = (e) =>{
      if (e.keyCode === 13){
        e.preventDefault();
        this.setState({
          searchBtnClick: true ,
        });
      }
    };

    /// 키워드 변경시 State에 넣어줌.
    const onKeywordsChange = (e) =>{
      this.setState({
        Keywords : e.target.value
      });
    };

    const getRequestGetRetailers = () => {
      /// Reqeust Data
      const reqData = {}
      reqData.FromDate = changeDate(this.state.startDate);
      reqData.ToDate = changeDate(this.state.endDate);
      reqData.Period_Unit = "Daily";
      reqData.Channel_Upper = this.state.Channel_Upper;
      reqData.Channel_Lower = this.state.Channel_Lower;
      reqData.Keyword = this.state.Keywords;
      /// Retailer’s Channel Average
      post('/ondetailoverview/GetRetailers_Channel_Average', reqData).
      then((response) => {
        console.log("GetRetailers_Channel_Average", response);
        const res1 = JSON.parse('{\n' +
          '    "Product": [\n' +
          '        {\n' +
          '            "Channel": "Coupang",\n' +
          '            "Value": "866"\n' +
          '        }, {\n' +
          '            "Channel": "11st",\n' +
          '            "Value": "775"\n' +
          '        }, {\n' +
          '            "Channel": "Wemakeprice",\n' +
          '            "Value": "683"\n' +
          '        }, {\n' +
          '            "Channel": "Timon",\n' +
          '            "Value": "854"\n' +
          '        }, {\n' +
          '            "Channel": "Gmarket",\n' +
          '            "Value": "647"\n' +
          '        }\n' +
          '    ],\n' +
          '    "Price": [\n' +
          '        {\n' +
          '            "Channel": "Coupang",\n' +
          '            "Value": "18900"\n' +
          '        }, {\n' +
          '            "Channel": "11st",\n' +
          '            "Value": "21400"\n' +
          '        }, {\n' +
          '            "Channel": "Wemakeprice",\n' +
          '            "Value": "19500"\n' +
          '        }, {\n' +
          '            "Channel": "Timon",\n' +
          '            "Value": "18600"\n' +
          '        }, {\n' +
          '            "Channel": "Gmarket",\n' +
          '            "Value": "17900"\n' +
          '        }\n' +
          '    ],\n' +
          '    "Reviews": [\n' +
          '        {\n' +
          '            "Channel": "Coupang",\n' +
          '            "Value": "866"\n' +
          '        }, {\n' +
          '            "Channel": "11st",\n' +
          '            "Value": "775"\n' +
          '        }, {\n' +
          '            "Channel": "Wemakeprice",\n' +
          '            "Value": "683"\n' +
          '        }, {\n' +
          '            "Channel": "Timon",\n' +
          '            "Value": "854"\n' +
          '        }, {\n' +
          '            "Channel": "Gmarket",\n' +
          '            "Value": "647"\n' +
          '        }\n' +
          '    ],\n' +
          '    "Delivery": [\n' +
          '        {\n' +
          '            "Channel": "Coupang",\n' +
          '            "Value": "1"\n' +
          '        }, {\n' +
          '            "Channel": "11st",\n' +
          '            "Value": "3"\n' +
          '        }, {\n' +
          '            "Channel": "Wemakeprice",\n' +
          '            "Value": "2"\n' +
          '        }, {\n' +
          '            "Channel": "Timon",\n' +
          '            "Value": "4"\n' +
          '        }, {\n' +
          '            "Channel": "Gmarket",\n' +
          '            "Value": "3"\n' +
          '        }\n' +
          '    ],\n' +
          '    "ErrorCode": "OK",\n' +
          '    "Message": "성공"\n' +
          '}');

        // let res1 = response.data;

        let categories = [];
        let productSeries = [];
        res1.Product.map((data) => {
          categories.push(data.Channel);
          productSeries.push(data.Value);
        });

        let priceSeries = [];
        res1.Price.map((data) => {
          priceSeries.push(data.Value);
        });

        let reviewsSeries = [];
        res1.Reviews.map((data) => {
          reviewsSeries.push(data.Value);
        });

        let deliverySeries = [];
        res1.Delivery.map((data) => {
          deliverySeries.push(data.Value);
        });

        this.setState({
          barChartOptions: {
            xaxis: {
              categories: categories
            },
          },
          ProductSeries: [{
            data: productSeries
          }],
          PriceSeries: [{
            data: priceSeries
          }],
          ReviewsSeries: [{
            data: reviewsSeries
          }],
          DeliverySeries: [{
            data: deliverySeries
          }],
        });

      });
      /// Retailer’s Crossover Analysis
      post('/ondetailoverview/GetRetailers_Crossover_Analysis', reqData).
      then((response) => {
        console.log("GetRetailers_Crossover_Analysis", response);

        const res2 = JSON.parse('{\n' +
          '    "Data": [\n' +
          '        {\n' +
          '            "Channel": "Coupang",\n' +
          '            "Num_Of_Reviews": "4348",\n' +
          '            "Avg_Of_Ratings": "866",\n' +
          '            "Display_Ads_Spending": "866"\n' +
          '        }, {\n' +
          '            "Channel": "11st",\n' +
          '            "Num_Of_Reviews": "775",\n' +
          '            "Avg_Of_Ratings": "866",\n' +
          '            "Display_Ads_Spending": "866"\n' +
          '        }, {\n' +
          '            "Channel": "Wemakeprice",\n' +
          '            "Num_Of_Reviews": "683",\n' +
          '            "Avg_Of_Ratings": "866",\n' +
          '            "Display_Ads_Spending": "866"\n' +
          '        }, {\n' +
          '            "Channel": "Timon",\n' +
          '            "Num_Of_Reviews": "854",\n' +
          '            "Avg_Of_Ratings": "866",\n' +
          '            "Display_Ads_Spending": "866"\n' +
          '        }, {\n' +
          '            "Channel": "Gmarket",\n' +
          '            "Num_Of_Reviews": "647",\n' +
          '            "Avg_Of_Ratings": "866",\n' +
          '            "Display_Ads_Spending": "866"\n' +
          '        }\n' +
          '    ],\n' +
          '    "ErrorCode": "OK",\n' +
          '    "Message": "성공"\n' +
          '}');

        let bubbleSeries = [];
        let tableData = [];

        let numOfReviews = [];
        let avgOfRatings = [];

        res2.Data.map((data) => {

          numOfReviews.push(parseInt(data.Num_Of_Reviews, 10));
          avgOfRatings.push(parseInt(data.Avg_Of_Ratings, 10));

          bubbleSeries.push(
            {
              name: data.Channel,
              data: [[
                parseInt(data.Num_Of_Reviews, 10),
                parseInt(data.Display_Ads_Spending, 10),
                parseInt(data.Avg_Of_Ratings, 10),
              ]],
            }
          );
          tableData.push(
            {
              Channels: data.Channel,
              'Num of Reviews': numberFormatting(data.Num_Of_Reviews),
              'Avg of Ratings': data.Avg_Of_Ratings,
              'Display Ads Spending': numberFormatting(data.Display_Ads_Spending),
            }
          )
        });

        let xAxisMin = Math.min(avgOfRatings);
        let xAxisMax = Math.max(avgOfRatings);
        let yAxisMax = Math.max(numOfReviews);

        // let res2 = response.data;
        this.setState({
          // BubbleOption: {
          //   xaxis: {
          //     min: xAxisMin,
          //     max: xAxisMax,
          //   },
          //   yaxis: {
          //     max: yAxisMax,
          //   }
          // },
          BubbleSeries: bubbleSeries,
          TableOnlineOverviewData: tableData
        });
      });
    };

    const columns = [
      {
        Header: "Channels",
        accessor: "Channels",
        cellClass: "list-item-heading t-c w-25",
      },
      {
        Header: "Num of Reviews",
        accessor: "Num of Reviews",
        cellClass: "text-muted t-c w-25",
      },
      {
        Header: "Avg of Ratings",
        accessor: "Avg of Ratings",
        cellClass: "text-muted t-c w-25",
      },
      {
        Header: "Display Ads Spending",
        accessor: "Display Ads Spending",
        cellClass: "text-muted t-c w-25",
      },
    ];

    return (
      <div className='online_overview'>
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
                                    defaultChecked={items.isChecked}
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
                            <ChannelButton searchStart={searchStart} searchBtnClick={statesItems.searchBtnClick} tabAtribute={[true,true,true]}/>
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
                    <Button className="btn-xl mt-4" color="gray"  onClick={this.SearchClick}>
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
                <div className="box-title">
                  <h2>Retailer’s Channel Average</h2>
                </div>
                  <div className="graph-area bar_area">
                    <div className="clearfix box-line">
                      <div className="box left">
                        <div className="chart-area">
                          <div className="chart-header blue">
                            <div className="chart-title t-c">
                              <h4 className='t-c'>Product</h4>
                            </div>
                          </div>
                          <div className="chart-cont">
                            <p className='cont-noti small'>단위 : 건</p>
                            <CompareBar options={statesItems.barChartOptions} series={statesItems.ProductSeries} type="bar" height={statesItems.barChartHeight} />
                          </div>
                        </div>
                      </div>
                      <div className="box right">
                        <div className="chart-area">
                          <div className="chart-header red">
                            <div className="chart-title t-c">
                              <h4>Price</h4>
                            </div>
                          </div>
                          <div className="chart-cont">
                            <p className='cont-noti small'>단위 : 건</p>
                            <CompareBar options={statesItems.barChartOptions} series={statesItems.PriceSeries} type="bar" height={statesItems.barChartHeight} />
                          </div>
                        </div>
                      </div>
                      <div className="box left">
                        <div className="chart-area">
                          <div className="chart-header">
                            <div className="chart-title t-c">
                              <h4 className='t-c'>Reviews</h4>
                            </div>
                          </div>
                          <div className="chart-cont">
                            <p className='cont-noti small'>단위 : 건</p>
                            <CompareBar options={statesItems.barChartOptions} series={statesItems.ReviewsSeries} type="bar" height={statesItems.barChartHeight} />
                          </div>
                        </div>
                      </div>
                      <div className="box right">
                        <div className="chart-area">
                          <div className="chart-header">
                            <div className="chart-title t-c">
                              <h4>Delivery</h4>
                            </div>
                          </div>
                          <div className="chart-cont">
                            <p className='cont-noti small'>단위 : 건</p>
                            <CompareBar options={statesItems.barChartOptions} series={statesItems.DeliverySeries} type="bar" height={statesItems.barChartHeight} />
                          </div>
                        </div>
                      </div>
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
                <div className="box-title">
                  <h2>Retailer’s Crossover Analysis</h2>
                </div>
                  <div className="graph-area">
                    <div className="clearfix box-line">
                      <div className="box left">
                        <p className='cont-noti small'>*Bubble Size : Ads Spending</p>
                        <CompareBubble height={470} className="relation-bubble" options={statesItems.BubbleOption} series={statesItems.BubbleSeries}/>
                      </div>
                      <div className="box right">
                        <p className='cont-noti small mt-5'>단위 : 건, 점, 원</p>
                        <ReactTableNor
                          data={statesItems.TableOnlineOverviewData}
                          columns={columns}
                        />
                      </div>
                    </div>
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