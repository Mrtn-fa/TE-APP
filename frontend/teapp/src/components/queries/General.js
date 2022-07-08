import React from "react";
import ClockLogo from "../../assets/images/clock.svg"
import ProfitLogo from "../../assets/images/profit.svg"
import WaiterLogo from "../../assets/images/waiter.svg"

const General = ({tableData}) => {
    const attended = tableData.length;
    const totalIncome = (() => {
        var total = 0;
        for (const index in tableData){
            total += tableData[index].total;
        }
        // Normalizamos a millones
        return Math.round(total/100000)/10
    })();

    const meanTime = (() => {
        var mean = 0;
        for (const index in tableData){
            mean += (new Date(tableData[index].diff)).getMinutes();
        } 
        return Math.round(mean/attended);
    })();

    return(
        <div className="dashboard-general">
            <div className="dashboard-card">
                <div className="dashboard-container">
                    <div className="dashboard-icon"><img src={ProfitLogo}></img></div>
                    <div className="dashboard-info">
                        <div className="dashboard-title">Ganancias totales</div>
                        <div className="dashboard-value">$ {totalIncome}M</div>
                    </div>
                </div>
            </div>
            <div className="dashboard-card">
                <div className="dashboard-container">
                    <div className="dashboard-icon"><img src={WaiterLogo}></img></div>
                    <div className="dashboard-info">
                        <div className="dashboard-title">Mesas atendidas</div>
                        <div className="dashboard-value">{attended}</div>
                    </div>
                </div>
            </div>
            <div className="dashboard-card">
                <div className="dashboard-container">
                    <div className="dashboard-icon"><img src={ClockLogo}></img></div>
                    <div className="dashboard-info">
                        <div className="dashboard-title">Estadía media por mesa</div>
                        <div className="dashboard-value">{meanTime} min.</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default General;