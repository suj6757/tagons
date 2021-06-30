import React from 'react';
import ReactApexChart from "react-apexcharts";
import { ScatterQuadrantChartOptions } from './config';

const ScatterQuadrant = ({height}) => {
  return (
    <ReactApexChart options={ScatterQuadrantChartOptions.options} series={ScatterQuadrantChartOptions.series} type="scatter" height={height} />
  );
};

export default ScatterQuadrant;
