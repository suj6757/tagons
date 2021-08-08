import React from 'react';
import ReactApexChart from "react-apexcharts";
import { bubbleChartOptionsType2 } from './config';

const CompareBubble = ({ height , className}) => {
  return (
    <ReactApexChart options={bubbleChartOptionsType2.options} series={bubbleChartOptionsType2.series} type="bubble" height={height} className={className} />
  );
};

export default CompareBubble;