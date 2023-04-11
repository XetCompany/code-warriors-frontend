import {Link} from "react-router-dom";
import React from "react";
import userStore from "../store/User/UserStore";
import {observer} from "mobx-react";

const NavBar = () => {
    const logout = () => {
        userStore.setUser(null);
        userStore.setIsAuth(false);
    }
    return (<nav>
        <ul style={{
            display: 'flex', listStyle: 'none', justifyContent: 'space-around', padding: 0,
        }}>
            <li><Link to="/">Home</Link></li>
            {userStore.user !== null ?
            <>
                <li><Link to="/personal-account">Personal Account</Link></li>
                <li><Link to={"/requests"}>Requests</Link></li>
                <li><Link to={"/"} onClick={logout}>Logout</Link></li>
                {userStore.role.includes('customer') ?
                <>
                    <li><Link to={"/request/create"}>Create Request</Link></li>
                    <li><Link to={"/my-requests"}>My Requests</Link></li>
                </>
                : null
                }
            </>
            : 
            <>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
            </>
            }
            
            
        </ul>
    </nav>)
}

export default observer(NavBar);
