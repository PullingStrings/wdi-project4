/* global google */

import React from 'react';
import Axios from 'axios';
import { Link, withRouter } from 'react-router-dom';
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
    // console.log('users', users);
    this.setState({ users });

    // console.log('users with distance', usersWithDistance);
    const sortedUsers = users.sort((a, b) => {
      return a.distanceAway - b.distanceAway;
    });
    this.setState({ users: sortedUsers });
  }

  onError() {
    console.log('The geolocation service failed, or your browser doesn\'t support geolocation.');
  }

  getUsers = () => {
    Axios
      .get('/api/users')
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.log(err));
  }

  componentWillMount() {

    if (navigator.geolocation) {
      // Browser suppors Geoloation
      navigator.geolocation.getCurrentPosition(this.onSuccess.bind(this), this.onError.bind(this));
    } else {
      // Browser doesn't support Geolocation
      this.handleError();
    }

    this.getUsers();
  }

  deleteUser = id => {
    Axios
      .delete(`/api/users/${id}`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => {
        const users = this.state.users.filter(user => {
          return user.id !== id;
        });
        this.setState({ users });
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="userIndex">
        <h1><strong>Wait to see how far your friends are...</strong></h1>
        {this.state.users.map(user => {
          return(
            <div key={user.id} className="UsersSection">
              <div  className="col-md-4 col-sm-6 col-xs-12">
                <button className="usersIndexButton">
                  {Auth.isAuthenticated && <Link to={`/users/${user.id}`}>{user.username} {user.distanceAway && <p>{user.distanceAway} is km away</p>}</Link>}
                </button>
              </div>

            </div>
          );
        })}
      </div>
    );
  }
}

export default withRouter(UsersIndex);
