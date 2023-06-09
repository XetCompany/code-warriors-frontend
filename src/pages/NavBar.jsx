import {Link} from "react-router-dom";
import React from "react";
import userStore from "../store/User/UserStore";
import {observer} from "mobx-react";
import Logo from '../img/Group1.png';

const NavBar = () => {
    const logout = () => {
        userStore.setUser(null);
        userStore.setIsAuth(false);
        userStore.setRole([]);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        userStore.setUserIsLoaded(false);
    }
    return (<header className="header">
        <nav className="navbar">
            <img className="Logo" src={Logo} alt=""/>
            <ul className="navbarul">
                {userStore.user !== null ? <>
                    <li><Link to={"/requests"}>Задания</Link></li>
                    {userStore.role.includes('customer') ? <>
                        <li><Link to={"/request/create"}>Создать задание</Link></li>
                        <li><Link to={"/performers"}>Исполнители</Link></li>
                        <li><Link to="/rating">Рейтинг</Link></li>
                    </> : null}
                    <li><Link to={"/my-requests"}>Мои задания</Link></li>
                    <li><Link to="/personal-account">Мой
                        аккаунт{userStore.notifications.length > 0 ? <>({userStore.notifications.length})</> : null}</Link>
                    </li>
                    <li><Link to="/chats">Чаты</Link></li>
                    <li><Link to={"/"} onClick={logout}>Выход</Link></li>
                </> : <>
                    <li><Link to="/register">Регистрация</Link></li>
                    <li><Link to="/login">Вход</Link></li>
                </>}


            </ul>
        </nav>
    </header>)
}

export default observer(NavBar);
