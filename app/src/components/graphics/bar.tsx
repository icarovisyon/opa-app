import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

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
            display: false,
            text: 'Atendimentos por atendentes',
        },
    },
};

export const defaultValuesGraphicBar = {
    data: [],
    description: "",
    label: []
}

interface GraphicBarProps {
    labels: any[] | undefined,
    dataSets: any[] | undefined,
    description: string | undefined
}

export interface DataGraphBar {
    label: any[],
    data: any[],
    description: string
}

export function GraphicBar({ dataSets, description, labels }: GraphicBarProps) {
    const data = {
        labels: labels,
        datasets: [
            {
                label: description,
                data: dataSets,
                backgroundColor: [
                    '#567ebb',
                    '#8a5df3',
                    '#095169',
                    '#3019c5',
                    '#2b4c7e',
                    '#71dbd2',
                    '#6943e3',
                    '#6f95ff'

                ],
            }
        ],
    }

    return <Bar options={options} data={data} />;
}
