import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./pages/NavBar";
import PersonalAccount from "./pages/PersonalAccount";
import PersonalAccountEdit from "./pages/PersonalAccountEdit";
import Requests from "./pages/Requests";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BrowserRouter>
    <NavBar/>
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/personal-account" element={<PersonalAccount/>}/>
        <Route path="/personal-account/edit" element={<PersonalAccountEdit/>}/>
        <Route path="/requests" element={<Requests/>}/>
    </Routes>
</BrowserRouter>);

reportWebVitals();
