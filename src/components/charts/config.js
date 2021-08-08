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
};


export const heatMapGraphData = {
    series: [
      /*
      {
        name: 'Coupang',
        data: [
          {x: "1/1", y: -30},
          {x: "1/2", y: 10},
          {x: "1/3", y: 40},
          {x: "1/4", y: 55},
          {x: "1/5", y: -20},
          {x: "1/6", y: 30},
          {x: "1/7", y: -10},
          {x: "1/8", y: 5},
          {x: "1/9", y: 20},
          {x: "1/10", y: 40},
          {x: "1/11", y: -5},
          {x: "1/12", y: 10},
          {x: "1/13", y: 50},
          {x: "1/14", y: 30},
          {x: "1/15", y: 20},
          {x: "1/16", y: 30},
          {x: "1/17", y: 20},
          {x: "1/18", y: 10},
          {x: "1/19", y: 30},
          {x: "1/20", y: 0},
          {x: "1/21", y: 6},
          {x: "1/22", y: 20},
          {x: "1/23", y: 30},
          {x: "1/24", y: 50},
          {x: "1/25", y: 40},
          {x: "1/26", y: 9},
          {x: "1/27", y: 20},
          {x: "1/28", y: 10},
          {x: "1/29", y: 44},
          {x: "1/30", y: 43},
          {x: "1/31", y: 9},
        ]
      },
      {
        name: 'Naver Shopping',
        data: [
          {x: "1/1", y: -9},
          {x: "1/2", y: 43},
          {x: "1/3", y: 44},
          {x: "1/4", y: 50},
          {x: "1/5", y: -30},
          {x: "1/6", y: 10},
          {x: "1/7", y: -5},
          {x: "1/8", y: 15},
          {x: "1/9", y: 40},
          {x: "1/10", y: -8},
          {x: "1/11", y: -50},
          {x: "1/12", y: 12},
          {x: "1/13", y: 56},
          {x: "1/14", y: 18},
          {x: "1/15", y: 28},
          {x: "1/16", y: 33},
          {x: "1/17", y: 26},
          {x: "1/18", y: 17},
          {x: "1/19", y: 31},
          {x: "1/20", y: -10},
          {x: "1/21", y: 16},
          {x: "1/22", y: 27},
          {x: "1/23", y: 0},
          {x: "1/24", y: 7},
          {x: "1/25", y: 6},
          {x: "1/26", y: 3},
          {x: "1/27", y: -10},
          {x: "1/28", y: 9},
          {x: "1/29", y: 5},
          {x: "1/30", y: 27},
          {x: "1/31", y: 11},
        ]
      },
      {
        name: 'YouTube',
        data: [
          {x: "1/1", y: -30},
          {x: "1/2", y: 10},
          {x: "1/3", y: 40},
          {x: "1/4", y: 55},
          {x: "1/5", y: -20},
          {x: "1/6", y: 30},
          {x: "1/7", y: -10},
          {x: "1/8", y: 5},
          {x: "1/9", y: 20},
          {x: "1/10", y: 40},
          {x: "1/11", y: -5},
          {x: "1/12", y: 10},
          {x: "1/13", y: 50},
          {x: "1/14", y: 30},
          {x: "1/15", y: 20},
          {x: "1/16", y: 30},
          {x: "1/17", y: 20},
          {x: "1/18", y: 10},
          {x: "1/19", y: 30},
          {x: "1/20", y: 0},
          {x: "1/21", y: 6},
          {x: "1/22", y: 20},
          {x: "1/23", y: 30},
          {x: "1/24", y: 50},
          {x: "1/25", y: 40},
          {x: "1/26", y: 9},
          {x: "1/27", y: 20},
          {x: "1/28", y: 10},
          {x: "1/29", y: 44},
          {x: "1/30", y: 43},
          {x: "1/31", y: 9},
        ]
      },
      {
        name: 'Facebook',
        catagory: 'social',
        data: [
          {x: "1/1", y: -9},
          {x: "1/2", y: 43},
          {x: "1/3", y: 44},
          {x: "1/4", y: 50},
          {x: "1/5", y: -30},
          {x: "1/6", y: 10},
          {x: "1/7", y: -5},
          {x: "1/8", y: 15},
          {x: "1/9", y: 40},
          {x: "1/10", y: -8},
          {x: "1/11", y: -50},
          {x: "1/12", y: 12},
          {x: "1/13", y: 56},
          {x: "1/14", y: 18},
          {x: "1/15", y: 28},
          {x: "1/16", y: 33},
          {x: "1/17", y: 26},
          {x: "1/18", y: 17},
          {x: "1/19", y: 31},
          {x: "1/20", y: -10},
          {x: "1/21", y: 16},
          {x: "1/22", y: 27},
          {x: "1/23", y: 0},
          {x: "1/24", y: 7},
          {x: "1/25", y: 6},
          {x: "1/26", y: 3},
          {x: "1/27", y: -10},
          {x: "1/28", y: 9},
          {x: "1/29", y: 5},
          {x: "1/30", y: 27},
          {x: "1/31", y: 11},
        ]
      },
      {
        name: 'Instagram',
        catagory: 'social',
        data: [
          {x: "1/1", y: -30},
          {x: "1/2", y: 10},
          {x: "1/3", y: 40},
          {x: "1/4", y: 55},
          {x: "1/5", y: -20},
          {x: "1/6", y: 30},
          {x: "1/7", y: -10},
          {x: "1/8", y: 5},
          {x: "1/9", y: 20},
          {x: "1/10", y: 40},
          {x: "1/11", y: -5},
          {x: "1/12", y: 10},
          {x: "1/13", y: 50},
          {x: "1/14", y: 30},
          {x: "1/15", y: 20},
          {x: "1/16", y: 30},
          {x: "1/17", y: 20},
          {x: "1/18", y: 10},
          {x: "1/19", y: 30},
          {x: "1/20", y: 0},
          {x: "1/21", y: 6},
          {x: "1/22", y: 20},
          {x: "1/23", y: 30},
          {x: "1/24", y: 50},
          {x: "1/25", y: 40},
          {x: "1/26", y: 9},
          {x: "1/27", y: 20},
          {x: "1/28", y: 10},
          {x: "1/29", y: 44},
          {x: "1/30", y: 43},
          {x: "1/31", y: 9},
        ]
      },
      {
        name: 'Naver Blog',
        catagory: 'social',
        data: [
          {x: "1/1", y: -9},
          {x: "1/2", y: 43},
          {x: "1/3", y: 44},
          {x: "1/4", y: 50},
          {x: "1/5", y: -30},
          {x: "1/6", y: 10},
          {x: "1/7", y: -5},
          {x: "1/8", y: 15},
          {x: "1/9", y: 40},
          {x: "1/10", y: -8},
          {x: "1/11", y: -50},
          {x: "1/12", y: 12},
          {x: "1/13", y: 56},
          {x: "1/14", y: 18},
          {x: "1/15", y: 28},
          {x: "1/16", y: 33},
          {x: "1/17", y: 26},
          {x: "1/18", y: 17},
          {x: "1/19", y: 31},
          {x: "1/20", y: -10},
          {x: "1/21", y: 16},
          {x: "1/22", y: 27},
          {x: "1/23", y: 0},
          {x: "1/24", y: 7},
          {x: "1/25", y: 6},
          {x: "1/26", y: 3},
          {x: "1/27", y: -10},
          {x: "1/28", y: 9},
          {x: "1/29", y: 5},
          {x: "1/30", y: 27},
          {x: "1/31", y: 11},
        ]
      },
      {
        name: 'Naver News',
        catagory: 'social',
        data: [
          {x: "1/1", y: -30},
          {x: "1/2", y: 10},
          {x: "1/3", y: 40},
          {x: "1/4", y: 55},
          {x: "1/5", y: -20},
          {x: "1/6", y: 30},
          {x: "1/7", y: -10},
          {x: "1/8", y: 5},
          {x: "1/9", y: 20},
          {x: "1/10", y: 40},
          {x: "1/11", y: -5},
          {x: "1/12", y: 10},
          {x: "1/13", y: 50},
          {x: "1/14", y: 30},
          {x: "1/15", y: 20},
          {x: "1/16", y: 30},
          {x: "1/17", y: 20},
          {x: "1/18", y: 10},
          {x: "1/19", y: 30},
          {x: "1/20", y: 0},
          {x: "1/21", y: 6},
          {x: "1/22", y: 20},
          {x: "1/23", y: 30},
          {x: "1/24", y: 50},
          {x: "1/25", y: 40},
          {x: "1/26", y: 9},
          {x: "1/27", y: 20},
          {x: "1/28", y: 10},
          {x: "1/29", y: 44},
          {x: "1/30", y: 43},
          {x: "1/31", y: 9},
        ]
      },
      {
        name: 'Naver',
        catagory: 'search volume',
        data: [
          {x: "1/1", y: -9},
          {x: "1/2", y: 43},
          {x: "1/3", y: 44},
          {x: "1/4", y: 50},
          {x: "1/5", y: -30},
          {x: "1/6", y: 10},
          {x: "1/7", y: -5},
          {x: "1/8", y: 15},
          {x: "1/9", y: 40},
          {x: "1/10", y: -8},
          {x: "1/11", y: -50},
          {x: "1/12", y: 12},
          {x: "1/13", y: 56},
          {x: "1/14", y: 18},
          {x: "1/15", y: 28},
          {x: "1/16", y: 33},
          {x: "1/17", y: 26},
          {x: "1/18", y: 17},
          {x: "1/19", y: 31},
          {x: "1/20", y: -10},
          {x: "1/21", y: 16},
          {x: "1/22", y: 27},
          {x: "1/23", y: 0},
          {x: "1/24", y: 7},
          {x: "1/25", y: 6},
          {x: "1/26", y: 3},
          {x: "1/27", y: -10},
          {x: "1/28", y: 9},
          {x: "1/29", y: 5},
          {x: "1/30", y: 27},
          {x: "1/31", y: 11},
        ]
      },
      */
    ],
    height: 500,
    options: {
      grid: {
        show: true,
        borderColor: '#90A4AE',
        yaxis: {
          lines: {
              show: false
            }
        },
      },
      chart: {
        type: 'heatmap',
        toolbar: {
          show: false
        }, 
      },
      plotOptions: {
          heatmap: {
              shadeIntensity: 0.5,
              radius: 0,
              useFillColorAsStroke: true,
              colorScale: {
                  ranges: [{
                      from: 0.00,
                      to: 0.19,
                      name: 'min',
                      color: '#00A100'
                  },
                  {
                      from: 0.20,
                      to: 0.39,
                      name: 'low',
                      color: '#a6d082'
                  },
                  {
                      from: 0.40,
                      to: 0.59,
                      name: 'medium',
                      color: '#ffea89'
                  },
                  {
                      from: 0.60,
                      to: 0.79,
                      name: 'high',
                      color: '#FFB200'
                  },
                  {
                      from: 0.80,
                      to: 1.00,
                      name: 'extreme',
                      color: '#FF0000'
                  }
                  ]
              }
          }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: 1
      },
      xaxis: {
        position: 'top',
      },
      yaxis: {
        show: false,
      },
      legend: {
        show : false
      }
    },
}


export const columeNegativeGraph = {
  series: [{
    name: 'Cash Flow',
    data: [1.45, 5.42, 5.9, -0.42, -12.6, -18.1, -18.2, -14.16, -11.1, -6.09, 0.34, 3.88, 13.07,
      5.8, 2, 7.37, 8.1, 13.57, 15.75, 17.1, 19.8, -27.03, -54.4, -47.2, -43.3, -18.6, -
      48.6, -41.1, -39.6, -37.6, -29.4, -21.4,
    ]
  }],
  height: 350,
  options: {
    grid: {
      show: true,
    },
    chart: {
      type: 'bar',
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false
      },
    },
    colors :['#a5a5a5'],
    plotOptions: {
      bar: {
        colors: {
          ranges: [{
            from: -9999999,
            to: 0,
            color: '#2f5597'
          }]
        },
        columnWidth: '50%',
      }
    },
    dataLabels: {
      enabled: true,
      offsetY: 40,
      style: {
        fontSize: '12px',
        colors: ["#000"]
      }
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
    }, 
    yaxis: {
      show: false
    }, 
    
  },
}

export const columeNegativeGraphMix = {
  series: [{
    name: 'Instgram',
    type: 'column',
    data: [4.2, 3.9, 2.8, 2.1, 2.6, 0.9, 1.1, -1.8, -2.1, -3.3]
  }, {
    name: 'Coupang',
    type: 'column',
    data: [-0.8, 0.4, 1.1, 2.7, 3.7, 2.6, 3.6, 1.7, 3.4, 1.7]
  }, {
    name: 'Instgram',
    type: 'line',
    data: [4.2, 3.9, 2.8, 2.1, 2.6, 0.9, 1.1, -1.8, -2.1, -3.3]
  }, {
    name: 'Coupang',
    type: 'line',
    data: [-0.8, 0.4, 1.1, 2.7, 3.7, 2.6, 3.6, 1.7, 3.4, 1.7]
  }
],
  
  options: {
    chart: {
      height: 350,
      type: 'line',
      stacked: false,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: [1, 1, 4, 4], 
      dashArray: [0, 0, 4, 4],  
    },
    xaxis: {
      categories: ['휴가', '바캉스', '여름', '수영복', '비치웨어', '페이즐리', '썬캡', '비치숄', '래쉬가드', '비치가운'],
      tickPlacement: 'between'
    },
    yaxis: {
      show: false
    },
    tooltip: {
      fixed: {
        enabled: false,
      },
    },
    legend: {
      position:'top',
      horizontalAlign: 'center',
    }, 
    colors: ['#f5800b', '#ffc000','#f5800b', '#ffc000']
  },
}

export const gapTotalGraph = {
  series: [
    {
      name: "Search Volume",
      data: [0.77, 0.88, 0.99, 0.11, 0.12, 0.34, 0.56, 0.4, 0.56, 0.41, 0.42, 0.44, 0.55, 0.66, 0.77, 0.99, 0.11, 0.55, 0.11, 0.12, 0.13, 0.15, 0.46, 0.79, 0.53, 0.12, 0.86, 0.77, 0.2, 0.55, 0.44]
    },
    {
      name: "Social",
      data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55,0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
    },
    {
      name: "Online Shopping",
      data: [0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.4, 0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.28, 0.24,0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.77]
    },
  ],
  height: 500,
  options: {
    chart: {
      type: 'line',
      dropShadow: {
        enabled: false,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false
      }, 
      zoom: {
        enabled: false,
      }
    },
    colors: ['#555', '#a9a9a9', '#ffb800'],
    dataLabels: {
      enabled: true,
      background: {
        foreColor: '#000',
        padding: 0,
        borderRadius: 0,
        borderColor: 'transparent',
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['transparent'],
      },
      offsetY: -10,
    },
    markers: {
      size: 0,
      hover: {
        size: 5,
        sizeOffset: 5,
        fillColor: '#000',
      },
      discrete: [{
        fillColor: '#e3e3e3',
        strokeColor: '#fff',
        size: 5
      }]
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      tickPlacement: 'between'
    },
    yaxis: {
      show: false
    }, 
    legend: {
      position: 'top',
      horizontalAlign: 'right', 
    }
  },
}


export const channelChartGraph = {
  series: [
    {
      name: "Instagram",
      data: [0.77, 0.88, 0.99, 0.11, 0.12, 0.34, 0.56, 0.4, 0.56, 0.41, 0.42, 0.44, 0.55, 0.66, 0.77, 0.99, 0.11, 0.55, 0.11, 0.12, 0.13, 0.15, 0.46, 0.79, 0.53, 0.12, 0.86, 0.77, 0.2, 0.55, 0.44]
    },
    {
      name: "Coupang",
      data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55,0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
    },
  ],
  height: 330,
  options: {
    chart: {
      type: 'line',
      dropShadow: {
        enabled: false,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false
      }, 
      zoom: {
        enabled: false,
      }
    },
    colors: ['#555', '#a9a9a9'],
    dataLabels: {
      enabled: true,
      background: {
        foreColor: '#000',
        padding: 0,
        borderRadius: 0,
        borderColor: 'transparent',
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['transparent'],
      },
      offsetY: -10,
    },
    markers: {
      size: 0,
      hover: {
        size: 5,
        sizeOffset: 5,
        fillColor: '#000',
      },
      discrete: [{
        fillColor: '#e3e3e3',
        strokeColor: '#fff',
        size: 5
      }]
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      tickPlacement: 'between'
    },
    yaxis: {
      show: false
    }, 
    legend: {
      position: 'top',
      horizontalAlign: 'right', 
    }
  },
}


export const gapChartGraph = {
  series: [
    {
      name: "Coupang",
      data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55,0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
    },
  ],
  height: 330,
  options: {
    chart: {
      type: 'line',
      dropShadow: {
        enabled: false,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false
      }, 
      zoom: {
        enabled: false,
      }
    },
    colors: ['#ee843b'],
    dataLabels: {
      enabled: true,
      background: {
        foreColor: '#000',
        padding: 0,
        borderRadius: 0,
        borderColor: 'transparent',
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['transparent'],
      },
      offsetY: -10,
    },
    markers: {
      size: 0,
      hover: {
        size: 5,
        sizeOffset: 5,
        fillColor: '#000',
      },
      discrete: [{
        fillColor: '#e3e3e3',
        strokeColor: '#fff',
        size: 5
      }]
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      tickPlacement: 'between'
    },
    yaxis: {
      show: false
    }, 
    legend: {
      position: 'top',
      horizontalAlign: 'right', 
    }
  },
}




export const fullStackBarGraph = {
  series: [
  {
    name: '긍정',
    data: []
  }, 
  {
    name: '중립',
    data: []
  }, 
  {
    name: '부정',
    data: []
  }, 
  ],
  height: 350,
  
  options: {
    chart: {
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    colors: ["#baeeff", "#f3f3f3", "#fac4c4"],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '40%',
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      labels:{
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: ['세컨스킨','쥬시쥬디','에잇세컨즈'],
    },
    yaxis: {
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false,
      },
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
    },
    dataLabels: {
      style: {
        colors: ['#888']
      }
    }
  },
}

export const positiveChartGraph = {
  series: [
    {
      name: "에잇세컨즈",
      data: [0.77, 0.88, 0.99, 0.11, 0.12, 0.34, 0.56, 0.4, 0.56, 0.41, 0.42, 0.44, 0.55, 0.66, 0.77, 0.99, 0.11, 0.55, 0.11, 0.12, 0.13, 0.15, 0.46, 0.79, 0.53, 0.12, 0.86, 0.77, 0.2, 0.55, 0.44]
    },
    {
      name: "쥬시쥬디",
      data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55,0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
    },
    {
      name: "세컨스킨",
      data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55,0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
    },
  ],
  height: 330,
  options: {
    chart: {
      type: 'line',
      dropShadow: {
        enabled: false,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false
      }, 
      zoom: {
        enabled: false,
      }
    },
    colors: ['#555', '#a9a9a9','#ee843b'],
    dataLabels: {
      enabled: true,
      background: {
        foreColor: '#000',
        padding: 0,
        borderRadius: 0,
        borderColor: 'transparent',
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['transparent'],
      },
      offsetY: -10,
    },
    markers: {
      size: 0,
      hover: {
        size: 5,
        sizeOffset: 5,
        fillColor: '#000',
      },
      discrete: [{
        fillColor: '#e3e3e3',
        strokeColor: '#fff',
        size: 5
      }]
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      tickPlacement: 'between'
    },
    yaxis: {
      show: false
    }, 
    legend: {
      position: 'top',
      horizontalAlign: 'right', 
    }
  },
}


export const negativeChartGraph = {
  series: [
    {
      name: "에잇세컨즈",
      data: [0.77, 0.88, 0.99, 0.11, 0.12, 0.34, 0.56, 0.4, 0.56, 0.41, 0.42, 0.44, 0.55, 0.66, 0.77, 0.99, 0.11, 0.55, 0.11, 0.12, 0.13, 0.15, 0.46, 0.79, 0.53, 0.12, 0.86, 0.77, 0.2, 0.55, 0.44]
    },
    {
      name: "쥬시쥬디",
      data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55,0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
    },
    {
      name: "세컨스킨",
      data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55,0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
    },
  ],
  height: 330,
  options: {
    chart: {
      type: 'line',
      dropShadow: {
        enabled: false,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false
      }, 
      zoom: {
        enabled: false,
      }
    },
    colors: ['#555', '#a9a9a9','#ee843b'],
    dataLabels: {
      enabled: true,
      background: {
        foreColor: '#000',
        padding: 0,
        borderRadius: 0,
        borderColor: 'transparent',
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['transparent'],
      },
      offsetY: -10,
    },
    markers: {
      size: 0,
      hover: {
        size: 5,
        sizeOffset: 5,
        fillColor: '#000',
      },
      discrete: [{
        fillColor: '#e3e3e3',
        strokeColor: '#fff',
        size: 5
      }]
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      tickPlacement: 'between'
    },
    yaxis: {
      show: false
    }, 
    legend: {
      position: 'top',
      horizontalAlign: 'right', 
    }
  },
}

export const boardTotalGraph = {
  series: [
    {
      name: "쥬시쥬디",
      data: [0.77, 0.88, 0.99, 0.11, 0.12, 0.34, 0.56, 0.4, 0.56, 0.41, 0.42, 0.44, 0.55, 0.66, 0.77, 0.99, 0.11, 0.55, 0.11, 0.12, 0.13, 0.15, 0.46, 0.79, 0.53, 0.12, 0.86, 0.77, 0.2, 0.55, 0.44]
    },
    {
      name: "에잇세컨즈",
      data: [0.77, 0.8, 0.55, 0.22, 0.33, 0.44, 0.55,0.12, 0.13, 0.76, 0.45, 0.52, 0.01, 0.76, 0.22, 0.78, 0.65, 0.63, 0.93, 0.94, 0.82, 0.2, 0.46, 0.15, 0.76, 0.22, 0.46, 0.55, 0.34, 0.74, 0.45]
    },
    {
      name: "핀블랙",
      data: [0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.4, 0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.28, 0.24,0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.18, 0.28, 0.24, 0.44, 0.77]
    },
  ],
  height: 500,
  options: {
    chart: {
      type: 'line',
      dropShadow: {
        enabled: false,
        color: '#000',
        top: 18,
        left: 7,
        blur: 10,
        opacity: 0.2,
      },
      toolbar: {
        show: false
      }, 
      zoom: {
        enabled: false,
      }
    },
    colors: ['#ffb800', '#ed7d31',  '#404141'],
    dataLabels: {
      enabled: true,
      background: {
        foreColor: '#000',
        padding: 0,
        borderRadius: 0,
        borderColor: 'transparent',
      },
      style: {
        fontSize: '14px',
        fontFamily: 'Helvetica, Arial, sans-serif',
        fontWeight: 'bold',
        colors: ['transparent'],
      },
      offsetY: -10,
    },
    markers: {
      size: 0,
      hover: {
        size: 5,
        sizeOffset: 5,
        fillColor: '#000',
      },
      discrete: [{
        fillColor: '#e3e3e3',
        strokeColor: '#fff',
        size: 5
      }]
    },
    stroke: {
      curve: 'smooth'
    },
    grid: {
      show: false,
    },
    xaxis: {
      categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      tickPlacement: 'between'
    },
    yaxis: {
      show: false
    }, 
    legend: {
      position: 'top',
      horizontalAlign: 'right', 
    }
  },
}


export const fullStackBarGraphType2 = {
  series: [
    {
      name: 'Sale',
      data: [44, 30, 50]
    }, 
    {
      name: 'Not Sale',
      data: [66, 70, 50]
    }, 

  ],
  height: 350,
  options: {
    chart: {
      stacked: true,
      stackType: '100%',
      toolbar: {
        show: false,
      },
    },
    grid: {
      show: false,
    },
    colors: ["#0070c0", "#b3b3b3"],
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '40%',
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff']
    },
    xaxis: {
      labels:{
        show: false,
      },
      axisTicks: {
        show: false,
      },
      categories: ['세컨스킨','쥬시쥬디','에잇세컨즈'],
    },
    yaxis: {
      axisTicks: {
        show: false
      },
      axisBorder: {
        show: false,
      },
    },
    fill: {
      opacity: 1
    },
    legend: {
      position: 'top',
      horizontalAlign: 'center',
    },
    dataLabels: {
      style: {
        colors: ['#fff']
      }
    }
  },
}

export const bubbleChartOptionsType2 = {
  series: [{
    name: 'Coupang',
    data: [[10, 55, 100]],
  },
  {
    name: '11st',
    data: [[20, 60, 70]],
  },
  {
    name: 'Wemakeprice',
    data: [[20, 20, 80]],
  },
  {
    name: 'Sinsegaemall',
    data: [[5, 40, 100]],
  },
  {
    name: 'Timon',
    data: [[12, 40, 110]],
  },
  {
    name: 'Gmarket',
    data: [[25, 50, 80]],
  },
  {
    name: 'Action',
    data: [[20, 40, 90]],
  },
],
  options: {
    chart: {
        height: 350,
        type: 'bubble',
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false
        },
    },
    states: {
      hover: {
          filter: {
              type: 'lighten',
              value: 0.001,
          }
      },
  },
    grid: {
      show: false,
    },
    colors: ["#5977ac", "#5891c5", "#5c6573", "#c3d2ec", "#b1cfeb", "#918d8d", "#bdc7d5"],
    dataLabels: {
        enabled: true,
        formatter: function(value, { seriesIndex, w }) {
          return w.config.series[seriesIndex].name
        }
    },
    // fill: {
    //     opacity: 0.9
    // },
    xaxis: {
        tickPlacement: 'between',
        tickAmount: 31,
        type: 'category',
        min: 1,
        max: 31,
        tooltip: {
          enabled: false,
      }
    },
    yaxis: {
        max: 70
    }, 
    tooltip: {
      custom: function({series, seriesIndex, dataPointIndex, w}) {
        return (
          `
            <div class="arrow_box">
              <p>Ads Spending</p>
              <span>${series[seriesIndex][dataPointIndex]}</span>
            </div>
          `
        )
      },
      // fixed: {
      //   enabled: true,
      //   position: 'topLeft',
      //   offsetX: 50,
      //   offsetY: 0,
      // },
    }
  },
}


export const barChartOptionsCheck = {
  options: {
    chart: {
      type: 'bar',
      height: 350,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false
      }, 
    },
    dataLabels: {
      enabled: true,
      offsetY: -20, 
      style: {
        colors: ['#888']
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        dataLabels: {
          position: 'top'
        },
        columnWidth: '40%',
      }
    },
    grid: {
      show: false,
    },
    fill: {
      colors: [
        // color 값 최대값 최소 값 확인함수
        function({ value, w }) {
          const graphDataArr = w.config.series[0].data;
          const maxVal = Math.max.apply(9 , graphDataArr);
          const minVal = Math.min.apply(9 , graphDataArr);
          if (value === maxVal) {
            return '#2f5597'
          // eslint-disable-next-line no-else-return
          } else if(value === minVal){
            return '#f00001'
          }else{
            return '#a6a6a6'
          }
        }
      ],
      opacity: 0.7
    },
    title: {
      // text: ""
    },
    xaxis: {
      categories: ['Copang', '11st', 'Wemakeprice', 'Sinsegae mall', 'Timon', 'Gmarket', 'Auction',],
    },
    yaxis: {
      axisTicks: {
        show: true
      },
      axisBorder: {
        show: true,
      },
    },
  },
  series: [{
    name: "Desktops",
    data: [10, 10, 35, 62, 69, 148, 148]
  }], 

  
};