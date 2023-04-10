import { Route } from 'mobx-router';
import React from 'react';
import NotFoundPage from './pages/NotFoundPage';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import { UserOutlined } from '@ant-design/icons';

export const ROUTES = {
  NOT_FOUND: 'not_found',
  HOME: 'home',
  REGISTER: 'register',
  LOGIN: 'login',
};

export const ROUTES_PATHS = {
  [ROUTES.NOT_FOUND]: '/not-found',
  [ROUTES.HOME]: '/home',
  [ROUTES.REGISTER]: '/register',
  [ROUTES.LOGIN]: '/login',
};

class RouteClass {
  constructor(Route, additionalProps) {
    Object.entries(Route).forEach(([key, value]) => {
      this[key] = value;
    });
    if (additionalProps) {
      Object.entries(additionalProps).forEach(([key, value]) => {
        this[key] = value;
      });
    }
  }
}

export const routes = {
  [ROUTES.NOT_FOUND]: new RouteClass(
    new Route({
      path: ROUTES_PATHS[ROUTES.NOT_FOUND],
      title: 'Страница не найдена',
      component: <NotFoundPage />,
    }),
    {
      visibleInNavigation: false,
    },
  ),
  [ROUTES.HOME]: new RouteClass(
    new Route({
      path: ROUTES_PATHS[ROUTES.HOME],
      title: 'Форма пользователя',
      component: <Home />,
    }),
    {
      icon: <UserOutlined />,
      visibleInNavigation: true,
    },
  ),
  [ROUTES.REGISTER]: new RouteClass(
    new Route({
      path: ROUTES_PATHS[ROUTES.REGISTER],
      title: 'Регистрация',
      component: <Register />,
    }),
    {
      icon: <UserOutlined />,
      visibleInNavigation: true,
    },
  ),
  [ROUTES.LOGIN]: new RouteClass(
    new Route({
      path: ROUTES_PATHS[ROUTES.LOGIN],
      title: 'Вход',
      component: <Login />,
    }),
    {
      icon: <UserOutlined />,
      visibleInNavigation: true,
    },
  ),
};
