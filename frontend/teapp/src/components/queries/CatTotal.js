import {React, useMemo} from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

// Componente para mostrar la info asociada a la ganancia total por categoría
const CatTotal = ({tableData}) => {
    // tableData contiene toda la información
    const data = useMemo(() => {
        return {
            datasets: [
                {
                    label: "Ganancia total por categoría",
                    data: tableData
                },
            ]
        }
    }, [])
    const options = {
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y) + "M";
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            y:{
                ticks: {
                    callback: function(value) {
                        return `$${value}M`;
                    }
                }
            }
        },
        parsing: {
            xAxisKey: "catName",
            yAxisKey: "total"
        }
    }
    return(<Bar data={data} options={options}/>);
}

export default CatTotal;