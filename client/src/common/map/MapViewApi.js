let gisApi;

class MapViewApi {
  constructor(bindedMap) {
    this.bindedMap = bindedMap;
  }

  static bindMapTo() {
    gisApi = require('../../../dist/geo.bundle');
    const map = new gisApi();
    return new MapViewApi(map);
  }

  setGeoJsonLayer(data) {
    this.bindedMap.initScheme({ data });
    //this.bindedMap.removeInteractions();
  }
}

export default MapViewApi;
