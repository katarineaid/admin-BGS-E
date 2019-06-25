import React, { Component } from 'react';
import PropsTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import MapView from './MapView';
import addMapActions from './actions/addMapActions';
import createMapRouter from './router/createMapRouter';
import ContentWrapperBody from '../common/ContentWrapperBody';
import ContentWrapper from '../common/ContentWrapper';

/**mapId = schemeId**/


class Map extends Component {
  static propTypes = {
    mapId: PropsTypes.string,
    currentSourceAlias: PropsTypes.string,
    actionsWithMap: PropsTypes
    .shape({ init: PropsTypes.func, refreshMapView: PropsTypes.func }).isRequired,
  }

  static defaultProps = {
    mapId: undefined,
    currentSourceAlias: '',
  }

  shouldComponentUpdate(prevProps) {
    const { mapId } = this.props;
    return prevProps.mapId !== mapId;
  }

  componentDidUpdate() {
    const { mapId, actionsWithMap } = this.props;
    actionsWithMap.refreshMapView(mapId);
  }

  render() {
    const { actionsWithMap, currentSourceAlias } = this.props;
    const init = actionsWithMap.init;
    return (
      <ContentWrapper>
        <ContentWrapperBody>
          <Typography variant="h6" color="secondary">
            {currentSourceAlias}
          </Typography>
          <MapView onInit={init}/>
        </ContentWrapperBody>
      </ContentWrapper>
    );
  }

}

export default createMapRouter(addMapActions(Map));