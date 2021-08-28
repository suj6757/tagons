/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import { Row,
     Card,
     CardBody,
     Form,
     Button,
     FormGroup,
     Table , 
     Input 
    } from 'reactstrap';
import { Formik, Field } from 'formik';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { ko } from "date-fns/esm/locale";
import { Colxx } from '../../../components/common/CustomBootstrap';
import 'react-datepicker/dist/react-datepicker.css';
import CompareLine from '../../../components/charts/CompareLine';
// import NegativeBar from '../../../components/charts/NegativeBar';
// import HeatMap from '../../../components/charts/HeatMap';
import ChannelButton from '../../../components/applications/ChannelButton'
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import { login, UserInfo, logout } from '../../../services/LoginService';
import axios from 'axios';

class Social extends React.Component {
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
        searchBtnClick : false ,
        searchStart : false , 
        userInfo : userData ,
        loginCheck : loginYN,
        keyWordtext : "" ,   
        keywordSelected : "",
        selectedOptionsBase : [],
        keywordRankHeader :[] ,
        keywordList : [] ,
        channelLower :[] ,
        // eslint-disable-next-line react/no-unused-state
        selectedOptions : {}, //  label: 'Total', value: 'Total', key: 0 
        // eslint-disable-next-line react/no-unused-state
        checkInfo: [
          { id: 1, value: "Daily", isChecked: true },
          { id: 2, value: "Weekly", isChecked: false },
          { id: 3, value: "Monthly", isChecked: false },
          { id: 4, value: "Yearly", isChecked: false }
        ],
        buzzGraph : {
          series: [],
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
                opacity: 0.2
              },
              toolbar: {
                show: false
              }, 
              zoom: {
                enabled: false,
              }
            },
            colors: ['#000'],
            dataLabels: {
              enabled: false,
            },
            markers: {
              size: 10,
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
              tickPlacement: 'between',
            },
            yaxis: {
              show: false
            },

          },
        }, 
        commentGraph : {
           series: [],
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
                opacity: 0.2
              },
              toolbar: {
                show: false
              }, 
              zoom: {
                enabled: false,
              }
            },
            colors: ['#000'],
            dataLabels: {
              enabled: false,
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
              tickPlacement: 'between',
            },
            yaxis: {
              show: false
            },

          },
        }, 
        keywordGraph : {
          series: [],
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
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: '',
              align: 'left'
            },
            grid: {
              show: false,
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
            xaxis: {
              categories: [],
              title: {
                text: ''
              }
            },
            yaxis: {
              title: {
                text: ''
              },
            },
          },
        }, 
      }
    }
    /*
    componentDidMount = () => {
      const stateItem = this.state;
      if (!stateItem.loginCheck){
        document.location.href = "/user/login";
      }
    } */

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
      // console.log(series);
      return series;
    }

    SearchClick = (e) => {
      console.log('Overview SearchClick !!');
      this.setState({  
        searchBtnClick: true
      });
      
    } 
       
    render() {
        const statesItems = this.state;
        /* const selectedOptionsBase = [
          { label: 'Total', value: 'social_val01', key: 0 },
          { label: 'Naver_news', value: 'social_val02', key: 1 },
          { label: 'Naver_blog', value: 'social_val03', key: 2 },
        ]; */
        const setTrendChartData = (chartData, selectValue) => {

          var buzzData = {};
          var buzzMax = 0 ;
          var commentData = {};
          var commentMax = 0 ;
          var buzzSeriesData = {name : selectValue.value ,
                                data : [] ,};
          var buzzCategoryData = [];
          var commentSeriesData = {name : selectValue.value ,
                                data : [] ,};
          var commentCategoryData = [];
          var buzzOption = {
            series: [],
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
                  opacity: 0.2
                },
                toolbar: {
                  show: false
                }, 
                zoom: {
                  enabled: false,
                }
              },
              colors: ['#000'],
              dataLabels: {
                enabled: false,
              },
              markers: {
                size: 0,
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
                tickPlacement: 'between',
              },
              yaxis: {
                show: false
              },

            },
          };
          var commentOption = {
            series: [],
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
                  opacity: 0.2
                },
                toolbar: {
                  show: false
                }, 
                zoom: {
                  enabled: false,
                }
              },
              colors: ['#000'],
              dataLabels: {
                enabled: false,
              },
              markers: {
                size: 0,
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
                tickPlacement: 'between',
              },
              yaxis: {
                show: false
              },

            },
          };
          chartData.buzz.forEach(function(item,idx){
             if (item.Channel === selectValue.value ){
                buzzData = item;
             }
          });

          chartData.comment.forEach(function(item,idx){
            if (item.Channel === selectValue.value ){
                commentData = item;
             }
          });

          buzzData.Data.forEach(function(item,idx){
            buzzSeriesData.data.push(Number(item.value));
            buzzCategoryData.push(item.date.substring(0,10));
            if (buzzMax < Number(item.value)){
              buzzMax = Number(item.value);
            }
          });
          buzzMax += 1;
          commentData.Data.forEach(function(item,idx){
            commentSeriesData.data.push(Number(item.value));
            commentCategoryData.push(item.date.substring(0,10));
            if (commentMax < Number(item.value)){
              commentMax = Number(item.value);
            }
          });
          commentMax += 1;
          buzzOption.series.push(buzzSeriesData);
          buzzOption.options.yaxis.max = buzzMax;
          buzzOption.options.xaxis.categories = buzzCategoryData ;

          commentOption.series.push(commentSeriesData);
          commentOption.options.yaxis.max = commentMax;
          commentOption.options.xaxis.categories = commentCategoryData;
          // console.log('111' , buzzOption ,statesItems.buzzGraph);
          this.setState({
            buzzGraph : buzzOption ,
            commentGraph : commentOption , 
          });

        }
        const setKeywordChart = (ResponseData) => {
          var chartSeries = [] ;
          var Category = [];
          var KeywordGraph = statesItems.keywordGraph;
          var maxnum = 0.0;
          console.log('setKeywordChart',ResponseData);
          chartSeries.push({name:"",data: []});
          ResponseData.Data.forEach(function(item,idx){
            chartSeries[0].data.push(item.TFIDF);
            Category.push(item.date.substring(8,10));
            if (maxnum <  item.TFIDF){
              maxnum = item.TFIDF;
            }
          });

          KeywordGraph.series = chartSeries;
          KeywordGraph.options.xaxis.categories = Category;
          KeywordGraph.options.yaxis.max = Math.ceil(maxnum);
          this.setState({
            keywordGraph : KeywordGraph ,

          });
        }
        //전체 필수 값
        const getKeywordChart = (searchCondition, selectValue) => {
          axios.post("/social/GetSocial_KeywordChart",searchCondition)
          .then((response) => {
              if (response.data.ErrorCode === 'OK'){   
               
                setKeywordChart(response.data); // console.log('getKeywordChart ' , response.data);
                 this.setState({
                  keywordSelected : " - " + searchCondition.Keyword  ,
                 });
              }
              else{
                this.setState({
                  keywordSelected : "" ,
                });
                console.log('getKeywordChart error');
              }
              
          })
          .catch(function (error) {
              console.log(error);
              
          });

        }
        const setKeywordRank = (ResponseData, searchCondition, selectValue) => {
          var header = [];
          var keywordBodyList = [];
          var SearchCondition = searchCondition;
          //console.log('getKeywordRank ' , ResponseData.Data[0] , ResponseData);
          header.push("No");
          ResponseData.Data[0].channel.forEach(function(item,idx){
            header.push(item.name);
          });
          
          ResponseData.Data.forEach(function(item,idx){
            keywordBodyList.push(item);
          });
          // 여기서 가져 오기
          this.setState({
            keywordRankHeader : header ,
            keywordList : keywordBodyList ,
          });
          
          SearchCondition.Keyword=  ResponseData.Data[0].channel[0].Value.substring(0,ResponseData.Data[0].channel[0].Value.indexOf("("));
          console.log('getKeywordRank ' , SearchCondition);
          getKeywordChart(SearchCondition, selectValue) ;
  
        }
        // 전체 필수 값
        const getKeywordRank = (searchCondition, selectValue) => {

          axios.post("/social/GetSocial_KeywordRank",searchCondition)
          .then((response) => {
              if (response.data.ErrorCode === 'OK'){    
                setKeywordRank(response.data,searchCondition, selectValue);
                
              }
              else{
                console.log('getKeywordRank error');
              }
              
          })
          .catch(function (error) {
              console.log(error);
             
          });

        }
        // 전체 필수 값
        const getTrendChartData = (searchCondition, selectValue) => {
          axios.post("/social/GetSocial_TrendChart",searchCondition)
          .then((response) => {
              if (response.data.ErrorCode === 'OK'){    
                // console.log('getTrendChartData ' , response.data );
                setTrendChartData(response.data,selectValue);
                getKeywordRank(searchCondition,selectValue);
              }
              else{
                console.log('getTrendChartData error');
              }
              
          })
          .catch(function (error) {
              console.log(error);
              
          });

        }
        
        
        const getSocialData = (searchCondition , selectValue) => {
          // console.log('getSocialData -> ' , searchCondition );  
          getTrendChartData(searchCondition, selectValue);
          // getKeywordRank(searchCondition);
          // getKeywordChart(searchCondition);

        }

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
      
      const setSelectedOptions = (val) => {
        var channelList = [] ;
        var searchCondition = statesItems.searchCondition;
        
        if (val.label === 'Total'){
          channelList = statesItems.channelLower;
        }
        else{
          channelList.push(val.value);
        }
        
        searchCondition.Channel = channelList;
        this.setState({  
          selectedOptions: val ,
        }); 
        console.log("setSelectedOptions " , val , searchCondition);
        getSocialData(searchCondition, val);
        
      }
      const validateKeyword = (value) => {
          let error;
          if (!statesItems.keyWordtext) {
            error = 'No Keywords';
          } 
          return error;
      };
      const onKeywordChange = (e) =>{
        this.setState({
          keyWordtext : e.target.value
        }); 
      };
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
          channelLower : [],
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
          alert('채널을 선텍히야 주세요');
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
        
        if (statesItems.keyWordtext === ''){
          alert('Keywords를 입력하세요.');
          return ;
        }

        searchCondition.FromDate = dateString(statesItems.startDate); 
        searchCondition.ToDate = dateString(statesItems.endDate); 
        searchCondition.Period_Unit = periodUnit;
        searchCondition.Channel = ChannelLower;
        searchCondition.Keyword = statesItems.keyWordtext;
        getSocialData(searchCondition , { label: 'Total', value: 'Total' , channelUp : "Total" , key: 0 } );
        this.setState({  
          searchCondition: searchCondition ,
          searchStart : true , 
          selectedOptions: { label: 'Total', value: 'Total' , channelUp : "Total" , key: 0 } ,
          channelLower : ChannelLower,
        });
      }; 

      const keyWordClick = (clickItem) => {
        var SearchCondition = statesItems.searchCondition ;
        // console.log('keyWordClick -> ' , clickItem.Value.substring(0,clickItem.Value.indexOf("(")) , clickItem.Value);
        SearchCondition.Keyword= clickItem.Value.substring(0,clickItem.Value.indexOf("("));
        console.log('keyWordClick -> ' , SearchCondition);
        getKeywordChart(SearchCondition,clickItem.Value.substring(0,clickItem.Value.indexOf("(")));
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
                                      <td style={{ width:'35%' }} >
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
                                      <ChannelButton searchStart={searchStart} searchBtnClick={statesItems.searchBtnClick} tabAtribute={[true,true,true]} />                             
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
                              <Button className="btn-xl mt-4" color="gray" onClick={this.SearchClick} >
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
                              <div className='bx_select_area'>
                                <h2>Social Trend Chart  </h2>
                              </div>
                              <div className='bx_select_area'>
                                
                                  <FormGroup className="select-box">
                                      <Select
                                      components={{ Input: CustomSelectInput }}
                                      className="react-select"
                                      classNamePrefix="react-select"
                                      name="form-field-name"
                                      onChange={(val) => setSelectedOptions(val)}
                                      options={statesItems.selectedOptionsBase}
                                      value={statesItems.selectedOptions}
                                      />
                                  </FormGroup>
                                  <p className='cont-noti small'>단위: 건</p>
                              </div>
                              <div className='clearfix box-line'>
                                  <div className='box left'>
                                        <div className="graph-area chart_area">
                                          <div className='chart-header'>
                                                <p className='bx_name'>Buzz</p>
                                          </div>
                                          <div className='chart-cont'>
                                              <CompareLine options={statesItems.buzzGraph.options} series={statesItems.buzzGraph.series} height={statesItems.buzzGraph.height} />
                                          </div>
                                      </div>      
                                  </div>
                                  <div className='box right'>
                                        <div className="graph-area chart_area">
                                          <div className='chart-header'>
                                              <p className='bx_name'>Comment</p>
                                          </div>
                                          <div className='chart-cont'>
                                              <CompareLine options={statesItems.commentGraph.options} series={statesItems.commentGraph.series} height={statesItems.commentGraph.height} />
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
                            <Table bordered>
                              <thead>
                                <tr>
                                  { statesItems.keywordRankHeader.map(items => {
                                    return(
                                      <th>{items}</th>   
                                  )})}
                                  
                                </tr>
                              </thead>
                              <tbody>
                                {statesItems.keywordList.map(items => {
                                    return(
                                      <tr>
                                        <td>{items.Rank}</td>
                                        {items.channel.map(item =>{
                                          return (
                                            <td  onClick={keyWordClick.bind(this,item)} style={{color: (item.Value.indexOf('▲')>0)?'#ff0000':(item.Value.indexOf('▼')>0)?'#0070c0':'#000000'}} >{item.Value}</td>
                                          )})}
                                      </tr>   
                                 )})}
                              </tbody>
                            </Table>    
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
                                  <h2>Social Keyword Chart {statesItems.keywordSelected} </h2>
                              </div>
                                <div className='chart-cont'>
                                    <p className='cont-noti small mt-5'>단위: 건</p>
                                    <CompareLine options={statesItems.keywordGraph.options} series={statesItems.keywordGraph.series} height={statesItems.keywordGraph.height} />
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

export default Social;