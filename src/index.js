import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './App.css';
import reportWebVitals from './reportWebVitals';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import NavBar from "./pages/NavBar";
import PersonalAccount from "./pages/PersonalAccount";
import PersonalAccountEdit from "./pages/PersonalAccountEdit";
import Requests from "./pages/Requests";
import CreateRequest from "./pages/CreateRequest";
import MyRequests from './pages/MyRequests';
import MyRequestsEdit from './pages/MyRequestsEdit';
import ResetPassword from './pages/ResetPassword';
import RequestResetPassword from './pages/RequestResetPassword';
import RequestPage from "./pages/RequestPage";

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
        <Route path="/request/create" element={<CreateRequest/>}/>
        <Route path="/request/:id" element={<RequestPage/>}/>
        <Route path="/my-requests" element={<MyRequests/>}/>
        <Route path="/my-request/edit" element={<MyRequestsEdit/>}/>
        <Route path="/reset-password/:token" element={<ResetPassword/>}/>
        <Route path="/request-password-reset" element={<RequestResetPassword/>}/>
    </Routes>
</BrowserRouter>);

reportWebVitals();
