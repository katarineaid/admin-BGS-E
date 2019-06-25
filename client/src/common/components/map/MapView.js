import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import MapViewApi from "../../map/MapViewApi";

const MapFrame = styled.div`
  bottom: 0;
  //position: absolute;
  height: fit-content;
  display: flex;
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
`;

class MapView extends Component {
  static propTypes = {
    onInit: PropTypes.func
  };

  static defaultProps = {
    onInit: undefined
  };

  componentDidMount() {
    const { onInit } = this.props;
    const map = MapViewApi.bindMapTo();

    if (onInit) {
      onInit(map);
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return <MapFrame id="map" />;
  }
}

export default MapView;
