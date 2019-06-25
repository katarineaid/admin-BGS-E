import React from 'react';
import { Route } from 'react-router-dom';
import LocalSource from '../content/LocalSource';
import Plugins from '../content/Plugins';
import Workspace from '../content/Workspace';
import Source from '../content/Source';
import Info from '../content/Info';
import Map from '../../map/Map';

const ContentRouter = () => {
  const { localSourcePath, workspacePath, sourcePath, dataBasePath, servicesPath, pluginsPath, viewPath } = ContentRouter;
  return ([
    <Route key={1} path={pluginsPath} component={Plugins}/>,
    <Route key={2} path={localSourcePath} component={LocalSource}/>,
    <Route key={3} path={workspacePath} component={Workspace}/>,
    <Route key={4} path={sourcePath} component={Source}/>,
    <Route key={5} path={dataBasePath} component={Info}/>,
    <Route key={6} path={servicesPath} component={Info}/>,
    <Route key={7} path={viewPath} component={Map}/>,
  ]);
};

ContentRouter.localSourcePath = '/admin/localSource';
ContentRouter.workspacePath = '/admin/workspace*';
ContentRouter.sourcePath = '/admin/source*';
ContentRouter.dataBasePath = '/admin/dataBase';
ContentRouter.servicesPath = '/admin/services';
ContentRouter.pluginsPath = '/admin/plugins';
ContentRouter.viewPath = '/admin/view';

export default ContentRouter;