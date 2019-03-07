/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */

import React from 'react';

import './map.css';
import TYPE_PIN from '../enums/type-pin';

class Map extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (!window.L) {
      return;
    }

    window.leaflet = window.L;

    this.createMap();
  }

  createMap() {
    const map = leaflet.map('map').setView([35.690332, 139.740709], 12);

    this.setState({ map }, this.createTileLayer.bind(this));
  }

  createTileLayer() {
    leaflet
      .tileLayer(
        'https://a.tile.iosb.fraunhofer.de/tiles/osmorg/{z}/{x}/{y}.png',
        {
          attribution:
            '&copy; <a href="https://www.fraunhofer.de/">Fraunhofer</a> contributors',
          maxZoom: 19
        }
      )
      .addTo(this.state.map);

    this.createMarkers();
  }

  createMarkers() {
    const markers = [];

    this.props.data.forEach((reference, i) => {
      const { lat, lng, type } = reference.node;
      const position = [lat ? lat : 0, lng ? lng : 0];
      const markerConfig = {
        icon: leaflet.icon({
          iconUrl: TYPE_PIN[type],
          iconSize: [32, 32]
        })
      };

      const marker = leaflet
        .marker(position, markerConfig)
        .addTo(this.state.map)
        .bindPopup(`<p>${this.props.data[i].node.name}</p>`);

      markers.push(marker);
    });

    this.setState({
      markers
    });
  }

  selectPin(index) {
    setTimeout(() => {
      if (!this.state.markers[index].getLatLng) {
        return;
      }

      const { lat, lng } = this.state.markers[index].getLatLng();

      this.state.markers[index].openPopup();
      this.state.map.flyTo(leaflet.latLng(lat, lng), 13);
    });
  }

  updatePinsByType() {
    if (!this.state || !this.state.markers) {
      return;
    }

    this.state.markers.forEach(marker => {
      if (this.props.filteredType === '' || this.props.filteredType === 'all') {
        marker.setOpacity(1);
      } else {
        const opactity =
          marker._icon.src === TYPE_PIN[this.props.filteredType] ? 1 : 0;

        marker.setOpacity(opactity);
      }
    });
  }

  render() {
    if (this.props.clickedCard !== null) {
      this.selectPin(this.props.clickedCard);
    }

    this.updatePinsByType();

    return <div id="map" />;
  }
}

export default Map;
