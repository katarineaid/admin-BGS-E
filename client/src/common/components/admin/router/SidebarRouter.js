import React from 'react';
import { Route } from 'react-router-dom';
import Menu from '../sidebar/Menu';

const SidebarRouter = () => {
  const { adminPath } = SidebarRouter;
  return ([
    <Route key={1} path={adminPath} component={Menu} />,
  ]);
};

SidebarRouter.adminPath = '/admin';

export default SidebarRouter;