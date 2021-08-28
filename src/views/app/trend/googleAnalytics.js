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
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Row, Card, CardBody, Form, Button, FormGroup, Input, Nav, NavLink, NavItem, TabContent, TabPane, } from 'reactstrap';
import classnames from 'classnames';
import { Formik, Field } from 'formik';
import Select from 'react-select';
import { Colxx } from '../../../components/common/CustomBootstrap';
import {ReactTable} from '../../../containers/ui/ReactTableCards';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import CompareBar from '../../../components/charts/CompareBar';
import CompareLine from '../../../components/charts/CompareLine';
import { TableData } from './data';
import { login, UserInfo, logout } from '../../../services/LoginService';
import axios from 'axios';
// eslint-disable-next-line react/prefer-stateless-function
class GoogleAnalytics extends React.Component {
  
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행
    let loginYN = (UserInfo() !== null);
    let userData = UserInfo();
    this.state = {
      activeId: 1,
      listActiveId: 1,
      selectedOptions: null,
      activeTab: '1',
      keyWordtext :'',
      userInfo : userData ,
      loginCheck : loginYN,
      internalIndexSelected : {},
      externalSelected : {}, 
      UsersSessionsSeries: [] ,
      ConversionBounceRateSeries : [] ,
      checkInfo: [
        { id: 1, value: "1Month", view : "1 Month",isChecked: true },
        { id: 2, value: "3Months", view: "3 Months", isChecked: false },
        { id: 3, value: "6Months", view: "6 Months",isChecked: false },
        { id: 4, value: "12Months", view: "12 Months",isChecked: false }
      ],   
      chartDataArray : [] ,  
      AnalysisChartArray : [],
      GASocialComparison : {
        CategoryData : [] ,
        UsersData : [] , 
        SessionsData : [] ,  
        ConversionRateData : [] ,
        BounceRateData : [] , 
        BuzzData : [] , 
        SearchVolumeData : [] , 
        ProductsData : [] ,
      } ,
      TableDataSocial : [],
      columns : [
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
    ],
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
            enabled: false,
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
          height: 250,
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
              horizontalAlign: 'right', 
            },
            colors: ['#4e4f4f','#b9b9b9'],
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
      bounceOpt :{}, 
      conversionOpt :{},
      inflowOpt :{},
      mostVisitedPageOpt :{},
      bounceSeries :[], 
      conversionSeries :[],
      inflowSeries :[],
      mostVisitedPageSeries :[],
      GaUserBarGenOpt :{}, 
      GaUserBarAgeOpt :{}, 
      GaUserBarDeviceOpt :{}, 
      GaUserBarRegionOpt :{}, 
      GaUserBarGenSeries :[],
      GaUserAgeGenSeries :[],
      GaUserAgeDeviceSeries :[],
      GaUserAgeRegionSeries :[],      
      keywordGap : {
        series: [
          {
            name: "Source1",
            data: [0.77, 0.88, 0.99, 0.12, 0.56, 0.41, 0.42, 0.44, 0.55, 0.66, 0.55, 0.11, 0.12, 0.13, 0.15, 0.46, 0.79, 0.53, 0.12, 0.86, 0.77, 0.2, 0.55, 0.44]
          },
          {
            name: "Source2",
            data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
          },
          {
            name: "Source3",
            data: [0.77, 0.88, 0.99, 0.11, 0.12, 0.34, 0.56, 0.4, 0.56, 0.41, 0.42, 0.44, 0.55, 0.66, 0.77, 0.99, 0.11, 0.55, 0.11, 0.86, 0.77, 0.2, 0.55, 0.44]
          },
          {
            name: "Source4",
            data: [0.77, 0.8, 0.55, 0.22, 0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.74, 0.45]
          },
        ],
          height: 350,
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
              position: 'right',
              horizontalAlign: 'right', 
            },
            colors: ['#404141','#ed7d31','#a4a4a4','#ffc000'],
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
            grid: {
              show: true,
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
    
      GaAnalysisOption : {options: {
          chart: {
            width: '45%',
            redrawOnParentResize: true,
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false
            },
          },
          legend: {
            show: false,
          },
          fill: {
            colors: ['#8faadc' ,'#fb9874'],
          },
          plotOptions: {
            bar: {
              columnWidth: '45%',
              distributed: true,
            }
          },
          grid: {
            show: false,
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            categories: ['Male', 'Female',],
            labels: {
              style: {
                colors: ['#8faadc' ,'#fb9874'],
                fontSize: '12px'
              }
            },
            title : {
              text : '',
              offsetX: 100,
              offsetY: 0,
              style: {
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-title',
              },
            }
          },
          yaxis: {
            axisTicks: {
              show: false
            },
            axisBorder: {
              show: true,
            },
            title : {
              text: '',
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
          },
        },
        series: []
      },


    };

  }

  componentDidMount = () => {
    const stateItem = this.state;
    if (!stateItem.loginCheck){
      document.location.href = "/user/login";
    }
  }


  tabToggle = (tab) => {
    const activeTab = this.state;
    
    if ( activeTab !== tab) {
      this.setState({ activeTab: tab });
    }
  }

  listClickEvt = (evt) => {
    evt.preventDefault();
    const getNum = Number(evt.currentTarget.className.replace('item-',''));

    this.setState({
      activeId : getNum,
    });
  }

  analysisClickEvt = (evt) => {
    evt.preventDefault();
    const getNum = Number(evt.currentTarget.className.replace('analysis-item-',''));

    this.setState({
      listActiveId: getNum,
    });
  }

  
  
 

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

  render() {
    const statesChart = this.state;
    const statesItems = this.state;
    // const { internalIndexSelected , externalSelected } = this.state;
    const internalIndex = [
      { label: 'Users', value: 'Users', key: 0 },
      { label: 'Sessions', value: 'Sessions', key: 1 },
      { label: 'Conversion Rate', value: 'Conversion', key: 2 },
      { label: 'Bounce Rate', value: 'Bounce', key: 3 },
    ];

    const externalIndex = [
      { label: 'Buzz', value: 'Buzz', key: 0 },
      { label: 'Num of Product', value: 'Product', key: 1 },
      { label: 'Search Volume', value: 'SearchVolume', key: 2 },
    ]; 

    const indiCont = [
      {id: 1, title :  'Users',},
      {id: 2, title :  'Sessions',},
      {id: 3, title :  'Conversion',},
      {id: 4, title :  'Bounce',},
    ]

    const initDemoAnalysis = [
      {id: 1, title :  'Gender',},
      {id: 2, title :  'Ages',},
      {id: 3, title :  'Device',},
      {id: 4, title :  'Region',},
    ]

    const validateKeyword = (value) => {
      let error;
      if (!statesItems.keyWordtext) {
        error = 'No Keywords';
      } 
      return error;
    }

    const onKeywordChange = (e) =>{
      
      this.setState({
        keyWordtext : e.target.value
      }); 
    };

    const inchangeOption = (...args) => {
      var tableData = [];
      var data1 = 0 ;
      var data2 = 0 ;
      //const statesItems = this.state ;

      var Columns = JSON.parse(JSON.stringify(statesItems.columns));
      Columns[2].Header = args[0].label;
     
      
      if (statesItems.TableDataSocial.length > 0){
        statesItems.GASocialComparison.CategoryData.forEach(function(item,idx){
          if (args[0].value === "Users"){
            data1 = statesItems.GASocialComparison.UsersData[idx];
          }
          else if (args[0].value === "Sessions"){
            data1 = statesItems.GASocialComparison.SessionsData[idx];
          }
          else if (args[0].value === "Conversion"){
            data1 = statesItems.GASocialComparison.ConversionRateData[idx];
          }
          else if (args[0].value === "Bounce"){
            data1 = statesItems.GASocialComparison.BounceRateData[idx];
          }

          if (statesItems.externalSelected.value === "Buzz"){
            data2 = statesItems.GASocialComparison.BuzzData[idx];
          }
          else if (statesItems.externalSelected.value === "Product"){
            data2 = statesItems.GASocialComparison.ProductsData[idx];
          }
          else if (statesItems.externalSelected.value === "SearchVolume"){
            data2 = statesItems.GASocialComparison.SearchVolumeData[idx];
          }
          tableData.push({id:idx + 1 , title:item , purchase : data1, satisfaction:data2,});
        }); 
      }
      this.setState({
        internalIndexSelected: args[0],
        externalSelected : statesItems.externalSelected , 
        TableDataSocial: tableData ,
        columns : Columns ,  
      });

    }

    const exchangeOption = (...args) => {
      var tableData = [];
      var data1 = 0 ;
      var data2 = 0 ;
      // const statesItems = this.state ;
      var Columns = JSON.parse(JSON.stringify(statesItems.columns));
      Columns[3].Header = args[0].label;

      //console.log('exchangeOption',Columns1 , statesItems.internalIndexSelected );
      //console.log('exchangeOption',args[0], statesItems.internalIndexSelected ,statesItems.GASocialComparison);
      if (statesItems.TableDataSocial.length > 0){
        statesItems.GASocialComparison.CategoryData.forEach(function(item,idx){
          if (statesItems.internalIndexSelected.value === "Users"){
            data1 = statesItems.GASocialComparison.UsersData[idx];
          }
          else if (statesItems.internalIndexSelected.value === "Sessions"){
            data1 = statesItems.GASocialComparison.SessionsData[idx];
          }
          else if (statesItems.internalIndexSelected.value === "Conversion"){
            data1 = statesItems.GASocialComparison.ConversionRateData[idx];
          }
          else if (statesItems.internalIndexSelected.value === "Bounce"){
            data1 = statesItems.GASocialComparison.BounceRateData[idx];
          }

          if (args[0].value === "Buzz"){
            data2 = statesItems.GASocialComparison.BuzzData[idx];
          }
          else if (args[0].value === "Product"){
            data2 = statesItems.GASocialComparison.ProductsData[idx];
          }
          else if (args[0].value === "SearchVolume"){
            data2 = statesItems.GASocialComparison.SearchVolumeData[idx];
          }
          console.log('exchangeOption' , statesItems.internalIndexSelected.value  , data1 , args[0].value , data2 );
          tableData.push({id:idx + 1 , title:item , purchase : data1, satisfaction:data2,});
        });
      }

      this.setState({
        externalSelected: args[0],
        internalIndexSelected : statesItems.internalIndexSelected,
        TableDataSocial: tableData ,
        columns : Columns ,  
      });
     
    }

    /*  Start LJJ*/
    const setGAUserIndicatorsBar = (recvData) => {

      var gaUserBarGenOpt = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var gaUserBarAgeOpt = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var gaUserBarDeviceOpt = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var gaUserBarRegionOpt = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      
      var gaUserBarGenSeries = [{data: [recvData.gender.Male, recvData.gender.Female], title: 'Users',}];
      var gaUserAgeGenSeries = [{data: [recvData.age._18and24, recvData.age._24and34,recvData.age._35and44,recvData.age._45and54,recvData.age._55and64,recvData.age._65plus], title: 'Users',}];
      var gaUserAgeDeviceSeries = [{data: [recvData.device_category.Desktop, recvData.device_category.Mobile,recvData.device_category.Tablet,], title: 'Users',}];
      var gaUserAgeRegionSeries = [{data: [recvData.region.Region1, recvData.region.Region2,recvData.region.Region3,recvData.region.Region4,recvData.region.Region5,], title: 'Users',}];

      gaUserBarGenOpt.options.xaxis.categories = ['Male', 'Female',];
      gaUserBarGenOpt.options.xaxis.title.text = '성별';
      gaUserBarGenOpt.options.yaxis.title.text = 'Users';

      gaUserBarAgeOpt.options.xaxis.categories =  ['10s','20s','30s','40s','50s','60+',];
      gaUserBarAgeOpt.options.xaxis.title.text = '연령';
      gaUserBarAgeOpt.options.yaxis.title.text = 'Users';
 
      gaUserBarDeviceOpt.options.xaxis.categories =   ['Desktop','Mobile','Tablet',];
      gaUserBarDeviceOpt.options.xaxis.title.text = '디바이스';
      gaUserBarDeviceOpt.options.yaxis.title.text = 'Users';

      gaUserBarRegionOpt.options.xaxis.categories =  recvData.region.Regions;
      gaUserBarRegionOpt.options.xaxis.title.text = '지역';
      gaUserBarRegionOpt.options.yaxis.title.text = 'Users';

      this.setState({
        GaUserBarGenOpt : gaUserBarGenOpt.options,
        GaUserBarAgeOpt : gaUserBarAgeOpt.options,
        GaUserBarDeviceOpt : gaUserBarDeviceOpt.options ,
        GaUserBarRegionOpt : gaUserBarRegionOpt.options , 
        GaUserBarGenSeries : gaUserBarGenSeries ,
        GaUserAgeGenSeries : gaUserAgeGenSeries ,
        GaUserAgeDeviceSeries : gaUserAgeDeviceSeries ,
        GaUserAgeRegionSeries : gaUserAgeRegionSeries ,
      }); 
    }
    
    const setGAUserIndicatorsLine = (recvData) => {
      var inflowDataopt = JSON.parse(JSON.stringify(statesItems.keywordGap.options));
      var bounceopt = JSON.parse(JSON.stringify(statesItems.keywordGap.options));
      var mostVisitedPageopt = JSON.parse(JSON.stringify(statesItems.keywordGap.options));
      var conversionopt = JSON.parse(JSON.stringify(statesItems.keywordGap.options));
      var bounceseries = [];
      var conversionseries = [];
      var inflowseries = [];
      var mostVisitedPageseries = [];
      var inflowLine = [];
      var inflowCategory = [];
      var inflowSource1 = {name:"Source1" ,data:[], };
      var inflowSource2 = {name:"Source2" ,data:[], };
      var inflowSource3 = {name:"Source3" ,data:[], };
      var inflowSource4 = {name:"Source4" ,data:[], };

      var bounceLine = [];
      var bounceCategory = [];
      var bounceSource1 = {name:"Source1" ,data:[], };
      var bounceSource2 = {name:"Source2" ,data:[], };
      var bounceSource3 = {name:"Source3" ,data:[], };
      var bounceSource4 = {name:"Source4" ,data:[], };

      var mostVisitedPageLine = [];
      var mostVisitedPageCategory = [];
      var mostVisitedPageSource1 = {name:"Source1" ,data:[], };
      var mostVisitedPageSource2 = {name:"Source2" ,data:[], };
      var mostVisitedPageSource3 = {name:"Source3" ,data:[], };
      var mostVisitedPageSource4 = {name:"Source4" ,data:[], };

      var conversionLine = [];
      var conversionCategory = [];
      var conversionSource1 = {name:"Source1" ,data:[], };
      var conversionSource2 = {name:"Source2" ,data:[], };
      var conversionSource3 = {name:"Source3" ,data:[], };

      recvData.inflow.forEach(function(item,idx){
        inflowSource1.data.push(item.legend1);
        inflowSource2.data.push(item.legend2);
        inflowSource3.data.push(item.legend3);
        inflowSource4.data.push(item.legend4);
        inflowCategory.push(item.Date.substring(8,10));
      });
      inflowSource1.name = recvData.legend_names.inflow_names[0] ;
      inflowSource2.name = recvData.legend_names.inflow_names[1] ;
      inflowSource3.name = recvData.legend_names.inflow_names[2] ;
      inflowSource4.name = recvData.legend_names.inflow_names[3] ;

      recvData.bounce.forEach(function(item,idx){
        bounceSource1.data.push(item.legend1);
        bounceSource2.data.push(item.legend2);
        bounceSource3.data.push(item.legend3);
        bounceSource4.data.push(item.legend4);
        bounceCategory.push(item.Date.substring(8,10));
      });
      bounceSource1.name = recvData.legend_names.bounce_names[0] ;
      bounceSource2.name = recvData.legend_names.bounce_names[1] ;
      bounceSource3.name = recvData.legend_names.bounce_names[2] ;
      bounceSource4.name = recvData.legend_names.bounce_names[3] ;

      recvData.mostVisitedPage.forEach(function(item,idx){
        mostVisitedPageSource1.data.push(item.legend1);
        mostVisitedPageSource2.data.push(item.legend2);
        mostVisitedPageSource3.data.push(item.legend3);
        mostVisitedPageSource4.data.push(item.legend4);
        mostVisitedPageCategory.push(item.Date.substring(8,10));
      });
      mostVisitedPageSource1.name = recvData.legend_names.mvp_names[0];
      mostVisitedPageSource2.name = recvData.legend_names.mvp_names[1];
      mostVisitedPageSource3.name = recvData.legend_names.mvp_names[2];
      mostVisitedPageSource4.name = recvData.legend_names.mvp_names[3];

      recvData.conversion.forEach(function(item,idx){
        conversionSource1.data.push(item.legend1);
        conversionSource2.data.push(item.legend2);
        conversionSource3.data.push(item.legend3);
        conversionCategory.push(item.Date.substring(8,10));
      });
      conversionSource1.name = recvData.legend_names.conversion_names[0];
      conversionSource2.name = recvData.legend_names.conversion_names[1];
      conversionSource3.name = recvData.legend_names.conversion_names[2];

      inflowseries.push(inflowSource1);
      inflowseries.push(inflowSource2);
      inflowseries.push(inflowSource3);
      inflowseries.push(inflowSource4);
      bounceseries.push(bounceSource1);
      bounceseries.push(bounceSource2);
      bounceseries.push(bounceSource3);
      bounceseries.push(bounceSource4);
      mostVisitedPageseries.push(mostVisitedPageSource1);
      mostVisitedPageseries.push(mostVisitedPageSource2);
      mostVisitedPageseries.push(mostVisitedPageSource3);
      mostVisitedPageseries.push(mostVisitedPageSource4);
      conversionseries.push(conversionSource1);
      conversionseries.push(conversionSource2);
      conversionseries.push(conversionSource3);
      

      inflowDataopt.xaxis.categories = inflowCategory;
      bounceopt.xaxis.categories = bounceCategory;
      mostVisitedPageopt.xaxis.categories = mostVisitedPageCategory;
      conversionopt.xaxis.categories = conversionCategory;
      this.setState({
        bounceOpt : bounceopt,
        conversionOpt : conversionopt,
        inflowOpt : inflowDataopt ,
        mostVisitedPageOpt : mostVisitedPageopt, 
        bounceSeries  : bounceseries,
        conversionSeries  : conversionseries ,
        inflowSeries  : inflowseries,
        mostVisitedPageSeries  : mostVisitedPageseries, 
      });
    }
    
    const setGABoardTrend = (recvData) => {
      var UserChartData = {name:"User", data : [] ,};
      var SessionsChartData = {name:"Sessions",data : [] ,};
      var ConversionChartData = {name:"Conversion", data : [] ,};
      var BounceChartData = {name:"Bounce",data : [] ,};
      var userSessionData = [];
      var conversionBounceData = [];
      var category = [];
      recvData.items.forEach(function(item,idx){
        category.push(item.Date.substring(8,11));
        UserChartData.data.push(item.Users);
        SessionsChartData.data.push(item.Sessions);
        ConversionChartData.data.push(item.Conversion_Rate);
        BounceChartData.data.push(item.Bounce_Rate);
      });
      userSessionData.push(UserChartData);
      userSessionData.push(SessionsChartData);
      conversionBounceData.push(ConversionChartData);
      conversionBounceData.push(BounceChartData);
      this.setState({
        UsersSessionsSeries : userSessionData,
        ConversionBounceRateSeries : conversionBounceData,
      });
      this.setState(prev =>({  
        ...prev,
        totalGraph : {
          options : {
            xaxis : {
              categories: category,
            }
          }
        },              
      }));
    }

    const setGADemographicsAnalysis = (recvData) => {
      var analysisChartArr = [];

      var Genders = ['Male', 'Female',];
      var genderUserSeries = [{data: [recvData.gender.Users.Male, recvData.gender.Users.Female], title: 'Users',}];
      var genderSessionsSeries = [{data: [recvData.gender.Sessions.Male, recvData.gender.Sessions.Female], title: 'Sessions'}];
      var genderConversionSeries = [{data: [recvData.gender.Conversion_Rate.Male, recvData.gender.Conversion_Rate.Female], title: 'Conversion', }];
      var genderBounceSeries = [{data: [recvData.gender.Bounce_Rate.Male, recvData.gender.Bounce_Rate.Female], title: 'Bounce', }];

      var Ages = ['10s','20s','30s','40s','50s','60+',];
      var ageUserSeries = [{data: [recvData.age.Users._18and24, recvData.age.Users._24and34,recvData.age.Users._35and44,recvData.age.Users._45and54,recvData.age.Users._55and64,recvData.age.Users._65plus], title: 'Users',}];
      var ageSessionsSeries = [{data: [recvData.age.Sessions._18and24, recvData.age.Sessions._24and34,recvData.age.Sessions._35and44,recvData.age.Sessions._45and54,recvData.age.Sessions._55and64,recvData.age.Sessions._65plus], title: 'Sessions'}];
      var ageConversionSeries = [{data: [recvData.age.Conversion_Rate._18and24, recvData.age.Conversion_Rate._24and34,recvData.age.Conversion_Rate._35and44,recvData.age.Conversion_Rate._45and54,recvData.age.Conversion_Rate._55and64,recvData.age.Conversion_Rate._65plus], title: 'Conversion', }];
      var ageBounceSeries = [{data: [recvData.age.Bounce_Rate._18and24, recvData.age.Bounce_Rate._24and34,recvData.age.Bounce_Rate._35and44,recvData.age.Bounce_Rate._45and54,recvData.age.Bounce_Rate._55and64,recvData.age.Bounce_Rate._65plus], title: 'Bounce', }];

      var Devices = ['Desktop','Mobile','Tablet',];
      var deviceUserSeries = [{data: [recvData.device_category.Users.Desktop, recvData.device_category.Users.Mobile,recvData.device_category.Users.Tablet,], title: 'Users',}];
      var deviceSessionsSeries = [{data: [recvData.device_category.Sessions.Desktop, recvData.device_category.Sessions.Mobile,recvData.device_category.Sessions.Tablet,], title: 'Sessions'}];
      var deviceConversionSeries = [{data: [recvData.device_category.Conversion_Rate.Desktop, recvData.device_category.Conversion_Rate.Mobile,recvData.device_category.Conversion_Rate.Tablet,], title: 'Conversion', }];
      var deviceBounceSeries = [{data: [recvData.device_category.Bounce_Rate.Desktop, recvData.device_category.Bounce_Rate.Mobile,recvData.device_category.Bounce_Rate.Tablet,], title: 'Bounce', }];

      var Regions = recvData.region.Regions;
      var regionUserSeries = [{data: [recvData.region.Users.Region1, recvData.region.Users.Region2,recvData.region.Users.Region3,recvData.region.Users.Region4,recvData.region.Users.Region5,], title: 'Users',}];
      var regionSessionsSeries = [{data: [recvData.region.Sessions.Region1, recvData.region.Sessions.Region2,recvData.region.Sessions.Region3,recvData.region.Sessions.Region4,recvData.region.Sessions.Region5,], title: 'Sessions'}];
      var regionConversionSeries = [{data: [recvData.region.Conversion_Rate.Region1, recvData.region.Conversion_Rate.Region2,recvData.region.Conversion_Rate.Region3,recvData.region.Conversion_Rate.Region4,recvData.region.Conversion_Rate.Region5,], title: 'Conversion', }];
      var regionBounceSeries = [{data: [recvData.region.Bounce_Rate.Region1, recvData.region.Bounce_Rate.Region2,recvData.region.Bounce_Rate.Region3,recvData.region.Bounce_Rate.Region4,recvData.region.Bounce_Rate.Region5,], title: 'Bounce', }];

      var genderChartDataDemo = [];
      var genderChartDataopt1 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var genderChartDataopt2 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var genderChartDataopt3 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var genderChartDataopt4 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));

      var agesChartDataDemo = [];
      var agesChartDataopt1 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var agesChartDataopt2 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var agesChartDataopt3 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var agesChartDataopt4 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));

      var devicesChartDataDemo = [];
      var devicesChartDataopt1 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var devicesChartDataopt2 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var devicesChartDataopt3 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var devicesChartDataopt4 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));

      var regionChartDataDemo = [];
      var regionChartDataopt1 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var regionChartDataopt2 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var regionChartDataopt3 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));
      var regionChartDataopt4 = JSON.parse(JSON.stringify(statesItems.GaAnalysisOption));

      genderChartDataopt1.options.xaxis.categories = Genders;
      genderChartDataopt1.options.xaxis.title.text = '성별';
      genderChartDataopt1.options.yaxis.title.text = 'Users';
      genderChartDataopt1.series = genderUserSeries;

      genderChartDataopt2.options.xaxis.categories = Genders;
      genderChartDataopt2.options.xaxis.title.text = '성별';
      genderChartDataopt2.options.yaxis.title.text = 'Sessions';
      genderChartDataopt2.series = genderSessionsSeries;

      genderChartDataopt3.options.xaxis.categories = Genders;
      genderChartDataopt3.options.xaxis.title.text = '성별';
      genderChartDataopt3.options.yaxis.title.text = 'Conversion';
      genderChartDataopt3.series = genderConversionSeries;

      genderChartDataopt4.options.xaxis.categories = Genders;
      genderChartDataopt4.options.xaxis.title.text = '성별';
      genderChartDataopt4.options.yaxis.title.text = 'Bounce';
      genderChartDataopt4.series = genderBounceSeries;
      
      genderChartDataDemo.push(genderChartDataopt1);
      genderChartDataDemo.push(genderChartDataopt2);
      genderChartDataDemo.push(genderChartDataopt3);
      genderChartDataDemo.push(genderChartDataopt4);

      agesChartDataopt1.options.xaxis.categories = Ages;
      agesChartDataopt1.options.xaxis.title.text = '';
      agesChartDataopt1.options.yaxis.title.text = 'Users';
      agesChartDataopt1.series = ageUserSeries;

      agesChartDataopt2.options.xaxis.categories = Ages;
      agesChartDataopt2.options.xaxis.title.text = '';
      agesChartDataopt2.options.yaxis.title.text = 'Sessions';
      agesChartDataopt2.series = ageSessionsSeries;

      agesChartDataopt3.options.xaxis.categories = Ages;
      agesChartDataopt3.options.xaxis.title.text = '';
      agesChartDataopt3.options.yaxis.title.text = 'Conversion';
      agesChartDataopt3.series = ageConversionSeries;

      agesChartDataopt4.options.xaxis.categories = Ages;
      agesChartDataopt4.options.xaxis.title.text = '';
      agesChartDataopt4.options.yaxis.title.text = 'Bounce';
      agesChartDataopt4.series = ageBounceSeries;

      agesChartDataDemo.push(agesChartDataopt1);
      agesChartDataDemo.push(agesChartDataopt2);
      agesChartDataDemo.push(agesChartDataopt3);
      agesChartDataDemo.push(agesChartDataopt4);


      devicesChartDataopt1.options.xaxis.categories = Devices;
      devicesChartDataopt1.options.xaxis.title.text = '';
      devicesChartDataopt1.options.yaxis.title.text = 'Users';
      devicesChartDataopt1.series = deviceUserSeries;

      devicesChartDataopt2.options.xaxis.categories = Devices;
      devicesChartDataopt2.options.xaxis.title.text = '';
      devicesChartDataopt2.options.yaxis.title.text = 'Sessions';
      devicesChartDataopt2.series = deviceSessionsSeries;

      devicesChartDataopt3.options.xaxis.categories = Devices;
      devicesChartDataopt3.options.xaxis.title.text = '';
      devicesChartDataopt3.options.yaxis.title.text = 'Conversion';
      devicesChartDataopt3.series = deviceConversionSeries;

      devicesChartDataopt4.options.xaxis.categories = Devices;
      devicesChartDataopt4.options.xaxis.title.text = '';
      devicesChartDataopt4.options.yaxis.title.text = 'Bounce';
      devicesChartDataopt4.series = deviceBounceSeries;

      devicesChartDataDemo.push(devicesChartDataopt1);
      devicesChartDataDemo.push(devicesChartDataopt2);
      devicesChartDataDemo.push(devicesChartDataopt3);
      devicesChartDataDemo.push(devicesChartDataopt4);


      regionChartDataopt1.options.xaxis.categories = Regions;
      regionChartDataopt1.options.xaxis.title.text = '';
      regionChartDataopt1.options.yaxis.title.text = 'Users';
      regionChartDataopt1.series = regionUserSeries;

      regionChartDataopt2.options.xaxis.categories = Regions;
      regionChartDataopt2.options.xaxis.title.text = '';
      regionChartDataopt2.options.yaxis.title.text = 'Sessions';
      regionChartDataopt2.series = regionSessionsSeries;

      regionChartDataopt3.options.xaxis.categories = Regions;
      regionChartDataopt3.options.xaxis.title.text = '';
      regionChartDataopt3.options.yaxis.title.text = 'Conversion';
      regionChartDataopt3.series = regionConversionSeries;

      regionChartDataopt4.options.xaxis.categories = Regions;
      regionChartDataopt4.options.xaxis.title.text = '';
      regionChartDataopt4.options.yaxis.title.text = 'Bounce';
      regionChartDataopt4.series = regionBounceSeries;

      regionChartDataDemo.push(regionChartDataopt1);
      regionChartDataDemo.push(regionChartDataopt2);
      regionChartDataDemo.push(regionChartDataopt3);
      regionChartDataDemo.push(regionChartDataopt4);

      analysisChartArr.push(genderChartDataDemo);
      analysisChartArr.push(agesChartDataDemo);
      analysisChartArr.push(devicesChartDataDemo);
      analysisChartArr.push(regionChartDataDemo);
      console.log('setGADemographicsAnalysis',analysisChartArr);
      this.setState({  
        AnalysisChartArray : analysisChartArr ,
      }); 
     
    }

    const setGASocialComparison = (recvData) => {
      var category = [];
      var Users = [];
      var Sessions = [];
      var ConversionRate = [];
      var BounceRate = [];
      var Buzz = [];
      var SearchVolume = [];
      var Products = [];
      var tableData = [];
      recvData.items.forEach(function(item,idx){
        category.push(item.Keyword);
        Users.push(item.Users);
        Sessions.push(item.Sessions);
        ConversionRate.push(item.Conversion_Rate);
        BounceRate.push(item.Bounce_Rate);
        Buzz.push(item.Buzz);
        SearchVolume.push(item.SearchVolume);
        Products.push(item.Products);
        tableData.push({id:idx + 1 , title:item.Keyword , purchase : item.Users, satisfaction:item.Buzz,});
          
      });    

      this.setState({  
        TableDataSocial: tableData ,
        internalIndexSelected  : { label: 'Users', value: 'Users', key: 0 } ,
        externalSelected : { label: 'Buzz', value: 'Buzz', key: 0 },
        GASocialComparison : {
          CategoryData : category ,
          UsersData : Users , 
          SessionsData : Sessions ,  
          ConversionRateData : ConversionRate ,
          BounceRateData : BounceRate , 
          BuzzData : Buzz , 
          SearchVolumeData : SearchVolume , 
          ProductsData : Products ,
        } ,
      }); 
    }

    const setGAKeywordGap = (recvData) => {
      var category = [];
      var BounceRate = [];
      var ConversionRate = [];
      var Sessions = [];
      var SessionsRatio = [];
      var Users = [];
      var UsersRatio = [];
      var usersChartDataGap = [];
      var sessionsChartDataGap  = [];
      var conversionChartDataGap   = [];
      var bounceChartDataGap    = [];
      var chartDataArrayGap = [];
      // console.log('setGAKeywordGap',recvData);
      
      recvData.items.forEach(function(item,idx){
        category.push(item.Keyword);
        BounceRate.push(item.Bounce_Rate);
        ConversionRate.push(item.Conversion_Rate);
        Sessions.push(item.Sessions);
        SessionsRatio.push(item.Sessions_Ratio);
        Users.push(item.Users);
        UsersRatio.push(item.Users_Ratio);
      });
      // console.log('setGAKeywordGap',category);
      usersChartDataGap.push({id: 1, series: [{data: Users, title: 'Users', average: UsersRatio,}]});
      sessionsChartDataGap.push({id: 1, series: [{data: Sessions, title: 'Sessions', average: SessionsRatio,}]});
      conversionChartDataGap.push( {id: 1, series: [{data: ConversionRate , title: 'Conversion',average: [], }]});
      bounceChartDataGap.push( {id: 1, series: [{data: BounceRate, title: 'Bounce', average: [],}]});
      chartDataArrayGap.push(usersChartDataGap);
      chartDataArrayGap.push(sessionsChartDataGap);
      chartDataArrayGap.push(conversionChartDataGap);
      chartDataArrayGap.push(bounceChartDataGap);
      // console.log('setGAKeywordGap',chartDataArray);
      this.setState({  
          chartDataArray: chartDataArrayGap ,
        });

      this.setState(prev =>({  
           ...prev,
           horizontal : {
              options : {
                xaxis : {
                  categories: category,
                }
              }
           }, 
             
      }));
    }


    const getGAUserIndicatorsBar = (searchCondition) => {
      axios.post("/trendga/GetGA_User_Indicators_Bar",searchCondition)
      .then((response) => {
          console.log('getGAUserIndicatorsBar ' , response.data );
          setGAUserIndicatorsBar(response.data);
      })
      .catch(function (error) {
          console.log(error);         
      });
    }   

    const getGAUserIndicatorsLine = (searchCondition) => {
      axios.post("/trendga/GetGA_User_Indicators_Line",searchCondition)
      .then((response) => {
          console.log('getGAUserIndicatorsLine ' , response.data );
          setGAUserIndicatorsLine(response.data );
      })
      .catch(function (error) {
          console.log(error);
      });
    }   

    const getGABoardTrend = (searchCondition) => {
      axios.post("/trendga/GetGA_Board_Trend",searchCondition)
      .then((response) => {
          console.log('getGABoardTrend ' , response.data );
          setGABoardTrend(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    }   

    const getGADemographicsAnalysis = (searchCondition) => {
      axios.post("/trendga/GetGA_Demographics_Analysis",searchCondition)
      .then((response) => {
        console.log('getGADemographicsAnalysis ' , response.data );
        setGADemographicsAnalysis(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    }   

    const getGASocialComparison = (searchCondition) => {
      axios.post("/trendga/GetGA_Social_Comparison",searchCondition)
      .then((response) => {
        console.log('getGASocialComparison ' , response.data );
        setGASocialComparison(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    }   
    
    const getGAKeywordGap = (searchCondition) => {
      axios.post("/trendga/GetGA_Keyword_GAP",searchCondition)
      .then((response) => {
         console.log('getGAKeywordGap ' , response.data );
         setGAKeywordGap(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });

    }

    const searchStart = () =>{
      var searchCondition = {} ;
      let periodUnit = '';
      statesItems.checkInfo.forEach(item => {
        if (item.isChecked){
          periodUnit = item.value;
        }
      });
      searchCondition.Period_Unit = periodUnit;
      searchCondition.Company = statesItems.userInfo.CompanyName;
      searchCondition.CompanyCode = statesItems.userInfo.CompanyCode;
      searchCondition.Keyword = statesItems.keyWordtext;

      console.log("googleAnalytics  searchStart" , searchCondition );
      
      getGAKeywordGap(searchCondition);
      getGASocialComparison(searchCondition);
      getGADemographicsAnalysis(searchCondition);
      getGABoardTrend(searchCondition);
      getGAUserIndicatorsLine(searchCondition);
      getGAUserIndicatorsBar(searchCondition);
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
                                    <span>{items.view}</span>
                                  </label>
                                </FormGroup>
                              )
                            })}
                          {/* <CustomInput
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
                          /> */}
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
                                  onChange={onKeywordChange}
                                  onKeyDown={onKeywordpress}
                                  value={statesItems.keyWordtext}
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
                    <Button className="btn-xl mt-4" color="gray" onClick={searchStart}>
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
                  <h2>GA User Indicators</h2>
                </div>

                <ul className="tab-list">
                  {indiCont.map((item, idx) => {
                    return (
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                      <li 
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
                  {statesItems.chartDataArray.map((list , indx) => {
                      return(
                        <div 
                          key={indx} 
                          className={`item-${indx + 1} graph-list`} style={statesChart.activeId === Number(`${indx + 1}`) ? {display : 'block'} : {display : 'none'}}
                        >
                          {list.map((item, idx) => {
                            return(
                              <div
                                key={idx}
                              >
                                <div className='chart-area keyword-gap-graph'>
                                  <p className='cont-noti'>단위: 명</p>
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
                  <div className="comparison-select-area">
                    <span>Internal Index</span>
                    <FormGroup className="select-box">
                      <Select
                        components={{ Input: CustomSelectInput }}
                        className="react-select"
                        classNamePrefix="react-select"
                        name="form-field-name"
                        value={statesItems.internalIndexSelected}
                        onChange={inchangeOption}
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
                        value={statesItems.externalSelected}
                        onChange={exchangeOption}
                        options={externalIndex}
                      />
                    </FormGroup>
                  </div>
                  <ReactTable
                    data={statesItems.TableDataSocial}
                    columns={statesItems.columns}
                    defaultPageSize="6"
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

                <ul className="analysis-tab-list">
                  {initDemoAnalysis.map((item, idx) => {
                    return (
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                      <li 
                        key={idx} 
                        onClick={this.analysisClickEvt}
                        className={`analysis-item-${item.id} ${statesItems.listActiveId === Number(item.id) ? 'active' : ""}` }
                      >
                        <span className='title'>{item.title}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="graph-area bar">
                  {statesItems.AnalysisChartArray.map((list , indx) => {
                      return(
                        <ul 
                          key={indx} 
                          className={`analysis-item-${indx + 1} graph-list`} style={statesItems.listActiveId === Number(`${indx + 1}`) ? {display : 'flex'} : {display : 'none'}}
                        >
                          {list.map((item, idx) => {
                            return(
                              <li
                                key={idx}
                              >
                                { statesItems.listActiveId === Number(`${indx + 1}`) && 
                                <div className='chart-area bor-none'>
                                  <CompareBar options={item.options} series={item.series} type="bar" height={350} width='100%' className="analysis-chart-bar" />
                                </div>
                                }
                              </li>
                            );
                          })}
                        </ul>
                      )
                    })}
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
                <div className="box-area">
                  <div className='graph-area total-area title-type box-left'>
                    <p className='bx_name'>Users / Sessions</p>
                    <p className='cont-noti'>* 지수화하여 표시</p>
                    <CompareLine options={statesItems.totalGraph.options} series={statesItems.UsersSessionsSeries} height={statesItems.totalGraph.height} />
                  </div>
                  <div className='graph-area total-area title-type box-right'>
                    <p className='bx_name'>Conversion rate / Bounce rate</p>
                    <p className='cont-noti'>* 지수화하여 표시</p>
                    <CompareLine options={statesItems.totalGraph.options} series={statesItems.ConversionBounceRateSeries} height={statesItems.totalGraph.height} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        {/* e: GA Broad Trend Chart */}

        {/* s: GA User Indicators */}
        <Row className="mt-5">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className="box-title">
                  <h2>GA User Indicators</h2>
                </div>
                {/* s: 탭메뉴 */}
                <Nav tabs className="card-header-tabs keyword-gap-tab">
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: statesItems.activeTab === '1',
                      })}
                      onClick={() => { this.tabToggle('1'); }}
                    >
                      Inflow
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: statesItems.activeTab === '2',
                      })}
                      onClick={() => { this.tabToggle('2'); }}
                    >
                      Bounce
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: statesItems.activeTab === '3',
                      })}
                      onClick={() => { this.tabToggle('3'); }}
                    >
                      Most Visited Page
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: statesItems.activeTab === '4',
                      })}
                      onClick={() => { this.tabToggle('4'); }}
                    >
                      Conversion
                    </NavLink>
                  </NavItem>
                </Nav>
                {/* e: 탭메뉴 */}
                {/* s: 탭메뉴 */}
                <TabContent className="keyword-gap-graph" activeTab={statesItems.activeTab}>
                  <TabPane tabId="1">
                    { statesItems.activeTab === '1' &&
                      <>
                      <div className='graph-area total-area title-type'>
                        <p className='cont-noti'>단위: 건</p>
                        <CompareLine options={statesItems.inflowOpt} series={statesItems.inflowSeries} height={statesItems.keywordGap.height} />
                      </div>                      
                      </>
                    }
                  </TabPane>
                  <TabPane tabId="2">
                    { statesItems.activeTab === '2' &&
                      <>
                      <div className='graph-area total-area title-type'>
                        <p className='cont-noti'>단위: 건</p>
                        <CompareLine options={statesItems.bounceOpt} series={statesItems.bounceSeries} height={statesItems.keywordGap.height} />
                      </div>
                      
                      </>
                    }
                  </TabPane>
                  <TabPane tabId="3">
                  { statesItems.activeTab === '3' &&
                      <>
                      <div className='graph-area total-area title-type'>
                        <p className='cont-noti'>단위: 건</p>
                        <CompareLine options={statesItems.mostVisitedPageOpt} series={statesItems.mostVisitedPageSeries} height={statesItems.keywordGap.height} />
                      </div>
                      
                      </>
                    }
                  </TabPane>
                  <TabPane tabId="4">
                  { statesItems.activeTab === '4' &&
                      <>
                      <div className='graph-area total-area title-type'>
                        <p className='cont-noti'>단위: 건</p>
                        <CompareLine options={statesItems.conversionOpt} series={statesItems.conversionSeries} height={statesItems.keywordGap.height} />
                      </div>
                      <div className="graph-area total-area title-type keyword-gap-type mt-2">
                        <div className="keyword-chart-area">
                          {regionChartData.map((item, idx) => {
                            return(
                              <div
                                key={idx}
                                className='chart-area'
                              >
                                <CompareBar options={item.options} series={item.series} type="bar" height={350} width='100%' className="analysis-chart-bar" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      </>
                    }
                  </TabPane>
                </TabContent>
                
                <div className="graph-area total-area title-type keyword-gap-type mt-2">
                  <div className="keyword-chart-area">
                    <div  className='chart-area'>
                      <CompareBar options={statesItems.GaUserBarGenOpt} series={statesItems.GaUserBarGenSeries} type="bar" height={350} width='100%' className="analysis-chart-bar" />
                    </div>
                    <div  className='chart-area'> 
                      <CompareBar options={statesItems.GaUserBarAgeOpt} series={statesItems.GaUserAgeGenSeries} type="bar" height={350} width='100%' className="analysis-chart-bar" />
                    </div>
                    <div  className='chart-area'> 
                      <CompareBar options={statesItems.GaUserBarDeviceOpt} series={statesItems.GaUserAgeDeviceSeries} type="bar" height={350} width='100%' className="analysis-chart-bar" />
                    </div>
                    <div className='chart-area'> 
                      <CompareBar options={statesItems.GaUserBarRegionOpt} series={statesItems.GaUserAgeRegionSeries} type="bar" height={350} width='100%' className="analysis-chart-bar" />
                    </div>
                  </div>
                </div>
               
                {/* e: 탭메뉴 */}
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        {/* e: GA User Indicators */}

      </>
    )
  }
}

export default GoogleAnalytics;
