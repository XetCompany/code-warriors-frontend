import {Link} from "react-router-dom";
import React from "react";
import userStore from "../store/User/UserStore";
import {observer} from "mobx-react";

const NavBar = () => {
    const logout = () => {
        userStore.setUser(null);
        userStore.setIsAuth(false);
        userStore.setRole([]);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        userStore.setUserIsLoaded(false);
    }
    return (
    <header className="header">
        <nav className="navbar">
            <ul className="navbarul">
                <li><Link to="/">Главная</Link></li>
                {userStore.user !== null ?
                <>
                    <li><Link to={"/requests"}>Заказы</Link></li>
                    {userStore.role.includes('customer') ?
                    <>
                        <li><Link to={"/request/create"}>Создать заказ</Link></li>
                        <li><Link to={"/my-requests"}>Мои заказы</Link></li>
                    </>
                    : null
                    }
                    <li><Link to="/personal-account">Мой аккаунт({userStore.notifications.length})</Link></li>
                    <li><Link to="/rating">Рейтинг</Link></li>
                    <li><Link to={"/"} onClick={logout}>Выход</Link></li>
                </>
                :
                <>
                    <li><Link to="/register">Регистрация</Link></li>
                    <li><Link to="/login">Вход</Link></li>
                </>
                }


            </ul>
        </nav>
    </header>)
}

export default observer(NavBar);
