import React from 'react';
import ReactApexChart from "react-apexcharts";

const CompareScatter = ({options, series, height}) => {
  return (
    <ReactApexChart options={options} series={series} type="scatter" height={height} />
  );
};

export default CompareScatter;
