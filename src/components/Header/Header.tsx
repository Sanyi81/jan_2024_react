import React from 'react';
import {Link} from "react-router-dom";
import css from './Header.module.css';

const Header = () => {
    return (
        <div className={css.Header}>
            <div>
                <Link to={'/login'}>login</Link>
                <Link to={'/register'}>register</Link>
            </div>
        </div>
    );
};

export default Header;