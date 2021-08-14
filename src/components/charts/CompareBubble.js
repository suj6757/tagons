import React from 'react';
import ReactApexChart from "react-apexcharts";
import { bubbleChartOptionsType2 } from './config';

const CompareBubble = ({options, series, height , className}) => {
  return (
    <ReactApexChart options={options} series={series} type="bubble" height={height} className={className} />
  );
};

export default CompareBubble;