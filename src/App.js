import './App.css';
import React, { useEffect, useState } from 'react';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import { Alert, Space, Spin } from 'antd';
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
import Rating from './pages/Rating';
import { observer } from 'mobx-react';

function App() {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoad(true);
    }, 2000);
  }, []);
  return (
    <div className='app'>
      {/* {!load ?
      <div> */}
        <BrowserRouter>
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
          <Route path="/my-request/edit/:id" element={<MyRequestsEdit/>}/>
          <Route path="/reset-password/:token" element={<ResetPassword/>}/>
          <Route path="/request-password-reset" element={<RequestResetPassword/>}/>
          <Route path="/rating" element={<Rating />}/>
        </Routes>
      </BrowserRouter>
      {/* </div>
        :
        <Space direction="vertical">
          <Space>
            <Spin tip="Loading" size="large">
              <div className="content" />
            </Spin>
          </Space>
        </Space>
    } */}
    </div>
  );
}

export default observer(App);
