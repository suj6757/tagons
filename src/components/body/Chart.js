import React from "react";
import ReactApexChart from 'react-apexcharts';

class Chart extends React.Component {
    render() {
        return <ReactApexChart options={this.props.options} series={this.props.series} type={this.props.type} height={350} />;
    }
}

export default Chart;
