import React , { useState , useEffect}  from 'react';
import ReactApexChart from "react-apexcharts";
import { useDispatch, useSelector } from 'react-redux';
import { barChartOptions } from './config';
import { getIndustryPfactorTrendandfactor, getIndustryTotalcategoryList } from '../../redux/actions';
/* Sentiment Factor | Brand */
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
      var chartTypeName = "";
      if (!(store2.iPfactorTrendandfactor === null || store2.iPfactorTrendandfactor=== undefined || store2.iPfactorTrendandfactor === "" || JSON.stringify(store2.iPfactorTrendandfactor) === "{}")){
        if (props.activeTab === '1') {          
          if (store.SearchCondition.activeFirstTab === "1"){
            iPfactorTrendandfactor = store2.iPfactorTrendandfactor.SentimentFactorData;
            chartTypeName = "Sentiment Factor"; // ProductFactorData
          }
          else{
            iPfactorTrendandfactor = store2.iPfactorTrendandfactor.ProductFactorData;
            chartTypeName = "Product FactorData"; // ProductFactorData
          }     
        }
        else{
          iPfactorTrendandfactor = store2.iPfactorTrendandfactor.BrandFactorData;
          chartTypeName = "Brand";
        }

        if (!(iPfactorTrendandfactor === null  || iPfactorTrendandfactor=== undefined || iPfactorTrendandfactor === ""  || JSON.stringify(iPfactorTrendandfactor) === "[]")) {
          iPfactorTrendandfactor.map((tData,index) => {
            dataArr.push(tData.Value);
            categoryArr.push(tData.name);
            if (index === 0){
              colorArrr.push('#CC0000');
            }
            else if (index === (iPfactorTrendandfactor.length -1)){
              colorArrr.push('#0000CC'); 
            }
            else{
              colorArrr.push('#808080'); 
            }
          });
          seriesData = [{
                    name : chartTypeName,
                    data: dataArr}];
        } 
        
        
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
                opacity: 0.7 ,
                colors: colorArrr,
              },
              plotOptions: {
                bar: {
                    distributed: true
                }
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
              yaxis: {
                  show: false,
              },
              legend : {
                show: false ,
              },
            },
            series: seriesData,
         }
        );
        // console.log('bar',seriesData); 
      }
      else{
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
                opacity: 0.7,
                type: 'solid', 
                colors: colorArrr,
              },
              title: {
                // text: ""
              },
              plotOptions: {
                bar: {
                    distributed: true
                }
              },
              grid : {
                        yaxis : {
                            lines : {
                                show : false
                            }
                        }
                    },
              xaxis: {
                categories:[],
              },
              yaxis: {
                  show: false,
              },
              legend : {
                show: false ,
              },
            },
            series: [],
         }
        );
      }
    }, [store2.iPfactorTrendandfactor]);

    useEffect(() => {
      var seriesData = [];
      var dataArr = [];
      var categoryArr = [];
      var colorArrr = [];
      var iPfactorTrendandfactor = [];
      var barlen = 0;
      var chartTypeName = "";
      if (!(store2.iPfactorTrendandfactor === null || store2.iPfactorTrendandfactor=== undefined || store2.iPfactorTrendandfactor === "" || JSON.stringify(store2.iPfactorTrendandfactor) === "{}")){
        if (props.activeTab === '1') {
          if (store.SearchCondition.activeFirstTab === "1"){
            iPfactorTrendandfactor = store2.iPfactorTrendandfactor.SentimentFactorData;
            chartTypeName = "Sentiment Factor"; // ProductFactorData
          }
          else{
            iPfactorTrendandfactor = store2.iPfactorTrendandfactor.ProductFactorData;
            chartTypeName = "Product FactorData"; // ProductFactorData
          }  
        }
        else{
          iPfactorTrendandfactor = store2.iPfactorTrendandfactor.BrandFactorData;
          chartTypeName = "Brand";
        }
        if (iPfactorTrendandfactor === null || iPfactorTrendandfactor=== undefined || iPfactorTrendandfactor === ""  ){
          iPfactorTrendandfactor = [];
        }
        // console.log('data', iPfactorTrendandfactor,store2.iPfactorTrendandfactor.SentimentFactorData,store2.iPfactorTrendandfactor.BrandFactorData );

        iPfactorTrendandfactor.map((tData,index) => {
          dataArr.push(tData.Value);
          categoryArr.push(tData.name);
          if (index === 0){
            colorArrr.push('#CC0000');
          }
          else if (index === (iPfactorTrendandfactor.length -1)){
            colorArrr.push('#0000CC'); 
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
                  name : chartTypeName,
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
                opacity: 0.7 ,
                type: 'solid',
                colors: colorArrr, 
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
              yaxis: {
                  show: false,
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