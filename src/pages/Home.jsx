import React from 'react';
import { observer } from 'mobx-react';
// import Loadable from 'react-loadable';
// import { Spin } from 'antd';
import HomeComponent from '../ui/components/HomeComponent/HomeComponent'

// const LoadableFormComponent = Loadable({
//   loader: () => import('../ui/components/Routes/MobxRoutes'),
//   loading: () => <Spin tip="Загрузка" size="large"></Spin>,
// });

const HomePage = () => {
  return (
    <div>
        <HomeComponent />
    </div>
    );
};

export default observer(HomePage);
