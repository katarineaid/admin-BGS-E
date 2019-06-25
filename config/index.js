import development from './dev.config.js';
import production from './prod.config.js';

const DEVMODE = 'development';
const PRODMODE = 'production';

function getConfig(mode) {
  if (mode === DEVMODE) {
    return development;
  }
  return production;
}

function getConf(window, location, mode) {
  if (typeof window !== 'undefined') {
    const ip = location.host.split(':');
    if (ip[0] === '172.10.1.11') {
      return DEVMODE;
    }
    return {
      domain: `http://${ip[0]}:3008`,
      apiVersion: 'api/v1',
    };
  }
  return getConfig(mode);
}

export default {
  getConfig,
  getConf,
};
