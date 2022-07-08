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
    LineElement,
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

const TopProducts = ({tableData}) => {
    const topProductsData = (() => {
        var total = {};
        for (const index in tableData){
            total[tableData[index].name] = tableData[index].quantity; 
        }
        return Object.keys(total).sort(function(a,b){return total[b]-total[a]})
    })();
    return(
        <div className="dashboard-card list">
            <div className="dashboard-title bold mono">Ranking de productos</div>
            <ol>
            {
                (() => {
                    var doc = [];
                    for (const index in topProductsData){
                        const item = topProductsData[index]
                        doc.push(
                        <li key={item}>
                            {item}
                        </li>
                     )
                    }
                    return doc; 
                })()
            }
            </ol>
        </div>
    )
}

export default TopProducts;