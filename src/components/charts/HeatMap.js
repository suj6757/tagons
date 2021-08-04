/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { TableHeatMapData } from '../../views/app/trend/data';
import { heatMapGraphData } from './config'
import TableRowspan from '../applications/TableRowspan';

const HeatMapChart = ({options, series, height}) => {
      return (
        <ReactApexChart options={options} series={series} type="heatmap" height={height} />
      );
};

class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tData: []
    }
  }

  componentDidMount() {
    this.setState({
      tData: this.props.tData
    })

    console.log("ANG", this.props.tData);
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // 전형적인 사용 사례 (props 비교를 잊지 마세요)
  //   if (this.props.tData !== prevProps.tData) {
  //     // this.fetchData(this.props.tData);
  //     this.setState({
  //       tData: prevProps.tData
  //     })
  //   }
  // }
  
  render() {
    const stateItem = this.state;
    const columns=
        [
            {
                header:'Channel Category',
                // sort:'true'
            },
            {
                header:'Channel',
                // sort:'true'
            },
        ]


    return (
      <>
         <TableRowspan 
            tClass='heatmap_wrap_table r-table'
            tData={Object.assign([],this.props.tData)} 
            tColumns={columns}
          />
         <HeatMapChart className='heatmap_cont' options={heatMapGraphData.options} series={heatMapGraphData.series} height={heatMapGraphData.height} />
       </>
    );
  }
}





export default HeatMap;
