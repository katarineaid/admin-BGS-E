import React from 'react';
import {  BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import LandingPage from '../landingPage/LandingPage';
import ViewerPage from '../viewer/page/ViewerPage';
import EditorPage from '../editor/page/EditorPage';
import AdminPage from '../admin/page/AdminPage';

import requireAuth from '../hoc/requireAuth';
import redirectIfAuthentificated from '../hoc/redirectIfAuthentificated';


const Landing = redirectIfAuthentificated(LandingPage);
const Editor = requireAuth(EditorPage);
const Viewer = requireAuth(ViewerPage);
const Admin = requireAuth(AdminPage);

const AppRoutes = () => {
  const { editorPath, landingPath, viewerPath, adminPath } = AppRoutes;

  return (<Router>
    <Route path={landingPath} component={Landing} />
    <Route path={editorPath} component={Editor} />
    <Route path={adminPath} component={Admin} />
    <Route path={viewerPath} component={Viewer} />
    <Route render={() => <Redirect to={landingPath} />} />
  </Router>);
};

AppRoutes.landingPath = '/sign_in';
AppRoutes.editorPath = '/editor';
AppRoutes.viewerPath = '/viewer';
AppRoutes.adminPath = '/admin';


export default AppRoutes;
