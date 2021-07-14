import React from 'react';
import ReactApexChart from "react-apexcharts";

const CompareBar = ({options, series, height}) => {
  return (
    <ReactApexChart options={options} series={series} type="bar" height={height} />
  );
};

export default CompareBar;
