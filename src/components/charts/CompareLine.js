import React from 'react';
import ReactApexChart from "react-apexcharts";

const CompareLine = ({options, series, height}) => {
  return (
    <ReactApexChart options={options} series={series} type="line" height={height} />
  );
};

export default CompareLine;
