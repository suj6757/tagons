import React , { useState , useEffect}  from 'react';
import ReactApexChart from "react-apexcharts";
import { barChartOptions } from './config';
import { useDispatch, useSelector } from 'react-redux';
import { getIndustryPfactorTrendandfactor, getIndustryTotalcategoryList } from '../../redux/actions';

const Bar = (props) => {
    const [barName, setbarName] = useState(props.name) ;
    const [barSentiName, setBarSentiName] = useState(props.activeTab) ;
    const dispatch = useDispatch();
    const store = useSelector(state => state.startApp);
    const store2 = useSelector(state => state.industryApp);

    //라인 옵션
    const [barOption, setBarOption] = React.useState(barChartOptions);


    useEffect(() => {
      var seriesData = [];
      var dataArr = [];
      var categoryArr = [];
      var iPfactorTrendandfactor = [];
      var colorArrr = [];
      var barlen = 0;
      if (!(store2.iPfactorTrendandfactor === null || store2.iPfactorTrendandfactor=== undefined || store2.iPfactorTrendandfactor === "")){
        if (barSentiName === '1') {
          iPfactorTrendandfactor = store2.iPfactorTrendandfactor.SentimentFactorData;
        }
        else{
          iPfactorTrendandfactor = store2.iPfactorTrendandfactor.BrandFactorData;
        }
        
        iPfactorTrendandfactor.map((tData,index) => {
          dataArr.push(tData.Value);
          categoryArr.push(tData.name);
          if (index === 0){
            colorArrr.push('#8B0000');
          }
          else if (index === (barlen -1)){
            colorArrr.push('#00008B'); 
          }
          else{
            colorArrr.push('#808080'); 
          }
        });
        /* 
        barlen = iPfactorTrendandfactor.length;
        if (barlen === 0){
          if (props.activeTab === '1')
            alert('Sentiment Factor 데이타가 없습니다');
          else
            alert('Brand 데이타가 없습니다');
        } */
        // bubbleChartOptions.series = seriesData;
        console.log('color', colorArrr );
        seriesData = [{
                  data: dataArr}];
        
        setBarOption({
          options: {
              chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                  show: false,
                },
                zoom: {
                  enabled: false
                },
                
              },
              dataLabels: {
                enabled: true
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
              },
            },
            series: seriesData,
         }
        );
        console.log('bar',seriesData); 
      }
        
    }, [store2]);

    useEffect(() => {
      var seriesData = [];
      var dataArr = [];
      var categoryArr = [];
      var colorArrr = [];
      var iPfactorTrendandfactor = [];
      var barlen = 0;
      
      if (!(store2.iPfactorTrendandfactor === null || store2.iPfactorTrendandfactor=== undefined || store2.iPfactorTrendandfactor === "")){
        if (props.activeTab === '1') {
          iPfactorTrendandfactor = store2.iPfactorTrendandfactor.SentimentFactorData;
        }
        else{
          iPfactorTrendandfactor = store2.iPfactorTrendandfactor.BrandFactorData;
        }
        console.log('data', store2.iPfactorTrendandfactor );

        iPfactorTrendandfactor.map((tData,index) => {
          dataArr.push(tData.Value);
          categoryArr.push(tData.name);
          if (index === 0){
            colorArrr.push('#8B0000');
          }
          else if (index === (barlen -1)){
            colorArrr.push('#00008B'); 
          }
          else{
            colorArrr.push('#808080'); 
          }
        });
        /* 
        barlen = iPfactorTrendandfactor.length;        
        if (barlen === 0){
          if (props.activeTab === '1')
            alert('Sentiment Factor 데이타가 없습니다');
          else
            alert('Brand 데이타가 없습니다');
        } */
        seriesData = [{
                  data: dataArr}];

        setBarOption({
          options: {
              chart: {
                type: 'bar',
                height: 350,
                toolbar: {
                  show: false,
                },
                zoom: {
                  enabled: false
                }
                
              },
              dataLabels: {
                enabled: true 
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
              },
            },
            series: seriesData,
         }
        );
      }
      
    }, [props.activeTab]);
    return (
        <ReactApexChart options={barOption.options} series={barOption.series} type="bar" height={props.height} />
    );
};

export default Bar;