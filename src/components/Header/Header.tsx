import React from 'react';
import {Link} from "react-router-dom";
import css from './Header.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {authService} from "../../services/authService";
import {authActions} from "../../redux/slices/authSlice";

const Header = () => {
    const {me} = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    if (authService.getAccessToken() && !me) {
        dispatch(authActions.me())
    }

    return (
        <div className={css.Header}>
            {
                me ?
                    <div>
                        {me.username} -- {new Date(me.last_login).toDateString()}
                    </div>
                    :
                    <div>
                        <Link to={'/login'}>login</Link>
                        <Link to={'/register'}>register</Link>
                    </div>
            }
        </div>
    );
};

export default Header;