/* global google */

import React from 'react';

class GoogleMap extends React.Component {

  componentDidMount() {
    // console.log(this.mapCanvas);
    this.map = new google.maps.Map(this.mapCanvas, {
      center: this.props.center || {lat: 51.51, lng: -0.08},
      zoom: 14
    });

    if (navigator.geolocation) {
      // Browser suppors Geoloation
      navigator.geolocation.getCurrentPosition(this.onSuccess.bind(this), this.onError.bind(this));
    } else {
      // Browser doesn't support Geolocation
      this.handleError();
    }
  }

  onSuccess(position) {
    // console.log(position);
    const latLng = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    };
    //
    // this.infoWindow.setPosition(pos);
    // this.infoWindow.setContent('Location found.');
    // this.infoWindow.open(this.map);
    this.map.setCenter(latLng);
    this.marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });
  }

  onError() {
    console.log('The geolocation service failed, or your browser doesn\'t support geolocation.');
  }

  componentWillUnmount() {
    this.marker.setMap(null);
    this.marker = null;
    this.map = null;
  }


  render() {
    return (
      <div className="google-map" ref={element => this.mapCanvas = element}></div>
    );
  }
}

export default GoogleMap;
