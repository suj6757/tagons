import React , { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactApexChart from "react-apexcharts";
import { lineChartOptions } from './config';
import { checkPropTypes } from 'prop-types';

const Line = (props) => {
  const [lineName, setLineName] = useState(props.name) ;
  const [lineOptions,setLineOptions] = useState(lineChartOptions) ;
  const dispatch = useDispatch();
  const store = useSelector(state => state.startApp);
  const store2 = useSelector(state => state.industryApp);
  useEffect(() => {    
    var seriesData = [];
    var dataArr = [];
    var categoryArr = [];
     

    if (!(store2.iPfactorTrendandfactor === null || store2.iPfactorTrendandfactor=== undefined || store2.iPfactorTrendandfactor === "")){
      store2.iPfactorTrendandfactor.TrendData.map((tData,index) => {
        dataArr.push(tData.Value);
        if ((store2.iPfactorTrendandfactor.TrendData.length - 1) === index){
          categoryArr.push(tData.date.substring(0,10));
        }
        else{
          categoryArr.push("");
        }
        
      });
      // bubbleChartOptions.series = seriesData;
        seriesData = [{ name: "post-Trend",  data: dataArr }];
        /*
        if (store2.iPfactorTrendandfactor.TrendData.length === 0){
            alert('Post-Trend데이타가 없습니다.');
        } */

        //퍼센트 계산
        let percent = store2.iPfactorTrendandfactor.PreTrendChange;
        let resultPercent = percent.substr(0, percent.indexOf('%'));

        if(resultPercent >= 0) {
            resultPercent = 100 - resultPercent;
        }

        let percentStr = resultPercent;
        //최대비율
        if(resultPercent > 70) {
            percentStr = 70;
        }
        //최소비율
        else if(resultPercent < 20) {
            percentStr = 20;
        }
        //셋팅
        props.setPercent({
            percent : resultPercent + '%',
            percentStr : percentStr + '%'
        });

      setLineOptions({
        options: {
            chart: {
              type: 'line',
              height: 350,
              toolbar: {
                show: false,
              },
              zoom: {
                enabled: false
              }
            },
            dataLabels: {
              enabled: false
            },
            fill: {
              opacity: 0.7
            },
            title: {
              // text: ""
            },
            grid : {
                yaxis : {
                    lines : {
                        show : false
                    }
                }
            },
            xaxis: {
              categories:categoryArr,
              show: false,
            },
            yaxis: {
               
                    show: false,
                },
          },
          series: seriesData,
              }
      );
      
    }

  },[store2]);
  return (
    <ReactApexChart options={lineOptions.options} series={lineOptions.series} type="line" height={props.height} />
  );
};

export default Line;