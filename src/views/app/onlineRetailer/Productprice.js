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
import { Columns, ProductColumns, TableData, TableData2, ProductData } from './tableData';
import 'react-datepicker/dist/react-datepicker.css';

// eslint-disable-next-line react/prefer-stateless-function
class ProductPrice extends React.Component {
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행

    this.state = {
      startDate: new Date(),
      endDate: new Date(),
      checkInfo: [
        { id: 1, value: "Daily", isChecked: false },
        { id: 2, value: "Weekly", isChecked: false },
        { id: 3, value: "Monthly", isChecked: false },
        { id: 4, value: "Yearly", isChecked: false }
      ],
      selectedOptions: null,
      activeId: 1,
      activeTabId: 1
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

  changeOption = (...args) => {
    this.setState({
      selectedOptions: [args[0]]
    });
  }

  listClickEvt = (evt) => {
    evt.preventDefault();

    const getNum = Number(evt.currentTarget.className.replace('item-',''));

    this.setState({
      activeId : getNum,
    });
  }

  tabListClickEvt = (evt) => {
    evt.preventDefault();
    const getNum = Number(evt.currentTarget.className.replace('analysis-item-',''));

    this.setState({
      activeTabId : getNum,
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

    const usersChartData = [
      {
        series: [
          {
            name: "Coupang",
            data: [20, 10, 27, 19, 35, 42, 50,]
          },
          {
            name: "11st",
            data: [12, 52, 32, 19, 22, 10, 60,]
          },
          {
            name: "Gmarket",
            data: [28, 22, 46, 39, 15, 21, 58,]
          },
          {
            name: "Timon",
            data: [22, 45, 30, 22, 35, 27, 65,]
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
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
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
          
        },
      },
    ]

    const sessionsChartData = [
      {
        series: [
          {
            name: "Coupang",
            data: [20, 10, 27, 19, 35, 42, 50,]
          },
          {
            name: "11st",
            data: [12, 52, 32, 19, 22, 10, 60,]
          },
          {
            name: "Gmarket",
            data: [28, 22, 46, 39, 15, 21, 58,]
          },
          {
            name: "Timon",
            data: [22, 45, 30, 22, 35, 27, 65,]
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
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
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
          
        },
      },
    ]

    const conversionChartData = [
      {
        series: [
          {
            name: "Coupang",
            data: [20, 10, 27, 19, 35, 42, 50,]
          },
          {
            name: "11st",
            data: [12, 52, 32, 19, 22, 10, 60,]
          },
          {
            name: "Gmarket",
            data: [28, 22, 46, 39, 15, 21, 58,]
          },
          {
            name: "Timon",
            data: [22, 45, 30, 22, 35, 27, 65,]
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
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
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
          
        },
      },
    ]

    const bounceChartData = [
      {
        series: [
          {
            name: "Coupang",
            data: [20, 10, 27, 19, 35, 42, 50,]
          },
          {
            name: "11st",
            data: [12, 52, 32, 19, 22, 10, 60,]
          },
          {
            name: "Gmarket",
            data: [28, 22, 46, 39, 15, 21, 58,]
          },
          {
            name: "Timon",
            data: [22, 45, 30, 22, 35, 27, 65,]
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
            categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
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
          
        },
      },
    ]

    const numProductData = {
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
      series: [{data: [85, 57, 32, 21, 15, 6],}]
    }

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

    const brandBubbleData = {
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
      series: [{ name: ["Gillette"] , data: [[36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]}]
    }

    const totalGraph = {
      series: [
        {
          name: "Gillette",
          data: [0.77, 0.88, 0.99, 0.11, 0.12, 0.34, 0.56, 0.4, 0.56, 0.41, 0.42, 0.44, 0.55, 0.66, 0.77, 0.99, 0.11, 0.55, 0.11, 0.12, 0.13, 0.15, 0.46, 0.79, 0.53, 0.12, 0.86, 0.77, 0.2, 0.55, 0.44]
        },
        {
          name: "Downy",
          data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55,0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
        },
      ],
      height: 300,
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
        colors: ['#4f4f4f','#dc8043'],
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
    }

    const chartDataArray = [usersChartData, sessionsChartData, conversionChartData];

    const priceChartDataArray = [usersChartData, sessionsChartData, conversionChartData, bounceChartData];

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
                            <ChannelButton />
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
                      data={TableData}
                      columns={Columns}
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
                      data={TableData2}
                      columns={Columns}
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
                      value={selectedOptionsBaseCheck}
                      onChange={this.changeOption}
                      options={selectedOptionsBase}
                    />
                  </FormGroup>
                </div>

                <div className="box-area pattern-map-area price-indicator-area">
                  <div className="box-left">
                    <div className="pattern-tit"><span>Delivery days &amp; Num of Product</span></div>
                    <p className="total-count">단위 : 건</p>
                    <CompareBar options={numProductData.options} series={numProductData.series} type="bar" height={350} className="analysis-chart-bar" />
                  </div>
                  <div className="box-right">
                    <div className="pattern-tit"><span>Ratings &amp; Num of Product</span></div>
                    <p className="total-count">단위 : 건</p>
                    <div className="pd30">
                      <CompareScatter options={productBubbleData.options} series={productBubbleData.series} type="scatter" height={320} />
                    </div>
                  </div>
                </div>

                <div className="box-area pattern-map-area price-indicator-area">
                  <div className="box-left">
                    <div className="pattern-tit"><span>Regular Price &amp; Ratings</span></div>
                    <p className="total-count">단위 : 건</p>
                    <div className="pd30">
                      <CompareScatter options={productBubbleData.options} series={productBubbleData.series} type="scatter" height={320} />
                    </div>
                  </div>
                  <div className="box-right">
                    <div className="pattern-tit"><span>Delivery days &amp; Ratings</span></div>
                    <p className="total-count">단위 : 건</p>
                    <CompareBar options={ratingsData.options} series={ratingsData.series} type="bar" height={350} className="analysis-chart-bar" />
                  </div>
                </div>

                <div className="box-line pattern-map-area price-indicator-area">
                  <div className="pattern-tit"><span>Regular Price &amp; Rank</span></div>
                  <p className="total-count">단위 : 건</p>
                  <div className="pt-4 pl-5 pr-5">
                    <CompareLine options={priceRankData.options} series={priceRankData.series} type="line" height={350} />
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
                      value={selectedOptionsChannelCheck}
                      onChange={this.changeOption}
                      options={selectedOptionsChannel}
                    />
                  </FormGroup>
                </div>

                <div className="box-line brand-chart-area mb-5">
                  <div className="pd30">
                    <CompareScatter options={brandBubbleData.options} series={brandBubbleData.series} type="scatter" height={500} />
                  </div>
                </div>

                <div className="box-title">
                  <h2>Brand</h2>
                  <div className="brand-tag-list">
                    <ul className="list_tag">
                      <li>Gillette <Button close /></li>
                      <li>Downy <Button close /></li>
                      <li>Dove <Button close /></li>
                    </ul>
                  </div>
                </div>

                <div className="box-area graph-area mb-5">
                  <div className="box-left">
                    <div className="bx_name"><span>Product Rank</span></div>
                    <p className="cont-noti">단위 : 원</p>
                    <CompareLine options={totalGraph.options} series={totalGraph.series} height={totalGraph.height} />
                  </div>
                  <div className="box-right">
                    <div className="bx_name"><span>Regular Price</span></div>
                    <p className="cont-noti">단위 : 원</p>
                    <CompareLine options={totalGraph.options} series={totalGraph.series} height={totalGraph.height} />
                  </div>
                </div>

                <div className="box-title">
                  <h2>Product Rank</h2>
                </div>

                <div className="tbl-no-page">
                  <ReactTable
                    className='table'
                    data={ProductData}
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