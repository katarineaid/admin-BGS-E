import {
  INIT_MAP,
} from './mapConstants';

function inizializeMap(data) {
  return {
    type: INIT_MAP,
    payload: data,
  };
}

function initMap(map) {
  return (dispatch) => {
    dispatch(inizializeMap(map));
  };
}

export default {
  initMap
}