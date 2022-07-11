import React from 'react';
import {Link} from "react-router-dom";
import MyButton from "../button/MyButton";
import {useContext} from "react";
import {AuthContext} from "../../../context";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);

    const logOut = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    return (
        <div className="navbar">
            <MyButton onClick={logOut}>
                Выйти
            </MyButton>
            <div className="navbar__links">

                {isAuth &&
                     <><Link to="/about">О сайте</Link> {/* отключается перезагрузка страницы */}
                    <Link to="/posts">Посты</Link></>
                }
                {!isAuth &&
                    <Link disabled to="/login">Войти</Link>
                }

            </div>
        </div>
    );
};

export default Navbar;