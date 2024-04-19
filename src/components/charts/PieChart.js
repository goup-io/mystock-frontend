import { Height } from '@mui/icons-material';
import React from 'react';
import Chart from 'react-apexcharts';

function PieChart({ series, labels }) {
    const options = {
        chart: {
            width: '50%',
            // height: '100%',
            type: 'pie',
        },
        labels: labels,
        theme: {
            monochrome: {
                enabled: true
            }
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    offset: -5
                }
            }
        },
        dataLabels: {
            formatter(val, opts) {
                const name = opts.w.globals.labels[opts.seriesIndex]
                return [name, val.toFixed(1) + '%']
            }
        },
        legend: {
            show: true,
            position: 'right', // Define a posição da legenda como "direita"
           textAlign: 'right'

        }
    };

    return (
        <Chart options={options} series={series} type="pie" height={'120%'} />
    );
}

export default PieChart;
