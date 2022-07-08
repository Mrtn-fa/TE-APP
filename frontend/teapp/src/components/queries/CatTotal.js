import {React, useMemo} from "react";
import pickHex from "../../etc/util";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from "chart.js";
import { Bar, Pie } from "react-chartjs-2";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

// Componente para mostrar la info asociada a la ganancia total por categoría
const CatTotal = ({tableData}) => {
    // tableData contiene toda la información
    const [cat, percentage] = (() => {
        var total = 0;
        for (const index in tableData){
            total += tableData[index].total
        }
        var cat = [];
        var percentage = []
        for (const index in tableData){
            cat.push(tableData[index].catName);
            percentage.push(100*Math.round(1000*tableData[index].total/total)/1000);
        }
        return [cat, percentage];
    })();

    const data = useMemo(() => {
        return {
            labels: cat,
            datasets: [
                {
                    label: "Ganancia total por categoría",
                    data: percentage,
                    backgroundColor: (() => {
                        const color1 = [0, 255, 0]
                        const color2 = [255,0,0]
                        const rgbArray = []
                        for (const index in percentage){
                            const rgb = pickHex(color1, color2, percentage[index]);
                            rgbArray.push(`rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.6)`);
                        }
                        return rgbArray;
                    })()
                },
            ],
            
        }
    }, [])
    const options = {
        plugins: {
            legend: {
                position: "bottom"
            }
        }
    };

    return(<div className="dashboard-card pie"><div className="dashboard-title bold">Porcentaje por categoría</div><Pie data={data} options={options}/></div>);
}

export default CatTotal;