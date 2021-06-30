import React , { useState , useEffect} from 'react';
import ReactApexChart from "react-apexcharts";
import { scatterDatetimeChartOptions } from './config';
import { useDispatch, useSelector } from 'react-redux';
import { getIndustryPfactorTrendandfactor } from '../../redux/actions';
import axios from 'axios';

const ScatterDatetime = (props) => {
    //라인 옵션
  const [ScatterDatetimeOption, setScatterDatetimeOption] = React.useState(scatterDatetimeChartOptions);
  //서버 호출 후 받는 데이터

  const [resData, setResData] = useState({});
  const [scatterName, setScatter] = useState(props.name) ;
  const [activeFirstTab, setActiveFirstTab] = useState(props.activeFirstTab) ;
  const dispatch = useDispatch();
  const store = useSelector(state => state.startApp);
  const store2 = useSelector(state => state.industryApp);

  const replaceAll = (str,p1,p2) => {
    return str.split(p1).join(p2);
  }
  
  const clickChart = (seriesIndex,name,dataArr,RISE_FALL) => {
    var param1 = {} ;
    var callUrl = "";
    if (seriesIndex >= 0 ){
      
      const categoryUpLow = name.split('-');
      console.log('name' , categoryUpLow[0],  categoryUpLow[1] , dataArr[0] , dataArr[1],store );

      if (!(store.SearchCondition.activeFirstTab === "" || store.SearchCondition.activeFirstTab === null || store.SearchCondition.activeFirstTab === undefined)){
        param1.FromDate = store.SearchCondition.FromDate;
        param1.ToDate = store.SearchCondition.ToDate;
        param1.Category1 = store.SearchCondition.Category1;
        param1.Category2 = store.SearchCondition.Category2;
        param1.Category3 = store.SearchCondition.Category3;
        param1.Keyword = store.SearchCondition.Keyword;
        param1.Category_upper = categoryUpLow[0];
        param1.Name = categoryUpLow[1] ;
        if (store.SearchCondition.activeFirstTab === '1'){
          callUrl = "/api/GetIndustry_PFactor_TrendAndFactor";
        }
        else {
          callUrl = "/api/GetIndustry_EFactor_TrendAndFactor";
        }  
        console.log('파라메터',param1);
        axios.post(callUrl,param1)
        .then(function (response) {
          //setResData(response.data);
          //setChartData(response.data);
          console.log('TrendAndFacto', response.data);
          dispatch(getIndustryPfactorTrendandfactor(response.data));
        })
        .catch(function (error) {
          console.log(error);
        }); 
      }
      
    }

  }
  const setChartData = (chartData) => {
    var seriesData = [];
     
    chartData.Data.map((res) => {
      seriesData.push({
        name: res.Category_upper.concat('-',res.Category_lower),
        data: [[res.P_R_INDEX, res.RISE_FALL]],
      });
    });
    //setResData(chartData);
    console.log("seriesData!!", chartData, resData);
    setScatterDatetimeOption({
        series: seriesData,
        options: {
            chart: {
                height: 350,
                type: 'scatter',
                toolbar: {show:true },
                zoom: {
                    type: 'xy' } ,
                events: {
                  click: function(event, chartContext, config) {
                        // console.log('scatter_config1' , config.config.series[config.seriesIndex]);
                        if (config.seriesIndex >=0 ){
                          clickChart(config.seriesIndex,config.config.series[config.seriesIndex].name,config.config.series[config.seriesIndex].data[0],config.config.series[config.seriesIndex].data[1]);
                        }
                        
                      }
                  },
            },
            annotations: {
                position: "back",
                xaxis: [
                  {
                    x: 1,
                    x2: 1.5,
                    strokeDashArray: 0,
                    borderColor: "#666",
                    fillColor: "#797979",
                    opacity: 0.1
                  },
                  {
                    x: 1.5,
                    x2: 2,
                    strokeDashArray: 0,
                    borderColor: "#666",
                    fillColor: "#fd7b7a",
                    opacity: 0.1
                  }
                ],
                yaxis: [
                  {
                    y: 1,
                    y2: 1.5,
                    strokeDashArray: 0,
                    borderColor: "#666",
                    fillColor: "#c8c4c3",
                    opacity: 0.3
                  },
                  {
                    y: 1.5,
                    y2: 2,
                    strokeDashArray: 0,
                    borderColor: "#666",
                    fillColor: "#bbd5ee",
                    opacity: 0.3
                  }
                ]
              },
            dataLabels: {
                enabled: true,
                formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                    return w.config.series[seriesIndex].name
                },
                offsetX: 0,
                offsetY: -8
            },
            grid: {
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
            },
           //  colors: ['#868686'], // marker&label 회색
            xaxis: {
                min: 1,
                max: 2, //x축은 소수점이 안먹힘
                type: 'numeric',
                // tickPlacement: 'between',
                tickAmount: 2 ,
                show: false
            },
            yaxis: {
                min: 1,
                max: 2,
                tickAmount: 2,
                // forceNiceScale: true
                show: false,
            },
             legend : {
                 show: false ,
                },       

        }
    });

  }
  const callTrendQuadApi = async (paramValue,callUrl) =>{ 
    await axios.post(callUrl,paramValue)
      .then(function (response) {
        setResData(response.data);
        setChartData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    var seriesData = [];
    var param1 = {};

    var callUrl = "";
    if (!(store.SearchCondition.activeFirstTab === "" || store.SearchCondition.activeFirstTab === null || store.SearchCondition.activeFirstTab === undefined)){
      param1.FromDate = replaceAll(store.SearchCondition.FromDate,"-","");
      param1.ToDate = replaceAll(store.SearchCondition.ToDate,"-","");
      param1.Category1 = store.SearchCondition.Category1;
      param1.Category2 = store.SearchCondition.Category2;
      param1.Category3 = store.SearchCondition.Category3;
      param1.Keyword = store.SearchCondition.Keyword;
      if (store.SearchCondition.activeFirstTab === '1'){
        callUrl = "/api/GetIndustry_PFactor_TrendQuad";
      }
      else {
        callUrl = "/api/GetIndustry_EFactor_TrendQuad";
      }    
      callTrendQuadApi(param1,callUrl);
    }

    setScatterDatetimeOption({
        series: seriesData,
        options: {
            chart: {
                height: 350,
                type: 'scatter',
                toolbar: {show:false },
                zoom: {
                    type: 'xy'
                },
                events: {
                  click: function(event, chartContext, config) {
                        console.log('scatter_config2' , config.config.series[config.seriesIndex].data[0]);
                        clickChart(config.seriesIndex,config.config.series[config.seriesIndex].name,config.config.series[config.seriesIndex].data[0],config.config.series[config.seriesIndex].data[1]);
                      }
                  },
            },
            annotations: {
              position: "back",
              xaxis: [
                {
                  x: 1,
                  x2: 1.5,
                  strokeDashArray: 0,
                  borderColor: "#666",
                  fillColor: "#797979",
                  opacity: 0.1
                },
                {
                  x: 1.5,
                  x2: 2,
                  strokeDashArray: 0,
                  borderColor: "#666",
                  fillColor: "#fd7b7a",
                  opacity: 0.1
                }
              ],
              yaxis: [
                {
                  y: 1,
                  y2: 1.5,
                  strokeDashArray: 0,
                  borderColor: "#666",
                  fillColor: "#c8c4c3",
                  opacity: 0.3
                },
                {
                  y: 1.5,
                  y2: 2,
                  strokeDashArray: 0,
                  borderColor: "#666",
                  fillColor: "#bbd5ee",
                  opacity: 0.3
                }
              ]
            },
            dataLabels: {
                enabled: true,
                formatter: function(value, { seriesIndex, dataPointIndex, w }) {
                    return w.config.series[seriesIndex].name
                },
                offsetX: 0,
                offsetY: -8
            },
            grid: {
                xaxis: {
                    lines: {
                        show: true
                    }
                },
                yaxis: {
                    lines: {
                        show: true
                    }
                },
            },
            xaxis: {
                min: 0.9,
                max: 5.1, //x축은 소수점이 안먹힘
                type: 'category',
                tickAmount: 2
            },
            yaxis: {
                min: 0.9,
                max: 2.1,
                tickAmount: 2,
                show: false
            }
        }
    });
    
  }, [store]);
  
  // return(
  //   new ApexCharts(document.querySelector("#chart"), {ScatterDatetimeOption})
  // );

  return (
      <ReactApexChart options={ScatterDatetimeOption.options} series={ScatterDatetimeOption.series} type="scatter" height={props.height} />
  );
};

export default ScatterDatetime;