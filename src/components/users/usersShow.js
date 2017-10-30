import React from 'react';
import {  } from 'react-router-dom';
import Axios from 'axios';
import Auth from '../../lib/Auth';

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
      // .then(res => this.setState({ user: res.data }, this.getPlaylists))
      .catch(err => console.log(err));
  }

  getUsersPlaylists() {
    Axios
      .get(`/api/spotify/users/${this.state.user.spotifyId}`)
      .then(res => this.setState({ playlists: res.data.items.filter(playlist => playlist.owner.id === this.state.user.spotifyId)}, () => console.log(res.data.items)))
      .catch(err => console.log(err));
  }


  getPlaylist(playlist) {
    Axios
      .get(`/api/spotify/users/${this.state.user.spotifyId}/playlists/${playlist.id}`)
      .then(res => this.setState({ tracks: res.data.items }, () => console.log(res.data)))
      .catch(err => console.log(err));
  }

  followPlaylist(playlist) {
    Axios
      .put(`/api/spotify/users/${this.state.user.spotifyId}/playlists/${playlist.id}/followers`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(() => this.props.history.push(''))
      // .then(res => this.setState({ playlists: res.data.items }, () => console.log(res.data)))
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
          {/* left hand side column */}
          <div className="col-md-6">
            <div className="row">
              {this.state.playlists && this.state.playlists.map(playlist => (
                <div className="col-md-4" key={playlist.id}>
                  <p>{playlist.name}</p>
                  <div className="image-tile">
                    <img src={playlist.images[0].url}
                      className="img-responsive"
                      onClick={() => this.getPlaylist(playlist)}/>
                  </div>
                  <button onClick={() => this.followPlaylist(playlist)}
                    className="standard-button">Follow</button>
                </div>
              ))}
            </div>
          </div>
          {/* right hand side column */}
          <div className="col-md-6">
            <div className="row">
              {this.state.tracks && this.state.tracks.map(track => (
                <div className="col-md-12" key={track.track.id}>
                  <p>{track.track.name}</p>
                  <p>{track.track.artists[0].name}</p>
                  {track.track.preview_url && <audio controls>
                    <source src={track.track.preview_url} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UsersShow;
