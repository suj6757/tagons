import React from 'react';
import ReactApexChart from "react-apexcharts";
import { ScatterQuadrantChartOptions } from './config';

const ScatterQuadrant = ({height , className}) => {
  return (
    <ReactApexChart options={ScatterQuadrantChartOptions.options} series={ScatterQuadrantChartOptions.series} type="scatter" height={height} className={className} />
  );
};

export default ScatterQuadrant;
