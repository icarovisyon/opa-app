import { Line } from "react-chartjs-2";
import { Chart as ChartJS, registerables } from 'chart.js';
import styled from "styled-components";
ChartJS.register(...registerables);

export function GraphicLine() {
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        datasets: [
            {
                label: "Faturamento",
                data: [33, 53, 85, 41, 44, 65],
                fill: true,
                borderColor: "#0000a1"
            },
            {
                label: "Custo Fixo",
                data: [33, 25, 35, 51, 54, 76],
                fill: false,
                borderColor: "#8955ff"
            }
        ]
    };

    return (
        <Line data={data} />
    )
}