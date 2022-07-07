import React from "react";

const MeanTime = ({id, tableData}) => {
    const {meanTime} = tableData;

    return(
        <div className="dashboard-card">
            <div className="content">
                Estadía promedio por mesa: {meanTime}
            </div>
        </div>
    );
}

export default MeanTime;