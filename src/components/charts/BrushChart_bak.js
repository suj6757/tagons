import React from 'react';
import ReactApexChart from "react-apexcharts";

const BrushChart = ({options, optionsLine, series, seriesLine, height, heightLine}) => {
  return (

    <div id="wrapper">
        <div id="chart-line">
            <ReactApexChart options={options} series={series} type="line" height={height} />
        </div>
        <div id="chart-line2">
            <ReactApexChart options={optionsLine} series={seriesLine} type="line" height={heightLine} />
        </div>
    </div>
  );
};

export default BrushChart;
