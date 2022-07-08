import React from 'react';
import {NavLink} from 'react-router-dom';
import logo from '../assets/images/logo.svg';

const Header = () => {

    return(
        <nav id='navbar' className='navbar'>
            <div className='container'>
                <NavLink to='/' className='nav-link'>Dashboard</NavLink>
            </div>
        </nav>
    );
}

export default Header;