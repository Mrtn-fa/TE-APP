import React from 'react';
import {NavLink} from 'react-router-dom';

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