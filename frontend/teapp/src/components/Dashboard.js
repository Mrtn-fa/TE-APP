import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Global from '../Global';
import CatTotal from './queries/CatTotal';
import General from './queries/General';
import DateData from './queries/DateData';
import TopProducts from './queries/TopProducts';

const Dashboard = () => {
    const url = Global.url;
    const [category, setCategory] = useState([]);
    const [general, setGeneral] = useState([]);
    const [datedata, setDateData] = useState([]);
    const [topproducts, setTopProducts] = useState([]);
    
    const fetchData = () => {
        const categoryQuery = url+'getCategory';
        const generalQuery = url+'getGeneral';
        const datedataQuery = url+'getDateData';
        const topproductsQuery = url+'getTopProducts';

        const getCategory = axios.get(categoryQuery);
        const getGeneral = axios.get(generalQuery);
        const getDateData = axios.get(datedataQuery);
        const getTopProducts = axios.get(topproductsQuery);

        axios.all([getCategory, getGeneral, getDateData, getTopProducts]).then(
            axios.spread((...alldata) => {
                const Category = alldata[0].data.category;
                const General = alldata[1].data.general;
                const DateData = alldata[2].data.datedata;
                const TopProducts = alldata[3].data.topproducts;
                
                setCategory(Category);
                setGeneral(General);
                setDateData(DateData);
                setTopProducts(TopProducts);
            })
        );
    }

    useEffect(() => {
        fetchData()
    }, []);

    return(
            
            <div className='dashboard-content'>
                <div className='dashboard-name'>La pikada de la esquina</div>
                {general.length > 0 ? (<General tableData={general}/>):(<div>No hay información que mostrar.</div>)}
                <div className='dashboard-specific reverse'>
                <div className='dashboard-group row card'>
                    <div className='dashboard-group col'>
                        {topproducts.length > 0 ? (<TopProducts tableData={topproducts}/>):(<div>No hay información que mostrar.</div>)}
                        <hr></hr>
                        {category.length > 0 ? (<CatTotal tableData={category}/>):(<div>No hay información que mostrar.</div>)}
                    </div>
                    {datedata.length > 0 ? (<DateData tableData={datedata}/>):(<div>No hay información que mostrar.</div>)}
                    </div>
                </div>
            </div>
    );
}

export default Dashboard;