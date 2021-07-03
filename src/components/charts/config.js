import React from 'react';
import {renderToString} from 'react-dom/server';
import ActiveKeyword from '../../containers/pages/ActiveKeyword';

function displayTooltip() {
  return renderToString(<ActiveKeyword />);
}

// bubble config options 설정
export const bubbleChartOptions = {
  options: {
    chart: {
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false
      },
      
    },
    grid: {
      show: false,
    },
    dataLabels: {
      enabled: true
    },
    fill: {
      opacity: 0.7
    },
    xaxis: {
      min: 0,
      max: 70,
      tickAmount: 12,
      type: "category",
      show: false,
      title: {
        text: "DGI"
      },
    },
    yaxis:{
            min: 0,
            max: 70,
            labels: {
              formatter: function(value, index) {
                return value.toFixed();
              }
            },
            title: {
              text: "SGI"
            },
          },
  },
  series: []
}

// line config options 설정
export const lineChartOptions = {
  options: {
    chart: {
      type: 'line',
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false
      }
    },
    grid: {
        yaxis: {
            lines: {
                show: false
            }
        },
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 0.7
    },
    title: {
      // text: ""
    },
    xaxis: {
      categories: [],
    },
    yaxis: {
      show: false,
    },
    legend: { // 범례
        show: false
    },
    colors:[]
    },
    series: []
};

export const barChartOptions = {
  options: {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false
      }
    },
    grid: {
        yaxis: {
            lines: {
                show: false
            }
        },
    },
    dataLabels: {
      enabled: false
    },
    fill: {
      opacity: 0.7
    },
    title: {
      // text: ""
    },
    xaxis: {
      categories: [],
    },
  },
  series: []
};
export const scatterChartOptions = {
  series: [{
    name: "SAMPLE A",
    data: [
    [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]]
  },{
    name: "SAMPLE B",
    data: [
    [36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]
  },{
    name: "SAMPLE C",
    data: [
    [21.7, 3], [23.6, 3.5], [24.6, 3], [29.9, 3], [21.7, 20], [23, 2], [10.9, 3], [28, 4], [27.1, 0.3], [16.4, 4], [13.6, 0], [19, 5], [22.4, 3], [24.5, 3], [32.6, 3], [27.1, 4], [29.6, 6], [31.6, 8], [21.6, 5], [20.9, 4], [22.4, 0], [32.6, 10.3], [29.7, 20.8], [24.5, 0.8], [21.4, 0], [21.7, 6.9], [28.6, 7.7], [15.4, 0], [18.1, 0], [33.4, 0], [16.4, 0]]
  }]
};

export const scatterDatetimeChartOptions = {
  // 전부 지워야 함. 샘플임
  options: {
    chart: {
      height: 350,
      type: 'scatter',
      zoom: {
        type: 'xy'
      }
    },
    /*
    noData: {
      text: 'Data loading...',
      align: 'center',
      verticalAlign: 'middle',
      style: {
        fontSize: '14px',
      }
    }, */
    annotations: {
      position: "back",
      xaxis: [
        {
          x: 0,
          x2: 50,
          label: {
            text: 'Rise',
            borderWidth: 0,
            position: 'top',
            offsetX: '46%',
            offsetY: -7,
            orientation: 'horizontal',
            style: {
              background: 'transparent',
              fontSize: '16px',
              fontWeight: '700',
              color: '#000'
            }
          },
          strokeDashArray: 0,
          borderColor: "#666",
          fillColor: "#797979",
          opacity: 0.1
        },
        {
          x: 50,
          x2: 100,
          label: {
            text: 'Fall',
            borderWidth: 0,
            position: 'bottom',
            offsetY: 15,
            orientation: 'horizontal',
            style: {
              background: 'transparent',
              fontSize: '16px',
              fontWeight: '700',
              color: '#000'
            }
          },
          strokeDashArray: 0,
          borderColor: "#666",
          fillColor: "#fd7b7a",
          opacity: 0.1
        }
      ],
      yaxis: [
        {
          y: 0,
          y2: 50,
          strokeDashArray: 0,
          borderColor: "#666",
          fillColor: "#c8c4c3",
          opacity: 0.3,
        },
        {
          y: 50,
          y2: 100,
          label: {
            text: 'P/R Index',
            borderWidth: 0,
            offsetX: 75,
            offsetY: 7,
            orientation: 'horizontal',
            style: {
              background: 'transparent',
              fontSize: '16px',
              fontWeight: '700',
              color: '#000',
            }
          },
          strokeDashArray: 0,
          borderColor: "#666",
          fillColor: "#bbd5ee",
          opacity: 0.3
        }
      ]
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      max: 70
    }
  },
  series: [{
      name: "디테일",
      data: [
      [1.0, 1.0]]
    },{
      name: "목적",
      data: [
      [1.1, 1.9]]
    },{
      name: "스타일",
      data: [
      [21.7, 2]]
  }]
  // series: [{
  //     name: "SAMPLE A",
  //     data: [
  //     [16.4, 5.4], [21.7, 2], [25.4, 3], [19, 2], [10.9, 1], [13.6, 3.2], [10.9, 7.4], [10.9, 0], [10.9, 8.2], [16.4, 0], [16.4, 1.8], [13.6, 0.3], [13.6, 0], [29.9, 0], [27.1, 2.3], [16.4, 0], [13.6, 3.7], [10.9, 5.2], [16.4, 6.5], [10.9, 0], [24.5, 7.1], [10.9, 0], [8.1, 4.7], [19, 0], [21.7, 1.8], [27.1, 0], [24.5, 0], [27.1, 0], [29.9, 1.5], [27.1, 0.8], [22.1, 2]]
  //   },{
  //     name: "SAMPLE B",
  //     data: [
  //     [36.4, 13.4], [1.7, 11], [5.4, 8], [9, 17], [1.9, 4], [3.6, 12.2], [1.9, 14.4], [1.9, 9], [1.9, 13.2], [1.4, 7], [6.4, 8.8], [3.6, 4.3], [1.6, 10], [9.9, 2], [7.1, 15], [1.4, 0], [3.6, 13.7], [1.9, 15.2], [6.4, 16.5], [0.9, 10], [4.5, 17.1], [10.9, 10], [0.1, 14.7], [9, 10], [12.7, 11.8], [2.1, 10], [2.5, 10], [27.1, 10], [2.9, 11.5], [7.1, 10.8], [2.1, 12]]
  //   },{
  //     name: "SAMPLE C",
  //     data: [
  //     [21.7, 3], [23.6, 3.5], [24.6, 3], [29.9, 3], [21.7, 20], [23, 2], [10.9, 3], [28, 4], [27.1, 0.3], [16.4, 4], [13.6, 0], [19, 5], [22.4, 3], [24.5, 3], [32.6, 3], [27.1, 4], [29.6, 6], [31.6, 8], [21.6, 5], [20.9, 4], [22.4, 0], [32.6, 10.3], [29.7, 20.8], [24.5, 0.8], [21.4, 0], [21.7, 6.9], [28.6, 7.7], [15.4, 0], [18.1, 0], [33.4, 0], [16.4, 0]]
  // }]
};