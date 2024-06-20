import React from 'react';
import Chart from 'react-apexcharts';

function PieChart({ series, labels }) {
    const options = {
        chart: {
            type: 'pie',
            toolbar: {
                show: true
            }
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
                const name = opts.w.globals.labels[opts.seriesIndex];
                return [name, val.toFixed(1) + '%'];
            }
        },
        legend: {
            show: true,
            position: 'right',
            textAlign: 'right'
        }
    };

    return (
        <div className="w-full h-full">
            <Chart options={options} series={series} type="pie" height="100%" width="100%" />
        </div>
    );
}

export default PieChart;
