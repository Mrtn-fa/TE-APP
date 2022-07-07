import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Global from '../Global';
import CatTotal from './queries/CatTotal';
import MeanTime from './queries/MeanTime';

const Dashboard = () => {
    const url = Global.url;
    const [category, setCategory] = useState([]);
    const [meantime, setMeantime] = useState([]);
    
    const fetchData = () => {
        const categoryQuery = url+'getCategory';
        const meantimeQuery = url+'getMeantime';

        const getCategory = axios.get(categoryQuery);
        const getMeantime = axios.get(meantimeQuery);
        axios.all([getCategory, getMeantime]).then(
            axios.spread((...alldata) => {
                const Category = alldata[0].data.category;
                const Meantime = alldata[1].data.meantime;
                
                setCategory(Category);
                setMeantime(Meantime);
            })
        );
    }

    useEffect(() => {
        fetchData()
    }, []);

    return(
        <div className='dashboard'>
            <div>Hola esta es una prueba del dashboard :)</div>
            <div>
                {
                    category.length > 0 ? (
                        <CatTotal
                            tableData={category}
                        />
                    ):(<div>No hay información que mostrar.</div>)
                }
            </div>
        </div>
    );
}

export default Dashboard;