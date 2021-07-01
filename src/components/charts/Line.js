import React , { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactApexChart from "react-apexcharts";
import { lineChartOptions } from './config';
import { checkPropTypes } from 'prop-types';

const Line = (props) => {
    const [lineName, setLineName] = useState(props.name) ;
    const [lineOptions,setLineOptions] = useState(lineChartOptions) ;
    const dispatch = useDispatch();
    const startApp = useSelector(state => state.startApp);
    const industryApp = useSelector(state => state.industryApp);
  
    useEffect(() => {    
        var seriesData = [];
        var categoryArr = [];
        var postArr = [];
        var preArr = [];

        if (!(industryApp.iPfactorTrendandfactor === null || industryApp.iPfactorTrendandfactor === undefined || industryApp.iPfactorTrendandfactor === "")) {
            //이하 퍼센트 계산
            let percent = industryApp.iPfactorTrendandfactor.PreTrendChange;
            let resultPercent = percent.substr(0, percent.indexOf('%'));
            let percentStr = resultPercent;

            //양수/음수 판별
            if(resultPercent >= 0) {
                resultPercent = 100 - resultPercent;
            }
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

            //이하 차트 데이터
            let toDate = startApp.SearchCondition.ToDate;
            let preEndIndex = industryApp.iPfactorTrendandfactor.TrendData.length - 1;
        
            industryApp.iPfactorTrendandfactor.TrendData.map((tData, index) => {
                let dateString = tData.date.substring(0,10);

                // series (line data)
                if(props.showPreTrend) {
                    // post만 보여줄 경우
                    if(dateString < toDate) {
                        postArr.push(tData.Value);
                        preArr.push(null);
                    }
                    else if(dateString == toDate) {
                        postArr.push(tData.Value);
                        preArr.push(tData.Value);
                    }
                    else {
                        postArr.push(null);
                        preArr.push(tData.Value);
                    }
                }
                else {
                    // post, pre 함께 보여줄 경우
                    if(dateString <= toDate) {
                        postArr.push(tData.Value);
                    }
                }

                // x축 label
                if(dateString == toDate) {
                    categoryArr.push(dateString);
                }
                else if(preEndIndex == index){
                    categoryArr.push(dateString);
                }
                else{
                    categoryArr.push("");
                }
            });

            setLineOptions({
                options: {
                    chart: {
                        type: 'line',
                        height: 350,
                        toolbar: {
                            show: false,
                        },
                        // colors:['#F44336', '#E91E63', '#9C27B0'],
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
                    legend: { // 범례
                        show: false
                    },
                    colors:['#25e9ae', '#d50028']
                },
                series: [
                    { name: "post-Trend",  data: postArr },
                    { name: "pre-Trend",  data: preArr }
                ]
            });
        }

    },[industryApp, props.showPreTrend]);

    return (
        <ReactApexChart options={lineOptions.options} series={lineOptions.series} type="line" height={props.height} />
    );
};

export default Line;