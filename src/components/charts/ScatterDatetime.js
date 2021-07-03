import React , { useState , useEffect} from 'react';
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { scatterDatetimeChartOptions } from './config';
import { getIndustryPfactorTrendandfactor } from '../../redux/actions';

const ScatterDatetime = (props) => {
  var categoryData = [];
  const [ScatterDatetimeOption, setScatterDatetimeOption] = React.useState(scatterDatetimeChartOptions);
  const [resData, setResData] = useState({});
  const [categoryStateData, setCategoryStateData] = useState([]);
  const [scatterName, setScatter] = useState(props.name) ;
  const [activeFirstTab, setActiveFirstTab] = useState(props.activeFirstTab) ;
  const dispatch = useDispatch();
  const store = useSelector(state => state.startApp);
  const store2 = useSelector(state => state.industryApp);
  // api 호출시 로딩바 적용 테스트
  const [loading, setLoading] = useState(false);
  const [loaderror, setLoadError] = useState(null);

  const replaceAll = (str,p1,p2) => {
    return str.split(p1).join(p2);
  }

  const clickChart = (seriesIndex,seriesData) => {
    var param1 = {} ;
    var callUrl = "";
    
    if (seriesIndex >= 0 ){
      // const categoryUpLow = name.split('-');
      const categoryUpper = categoryData[seriesIndex][0];
      const name = categoryData[seriesIndex][1]
      if (!(store.SearchCondition.activeFirstTab === "" || store.SearchCondition.activeFirstTab === null || store.SearchCondition.activeFirstTab === undefined)){
        param1.FromDate = store.SearchCondition.FromDate;
        param1.ToDate = store.SearchCondition.ToDate;
        param1.Category1 = store.SearchCondition.Category1;
        param1.Category2 = store.SearchCondition.Category2;
        param1.Category3 = store.SearchCondition.Category3;
        param1.Keyword = store.SearchCondition.Keyword;
        param1.Category_upper = categoryUpper
        param1.Name = name
        if (store.SearchCondition.activeFirstTab === '1'){
          callUrl = "/api/GetIndustry_PFactor_TrendAndFactor";
        }
        else {
          callUrl = "/api/GetIndustry_EFactor_TrendAndFactor";
        }
        // console.log('파라메터 clickChart ',callUrl ,param1);
        axios.post(callUrl,param1)
          .then(function (response) {
            // console.log('TrendAndFacto', response.data);
            dispatch(getIndustryPfactorTrendandfactor(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      }

    }

  }
  const clickChart2 = (seriesIndex,Categoryupper,Categorylower) => {
    var param1 = {} ;
    var callUrl = "";
    if (seriesIndex >= 0 ){
      if (!(store.SearchCondition.activeFirstTab === "" || store.SearchCondition.activeFirstTab === null || store.SearchCondition.activeFirstTab === undefined)){
        param1.FromDate = store.SearchCondition.FromDate;
        param1.ToDate = store.SearchCondition.ToDate;
        param1.Category1 = store.SearchCondition.Category1;
        param1.Category2 = store.SearchCondition.Category2;
        param1.Category3 = store.SearchCondition.Category3;
        param1.Keyword = store.SearchCondition.Keyword;
        param1.Category_upper = Categoryupper;
        param1.Name = Categorylower ;
        if (store.SearchCondition.activeFirstTab === '1'){
          callUrl = "/api/GetIndustry_PFactor_TrendAndFactor";
        }
        else {
          callUrl = "/api/GetIndustry_EFactor_TrendAndFactor";
        }
        // console.log('파라메터 clickChart2', callUrl ,param1);
        axios.post(callUrl,param1)
          .then(function (response) {
            if (!(response.data === "" || response.data === null || response.data === undefined )){
              dispatch(getIndustryPfactorTrendandfactor(response.data));
            }
            else{
              console.log('factor error',response);
            }
          })
          .catch(function (error) {
            console.log('파라메터 clickChart2 error', error);
          });
      }

    }

  }
  const ScatterChartOption = {
      options: {
        chart: {
          height: 350,
          type: 'scatter',
          toolbar: {show:true },
          zoom: {
            type: 'xy'
          } ,
          events: {
            click: function(event, chartContext, config) {
              // console.log('scatter_config1' , config.config);
              if (config.seriesIndex >=0 ){
                clickChart(config.seriesIndex,config.config.series[config.seriesIndex]);
              }
            }
          },
        },
        tooltip: {
          custom: function({ series, seriesIndex, dataPointIndex, w}) {
            const prName = w.config.series[seriesIndex].name;
            const prIndex = w.config.series[seriesIndex].data[0][0];
            const riseFall = w.config.series[seriesIndex].data[0][1]
            return `${'<div class="arrow_box" style="padding:5px;">' +
            '<span>'}
            ${ prName }<br/>
                P_R_INDEX/RISE_FALL: ${ prIndex.toFixed(1) }
                /${ riseFall.toFixed(1) }<br/>
              </span></div>`
          }
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
              opacity: 0.1 ,
              label: {
                text: 'Rise',
                borderWidth: 0,
                position: 'top',
                offsetX: '46%',
                offsetY: -7,
                orientation: 'horizontal',
                style: {
                  background: 'transparent',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#000'
                }
              },
            },
            {
              x: 1.5,
              x2: 2,
              strokeDashArray: 0,
              borderColor: "#666",
              fillColor: "#fd7b7a",
              opacity: 0.1,
              label: {
                text: 'Fall',
                borderWidth: 0,
                position: 'bottom',
                offsetY: 15,
                orientation: 'horizontal',
                style: {
                  background: 'transparent',
                  fontSize: '16px',
                  fontWeight: '700',
                  color: '#000'
                }
              }, 
              
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
              opacity: 0.3 ,
              label: {
                  text: 'P/R Index',
                  borderWidth: 0,
                  offsetX: 75,
                  offsetY: 7,
                  orientation: 'horizontal',
                  style: {
                    background: 'transparent',
                    fontSize: '16px',
                    fontWeight: '700',
                    color: '#000',
                  }
                },
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
        colors: ['#868686'], // marker&label 회색
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
  
  };
  const setChartData = (chartData) => {
    var seriesData = [];
    
    var maxRiseData = {};
    var maxindex = -1;
    
    categoryData = [];    
    chartData.Data.map((res,index) => {
      if (index === 0) {
        maxRiseData = res;
        maxindex =index;
      }
      else if (maxRiseData.RISE_FALL <= res.RISE_FALL){
          maxRiseData = res;
          maxindex =index;
      }
      categoryData.push([res.Category_upper,res.Category_lower]);
      seriesData.push({
        name: res.Category_lower,
        data: [[res.P_R_INDEX, res.RISE_FALL]],
      });
    });

    setScatterDatetimeOption({
      options: ScatterChartOption.options,
      series: seriesData,

    });

    if (maxindex >=0 ){
     clickChart2(maxindex ,chartData.Data[maxindex].Category_upper , chartData.Data[maxindex].Category_lower );
    }
  }
  const callTrendQuadApi = async (paramValue,callUrl) =>{
    setLoading(true);
    await axios.post(callUrl,paramValue)
      .then(function (response) {
        setResData(response.data);
        setChartData(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        setLoading(false);
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
      options: ScatterChartOption.options,
    });

  }, [store.SearchCondition]);
  // Loading 
  if (loading) return <div className="loading" />;
  if (loaderror) return <div>에러가 발생했습니다</div>;
  return (
    <ReactApexChart options={ScatterDatetimeOption.options} series={ScatterDatetimeOption.series} type="scatter" height={props.height} className={props.className} />
  );
};

export default ScatterDatetime;