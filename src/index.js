import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SERVER_URL } from './base/Api/constants';
import axios from 'axios';
import Register from './pages/Register';
import Login from './pages/Login';
// import { AppStore } from './store/AppStore';
// import { FormStore } from './store/Form/FormStore';
// import { UserStore } from './store/User/UserStore';

// window.appStore = AppStore;
// window.formStore = FormStore;
// window.userStore = UserStore;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Login />
);

reportWebVitals();
