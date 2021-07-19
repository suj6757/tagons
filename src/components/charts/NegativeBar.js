import React from 'react';
import ReactApexChart from "react-apexcharts";

const NegativeBar = ({options, series, height}) => {
  return (
    <ReactApexChart options={options} series={series} type="bar" height={height} />
  );
};

export default NegativeBar;
