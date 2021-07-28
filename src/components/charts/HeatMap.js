import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import { TableHeatMapData } from '../../views/app/trend/data';
import { heatMapGraphData } from './config'
// import TableRowspan from '../applications/TableRowspan';

const HeatMapChart = ({options, series, height}) => {
      return (
        <ReactApexChart options={options} series={series} type="heatmap" height={height} />
      );
};

class HeatMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tData: TableHeatMapData
    }
  }
  
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
         
         {/* <TableRowspan 
            tClass='heatmap_wrap_table r-table'
            tData={Object.assign([],stateItem.tData)} 
            tColumns={columns}
          /> */}
         <HeatMapChart className='heatmap_cont' options={heatMapGraphData.options} series={heatMapGraphData.series} height={heatMapGraphData.height} />
         
       </>
    );
  }
}





export default HeatMap;
