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
import ReactApexChart from "react-apexcharts";
import { Row, Card, CardBody, Form, Button, FormGroup, Input, Nav, NavLink, NavItem, TabContent, TabPane, } from 'reactstrap';
import classnames from 'classnames';
import { Formik, Field } from 'formik';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/esm/locale";
import { Colxx } from '../../../components/common/CustomBootstrap';
import {ReactTable} from '../../../containers/ui/ReactTableCards';
import ChannelButton from '../../../components/applications/ChannelButton'
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import CompareScatter from '../../../components/charts/CompareScatter';
import CompareBar from '../../../components/charts/CompareBar';
import CompareLine from '../../../components/charts/CompareLine';
import { Columns, ProductColumns, TableData, TableData2, ProductData ,totalGraphpp } from './tableData';
import 'react-datepicker/dist/react-datepicker.css';
import { login, UserInfo, logout } from '../../../services/LoginService';
import { post } from 'axios';
import { CommerceIndicator, PriceIndicator, ProductPriceIndicator } from './data';

// eslint-disable-next-line react/prefer-stateless-function
class ProductPrice extends React.Component {
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
      activeId: 1,
      activeTabId: 1,
      searchBtnClick : false ,
      searchStart : false , 
      userInfo : userData ,
      loginCheck : loginYN,
      keyWordtext : "",
      selectedOptionsBase : [] , 
      searchCondition: {} ,
      brandBubbleData : [],
      selectArray : [],
      BrandProductData :[] ,
      brandBubbleOpt:{},
      ProductRankOpt : totalGraphpp.options ,
      ProductRankSeries : [] ,
      RegularPriceOpt : totalGraphpp.options,
      RegularPriceSeries : [] , 
      // eslint-disable-next-line react/no-unused-state
      selectedOptions : [],
      // eslint-disable-next-line react/no-unused-state
      checkInfo: [
        { id: 1, value: "Daily", isChecked: true },
        { id: 2, value: "Weekly", isChecked: false },
        { id: 3, value: "Monthly", isChecked: false },
        { id: 4, value: "Yearly", isChecked: false }
      ],
      commerceColumn : Columns,
      commerceTable : TableData,
      commerceProductGraph : [
        {
          series: [],
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
            annotations: {
              position: 'back' ,
              yaxis: [
                {
                  y: 6000,
                  y2: 6100,
                  opacity: 0.3,
                  fillColor: "#FEB019",
                },
              ],
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right', 
            },
            colors: ['#f6980b','#b9b9b9','#4e4f4f','#b9b9b9'],
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
              show: false,
            },
            xaxis: {
              categories: [],
              tickPlacement: 'between',
              axisTicks: {
                show: false,
              }
            },
            yaxis: {
              axisBorder: {
                show: true,
              },
              title: {
                text: 'Product',
                rotate: 0,
                offsetX: 0,
                offsetY: -150,
                style: {
                  fontSize: '14px',
                  fontWeight: 600,
                  cssClass: 'apexcharts-yaxis-title',
                },
              }
            },  
          }
        }
      ],
      commerceProductTableData : [],
      commerceDeliveryGraph : [
        {
          series: [],
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
            annotations: {
              position: 'back' ,
              yaxis: [
                {
                  y: 20,
                  y2: 40,
                  opacity: 0.3,
                  fillColor: "#FEB019",
                },
              ],
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right', 
            },
            colors: ['#f6980b','#b9b9b9','#4e4f4f','#b9b9b9'],
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
              show: false,
            },
            xaxis: {
              categories: [],
              tickPlacement: 'between',
              axisTicks: {
                show: false,
              }
            },
            yaxis: {
              axisBorder: {
                show: true,
              },
              title: {
                text: 'Product',
                rotate: 0,
                offsetX: 0,
                offsetY: -150,
                style: {
                  fontSize: '14px',
                  fontWeight: 600,
                  cssClass: 'apexcharts-yaxis-title',
                },
              }
            },  
          }
        }
      ],
      commerceDeliveryTableData : [],    
      commerceReviewsGraph : [
        {
          series: [],
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
            annotations: {
              position: 'back' ,
              yaxis: [
                {
                  y: 20,
                  y2: 40,
                  opacity: 0.3,
                  fillColor: "#FEB019",
                },
              ],
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right', 
            },
            colors: ['#f6980b','#b9b9b9','#4e4f4f','#b9b9b9'],
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
              show: false,
            },
            xaxis: {
              categories: [],
              tickPlacement: 'between',
              axisTicks: {
                show: false,
              }
            },
            yaxis: {
              axisBorder: {
                show: true,
              },
              title: {
                text: 'Product',
                rotate: 0,
                offsetX: 0,
                offsetY: -150,
                style: {
                  fontSize: '14px',
                  fontWeight: 600,
                  cssClass: 'apexcharts-yaxis-title',
                },
              }
            },  
          }
        }
      ],
      commerceReviewsTableData : [],
      priceColumn : Columns,
      priceTable : TableData, 
      priceRegularGraph : [
        {
          series: [],
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
            annotations: {
              position: 'back' ,
              yaxis: [
                {
                  y: 20,
                  y2: 40,
                  opacity: 0.3,
                  fillColor: "#FEB019",
                },
              ],
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right', 
            },
            colors: ['#f6980b','#b9b9b9','#4e4f4f','#b9b9b9'],
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
              show: false,
            },
            xaxis: {
              categories: [],
              tickPlacement: 'between',
              axisTicks: {
                show: false,
              }
            },
            yaxis: {
              axisBorder: {
                show: true,
              },
              title: {
                text: 'Product',
                rotate: 0,
                offsetX: 0,
                offsetY: -150,
                style: {
                  fontSize: '14px',
                  fontWeight: 600,
                  cssClass: 'apexcharts-yaxis-title',
                },
              }
            },  
          }
        }
      ],
      priceRegularTableData : [],   
      priceSaleGraph : [
        {
          series: [],
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
            annotations: {
              position: 'back' ,
              yaxis: [
                {
                  y: 20,
                  y2: 40,
                  opacity: 0.3,
                  fillColor: "#FEB019",
                },
              ],
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right', 
            },
            colors: ['#f6980b','#b9b9b9','#4e4f4f','#b9b9b9'],
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
              show: false,
            },
            xaxis: {
              categories: [],
              tickPlacement: 'between',
              axisTicks: {
                show: false,
              }
            },
            yaxis: {
              axisBorder: {
                show: true,
              },
              title: {
                text: 'Product',
                rotate: 0,
                offsetX: 0,
                offsetY: -150,
                style: {
                  fontSize: '14px',
                  fontWeight: 600,
                  cssClass: 'apexcharts-yaxis-title',
                },
              }
            },  
          }
        }
      ],
      priceSaleTableData : [],   
      priceRegularDeliveryGraph : [
        {
          series: [],
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
            annotations: {
              position: 'back' ,
              yaxis: [
                {
                  y: 20,
                  y2: 40,
                  opacity: 0.3,
                  fillColor: "#FEB019",
                },
              ],
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right', 
            },
            colors: ['#f6980b','#b9b9b9','#4e4f4f','#b9b9b9'],
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
              show: false,
            },
            xaxis: {
              categories: [],
              tickPlacement: 'between',
              axisTicks: {
                show: false,
              }
            },
            yaxis: {
              axisBorder: {
                show: true,
              },
              title: {
                text: 'Product',
                rotate: 0,
                offsetX: 0,
                offsetY: -150,
                style: {
                  fontSize: '14px',
                  fontWeight: 600,
                  cssClass: 'apexcharts-yaxis-title',
                },
              }
            },  
          }
        }
      ],
      priceRegularDeliveryTableData : [],    
      priceSaleDeliveryGraph : [
        {
          series: [],
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
            annotations: {
              position: 'back' ,
              yaxis: [
                {
                  y: 20,
                  y2: 40,
                  opacity: 0.3,
                  fillColor: "#FEB019",
                },
              ],
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right', 
            },
            colors: ['#f6980b','#b9b9b9','#4e4f4f','#b9b9b9'],
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
              show: false,
            },
            xaxis: {
              categories: [],
              tickPlacement: 'between',
              axisTicks: {
                show: false,
              }
            },
            yaxis: {
              axisBorder: {
                show: true,
              },
              title: {
                text: 'Product',
                rotate: 0,
                offsetX: 0,
                offsetY: -150,
                style: {
                  fontSize: '14px',
                  fontWeight: 600,
                  cssClass: 'apexcharts-yaxis-title',
                },
              }
            },  
          }
        }
      ],
      priceSaleDeliveryTableData : [],                     
      ProductPriceData : {},
      DeliverydaysNumofproductGraph : {
        options: {
          chart: {
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
            colors: ['#2f5597', '#bfbfbf', '#bfbfbf', '#bfbfbf', '#bfbfbf', '#f00001'],
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
            categories: [],
            labels: {
              style: {
                fontSize: '12px'
              }
            },
          },
          yaxis: {
            show: false,
          },
        },
        series: []
      },
      DeliverydaysRatingsGraph : {
        options: {
          chart: {
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
            colors: [],
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
            categories: [],
            labels: {
              style: {
                fontSize: '12px'
              }
            },
          },
          yaxis: {
            show: false,
          },
        },
        series: []
      },
      RatingsNumofproductGraph : {
        options: {
          chart: {
            type: 'scatter',
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
            colors: ['#a3a3a3',],
          },
          grid: {
            show: false,
          },
          xaxis: {
            tickAmount: 4,
            title: {
              text: 'Ratings',
              rotate: 0,
              offsetX: 300,
              offsetY: -10,
              style: {
                fontSize: '12px',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-title',
              },
            }
          },
          yaxis: {
            axisBorder: {
              show: true,
            },
            labels : {
              show : false
            },
            title: {
              text: 'Product',
              rotate: 0,
              offsetX: 20,
              offsetY: -150,
              style: {
                fontSize: '12px',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-title',
              },
            }
          }, 
        },
        series: []
      },
      RegularpriceRatingsGraph : {
        options: {
          chart: {
            type: 'scatter',
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
            colors: ['#a3a3a3',],
          },
          grid: {
            show: false,
          },
          xaxis: {
            tickAmount: 4,
            title: {
              text: 'Ratings',
              rotate: 0,
              offsetX: 300,
              offsetY: -10,
              style: {
                fontSize: '12px',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-title',
              },
            }
          },
          yaxis: {
            axisBorder: {
              show: true,
            },
            labels : {
              show : false
            },
            title: {
              text: 'Product',
              rotate: 0,
              offsetX: 20,
              offsetY: -150,
              style: {
                fontSize: '12px',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-title',
              },
            }
          }, 
        },
        series: []
      },
      RegularpriceRankGraph : {
        options: {
          chart: {
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
          colors: ["#505151"],
          grid: {
            show: false,
          },
          xaxis: {
            axisTicks: {
              show: false,
            },
            title: {
              text: 'Price',
              rotate: 0,
              offsetX: 670,
              offsetY: -10,
              style: {
                fontSize: '12px',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-title',
              },
            },
            categories: [],
            labels: {
              style: {
                fontSize: '12px'
              }
            },
          },
          yaxis: {
            axisBorder: {
              show: true,
            },
            title: {
              text: 'Rank',
              rotate: 0,
              offsetX: 20,
              offsetY: -150,
              style: {
                fontSize: '12px',
                fontWeight: 600,
                cssClass: 'apexcharts-yaxis-title',
              },
            }
          },
        },
        series: []
      }
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
  }

  ChangeEndDate = (e) => {
    this.setState({
      endDate: e
    });
  }

  SearchClick = (e) => {
    console.log('Overview SearchClick !!');
    this.setState({  
      searchBtnClick: true
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

  changeOption = (...args) => {
    this.setState({
      selectedOptions: [args[0]]
    });
  }

  listClickEvt = (evt) => {
    evt.preventDefault();

    const getNum = Number(evt.currentTarget.className.replace('item-',''));

    this.setState({
      activeId : getNum
    }, () => {
      this.makeCommerceTable();
    });
  }

  makeCommerceTable = () => {
    let response = [];
    switch(this.state.activeId) {
      case 1 : response = this.state.commerceProductTableData;
        break;

      case 2 : response = this.state.commerceDeliveryTableData;
        break;
      
      case 3 : response = this.state.commerceReviewsTableData;
        break;

      default : console.log('탭 선택 안함');
    }

    let semiTableData = [];
    let semiColumnData = [{
      Header: 'Channel',
      accessor: 'channel',
      cellClass: 'text-center',
      disableSortBy: true
    }];

    response.map((data, idx) => {
      this.state.searchCondition.Channel_Lower.map(channel => {
        if(data.Channel == channel) {
          let semiSeries = [];

          data.Data.map((res, id) => {
            semiSeries.push(res.Value);

            if(idx == 0) {
              let num = Number(res.Date.substr(5, 2)) + '/' + res.Date.slice(-2);
              
              semiColumnData.push({
                Header: num,
                accessor: 'count' + (id + 1),
                cellClass: 'text-center',
                disableSortBy: true
              });
            }
          });
  
          semiTableData.push({
            id : idx + 1
          , channel
          , count1: semiSeries[0],
            count2: semiSeries[1],
            count3: semiSeries[2],
            count4: semiSeries[3],
            count5: semiSeries[4],
            count6: semiSeries[5],
            count7: semiSeries[6],
            count8: semiSeries[7],
            count9: semiSeries[8],
            count10: semiSeries[9],
            count11: semiSeries[10]
          });
        }
      });
    });

    this.setState({
      commerceColumn : semiColumnData,
      commerceTable : semiTableData
    });
  }

   tabListClickEvt = (evt) => {
    evt.preventDefault();
    const getNum = Number(evt.currentTarget.className.replace('analysis-item-',''));

    this.setState({
      activeTabId : getNum,
    }, () => {
      this.makePriceTable();
    });
  }

  makePriceTable = () => {
    let response = [];
    switch(this.state.activeTabId) {
      case 1 : response = this.state.priceRegularTableData;
        break;
      
      case 2 : response = this.state.priceSaleTableData;
        break;

      case 3 : response = this.state.priceRegularDeliveryTableData;
        break;
      
      case 4 : response = this.state.priceSaleDeliveryTableData;
        break;
      
      default : console.log('토글 선택안함');
    }

    let semiTableData = [];
    let semiColumnData = [{
      Header: 'Channel',
      accessor: 'channel',
      cellClass: 'text-center',
      disableSortBy: true
    }];

    response.map((data, idx) => {
      this.state.searchCondition.Channel_Lower.map(channel => {
        if(data.Channel == channel) {
          let semiSeries = [];

          data.Data.map((res, id) => {
            semiSeries.push(res.Value);

            if(idx == 0) {
              let num = Number(res.Date.substr(5, 2)) + '/' + res.Date.slice(-2);
              
              semiColumnData.push({
                Header: num,
                accessor: 'count' + (id + 1),
                cellClass: 'text-center',
                disableSortBy: true
              });
            }
          });
  
          semiTableData.push({
            id : idx + 1
          , channel
          , count1: semiSeries[0],
            count2: semiSeries[1],
            count3: semiSeries[2]
          });
        }
      });
    });

    this.setState({
      priceColumn : semiColumnData,
      priceTable : semiTableData
    });
  }

  render() {
    const statesItems = this.state;
    const statesChart = this.state;
    const { selectedOptionsBaseCheck , selectedOptionsChannelCheck } = this.state;

    const indiCont = [
      {id: 1, title :  'Product',},
      {id: 2, title :  'Delivery',},
      {id: 3, title :  'Reviews',},
    ]

    const indicatiorTit = [
      {id: 1, title :  'Regular',},
      {id: 2, title :  'Sale',},
      {id: 3, title :  'Regular+Delivery',},
      {id: 4, title :  'Sale+Delivery',},
    ]

    const selectedOptionsBase = [
      { label: "Coupang", value: "social_val01", key: 0 },
      { label: "Naver_news", value: "social_val02", key: 1 },
      { label: "Naver_blog", value: "social_val03", key: 2 },
    ]

    const selectedOptionsChannel = [
      { label: "Coupang", value: "social_val01", key: 0 },
      { label: "Naver_news", value: "social_val02", key: 1 },
      { label: "Naver_blog", value: "social_val03", key: 2 },
    ]

    const ratingsData = {
      options: {
        chart: {
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
          colors: [ '#bfbfbf', '#2f5597', '#bfbfbf', '#bfbfbf', '#bfbfbf', '#f00001'],
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
          categories: ['1day', '2day','3day', '4day','5day', 'etc',],
          labels: {
            style: {
              fontSize: '12px'
            }
          },
        },
        yaxis: {
          show: false,
        },
      },
      series: [{data: [4.2, 4.6, 3.8, 3.5, 3.5, 2.8],}]
    }

    const productBubbleData = {
      options: {
        chart: {
          type: 'scatter',
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
          colors: ['#a3a3a3',],
        },
        grid: {
          show: false,
        },
        xaxis: {
          tickAmount: 6,
          title: {
            text: 'Ratings',
            rotate: 0,
            offsetX: 300,
            offsetY: -10,
            style: {
              fontSize: '12px',
              fontWeight: 600,
              cssClass: 'apexcharts-xaxis-title',
            },
          }
        },
        yaxis: {
          axisBorder: {
            show: true,
          },
          title: {
            text: 'Product',
            rotate: 0,
            offsetX: 20,
            offsetY: -150,
            style: {
              fontSize: '12px',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title',
            },
          }
        }, 
      },
      series: [{data: [[36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]}]
    }

    const priceRankData = {
      options: {
        chart: {
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
        colors: ["#505151"],
        grid: {
          show: false,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          title: {
            text: 'Price',
            rotate: 0,
            offsetX: 670,
            offsetY: -10,
            style: {
              fontSize: '12px',
              fontWeight: 600,
              cssClass: 'apexcharts-xaxis-title',
            },
          },
          categories: ['25,000', '26,000','27,000', '28,000','29,000', '30,000',],
          labels: {
            style: {
              fontSize: '12px'
            }
          },
        },
        yaxis: {
          axisBorder: {
            show: true,
          },
          title: {
            text: 'Rank',
            rotate: 0,
            offsetX: 20,
            offsetY: -150,
            style: {
              fontSize: '12px',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title',
            },
          }
        },
      },
      series: [{data: [4.2, 4.6, 3.8, 3.5, 3.5, 2.8],}]
    }

    var brandBubbleData = {
      options: {
        chart: {
          type: 'scatter',
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false
          },
          events: {
            click: function(event, chartContext, config) {
              if (config.seriesIndex >= 0) {
                clickBrandDistribution(config.seriesIndex, config.config.series[config.seriesIndex].name);
              }
            }
          },
        },
        legend: {
          show: false,
        },
        
        grid: {
          show: false,
        },
        xaxis: {
          tickAmount: 5,
          title: {
            text: 'Regular Price',
            rotate: 0,
            offsetX: 660,
            offsetY: -10,
            style: {
              fontSize: '12px',
              fontWeight: 600,
              cssClass: 'apexcharts-xaxis-title',
            },
          }
        },
        yaxis: {
          axisBorder: {
            show: true,
          },
          title: {
            text: 'Product Rank',
            rotate: -90,
            offsetX: 0,
            offsetY: -170,
            style: {
              fontSize: '12px',
              fontWeight: 600,
              cssClass: 'apexcharts-yaxis-title',
            },
          }
        }, 
      },
      series: [{ name: "Gillette" , data: [[36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]}]
    }



    const chartDataArray = [this.state.commerceProductGraph, this.state.commerceDeliveryGraph, this.state.commerceReviewsGraph];
    const priceChartDataArray = [this.state.priceRegularGraph, this.state.priceSaleGraph, this.state.priceRegularDeliveryGraph, this.state.priceSaleDeliveryGraph];

    const removeBrandDistribution = (id) => {
      var SelectArray = statesItems.selectArray;
      var SearchConditionRank = [];
      var SearchCondition = statesItems.searchCondition;
      
      const checkFunc = SelectArray.findIndex((item)=> item.id === id);
      SelectArray.splice(checkFunc , 1);
      this.setState({
        selectArray : SelectArray,
      });
      if (SelectArray.length > 0 ){
        SelectArray.forEach(function(item,idx){
          SearchConditionRank.push(item.name);
        });

        SearchCondition.Selected_Channel = statesItems.selectedOptionsBrand.value;
        SearchCondition.Brand = SearchConditionRank;
        getBrandProductRank(SearchCondition); 
      }
      else{
        this.setState({
          selectArray : SelectArray,
          ProductRankSeries : [] ,
          RegularPriceSeries : [] ,
          BrandProductData : [] ,
        });
      }
    }

    const clickBrandDistribution = (seriesIndex,seriesName) => {
      var SelectArray = statesItems.selectArray;
      var SearchConditionRank = [];
      var SearchCondition = statesItems.searchCondition;
      let findFlag = false;
      
      SelectArray.forEach(function(item,idx){
        if (item.id === seriesIndex ){
          findFlag = true;
        }
      });

      if (!findFlag) {
        SelectArray.push({id : seriesIndex  , name : seriesName});
        SelectArray.forEach(function(item,idx){
          SearchConditionRank.push(item.name);
        });
        SearchCondition.Selected_Channel = statesItems.selectedOptionsBrand.value;
        SearchCondition.Brand = SearchConditionRank;
        getBrandProductRank(SearchCondition); //LJJ
      }
      this.setState({
        selectArray : SelectArray,
      }); 
      


    }


    const onKeywordChange = (e) => {
      this.setState({
        keyWordtext : e.target.value
      }); 
    };
    const onKeywordpress = (e) => {
      if (e.keyCode === 13){
        e.preventDefault();
        // 조회조건 Validation 체크
        this.setState({  
          searchBtnClick: true , 
        });
      }
    };
    const validateKeyword = (value) => {
        let error;
        if (!statesItems.keyWordtext) {
          error = 'No Keywords';
        } 
        return error;
    };

    const setBrandProductRank = (ResponseData , searchCondition) => {
      var productRankOpt = statesItems.ProductRankOpt;
      var productCategory = [];
      var productRankSeries = [];
      var regularPriceOpt = statesItems.RegularPriceOpt;
      var regularPriceSeries = [];
      var regularPriceCategory = [];
      var productRankTable = [];
      console.log('setBrandProductRank : ', ResponseData);
      ResponseData.Product_Rank.forEach(function(item,idx){
        productRankSeries.push({name:item.Channel,data:[],});
        item.Data.forEach(function(item1,idx1){
          productRankSeries[idx].data.push(item1.Value);
          if (idx === 0){
            productCategory.push(item1.Date.substring(8,10));
          }
        });
      });

      ResponseData.Regular_Price.forEach(function(item,idx){
        regularPriceSeries.push({name:item.Channel,data:[],});
        item.Data.forEach(function(item1,idx1){
          regularPriceSeries[idx].data.push(item1.Value);
          if (idx === 0){
            regularPriceCategory.push(item1.Date.substring(8,10));
          }
        });
      });
      
      ResponseData.Product_Rank_Table.forEach(function(item,idx){
        productRankTable.push({id:idx+1,rank:item.Rank,product:item.ProductName,brand:item.BrandName,avg:item.AvgOfRegularPrice});
      });
      console.log('setBrandProductRank',productCategory,productRankSeries,regularPriceSeries,regularPriceCategory,productRankTable);
      productRankOpt.xaxis.categories = productCategory;
      regularPriceOpt.xaxis.categories = regularPriceCategory;
      this.setState({
        ProductRankOpt : productRankOpt,
        ProductRankSeries : productRankSeries ,
        RegularPriceOpt : regularPriceOpt ,
        RegularPriceSeries : regularPriceSeries ,
        BrandProductData : productRankTable,
      });
    }

    const getBrandProductRank = (searchCondition) => {
      post("/ondetailppindicator/GetBrand_ProductRank", searchCondition)
      .then((response) => {
        // console.log('getBrandProductRank',searchCondition);
        setBrandProductRank(response.data , searchCondition);
      })
      .catch(function (error) {
        console.log('err : ', error);
      });
    }

    const setBrandDistribution = (ResponseData, searchCondition) => {
      let i = 0;
      let findflag = false;
      var bubbleData = [];
      var bubbleData1 = [];
      var bubbleOpt = brandBubbleData.options; 
      var SelectArray = statesItems.selectArray;
      var SearchConditionTemp = {};

      // console.log('setBrandDistribution' , bubbleOpt);
      ResponseData.Data.forEach(function(item,idx){
        
        if (bubbleData.length > 0){
          i = 0 ;
          findflag = false;
          while ( i < bubbleData.length ){
            if (item.Brand === bubbleData[i].name){
              bubbleData[i].data.push([item.Rank,item.Price]);
              findflag = true;
              break;
            }
            i += 1;
          }
          if (!findflag) {
            bubbleData.push({name:item.Brand,data:[[item.Rank,item.Price]]});
          }
        }
        else{
          bubbleData.push({name:item.Brand,data:[[item.Rank,item.Price]]});
        }
      });
      // console.log('bubbleData' , bubbleData);
      if (bubbleData.length > 30){
        bubbleData1 = bubbleData.slice(0,30);
      }
      else{
        bubbleData1 = bubbleData;
      }
      SelectArray.push({id : 0  , name : bubbleData1[0].name});
      this.setState({  
        brandBubbleData: bubbleData1 ,
        selectArray :  SelectArray ,
      });
      
      
      searchCondition.Brand = [];
      searchCondition.Brand.push(bubbleData1[0].name);
      getBrandProductRank(searchCondition); 

    }

    const getBrandDistribution = (searchCondition) => {
      post("/ondetailppindicator/GetBrand_Distribution", searchCondition)
      .then((response) => {
        // console.log('GetDistribution : ', response.data);
        setBrandDistribution(response.data, searchCondition );
      })
      .catch(function (error) {
        console.log('err : ', error);
      });
    }

    const getGetCommerceIndicator = (searchCondition) => {
      
      post("/ondetailppindicator/GetCommerce_Indicator", searchCondition)
      .then((response) => {
        /*
        let data = CommerceIndicator;
        setGetCommerceIndicator(data, searchCondition); */ // 데이타 없어어 임시 데이타
        console.log('getGetCommerceIndicator',response );
        if (response.data.ErrorCode != undefined){
          setGetCommerceIndicator(response.data, searchCondition);
        }
        else{
          alert('getGetCommerceIndicator 수신 데이타가 업습니다. ');
          getPriceIndicator(searchCondition);
        }
        
      })
      .catch(function (error) {
        console.log('err : ', error);
      });
    };
    
   const setGetCommerceIndicator = (ResponseData , searchCondition) => {
      //프로덕트
      let productSeries = [];
      let productCategories = [];
      
      ResponseData.Product_Graph.map((data, idx) => {
        searchCondition.Channel_Lower.map(channel => {
          if(data.Channel == channel) {
            let semiSeries = [];

            if(data.Type == "AVG") {
              data.Data.map(res => {
                semiSeries.push(res.Value);

                if(productCategories.length < 1) {
                  productCategories.push(res.Date.slice(-2));
                }
                else {
                  let flag = false;
                  productCategories.map(ress => {
                    if(ress != res.Date.slice(-2))
                      flag = true;
                  });

                  if(flag)
                    productCategories.push(res.Date.slice(-2));
                }
              });
    
              productSeries.push({
                name : channel
              , data : semiSeries
              });
            }
          }
        });
      });

      //딜리버리
      let deliverySeries = [];
      let deliveryCategories = [];

      ResponseData.Delivery_Graph.map((data, idx) => {
        searchCondition.Channel_Lower.map(channel => {
          if(data.Channel == channel) {
            let semiSeries = [];

            if(data.Type == "AVG") {
              data.Data.map(res => {
                semiSeries.push(res.Value);

                if(deliveryCategories.length < 1) {
                  deliveryCategories.push(res.Date.slice(-2));
                }
                else {
                  let flag = false;
                  deliveryCategories.map(ress => {
                    if(ress != res.Date.slice(-2))
                      flag = true;
                  });

                  if(flag)
                    deliveryCategories.push(res.Date.slice(-2));
                }
              });
    
              deliverySeries.push({
                name : channel
              , data : semiSeries
              });
            }
          }
        });
      });

      //리뷰즈
      let reviewsSeries = [];
      let reviewsCategories = [];

      ResponseData.Reviews_Graph.map((data, idx) => {
        searchCondition.Channel_Lower.map(channel => {
          if(data.Channel == channel) {
            let semiSeries = [];

            if(data.Type == "AVG") {
              data.Data.map(res => {
                semiSeries.push(res.Value);

                if(reviewsCategories.length < 1) {
                  reviewsCategories.push(res.Date.slice(-2));
                }
                else {
                  let flag = false;
                  reviewsCategories.map(ress => {
                    if(ress != res.Date.slice(-2))
                      flag = true;
                  });

                  if(flag)
                    reviewsCategories.push(res.Date.slice(-2));
                }
              });
    
              reviewsSeries.push({
                name : channel
              , data : semiSeries
              });
            }
          }
        });
      });
      
      this.setState((prev) => ({
        commerceProductGraph : [{
          options : {
            ...prev.commerceProductGraph[0].options,
            xaxis : {
              categories : productCategories
            }
          },
          series : productSeries
        }],
        commerceDeliveryGraph : [{
          options : {
            ...prev.commerceDeliveryGraph[0].options,
            xaxis : {
              categories : deliveryCategories
            }
          },
          series : deliverySeries
        }],
        commerceReviewsGraph : [{
          options : {
            ...prev.commerceReviewsGraph[0].options,
            xaxis : {
              categories : reviewsCategories
            }
          },
          series : reviewsSeries
        }],
        commerceProductTableData : ResponseData.Product_Table,
        commerceDeliveryTableData : ResponseData.Delivery_Table,
        commerceReviewsTableData : ResponseData.Reviews_Table
      }), () => {
        this.makeCommerceTable();
      });
        
      getPriceIndicator(searchCondition);
    }
    
    const getPriceIndicator = (searchCondition) => {
      post("/ondetailppindicator/GetPrice_Indicator", searchCondition)
      .then((response) => {
        let data = PriceIndicator;
        setPriceIndicator(data, searchCondition);

        // setPriceIndicator(response.data, searchCondition);
      })
      .catch(function (error) {
        console.log('err : ', error);
      });
    };

    const setPriceIndicator = (ResponseData , searchCondition) => {
      //레귤러
      let regularSeries = [];
      let regularCategories = [];

      ResponseData.Regular_Graph.map((data, idx) => {
        searchCondition.Channel_Lower.map(channel => {
          if(data.Channel == channel) {
            let semiSeries = [];

            if(data.Type == "AVG") {
              data.Data.map(res => {
                semiSeries.push(res.Value);

                if(regularCategories.length < 1) {
                  regularCategories.push(res.Date.slice(-2));
                }
                else {
                  let flag = false;
                  regularCategories.map(ress => {
                    if(ress != res.Date.slice(-2))
                      flag = true;
                  });

                  if(flag)
                    regularCategories.push(res.Date.slice(-2));
                }
              });
    
              regularSeries.push({
                name : channel
              , data : semiSeries
              });
            }
          }
        });
      });

      //세일
      let saleSeries = [];
      let saleCategories = [];

      ResponseData.Sale_Graph.map((data, idx) => {
        searchCondition.Channel_Lower.map(channel => {
          if(data.Channel == channel) {
            let semiSeries = [];

            if(data.Type == "AVG") {
              data.Data.map(res => {
                semiSeries.push(res.Value);

                if(saleCategories.length < 1) {
                  saleCategories.push(res.Date.slice(-2));
                }
                else {
                  let flag = false;
                  saleCategories.map(ress => {
                    if(ress != res.Date.slice(-2))
                      flag = true;
                  });

                  if(flag)
                    saleCategories.push(res.Date.slice(-2));
                }
              });
    
              saleSeries.push({
                name : channel
              , data : semiSeries
              });
            }
          }
        });
      });

      //레귤러_딜리버리
      let regularDeliverySeries = [];
      let regularDeliveryCategories = [];

      ResponseData.Reqular_Delivery_Graph.map((data, idx) => {
        searchCondition.Channel_Lower.map(channel => {
          if(data.Channel == channel) {
            let semiSeries = [];

            if(data.Type == "AVG") {
              data.Data.map(res => {
                semiSeries.push(res.Value);

                if(regularDeliveryCategories.length < 1) {
                  regularDeliveryCategories.push(res.Date.slice(-2));
                }
                else {
                  let flag = false;
                  regularDeliveryCategories.map(ress => {
                    if(ress != res.Date.slice(-2))
                      flag = true;
                  });

                  if(flag)
                    regularDeliveryCategories.push(res.Date.slice(-2));
                }
              });
    
              regularDeliverySeries.push({
                name : channel
              , data : semiSeries
              });
            }
          }
        });
      });

      //세일_딜리버리
      let saleDeliverySeries = [];
      let saleDeliveryCategories = [];

      ResponseData.Sale_Delivery_Graph.map((data, idx) => {
        searchCondition.Channel_Lower.map(channel => {
          if(data.Channel == channel) {
            let semiSeries = [];

            if(data.Type == "AVG") {
              data.Data.map(res => {
                semiSeries.push(res.Value);

                if(saleDeliveryCategories.length < 1) {
                  saleDeliveryCategories.push(res.Date.slice(-2));
                }
                else {
                  let flag = false;
                  saleDeliveryCategories.map(ress => {
                    if(ress != res.Date.slice(-2))
                      flag = true;
                  });

                  if(flag)
                    saleDeliveryCategories.push(res.Date.slice(-2));
                }
              });
    
              saleDeliverySeries.push({
                name : channel
              , data : semiSeries
              });
            }
          }
        });
      });
      
      this.setState((prev) => ({
        priceRegularGraph : [{
          options : {
            ...prev.priceRegularGraph[0].options,
            xaxis : {
              categories : regularCategories
            }
          },
          series : regularSeries
        }],
        priceSaleGraph : [{
          options : {
            ...prev.priceSaleGraph[0].options,
            xaxis : {
              categories : saleCategories
            }
          },
          series : regularSeries
        }],
        priceRegularDeliveryGraph : [{
          options : {
            ...prev.priceRegularDeliveryGraph[0].options,
            xaxis : {
              categories : regularDeliveryCategories
            }
          },
          series : regularDeliverySeries
        }],
        priceSaleDeliveryGraph : [{
          options : {
            ...prev.priceSaleDeliveryGraph[0].options,
            xaxis : {
              categories : saleDeliveryCategories
            }
          },
          series : saleDeliverySeries
        }],
        priceRegularTableData : ResponseData.Regular_Table,
        priceSaleTableData : ResponseData.Sale_Table,
        priceRegularDeliveryTableData : ResponseData.Reqular_Delivery_Table,
        priceSaleDeliveryTableData : ResponseData.Sale_Delivery_Table
      }), () => {
        this.makePriceTable();
      });

      getPPIndicator(searchCondition);
    }
    
    const getPPIndicator = (searchCondition) => {
      post("/ondetailppindicator/GetPP_Indicator", searchCondition)
      .then((response) => {
        let data = ProductPriceIndicator;
        setPPIndicator(data.Data , searchCondition);

        // setPPIndicator(response.data , searchCondition);
      })
      .catch(function (error) {
        console.log('err : ', error);
      });
    }
    const setPPIndicator = (ResponseData , searchCondition) => {
      this.setState({
        ProductPriceData : ResponseData
      }, () => {
        makePPGraph();
      });
      searchCondition.Selected_Channel = searchCondition.Channel_Lower[0];
      getBrandDistribution(searchCondition);

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
      var ChannelUpper = "";
      var ChannelLower = [];
      var selectList = [];
      var periodUnit = "";
      this.setState({  
        searchBtnClick: false ,
        selectArray : [] ,
      });
      this.setState({  
        searchCondition: {} ,
        searchStart : false , 
      });
      if (searchChannel.length > 0 ){
         // selectList.push({ label: 'Total', value: 'Total' , channelUp : "Total" , key: 0 });
         ChannelUpper = searchChannel[0].type.replace(' ','');
         searchChannel.forEach(function(item,idx){
           ChannelLower.push(item.name);
           selectList.push({ label: item.name, value: item.name, channelUp : item.type , key: idx });
         });
      }
      else{
        alert('채널 선택 없음');
        return;
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
      searchCondition.Period_Unit = periodUnit;
      searchCondition.Channel_Upper = ChannelUpper;
      //searchCondition.Channel_Upper = 'OnlineShopping';
      searchCondition.Channel_Lower = ChannelLower;
      searchCondition.Keyword = document.querySelector('#keyword').value;

      this.setState({  
        searchCondition: searchCondition ,
        searchStart : true , 
        selectedOptionsPP: { label: 'Total', value: 'Total' , channelUp : "Total" , key: 0 } ,
        selectedOptionsBrand:selectList[0] ,
      });
       getGetCommerceIndicator(searchCondition);
    };


    const changeOptionPP = (...args) => {
      this.setState({
        selectedOptionsPP: args[0]
      }, () => {
        makePPGraph();
      });
    }

    const makePPGraph = () => {
      let response = this.state.ProductPriceData;

      response.map((data, idx) => {
        if(this.state.selectedOptionsPP.value == data.Channel) {
          //Delivery days & Num of Product
          let DeliveryDaysNumOfProductSeries = [];
          let DeliveryDaysNumOfProductCategories = [];
          let DeliveryDaysNumOfProductColors = [];
          
          data.DeliveryDays_NumOfProduct.map(res => {
            DeliveryDaysNumOfProductSeries.push(Number(res.Value));
            DeliveryDaysNumOfProductCategories.push(res.Date);
          });
          
          DeliveryDaysNumOfProductSeries.map((res) => {
            let color = '#bfbfbf';

            if(res == Math.max(...DeliveryDaysNumOfProductSeries))
              color = '#2f5597';
            else if(res == Math.min(...DeliveryDaysNumOfProductSeries))
              color = '#f00001';

            DeliveryDaysNumOfProductColors.push(color);
          });


          //Ratings & Num of Product
          let RatingsNumOfProductSeries = [];

          data.Ratings_NumOfProduct.map(res => {
            RatingsNumOfProductSeries.push([res.Ratings, Number(res.Value)]);
          });


          //Regular Price & Ratings
          let RegularPriceRatingsSeries = [];
          
          data.RegularPrice_Ratings.map(res => {
            RegularPriceRatingsSeries.push([res.Ratings, Number(res.Value)]);
          });
          

          //Delivery days & Ratings
          let DeliveryDaysRatingsSeries = [];
          let DeliveryDaysRatingsCategories = [];
          let DeliveryDaysRatingsColors = [];
          
          data.DeliveryDays_Ratings.map(res => {
            DeliveryDaysRatingsSeries.push(Number(res.Value));
            DeliveryDaysRatingsCategories.push(res.Date);
          });
          
          DeliveryDaysRatingsSeries.map((res) => {
            let color = '#bfbfbf';

            if(res == Math.max(...DeliveryDaysRatingsSeries))
              color = '#2f5597';
            else if(res == Math.min(...DeliveryDaysRatingsSeries))
              color = '#f00001';

            DeliveryDaysRatingsColors.push(color);
          });


          //Regular Price & Rank
          let RegularPriceRankSeries = [];
          let RegularPriceRankCategories = [];

          data.RegularPrice_Rank.map((res) => {
            RegularPriceRankSeries.push(res.Rank);

            if(RegularPriceRankCategories.length < 1) {
              RegularPriceRankCategories.push(res.Price);
            }
            else {
              let flag = false;
              RegularPriceRankCategories.map(ress => {
                if(ress != res.Price)
                  flag = true;
              });

              if(flag)
                RegularPriceRankCategories.push(res.Price);
            }
          });


          //setting
          this.setState((prev) => ({
            DeliverydaysNumofproductGraph : {
              options : {
                ...prev.DeliverydaysNumofproductGraph.options,
                xaxis : {
                  categories : DeliveryDaysNumOfProductCategories
                },
                fill: {
                  colors: DeliveryDaysNumOfProductColors
                },
              },
              series : [{ data : DeliveryDaysNumOfProductSeries }]
            },
            DeliverydaysRatingsGraph : {
              options : {
                ...prev.DeliverydaysRatingsGraph.options,
                xaxis : {
                  categories : DeliveryDaysRatingsCategories
                },
                fill: {
                  colors: DeliveryDaysRatingsColors
                },
              },
              series : [{ data : DeliveryDaysRatingsSeries }]
            },
            RatingsNumofproductGraph : {
              ...prev.RatingsNumofproductGraph,
              series : [{ data : RatingsNumOfProductSeries }]
            },
            RegularpriceRatingsGraph : {
              ...prev.RegularpriceRatingsGraph,
              series : [{ data : RegularPriceRatingsSeries }]
            },
            RegularpriceRankGraph : {
              options : {
                ...prev.RegularpriceRankGraph.options,
                xaxis : {
                  categories : RegularPriceRankCategories
                },
              },
              series : [{ data : RegularPriceRankSeries }]
            },
          }));
        }
      });
    }

    const changeOptionBrand = (...args) => {
      var SsearchCondition = {};
      console.log('changeOptionBrand',args[0] , statesItems.searchCondition );
      
      this.setState({
        selectedOptionsBrand: [args[0]]
      });

      SsearchCondition.FromDate = statesItems.searchCondition.FromDate;
      SsearchCondition.ToDate = statesItems.searchCondition.ToDate;
      SsearchCondition.Period_Unit = statesItems.searchCondition.Period_Unit;
      SsearchCondition.Channel_Upper = statesItems.searchCondition.Channel_Upper;
      SsearchCondition.Channel_Lower = statesItems.searchCondition.Channel_Lower;
      SsearchCondition.Keyword = statesItems.searchCondition.Keyword;
      SsearchCondition.Selected_Channel = args[0].value;

      //getBrandDistribution(SsearchCondition);  
      getGetCommerceIndicator(SsearchCondition);
    }

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
                          <th style={{ width: '15%' }}>Channel</th>
                          <td style={{ width: '85%' }} colSpan="3">
                            <ChannelButton searchStart={searchStart} searchBtnClick={statesItems.searchBtnClick} tabAtribute={[false,true,false]}/>
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
                                    id="keyword"
                                    placeholder="No Keywords"
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

        
        <ul className="tab-list mt-5">
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

        <Row className="mt-2">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className="box-title">
                  <h2>Commerce Indicatior</h2>
                </div>

                <div className="graph-area box-line pl-2 pr-5">
                  {chartDataArray.map((list , indx) => {
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
                                { statesChart.activeId === Number(`${indx + 1}`) && 
                                <div className='chart-area bor-none'>
                                  <CompareLine options={item.options} series={item.series} height={350} className="chart-bar" />
                                </div>
                                }
                              </div>
                            );
                          })}
                        </div>
                      )
                  })}
                </div>

                <div className="box-line tbl-wrap">
                  <p className="total-count">단위 : 건</p>
                  <div className="tbl-no-page tbl-scroll-auto">
                    <ReactTable
                      className='table'
                      data={this.state.commerceTable}
                      columns={this.state.commerceColumn}
                      defaultPageSize={10}
                      sortable={false}
                    />
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
                  <h2>Price Indicatior</h2>
                </div>

                <ul className="analysis-tab-list">
                  {indicatiorTit.map((item, idx) => {
                    return (
                      // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                      <li 
                        key={idx} 
                        onClick={this.tabListClickEvt}
                        className={`analysis-item-${item.id} ${statesChart.activeTabId === Number(item.id) ? 'active' : ""}` }
                      >
                        <span className='title'>{item.title}</span>
                      </li>
                    );
                  })}
                </ul>

                <div className="tab-chart-area mt-4">
                  {priceChartDataArray.map((list , indx) => {
                      return(
                        <div 
                          key={indx} 
                          className={`analysis-item-${indx + 1} graph-list`} style={statesChart.activeTabId === Number(`${indx + 1}`) ? {display : 'block'} : {display : 'none'}}
                        >
                          {list.map((item, idx) => {
                            return(
                              <div
                                key={idx}
                              >
                                { statesChart.activeTabId === Number(`${indx + 1}`) && 
                                <div className='chart-area pl-2 pr-5'>
                                  <CompareLine options={item.options} series={item.series} height={350} className="chart-bar" />
                                </div>
                                }
                              </div>
                            );
                          })}
                        </div>
                      )
                  })}
                </div>

                <div className="box-line tbl-wrap">
                  <p className="total-count">단위 : 건</p>
                  <div className="tbl-no-page tbl-scroll-auto">
                    <ReactTable
                      className='table'
                      data={this.state.priceTable}
                      columns={this.state.priceColumn}
                      defaultPageSize={10}
                      sortable={false}
                    />
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
                  <h2>Product&amp;Price Indicator</h2>
                </div>

                <div className="bx_select_area mt-3">
                  <span className="select-title">Channel</span>
                  <FormGroup className="select-box mb-0">
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={statesItems.selectedOptionsPP}
                      onChange={changeOptionPP}
                      options={statesItems.selectedOptionsBase}
                    />
                  </FormGroup>
                </div>

                <div className="box-area pattern-map-area price-indicator-area">
                  <div className="box-left">
                    <div className="pattern-tit"><span>Delivery days &amp; Num of Product</span></div>
                    <p className="total-count">단위 : 건</p>
                    <CompareBar options={this.state.DeliverydaysNumofproductGraph.options} series={this.state.DeliverydaysNumofproductGraph.series} type="bar" height={350} className="analysis-chart-bar" />
                  </div>
                  <div className="box-right">
                    <div className="pattern-tit"><span>Ratings &amp; Num of Product</span></div>
                    <p className="total-count">단위 : 건</p>
                    <div className="pd30">
                      <CompareScatter options={this.state.RatingsNumofproductGraph.options} series={this.state.RatingsNumofproductGraph.series} type="scatter" height={320} />
                    </div>
                  </div>
                </div>

                <div className="box-area pattern-map-area price-indicator-area">
                  <div className="box-left">
                    <div className="pattern-tit"><span>Regular Price &amp; Ratings</span></div>
                    <p className="total-count">단위 : 건</p>
                    <div className="pd30">
                      <CompareScatter options={this.state.RegularpriceRatingsGraph.options} series={this.state.RegularpriceRatingsGraph.series} type="scatter" height={320} />
                    </div>
                  </div>
                  <div className="box-right">
                    <div className="pattern-tit"><span>Delivery days &amp; Ratings</span></div>
                    <p className="total-count">단위 : 건</p>
                    <CompareBar options={this.state.DeliverydaysRatingsGraph.options} series={this.state.DeliverydaysRatingsGraph.series} type="bar" height={350} className="analysis-chart-bar" />
                  </div>
                </div>

                <div className="box-line pattern-map-area price-indicator-area">
                  <div className="pattern-tit"><span>Regular Price &amp; Rank</span></div>
                  <p className="total-count">단위 : 건</p>
                  <div className="pt-4 pl-5 pr-5">
                    <CompareLine options={this.state.RegularpriceRankGraph.options} series={this.state.RegularpriceRankGraph.series} type="line" height={350} />
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
                  <h2>Brand Distribution</h2>
                </div>

                <div className="bx_select_area mt-3">
                  <span className="select-title">Channel</span>
                  <FormGroup className="select-box mb-0">
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      name="form-field-name"
                      value={statesItems.selectedOptionsBrand}
                      onChange={changeOptionBrand}
                      options={statesItems.selectedOptionsBase}
                    />
                  </FormGroup>
                </div>

                <div className="box-line brand-chart-area mb-5">
                  <div className="pd30">
                    <CompareScatter options={brandBubbleData.options} series={statesItems.brandBubbleData} type="scatter" height={500} />
                  </div>
                </div>

                <div className="box-title">
                  <h2>Brand</h2>
                  <div className="brand-tag-list">
                    <ul className="list_tag">
                      {statesItems.selectArray.map((item, idx) =>{
                        return(
                            // eslint-disable-next-line react/no-array-index-key
                          <li key={idx}>{item.name} <Button close onClick={() => removeBrandDistribution(item.id)} /></li>
                        )
                      })}
                    </ul>
                  </div>
                </div>

                <div className="box-area graph-area mb-5">
                  <div className="box-left">
                    <div className="bx_name"><span>Product Rank</span></div>
                    <p className="cont-noti">단위 : 원</p>
                    <CompareLine options={statesItems.ProductRankOpt} series={statesItems.ProductRankSeries} height={totalGraphpp.height} />
                  </div>
                  <div className="box-right">
                    <div className="bx_name"><span>Regular Price</span></div>
                    <p className="cont-noti">단위 : 원</p>
                    <CompareLine options={statesItems.RegularPriceOpt} series={statesItems.RegularPriceSeries} height={totalGraphpp.height} />
                  </div>
                </div>

                <div className="box-title">
                  <h2>Product Rank</h2>
                </div>

                <div className="tbl-no-page">
                  <ReactTable
                    className='table'
                    data={statesItems.BrandProductData}
                    columns={ProductColumns}
                    defaultPageSize={10}
                    sortable={false}
                  />
                </div>

              </CardBody>
            </Card>
          </Colxx>
        </Row>
      </>
    )
  }
}

export default ProductPrice;