import {React, useMemo} from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

const DateData = ({tableData}) => {
    // Obtenemos la data de los últimos 30 días
    //#region Chart DateDate
    const daysData = (() => {
        const clientDays = {0:0, 1:0, 2:0, 3:0, 4:0, 5:0, 6:0};
        for (const index in tableData){
            const year = tableData[index].date.year;
            const month = tableData[index].date.month;
            const day = tableData[index].date.day;
            const day_index = new Date(year, month, day).getDay()
            clientDays[day_index] += Math.round(tableData[index].data.diners/30, 0);
        }
        return clientDays;
    })();
    const ClientData = useMemo(() => {
        return {
            datasets: [
                {
                    label: "Media de clientes en el último mes",
                    data: daysData,
                    backgroundColor: "rgb(250, 184, 97)"
                }
            ]
        }
    }, [])
    const ClientOptions = {
        plugins: {
            title: {
                display: true,
                text: "Clientes promedio por mes",
                font: {
                    size: 24,
                    family: "monospace"
                }
            },
            legend: {
                position: "bottom"
            },
            tooltip: {
                callbacks: {
                    title: (context) => {
                        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
                        return days[context[0].label];
                    }
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    callback: (value, index, ticks) => {
                        const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
                        return days[value];
                    }
                }
            }
        }
    }
    //#endregion
    //#region Char Income last 30 days
    const incomeData = (() => {
        const incomePerDay = {};
        for (const index in tableData){
            const month = tableData[index].date.month;
            const day = tableData[index].date.day;
            const date = `${month}-${day}`;
            incomePerDay[date] = tableData[index].data.total;
        }
        return incomePerDay;
    })();
    const IncomeData = useMemo(() => {
        return {
            datasets: [
                {
                    label: "Ingreso por día en el último mes",
                    data: incomeData
                }
            ]
        }
    })
    const IncomeOptions = {
        borderColor: "rgb(24, 181, 53)",
        plugins: {
            title: {
                display: true,
                text: "Ingresos últimos 30 días",
                font: {
                    size: 24,
                    family: "monospace"
                }
            },
            legend: {
                position: "bottom"
            },
        },
        tension: 0.4,
        fill:true,
        backgroundColor: "rgba(96, 204, 116, 0.5)",
        scales: {
            x: {
                reverse: true,
            },
            y: {
                beginAtZero: true,
                ticks: {
                    callback: (value, index, ticks) => {
                        return "$"+value+"M"
                    }
                }
            }
        },
    }
    //#endregion
    return(<div className="dashboard-group col bar center"><Line data={IncomeData} options={IncomeOptions} /><hr></hr><Bar data={ClientData} options={ClientOptions}/> </div>);
}

export default DateData