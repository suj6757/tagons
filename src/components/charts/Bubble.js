import React , { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactApexChart from "react-apexcharts";
import { bubbleChartOptions } from './config';
import { getIndustryPfactorGiRelatedwords } from '../../redux/actions';
import axios from 'axios';

const Bubble = (props) => {
  const [bubbleName, setBubbleName] = useState(props.name) ;
  const [bubbleOptions,setBubbleOptions] = useState(bubbleChartOptions);
  const [activeFirstTab, setActiveFirstTab] = useState(props.activeFirstTab) ;
  const dispatch = useDispatch();
  const store = useSelector(state => state.startApp);
  const store2 = useSelector(state => state.industryApp);
  const clickChart = (seriesIndex,factor) => {
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
        param1.Factor = factor ;
        if (store.SearchCondition.activeFirstTab === '1'){
          callUrl = "/api/GetIndustry_PFactor_GI_RelatedWords";
        }
        else {
          callUrl = "/api/GetIndustry_EFactor_TrendAndFactor";
        }
        axios.post(callUrl,param1)
          .then(function (response) {
            //setResData(response.data);
            //setChartData(response.data);
            // console.log('Bubble click', response.data);
            // dispatch(getIndustryPfactorGiRelatedwords(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    }
  }
  useEffect(() => {
    var seriesData = [];
    var bubbleXArr = [];
    var bubbleYArr = [];
    var xMin, xMax, yMin, yMax = 0;

    if (!(store2.iGiBubbleelectData === null || store2.iGiBubbleelectData=== undefined || store2.iGiBubbleelectData === "")){
      store2.iGiBubbleelectData.BubbleData.map((bData) => {
        seriesData.push({
          name: bData.Topics,
          data: [[bData.DGI, bData.SGI,bData.PGI]],
          relationTxt: [
            '<>DGI ('.concat(bData.DGI,')</>'),
            '<>SGI ('.concat(bData.SGI,')</>'),
            '<>PGI ('.concat(bData.PGI,')</>'),
          ],
          tooltipTxt: `DGI: ${bData.DGI}<br/>SGI: ${bData.SGI}<br/>DGI: ${bData.PGI}<br/>`
        });
        bubbleXArr.push(bData.DGI);
        bubbleYArr.push(bData.SGI);
      });
      // bubbleChartOptions.series = seriesData;

      xMin = Math.min.apply(null, bubbleXArr) - 5;
      xMax = Math.max.apply(null, bubbleXArr) + 5;
      yMin = Math.min.apply(null, bubbleYArr) - 5;
      yMax = Math.max.apply(null, bubbleYArr) + 5;
      setBubbleOptions({
        options: {
          chart: {
            toolbar: {
              show: false,
            },
            zoom: {
              enabled: false
            },
            events: {
              click:
                function(event, chartContext, w) {
                  // console.log('scatter_config1' , config.config.series[config.seriesIndex]);
                  if (w.config.seriesIndex >=0 ) {
                    console.log('bubble click ' , w.config);
                    clickChart(w.config.seriesIndex, w.config.series[w.config.seriesIndex].name);
                  }
                }
            },
          },
          tooltip: {
            custom: function({ series, seriesIndex, dataPointIndex, w}) {
              return `${'<div class="arrow_box" style="padding:5px;">' +
              '<span>'} 
                  DGI: ${ Math.trunc(w.config.series[seriesIndex].data[0][0]) } <br/>
                  SGI: ${ Math.trunc(w.config.series[seriesIndex].data[0][1]) } <br/>
                  PGI: ${ Math.trunc(w.config.series[seriesIndex].data[0][2]) } <br/>
              </span></div>`
            }
          },
          dataLabels: {
            enabled: true,
            formatter: function(value, { seriesIndex, dataPointIndex, w }) {
              return w.config.series[seriesIndex].name
            }
          },
          fill: {
            opacity: 0.7
          },
          title: {
            //text: ""
          },
          xaxis: {
            min: 0,
            max: xMax,
            tickAmount: 12,
            type: "category",
            show: false,
            title: {
              text: "DGI"
            },
          },
          yaxis:{
            min: 0,
            max: yMax,
            labels: {
              formatter: function(value, index) {
                return value.toFixed();
              }
            },
            title: {
              text: "SGI"
            },
          },
          legend : {
            show: false ,
          },
          grid: {
            show: false,
          },
          plotOptions: {
            bubble: {
              minBubbleRadius: 20,
            }
          },
        },
        series: seriesData
      });
      console.log('bubble',seriesData);
    }

  },[store2]);

  return (
    <ReactApexChart options={bubbleOptions.options} series={bubbleOptions.series} type="bubble" height={props.height} className={props.className} />
  );
};

export default Bubble;