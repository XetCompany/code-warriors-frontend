import React from 'react';
import Loadable from 'react-loadable';
import { Spin } from 'antd';

const LoadableMobxRouterComponent = Loadable({
  loader: () => import('../components/Routes/MobxRoutes'),
  loading: () => (
    <div
      className="spin"
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      <Spin tip="Загрузка" size="large" delay={100} />
    </div>
  ),
});

export default LoadableMobxRouterComponent;
