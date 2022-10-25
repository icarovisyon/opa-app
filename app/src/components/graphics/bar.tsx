import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: [10, 11, 52, 12, 26, 11, 36],
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(202, 202, 202, 0.5)',
                'rgba(4, 215, 223, 0.5)',
                'rgba(11, 31, 0, 0.5)',
                'rgba(255, 99, 132, 0.5)',
                'rgba(27, 29, 14, 0.5)',
                'rgba(255, 228, 197, 0.5)'

            ],
        }
    ],
};

export function GraphicBar() {
    return <Bar options={options} data={data} />;
}
