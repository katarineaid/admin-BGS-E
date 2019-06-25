import createReducer from '../createReducer';
import {
  INIT_MAP,
} from './mapConstants';

const initialState = {
  api: undefined,
};

export default createReducer(initialState, {
  [INIT_MAP]: (state, payload) => Object.assign({}, state, {
    api: payload,
  })
})