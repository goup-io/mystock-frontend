import { Margin } from '@mui/icons-material';
import React from 'react';
import Chart from 'react-apexcharts';

function BarChart({ categories, series }) {
    const options = {
        chart: {
            type: 'bar',
            height: '100%',
            top: 0,
            margin: 0
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '55%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: categories,
        },
        fill: {
            opacity: 1
        },
        colors: ['#1F78B4', '#A6CEE3', '#6A8ACF', '#2F6DEC', '#DEE2FF', '#B2DF8A'],
    };

    return (
        <div>
            <div id="chart">
                <Chart options={options} series={series} type="bar" height={'100%'} />
            </div>
            <div id="html-dist"></div>
        </div>
    );
}

export default BarChart;
