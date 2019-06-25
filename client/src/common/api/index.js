import axios from 'axios/index';

import configMethods from '../../../../config';

import accountApi from './account';
import workspaceApi from './workspace';
import resourcesApi from './resources';
import sourceApi from './source';

const config = configMethods.getConfig(process.env.NODE_ENV);


const account = accountApi(config, axios);
const workspace = workspaceApi(config, axios);
const resources = resourcesApi(config, axios);
const source = sourceApi(config, axios);


export default {
  account,
  workspace,
  resources,
  source
};
