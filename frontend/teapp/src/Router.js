import React from 'react';
import Header from './components/Header';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Dashboard from './components/Dashboard';

const Router = () => {
    return(
        <BrowserRouter>
            <div className='dashboard'>
                <Header />
                <Routes>
                    <Route exact path='/' element={<Dashboard />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default Router;