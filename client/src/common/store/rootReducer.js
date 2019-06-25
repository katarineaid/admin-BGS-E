import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import account from './account/accountReducer';
import workspace from './workspace/workspaceReducer';
import resources from './resources/resourcesReduser';
import source from './source/sourceReduser';
import map from './map/mapReducer';


export default combineReducers({
  form: reduxFormReducer,
  account,
  workspace,
  resources,
  source,
  map,
});
