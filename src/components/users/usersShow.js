import React from 'react';
import {  } from 'react-router-dom';
import Axios from 'axios';

class UsersShow extends React.Component {
  state = {
    user: {},
    playlists: [],
    tracks: []
  }

  componentWillMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }, this.getUsersPlaylists))
      .then(res => this.setState({ user: res.data }, this.getPlaylists))
      .catch(err => console.log(err));
  }

  getUsersPlaylists() {
    Axios
      .get(`/api/spotify/users/${this.state.user.spotifyId}`)
      .then(res => this.setState({ playlists: res.data.items }, () => console.log(res.data.items)))
      .catch(err => console.log(err));
  }


  getPlaylists() {
    Axios
      .get(`/api/spotify/users/${this.state.user.spotifyId}/${this.state.user.playlistId}`)
      .then(res => this.setState({ playlists: res.data }, () => console.log(res.data)))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h1>{this.state.user.username}</h1>
            <div className="image-tile col-md-6">
              <img src={this.state.user.image}
                className="img-responsive" />
            </div>
          </div>
        </div>
        <div className="row">
          {this.state.playlists && this.state.playlists.map(playlist => (
            <div className="col-md-12" key={playlist.id}>
              <p>{playlist.name}</p>
              <div className="image-tile col-md-6">
                <img src={playlist.images[0].url}
                  className="img-responsive" />
                <a href={playlist.tracks}>tracks</a>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="row">
          {this.state.playlists && this.state.playlists.map(playlist => (
            <div className="col-me-12" key={playlist.id}>
              <a href={playlist.tracks}>tracks</a>
            </div>
          ))}
        </div> */}
      </div>
    );
  }
}

export default UsersShow;
