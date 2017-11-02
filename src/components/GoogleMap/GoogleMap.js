/* global google */

import React from 'react';

class GoogleMap extends React.Component {

  state = {
    loading: false
  }

  componentWillMount() {
    this.setState({ loading: true });
  }

  componentDidMount() {
    this.mapCanvas.style.position = 'relative';
    this.mapCanvas.style.opacity = '0';
    this.mapCanvas.style.zIndex = '-1';

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

  componentDidUpdate() {

    if(!this.props.user) return false;
    if(this.props.user.location) {
      this.marker = new google.maps.Marker({
        position: this.props.user.location,
        map: this.map,
        icon: 'https://cdn2.iconfinder.com/data/icons/snipicons/500/map-marker-128.png'
      });

      // adding the user (on the profile page) to the bounds

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

    this.setState({ loading: false });
    this.mapCanvas.style.opacity = '1';
    this.mapCanvas.style.zIndex = '1';

    // add the user who is currently viewing the page to the bounds
    this.bounds = new google.maps.LatLngBounds();
    this.bounds.extend(latLng);
    this.bounds.extend(this.props.user.location);
    this.map.fitBounds(this.bounds);
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
    const { loading } = this.state;
    return (
      <div className="GoogleMapShow">
        { loading && <p>Loading map...</p> }
        <div className="google-map" ref={element => this.mapCanvas = element}></div>
      </div>
    );
  }
}

export default GoogleMap;
