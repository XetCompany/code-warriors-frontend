import React from 'react';
import { MobxRouter } from 'mobx-router';
import Router from '../../../store/Router/Router';

const MobxRoutes = () => {
  return <MobxRouter store={Router} />;
};

export default MobxRoutes;
