/* global google */

import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

class UsersIndex extends React.Component {
  state = {
    users: [],
    latLng: {}
  }

  onSuccess(position) {
    const latLng = { lat: position.coords.latitude, lng: position.coords.longitude };
    const currentUserLatLng = new google.maps.LatLng(latLng);

    const usersWithDistance = this.state.users.map(user => {
      const userLatLng = new google.maps.LatLng(user.location);

      const distance = (google.maps.geometry.spherical.computeDistanceBetween(currentUserLatLng, userLatLng) / 1000).toFixed(2);
      user.distanceAway = parseFloat(distance);
      return user;
    });

    const users = Object.assign(this.state.users, usersWithDistance);
    console.log('users', users);
    this.setState({ users }, console.log(this.state.users));

    // console.log(usersWithDistance);
  }

  onError() {
    console.log('The geolocation service failed, or your browser doesn\'t support geolocation.');
  }

  componentWillMount() {

    if (navigator.geolocation) {
      // Browser suppors Geoloation
      navigator.geolocation.getCurrentPosition(this.onSuccess.bind(this), this.onError.bind(this));
    } else {
      // Browser doesn't support Geolocation
      this.handleError();
    }

    Axios
      .get('/api/users')
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="userIndex">
        {this.state.users.map(user => {
          return(
            <div key={user.id} className="col-md-4 col-sm-6 col-xs-12">
              {Auth.isAuthenticated && <Link to={`/users/${user.id}`}>{user.username} {user.distanceAway && <span>{user.distanceAway}km away</span>}</Link>}
            </div>
          );
        })}
      </div>
    );
  }
}

export default UsersIndex;
