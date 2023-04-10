import React from 'react';
import { Button, Result } from 'antd';
import Router from '../store/Router/Router';
import { ROUTES, routes } from '../routes';

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Простите, страницы, которую вы хотите посетить, не существует."
      extra={
        <Button type="primary" onClick={() => Router.goTo(routes[ROUTES.HOME])}>
          Вернуться на домашнюю
        </Button>
      }
    />
  );
};

export default NotFoundPage;
