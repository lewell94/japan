/* eslint-disable no-useless-constructor */
/* eslint-disable no-undef */

import React from 'react'

import './map.css'
import TYPE_PIN from '../enums/type-pin'

class Map extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if (!window.google) {
      return
    }

    this.setState({
      map: new google.maps.Map(document.getElementById('map'), {
        center: { lat: 35.707076, lng: 139.740871 },
        zoom: 12,
      }),
    }, this.createMarkers.bind(this, this.props.data))
  }

  createMarkers(data) {
    const markers = []

    data.forEach(reference => {
      const { lat, lng, type } = reference.node

      const position = { lat, lng }
      const marker = new google.maps.Marker({
        position,
        map: this.state.map,
        icon: {
          url: TYPE_PIN[type]
        }
      })

      markers.push(marker)
    })

    this.setState({
      markers,
    }, this.createInfoWindows.bind(this))
  }

  createInfoWindows() {
    const infoWindows = []

    this.state.markers.forEach((marker, i) => {
      const infoWindow = new google.maps.InfoWindow({
        content: `<p>${this.props.data[i].node.name}</p>`,
      })

      marker.addListener('click', () => {
        this.closeAllInfoWindows()

        infoWindow.open(this.state.map, marker)
      })

      infoWindows.push(infoWindow)
    })

    this.setState({
      infoWindows,
    })
  }

  selectPin(index) {
    setTimeout(() => {
      this.closeAllInfoWindows()

      if (!this.state.markers[index].position) {
        return
      }

      const { lat, lng } = this.state.markers[index].position

      google.maps.event.trigger(this.state.markers[index], 'click')

      this.state.map.setCenter({ lat: lat(), lng: lng() })
      this.state.map.setZoom(13)
    })
  }

  closeAllInfoWindows() {
    this.state.infoWindows.forEach(infoWindow => {
      infoWindow.close()
    })
  }

  updatePinsByType() {
    if (!this.state || !this.state.markers) {
      return
    }

    this.state.markers.forEach(marker => {
      if (this.props.filteredType === "" || this.props.filteredType === "all") {
        marker.setVisible(true)
      } else {
        marker.setVisible(marker.icon.url === TYPE_PIN[this.props.filteredType])
      }
    })
  }

  render() {
    if (this.props.clickedCard !== null) {
      this.selectPin(this.props.clickedCard)
    }

    this.updatePinsByType()

    return <div id="map" />
  }
}

export default Map
