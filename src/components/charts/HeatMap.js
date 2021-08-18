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
      
    }
  }
  
  render() {
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
      // <div className="heatmap_wrap_table">
      <div style={ {display:"grid", gridTemplateColumns:"298px 1fr" }}>
        <TableRowspan
          // tClass='r-table'
          tData={Object.assign([],this.props.tData)} 
          tColumns={columns}
        />
        
        <div className='heatmap_margin'>
          <HeatMapChart options={heatMapGraphData.options} series={heatMapGraphData.series} height={heatMapGraphData.height} />
        </div>
      </div>
    );
  }
}

export default HeatMap;