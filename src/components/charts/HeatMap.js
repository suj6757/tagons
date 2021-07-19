import React from 'react';
import ReactApexChart from "react-apexcharts";

const HeatMap = ({options, series, height}) => {
  return (
    <ReactApexChart options={options} series={series} type="heatmap" height={height} />
  );
};

export default HeatMap;
