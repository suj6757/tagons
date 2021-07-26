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
import { Colxx } from '../../../components/common/CustomBootstrap';
//import {ReactTable} from '../../../containers/ui/ReactTableCards';
import CustomSelectInput from '../../../components/common/CustomSelectInput';
import CompareBar from '../../../components/charts/CompareBar';
import CompareLine from '../../../components/charts/CompareLine';
import { TableData } from './data';

// eslint-disable-next-line react/prefer-stateless-function
class GoogleAnalytics extends React.Component {
  
  constructor(props) {
    super(props); // React.Component의 생성자 메소드를 먼저 실행

    this.state = {
      
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
            enabled: true,
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

      activeId: 1,
      listActiveId: 1,
      selectedOptions: null,
      activeTab: '1',
      checkInfo: [
        { id: 1, value: "Daily", isChecked: false },
        { id: 2, value: "Weekly", isChecked: false },
        { id: 3, value: "Monthly", isChecked: false },
        { id: 4, value: "Yearly", isChecked: false }
      ], 
    };

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
    const statesChart = this.state;
    const statesItems = this.state;
    const { internalIndexSelected , externalSelected } = this.state;

    const internalIndex = [
      { label: 'Users', value: 'internal1', key: 0 },
      { label: 'Buzz', value: 'interna12', key: 1 },
    ];

    const externalIndex = [
      { label: 'Users', value: 'external1', key: 0 },
      { label: 'Buzz', value: 'external2', key: 1 },
    ];

    const indiCont = [
      {id: 1, title :  'Users',},
      {id: 2, title :  'Sessions',},
      {id: 3, title :  'Conversion',},
      {id: 4, title :  'Bounce',},
    ]

    const usersChartData = [
      {id: 1, series: [{data: [17, 15, 50, 120, 30], title: 'Users', average: [5, 50, 20, 1.5, 45.3],}]},
    ]

    const sessionsChartData = [
      {id: 1, series: [{data: [50, 20, 55, 100, 140], title: 'Sessions', average: [5, 50, 20, 1.5, 45.3],}]},
    ]

    const conversionChartData = [
      {id: 1, series: [{data: [23, 10, 82, 35, 100], title: 'Conversion', average: [5, 50, 20, 1.5, 45.3],}]},
    ]

    const bounceChartData = [
      {id: 1, series: [{data: [10, 20, 30, 40, 50], title: 'Bounce', average: [5, 50, 20, 1.5, 45.3],}]},
    ]

    const chartDataArray = [usersChartData, sessionsChartData, conversionChartData, bounceChartData];

    const initDemoAnalysis = [
      {id: 1, title :  'Gender',},
      {id: 2, title :  'Ages',},
      {id: 3, title :  'Device',},
      {id: 4, title :  'Region',},
    ]

    const genderChartData = [
      {
        options: {
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
              text : 'dwew',
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
              text: 'sss',
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
        series: [{data: [17, 50], title: 'Gender', average: [5, 50, ],}]
      },
      {
        options: {
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
              text : 'hghgh',
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
              text: 'erer',
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
        series: [{data: [15, 30], title: 'Gender', average: [5, 50, ],}]},
      {
        options: {
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
              text : 'ggbvn',
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
              text: 'eeee',
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
        series: [{data: [50, 30], title: 'Gender', average: [5, 50, ],}]},
      {
        options: {
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
              text : '222',
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
              text: 'dddd',
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
        series: [{data: [17, 15], title: 'Gender', average: [5, 50, ],}]
      },
    ]

    const agesChartData = [
      {
        options: {
          chart: {
            width: '45%',
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
              text : 'sds',
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
              text: 'www',
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
        series: [{data: [50, 20], title: 'Sessions', average: [5, 50, ],}]
      },
    ]

    const deviceChartData = [
      {
        options: {
          chart: {
            width: '45%',
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
              text : 'wqwq',
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
              text: 'ccc',
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
        series: [{data: [23, 10], title: 'Conversion', average: [5, 50,],}]
      },
    ]

    const regionChartData = [
      {
        options: {
          chart: {
            width: '45%',
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
              text : 'asaa',
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
              text: 'hhhh',
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
        series: [{data: [10, 20], title: 'Bounce', average: [5, 50,],}]
      },
    ]

    const analysisChartArray = [genderChartData, agesChartData, deviceChartData, regionChartData];


    const columns = [
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
    ]

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
                                    <span>{items.value}</span>
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
                  <h2>GA Keyword Gap</h2>
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
                                <div className='chart-area'>
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
                        value={internalIndexSelected}
                        onChange={this.changeOption}
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
                        value={externalSelected}
                        onChange={this.changeOption}
                        options={externalIndex}
                      />
                    </FormGroup>
                  </div>
                  {/* <ReactTable
                    data={TableData}
                    columns={columns}
                  /> */}
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
                  {analysisChartArray.map((list , indx) => {
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
                    <CompareLine options={statesItems.totalGraph.options} series={statesItems.totalGraph.series} height={statesItems.totalGraph.height} />
                  </div>
                  <div className='graph-area total-area title-type box-right'>
                    <p className='bx_name'>Conversion rate / Bounce rate</p>
                    <p className='cont-noti'>* 지수화하여 표시</p>
                    <CompareLine options={statesItems.totalGraph.options} series={statesItems.totalGraph.series} height={statesItems.totalGraph.height} />
                  </div>
                </div>
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        {/* e: GA Broad Trend Chart */}

        {/* s: GA Keyword Gap */}
        <Row className="mt-5">
          <Colxx xxs="12">
            <Card>
              <CardBody>
                <div className="box-title">
                  <h2>GA Keyword Gap</h2>
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
                      Bounce
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
                        <CompareLine options={statesItems.keywordGap.options} series={statesItems.keywordGap.series} height={statesItems.keywordGap.height} />
                      </div>
                      <div className="graph-area total-area title-type keyword-gap-type mt-2">
                        <div className="keyword-chart-area">
                          {genderChartData.map((item, idx) => {
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
                  <TabPane tabId="2">
                    { statesItems.activeTab === '2' &&
                      <>
                      <div className='graph-area total-area title-type'>
                        <p className='cont-noti'>단위: 건</p>
                        <CompareLine options={statesItems.keywordGap.options} series={statesItems.keywordGap.series} height={statesItems.keywordGap.height} />
                      </div>
                      <div className="graph-area total-area title-type keyword-gap-type mt-2">
                        <div className="keyword-chart-area">
                          {agesChartData.map((item, idx) => {
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
                  <TabPane tabId="3">
                  { statesItems.activeTab === '3' &&
                      <>
                      <div className='graph-area total-area title-type'>
                        <p className='cont-noti'>단위: 건</p>
                        <CompareLine options={statesItems.keywordGap.options} series={statesItems.keywordGap.series} height={statesItems.keywordGap.height} />
                      </div>
                      <div className="graph-area total-area title-type keyword-gap-type mt-2">
                        <div className="keyword-chart-area">
                          {genderChartData.map((item, idx) => {
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
                  <TabPane tabId="4">
                  { statesItems.activeTab === '4' &&
                      <>
                      <div className='graph-area total-area title-type'>
                        <p className='cont-noti'>단위: 건</p>
                        <CompareLine options={statesItems.keywordGap.options} series={statesItems.keywordGap.series} height={statesItems.keywordGap.height} />
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
                {/* e: 탭메뉴 */}
              </CardBody>
            </Card>
          </Colxx>
        </Row>
        {/* e: GA Keyword Gap */}

      </>
    )
  }
}

export default GoogleAnalytics;
