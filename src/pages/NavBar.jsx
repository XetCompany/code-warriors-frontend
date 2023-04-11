import {Link} from "react-router-dom";
import React from "react";

const NavBar = () => {
    return (<nav>
        <ul style={{
            display: 'flex', listStyle: 'none', justifyContent: 'space-around', padding: 0,
        }}>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/personal-account">Personal Account</Link></li>
            <li><Link to={"/requests"}>Requests</Link></li>
            <li><Link to={"/request/create"}>Create Request</Link></li>
        </ul>
    </nav>)
}

export default NavBar;
