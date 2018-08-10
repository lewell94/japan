import React from 'react'

import './map.css'

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
        center: { lat: 40.099038, lng: -75.091187 },
        zoom: 11,
      }),
    }, this.createMarkers.bind(this))
  }

  createMarkers() {
    const markers = []

    this.props.data.forEach(reference => {
      const { lat, lng } = reference.node
      const position = { lat, lng }
      const marker = new google.maps.Marker({ position, map: this.state.map })

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

  render() {
    if (this.props.clickedCard !== null) {
      this.selectPin(this.props.clickedCard)
    }

    return <div id="map" />
  }
}

export default Map
