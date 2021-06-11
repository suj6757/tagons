import React from 'react';
import Header from '../head/Header';
import Chart from '../body/Chart';
import { post } from 'axios';

class StateTest extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            series: [{
                name: "Desktops",
                data: []
            }],
            options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: 'Product Trends by Month',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: []
                }
            },
            call : []
        };
    }
    
    componentDidMount = () => {
        //this.callApi();
    }

    callApi = async () => {
        let url = '/api/customerChart';
        const formData = new FormData();
        
        formData.append('param', this.state.call);

        const config = {
            headers : {
                'content-type' : 'multipart/form-data'
            }
        }

        post(url, formData, config).then((response) => {
            this.makeData(response);
        });
    }

    makeData = (item) => {
        let categories = [];
        let data = [];

        item.data.map((c) => {
            return (
                categories.push(`${c.JOB}`)
            ,   data.push(`${c.COUNT}`)
            )
        });
        
        this.setState({
            series : [{
                name : 'tobe'
            ,   data : data
            }]
        ,   options: {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'straight'
                },
                title: {
                    text: '직업별 비율',
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },
                xaxis: {
                    categories: categories
                }
            }
        })
    }

    callBack = (data) => {
        this.setState({
            call : data
        }, () => {
            this.callApi();
        });
    }

    render() {
        return (
            <>
                <Header call={this.callBack} />
                <Chart options={this.state.options} series={this.state.series} type="line" />
            </>
        );
    }
}

export default StateTest;