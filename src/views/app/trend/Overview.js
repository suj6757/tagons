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
import { TableHeatMapData } from './data';
import { 
  heatMapGraphData,
  columeNegativeGraph, 
  columeNegativeGraphMix,
  gapTotalGraph, 
  channelChartGraph,
  gapChartGraph
} from '../../../components/charts/config';
import { login, UserInfo, logout } from '../../../services/LoginService';
import { post } from 'axios';

var formData;
var config;
class Overview extends React.Component {
    constructor(props) {
      super(props); // React.Component의 생성자 메소드를 먼저 실행
      let date1 = new Date();
      let date2 = new Date();
      let loginYN = (UserInfo() !== null);
      let userData = UserInfo();
      date1.setDate(date1.getDate() - 9);
      date2.setDate(date2.getDate() - 2);

      /// [GAP] 상단 차트
      let gapTotalOptions = gapTotalGraph.options;
      /// [GAP] ChannelChart
      let ccOptions = channelChartGraph.options;
      /// [GAP] GAP Chart
      let gcOptions = gapChartGraph.options;
      /// [GAP] Keyword GAP Comparison Chart
      let kgccOptions = columeNegativeGraphMix.options;


      this.state = {
        startDate: date1,
        endDate: date2,
        activeTab: '1',
        searchBtnClick : false ,
        searchStart : false , 
        userInfo : userData ,
        loginCheck : loginYN,
        keyWordtext : "",
        selectedOptionsBase : [] , 
        searchCondition: {} ,
        // eslint-disable-next-line react/no-unused-state
        selectedOptions : [],
        // eslint-disable-next-line react/no-unused-state
        totalGraph : {
            series: [
                {
                  name: "Total Graph",
                  data: []
                },
              ],
              height: 400,
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
        idrateGraph : {
          series: [],
          height: 350,
          options: {
            grid: {
              show: false,
            },
            chart: {
              type: 'bar',
              toolbar: {
                show: false,
              },
              zoom: {
                enabled: false
              },
            },
            colors :['#a5a5a5'],
            plotOptions: {
              bar: {
                colors: {
                  ranges: [{
                    from: -9999999,
                    to: 0,
                    color: '#2f5597'
                  }]
                },
                columnWidth: '50%',
                dataLabels: {
                  position: 'top',
                }
              }
            },
            dataLabels: {
              enabled: true,
              offsetY: -22,
              style: {
                fontSize: '12px',
                colors: ["#000"]
              }
            },
            xaxis: {
              categories: [],
            }, 
            yaxis: {
              show: false,
              max: function (val) {
                return val + 0.1;
              },
              min: function (val) {
                return val - 0.1;
              },
            }
          },
        },
        // eslint-disable-next-line react/no-unused-state
        checkInfo: [
          { id: 1, value: "Daily", isChecked: true },
          { id: 2, value: "Weekly", isChecked: false },
          { id: 3, value: "Monthly", isChecked: false },
          { id: 4, value: "Yearly", isChecked: false }
        ],
        /// [GAP] 라인 챠트
        gapTotal: {
          series: [],
          options: gapTotalOptions,
        },
        /// [GAP] Channel Chart
        channelChart: {
          series: [],
          options: ccOptions,
        },
        /// [GAP] GAP Chart
        gapChart: {
          series: [],
          options: gcOptions,
        },
        /// [GAP] Keyword GAP Comparison Chart
        kgccChart: {
          series: [],
          options: kgccOptions,
        },
        // eslint-disable-next-line react/no-unused-state
        overviewTableData : [
          { 'No': '', 'Channel1': "", 'Channel2' : '', "Gap": '', }
        ],
        totalHeatmap : { ...heatMapGraphData },
        idrateHeatmap : { ...heatMapGraphData },
        call : []
      }
    }

    componentDidMount = () => {
      const stateItem = this.state;
        //toggle('1');
       console.log('Overview' , stateItem.loginCheck , stateItem.userInfo);
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

    SearchClick = (e) => {
      console.log('Overview SearchClick !!');
      this.setState({  
        searchBtnClick: true
      });
    }

    render(){
      const statesItems = this.state;
      const selectedOptionsBase = [
        { label: 'Total', value: 'social_val01', key: 0 },
        { label: 'Naver_news', value: 'social_val02', key: 1 },
        { label: 'Naver_blog', value: 'social_val03', key: 2 },
      ];
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
      const setSelectedOptions = (val) => {
        this.setState({  
          selectedOptions: val
        }, () => {
          this.setState(prev => ({
            searchCondition : {
              ...prev.searchCondition,
              Selected_Tab : 'IDRATE',
              Selected_Channel : val.value
            }
          }), () => {
            getOverviewIDRate(this.state.searchCondition);
          });
        });
      }
      const getOverviewTotal = (searchCondition) => {
        post('/trendoverview/GetBasic_Overview_Total', searchCondition).
        then((response) => {
            //라인
            let lineSeriesArr = [];
            let lineCategoriesArr = [];
            let lineXArr = [];
            response.data.LineData.map((data) => {
                lineSeriesArr.push(data.Value);
                lineCategoriesArr.push(Number(data.Date.substr(8, 2)));
                lineXArr.push(data.Date);
            });
            
            //히트맵 좌측
            let heatmapData = [];
            searchCondition.Channel_Upper.map((data, i) => {
              heatmapData.push({
                channelCategory: data,
                channel: searchCondition.Channel_Lower[i],
              });
            });

            TableHeatMapData.data = heatmapData;
          
            //히트맵 우측
            let heatmapSeriesData = [];
            let heatmapCategories = [];
            
            searchCondition.Channel_Lower.map((lowerData, i) => {
              let existSameName = false;

              response.data.HeatMapData.map((data, j) => {
                if(lowerData == data.Channel) {
                  let dataArray = [];
                  data.Data.map((res) => {
                    dataArray.push({
                      x: res.Date,
                      y: res.Value
                    });

                    let flag = true;
                    heatmapCategories.map(ress => {
                      if(ress == res.Date)
                        flag = false;
                    });
  
                    if(flag)
                      heatmapCategories.push(res.Date);
                  });

                  heatmapSeriesData.push({
                    name: data.Channel,
                    data: dataArray
                  });

                  existSameName = true;
                }
              });
              
              if(!existSameName) {
                heatmapSeriesData.push({
                  name: lowerData,
                  data: []
                });
              }
            });
  
            this.setState((prev) => ({
                totalGraph : {
                  ...prev.totalGraph,
                  options : {
                    ...prev.totalGraph.options,
                    xaxis: {
                      categories: lineCategoriesArr,
                      title: {
                        text: ''
                      },
                      tooltip: {
                        enabled: false
                      }
                    },
                    tooltip: {
                      x: {
                        formatter: function(value) {
                          return lineXArr[value - 1];
                        }
                      }
                    },
                    legend: {
                      position: 'top',
                      horizontalAlign: 'right',
                      floating: true
                    }
                  },
                  series: [{
                    name : 'total',
                    data : lineSeriesArr
                  }]
                },
                totalHeatmap : {
                  options : {
                    ...prev.totalHeatmap.options,
                    xaxis: {
                      position: 'top',
                      categories: heatmapCategories
                    }
                  },
                  series: heatmapSeriesData.reverse()
                }
            }), () => {
              console.log('ssss : ', this.state.totalHeatmap);
            });
        });
      }

      const getOverviewIDRate = (searchCondition) => {
        post("/trendoverview/GetBasic_Overview_ID_Rate", searchCondition)
        .then((response) => {
          if (response.data.ErrorCode === 'OK') {
            //바
            let barSeriesArr = [];
            let barCategoriesArr = [];
            let barXArr = [];

            response.data.BarData.map((data) => {
              if(this.state.selectedOptions.value == data.Channel) {
                data.Data.map((resData) => {
                  barSeriesArr.push(resData.Value);
                  barCategoriesArr.push(Number(resData.Date.slice(-2)));
                  barXArr.push(resData.Date);
                });
              }
            });

            //히트맵 좌측
            let heatmapData = [];
            searchCondition.Channel_Upper.map((data, i) => {
              heatmapData.push({
                channelCategory: data,
                channel: searchCondition.Channel_Lower[i],
              });
            });

            TableHeatMapData.data = heatmapData;
          
            //히트맵 우측
            let heatmapSeriesData = [];
            let heatmapCategories = [];
            
            searchCondition.Channel_Lower.map((lowerData, i) => {
              let existSameName = false;

              response.data.HeatMapData.map((data, j) => {
                if(lowerData == data.Channel) {
                  let dataArray = [];
                  data.Data.map((res) => {
                    dataArray.push({
                      x: res.Date,
                      y: res.Value
                    });

                    let flag = true;
                    heatmapCategories.map(ress => {
                      if(ress == res.Date)
                        flag = false;
                    });
  
                    if(flag)
                      heatmapCategories.push(res.Date);
                  });

                  heatmapSeriesData.push({
                    name: data.Channel,
                    data: dataArray
                  });

                  existSameName = true;
                }
              });
              
              if(!existSameName) {
                heatmapSeriesData.push({
                  name: lowerData,
                  data: [] 
                });
              }
            });

            this.setState((prev) => ({
              idrateGraph : {
                ...prev.idrateGraph,
                options : {
                  ...prev.idrateGraph.options,
                  xaxis: {
                    categories: barCategoriesArr,
                    title: {
                      text: ''
                    },
                    tooltip: {
                      enabled: false
                    }
                  },
                  tooltip: {
                    x: {
                      formatter: function(value) {
                          return barXArr[value - 1];
                      }
                    }
                  },
                  grid: {
                    yaxis: {
                      lines: {
                        show: false
                      }
                    },
                  },
                  legend: {
                    position: 'top',
                    horizontalAlign: 'right',
                    floating: true
                  }
                },
                series: [{
                    name : 'Cash Flow',
                    data : barSeriesArr
                }]
              },
              idrateHeatmap : {
                options : {
                  ...prev.idrateHeatmap.options,
                  xaxis: {
                    position: 'top',
                    categories: heatmapCategories
                  }
                },
                series: heatmapSeriesData.reverse()
              }
            }), () => {
              console.log('ssssss : ', this.state);
            });
          }
          else{
            console.log('getOverviewIDRate error');
          }
        })
        .catch(function (error) {
            console.log(error);
        });
      }

      /// [Gap] Tap, 라인차트 & 테이블
      const getOverviewGap1 = (searchCondition) => {
        post("/trendoverview/GetBasic_Overview_Gap1", searchCondition)
          .then((response) => {
            if (response.data.ErrorCode === 'OK') {
              console.log("GetBasic_Overview_Gap1", response);

              /// gapTotalSeries
              let gts = [];
              let categories = [];
              /// LineChart
              response.data.LineData.map((dta, i) => {
                let s = {
                  name: '',
                  data: [],
                };
                /// Series Name
                s.name = dta.Channel_Category;
                /// Series Data
                dta.Data.map((dta2, j) => {
                  if (i === 0) {
                    categories.push(dta2.Date);
                  }
                  s.data.push(dta2.Value)
                });
                gts.push(s);
              });

              this.setState(prev => ({
                ...prev,
                gapTotal: {
                  series: gts,
                  options: {
                    xaxis: {
                      categories: categories,
                    }
                  }
                },
                /// 테이블 데이터
                overviewTableData: response.data.TableData,
              }));
            }
            else {
              console.log("GetBasic_Overview_Gap1 Error :", response.data.Message);
            }
            }
          );
      }

      /// [Gap] Tap, 테이블 로우 클릭시 Channel Chart & GAP Chart, Keyword Gap Comparison Chart
      const getOverviewGap2 = (Channel1, Channel2) => {
        console.log("Channel1", Channel1);
        console.log("Channel2", Channel2);
        let sc = this.state.searchCondition;
        sc.Channel1 = Channel1;
        sc.Channel2 = Channel2;

        post("/trendoverview/GetBasic_Overview_Gap2", sc)
          .then((response) => {
            if (response.data.ErrorCode === 'OK') {
              console.log("GetBasic_Overview_Gap2", response);

              /// Channel Chart
              let ccSeries = [];
              let ccCategories = [];
              response.data.ChannelChart.map((dta, i) => {
                let s = {
                  name: '',
                  data: [],
                }
                s.name = dta.Channel;
                dta.Data.map((sDta) => {
                  if (i === 0) {
                    ccCategories.push(sDta.Date);
                  }
                  s.data.push(sDta.Value);
                });
                ccSeries.push(s);
              });

              /// Gap Chart
              let gcSeries = {
                name: '',
                data: [],
              };
              let gcCategories = [];
              response.data.GapChart.map((dta) => {
                gcCategories.push(dta.Date);
                gcSeries.data.push(dta.Value);
              });

              /// Keyword GAP Comparison Chart
              let kgccSeries = [];
              let kgccCategories = [];
              response.data.GapComparison.map((dta, i) => {
                let s = {
                  name: '',
                  type: 'column',
                  data: [],
                }
                s.name = dta.Channel;
                dta.Data.map((sDta) => {
                  if (i === 0) {
                    kgccCategories.push(sDta.Words);
                  }
                  s.data.push(sDta.Value);
                });
                kgccSeries.push(s);
              });

              response.data.GapComparison.map((dta, i) => {
                let s = {
                  name: '',
                  type: 'line',
                  data: [],
                }
                s.name = dta.Channel;
                dta.Data.map((sDta) => {
                  if (i === 0) {
                    kgccCategories.push(sDta.Words);
                  }
                  s.data.push(sDta.Value);
                });
                kgccSeries.push(s);
              });

              this.setState(prev => ({
                ...prev,
                channelChart: {
                  series: ccSeries,
                  options: {
                    xaxis: {
                      categories: ccCategories,
                    }
                  }
                },
                gapChart: {
                  series: [gcSeries],
                  options: {
                    xaxis: {
                      categories: gcCategories,
                    }
                  }
                },
                kgccChart: {
                  series: kgccSeries,
                  options: {
                    xaxis: {
                      categories: kgccCategories,
                    }
                  }
                }
              }));
            }
            else {
              console.log("GetBasic_Overview_Gap2 Error :", response.data.Message);
            }
          });
      }

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
             selectList.push({ label: item.name, value: item.name, channelUp : item.type , key: idx + 1});
           });
        }
        else{
          alert('채널 선택 없음');
          return ;
        }
        statesItems.checkInfo.forEach(item => {
          if (item.isChecked){
            periodUnit = item.value;
          }
        });
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
        });
        //여기서 조회 API 구현하면 됨
        // if (statesItems.activeTab === '1'){
          searchCondition.Selected_Tab = 'Total';
          getOverviewTotal(searchCondition);
        // }
        // else if (statesItems.activeTab === '2'){
          getOverviewIDRate(searchCondition);
        // }
        // else if (statesItems.activeTab === '3'){
          searchCondition.Selected_Tab = 'GAP';
          getOverviewGap1(searchCondition);
        // }

      };

      const toggle = (tab) => {
        const { activeTab } = this.state;
        if(activeTab !== tab){
          if (tab === "1") {
            //차트 초기화
            // TableHeatMapData.data = [];
            // heatMapGraphData.series = [];
          }
          else if (tab === "2"){
            //차트 초기화ya
            // TableHeatMapData.data = [];
            // heatMapGraphData.series = [];
          }
          else if (tab === "3"){
            console.log('GAP');
          }
          this.setState({
              activeTab : tab
          })
        }
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
                                  <ChannelButton searchStart={searchStart} searchBtnClick={statesItems.searchBtnClick} tabAtribute={[true,true,true]}/>                             
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
                          <div>
                              <Nav tabs>
                                  <NavItem>
                                  <NavLink
                                      className={classnames({ active: statesItems.activeTab === '1' })}
                                      onClick={() => { toggle('1'); }}
                                  >
                                      Total
                                  </NavLink>
                                  </NavItem>
                                  <NavItem>
                                      <NavLink
                                          className={classnames({ active: statesItems.activeTab === '2' })}
                                          onClick={() => { toggle('2'); }}
                                      >
                                          I/D RATE
                                      </NavLink>
                                  </NavItem>
                                  <NavItem>
                                      <NavLink
                                          className={classnames({ active: statesItems.activeTab === '3' })}
                                          onClick={() => { toggle('3'); }}
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
                                                      {/* <div className='graph-area Heat-Map mt-5'> */}
                                                        <HeatMap tData={TableHeatMapData.data} options={this.state.totalHeatmap.options} series={this.state.totalHeatmap.series} height={this.state.totalHeatmap.height} />
                                                      {/* </div> */}
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
                                                          onChange={(val) => setSelectedOptions(val)}
                                                          options={statesItems.selectedOptionsBase}
                                                        />
                                                      </FormGroup>
                                                    </div>
                                                    <div className='graph-area negative-chart title-type'>
                                                      <p className='bx_name'>{statesItems.selectedOptions.label}</p>
                                                      <NegativeBar options={statesItems.idrateGraph.options} series={statesItems.idrateGraph.series} height={statesItems.idrateGraph.height} />
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
                                                          <HeatMap tData={TableHeatMapData.data} options={this.state.idrateHeatmap.options} series={this.state.idrateHeatmap.series} height={this.state.idrateHeatmap.height} />
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
                                                    <div className='graph-area'>
                                                        <CompareLine options={statesItems.gapTotal.options} series={statesItems.gapTotal.series} height={gapTotalGraph.height} />
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
                                                                  <tr key={item.No} onClick= { () => { getOverviewGap2(item.Channel1, item.Channel2) } }>
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
                                                            <CompareLine options={statesItems.channelChart.options} series={statesItems.channelChart.series} height={330} />
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
                                                            <CompareLine options={statesItems.gapChart.options} series={statesItems.gapChart.series} height={330} />
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
                                                    <div className='graph-area'>
                                                      <div className='box-title'>
                                                          <h2>Keyword GAP Comparison Chart</h2>
                                                      </div>
                                                      <CompareLine options={statesItems.kgccChart.options} series={statesItems.kgccChart.series} height={330} />
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