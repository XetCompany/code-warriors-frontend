import React from 'react';
import { observer } from 'mobx-react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const LoadableFormComponent = Loadable({
  loader: () => import('../ui/components/Routes/MobxRoutes'),
  loading: () => <Spin tip="Загрузка" size="large"></Spin>,
});

const FormPage = () => {
  return <LoadableFormComponent />;
};

export default observer(FormPage);