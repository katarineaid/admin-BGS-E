import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import mapFunc from '../../../store/map/mapActions';
import sourceFunc from '../../../store/source/sourceActions';

function addMapActions(ComposedComponent) {
  class MapActions extends Component {
    static propTypes = {
      children: PropTypes.node,
      mapView: PropTypes.objectOf(PropTypes.any),
      currentSourceName: PropTypes.string,
    };
    static defaultProps = {
      children: undefined,
      mapView: undefined,
      currentSourceName: '',
    };

    constructor(props) {
      super(props);
      this.refreshMapData = this.refreshMapData.bind(this);
      this.actionsWithMap = {
        init: this.init.bind(this),
        refreshMapView: this.refreshMapView.bind(this),
      };
    }

    refreshMapData(currentSourceName, mapView) {
      const { userId, sourceAction } = this.props;
      sourceAction.getSource(userId, currentSourceName).then((data) => {
        const { type, crs, metadata, features } = data;
        mapView.setGeoJsonLayer({
          data: {
            type, crs, metadata, features
          }
        });
      })
    }

    refreshMapView(id) {
      const { mapView } = this.props;
      this.refreshMapData(id, mapView);
    }

    init(mapView) {
      const { mapActions, currentSourceName } = this.props;
      mapActions.initMap(mapView);
      this.refreshMapData(currentSourceName, mapView);
    }

    render() {
      const { children, currentSourceName, selectedSourceData, mapView, ...other } = this.props;
      let currentSourceAlias = '';
      if (selectedSourceData) {
        currentSourceAlias = selectedSourceData.alias;
      }
      return (
        <ComposedComponent
          actionsWithMap={this.actionsWithMap}
          mapId={currentSourceName}
          currentSourceAlias={currentSourceAlias}
          {...other}
        >
          {children}
        </ComposedComponent>
      );
    }
  }

  function mapStateToProps(state) {
    return {
      mapView: state.map.api,
      userId: state.account.userId,
      selectedSourceData: state.source.selectedSourceData,
    };
  }

  function mapDispatchToProps(dispatch) {
    return {
      mapActions: bindActionCreators(mapFunc, dispatch),
      sourceAction: bindActionCreators(sourceFunc, dispatch),
    };
  }

  return connect(mapStateToProps, mapDispatchToProps)(MapActions);
}

export default addMapActions;