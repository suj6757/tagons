import React , { useState , useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactApexChart from "react-apexcharts";
import { checkPropTypes } from 'prop-types';
import { lineChartOptions } from './config';
/* Post-Trend */
const Line = (props) => {
    const [lineName, setLineName] = useState(props.name) ;
    const [lineOptions, setLineOptions] = useState(lineChartOptions) ;
    const dispatch = useDispatch();
    const startApp = useSelector(state => state.startApp);
    const industryApp = useSelector(state => state.industryApp);
  
    useEffect(() => {
        var categoryArr = [];
        var toolCate = [];
        var postArr = [];
        var preArr = [];

        if (!(industryApp.iPfactorTrendandfactor === null || industryApp.iPfactorTrendandfactor === undefined || industryApp.iPfactorTrendandfactor === "" || JSON.stringify(industryApp.iPfactorTrendandfactor) === "{}")) {
            //이하 퍼센트 계산
            const percent = industryApp.iPfactorTrendandfactor.PreTrendChange;
            let resultPercent = percent.substr(0, percent.indexOf('%'));
            
            //양수/음수 판별
            if(resultPercent >= 0) {
                resultPercent = 100 - resultPercent;
            }
            //셋팅
            props.setPercent(`${resultPercent  }%`);

            //이하 차트 데이터
            const fromDate = startApp.SearchCondition.FromDate;
            const toDate = startApp.SearchCondition.ToDate;
            const preEndIndex = industryApp.iPfactorTrendandfactor.TrendData.length - 1;
            const clickData = industryApp.iPfactorTrendandfactor.Name;
        
            industryApp.iPfactorTrendandfactor.TrendData.map((tData, index) => {
                const dateString = tData.date.substring(0,10);
               
                // series (line data)
                if(props.showPreTrend) {
                    // post만 보여줄 경우
                    if(dateString < toDate) {
                        postArr.push(tData.Value);
                        preArr.push(null);
                    }
                    else if(dateString === toDate) {
                        postArr.push(tData.Value);
                        preArr.push(tData.Value);
                    }
                    else {
                        postArr.push(null);
                        preArr.push(tData.Value);
                    }
                }
                else if(dateString <= toDate) {
                    postArr.push(tData.Value);
                }
                else{
                    postArr.push(null);
                }

                // x축 label
                if(dateString === fromDate || dateString === toDate) {
                    categoryArr.push(dateString);
                }
                else if(preEndIndex === index){
                    categoryArr.push(dateString);
                }
                else{
                    categoryArr.push("");
                }

                toolCate.push(dateString);
            });

            setLineOptions({
                ...lineOptions,
                options : {
                    title : {
                        text : clickData
                    },
                    xaxis : {
                        categories : categoryArr,
                        show : false
                    },
                    tooltip: {
                        x: {
                            formatter: function(value) {
                                return toolCate[value - 1];
                            }
                        }
                    },
                    grid : {
                        padding : {
                            top : 0,
                            bottom : 0,
                            right : 6,
                            left : 37 ,
                        }
                    },
                    colors : ['#25e9ae', '#d50028']
                },
                series : [
                    { name: "post-Trend",  data: postArr },
                    { name: "pre-Trend",  data: preArr }
                ]
            });
        }
        else{
          setLineOptions({
                ...lineOptions,
                options : {
                    title : {
                        text : ""
                    },
                    xaxis : {
                        categories : [],
                        show : false
                    },
                    grid : {
                        padding : {
                            top : 0,
                            bottom : 0,
                            right : 6,
                            left : 37 ,
                        }
                    },
                    colors : []
                },
                series : []
            });
        }
    },[industryApp.iPfactorTrendandfactor, props.showPreTrend]);

    return (
        <ReactApexChart options={lineOptions.options} series={lineOptions.series} type="line" height={props.height} />
    );
};

export default Line;