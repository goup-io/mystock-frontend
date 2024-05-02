import React from 'react';
import Chart from 'react-apexcharts';

function LineChart({ categories, series }) {
    const options = {
        chart: {
            height: '100%',
            type: 'line',
            dropShadow: {
                enabled: true,
                color: '#000',
                top: 0,
                left: 7,
                blur: 10,
                opacity: 0.2
            },
            toolbar: {
                show: true
            }
        },
        colors: ['#1F78B4', '#A6CEE3', '#6A8ACF', '#2F6DEC', '#DEE2FF', '#B2DF8A'],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: 'smooth'
        },
        grid: {
            borderColor: '#e7e7e7',
            row: {
                colors: ['#f3f3f3', 'transparent'],
                opacity: 0.5
            },
        },
        markers: {
            size: 1
        },
        xaxis: {
            categories: categories, 
        },
        legend: {
            show: true,
            position: 'top',
            horizontalAlign: 'center',
            floating: true,
            offsetY: 0 ,
            offsetX: 0
        }, 
        responsive: [
            {
              breakpoint: 1000,
              options: {
                plotOptions: {
                  bar: {
                    vertical: true
                  }
                },
                legend: {
                  position: "bottom"
                }
              }
            }
        ]
    };

    return (
        <Chart options={options} series={series} type="line" height={'120%'} />
    );
}

export default LineChart;
