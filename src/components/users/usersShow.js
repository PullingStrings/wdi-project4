import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import GoogleMap from '../GoogleMap/GoogleMap';

class UsersShow extends React.Component {
  state = {
    user: {},
    createdPlaylists: [],
    tracks: [],
    currentUser: {},
    followedPlaylists: []
  }

  componentWillMount() {
    // get the user based on the params id
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }, this.getUsersPlaylists))
      .catch(err => console.log(err));

    // getting the current user based on the token in the local storage
    Axios
      .get(`/api/users/${Auth.getPayload().userId}`)
      .then(res => this.setState({ currentUser: res.data }))
      .catch(err => console.log(err));
  }

  findFollowedPlaylists(playlist) {
    // return true if the playlist that we're looping over is inside the user's followed playlists (in our database)
    return this.state.user.playlists.find(_playlist => _playlist.playlistId === playlist.id);
  }

  getUsersPlaylists() {
    // making a request to get the playlists of a specific user
    Axios
      .get(`/api/spotify/users/${this.state.user.spotifyId}`)
      // we are looping over ALL of a users playlists (created or followed) and run split them into created and followed
      .then(res => this.setState({
        createdPlaylists: res.data.items.filter(playlist => playlist.owner.id === this.state.user.spotifyId),
        // to find the playlists that a user has followed (USING THIS APP) we need to run the findFollowedPlaylists method
        followedPlaylists: res.data.items.filter(this.findFollowedPlaylists.bind(this))
      }))
      .catch(err => console.log(err));
  }

  getPlaylist(playlist) {
    // playlist is an object with all the data we need about a single playlist (including owner info)
    Axios
      .get(`/api/spotify/users/${playlist.owner.id}/playlists/${playlist.id}`)
      // res.data.items is an array of tracks from the spotify API
      .then(res => this.setState({ tracks: res.data.items }))
      .catch(err => console.log(err));
  }

  followPlaylist(playlist) {
    // playlist is an object with all the data we need about a single playlist (including owner info)
    Axios
      .put(`/api/spotify/users/${playlist.owner.id}/playlists/${playlist.id}/followers`, {}, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      // we get back the updated user from our API as res.data
      .then(res => this.setState({ currentUser: res.data }))
      .catch(err => console.log(err));
  }

  unfollowPlaylist(playlist) {
    // playlist is an object with all the data we need about a single playlist (including owner info)
    Axios
      .delete(`/api/spotify/users/${playlist.owner.id}/playlists/${playlist.id}/followers`, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      // we get back the updated user from our API as res.data
      .then(res => this.setState({ currentUser: res.data }))
      .catch(err => console.log(err));
  }

  isFollowing(playlist) {
    return this.state.currentUser && this.state.currentUser.playlists.find(_playlist => _playlist.playlistId === playlist.id);
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
              <hr />
              {<Link to={`/users/${this.state.user.id}/edit`} className="standard-button">
                <i className="fa fa-pencil" ></i>Profile Edit
              </Link>}
            </div>
          </div>
          <div className="col-md-6">
            <GoogleMap user={this.state.user} center={{ lat: 51.51, lng: -0.08 }} />
          </div>
        </div>
        <div className="row">
          {/* left hand side column */}
          <div className="col-md-6">
            <h1>Playlists {this.state.user.username} follows</h1>
            <div className="row">
              {this.state.followedPlaylists && this.state.followedPlaylists.map(playlist => (
                <div className="col-md-4" key={playlist.id}>
                  <p>{playlist.name}</p>
                  <div className="image-tile">
                    <img src={playlist.images[0].url}
                      className="img-responsive"
                      onClick={() => this.getPlaylist(playlist)}/>
                  </div>
                  {!this.isFollowing(playlist) && <button onClick={() => this.followPlaylist(playlist)}
                    className="standard-button">Follow</button>}

                  {this.isFollowing(playlist) && <button onClick={() => this.unfollowPlaylist(playlist)}
                    className="standard-button">Unfollow</button>}
                </div>
              ))}
            </div>
          </div>
          {/* right hand side column */}
          <div className="col-md-6">
            <div className="row">
              {this.state.tracks && this.state.tracks.map(track => (
                <div className="col-md-12" key={track.track.id}>
                  <h4>Track Name: <strong>{track.track.name}</strong></h4>
                  <p> Artists: {track.track.artists[0].name}</p>
                  {track.track.preview_url && <audio controls>
                    <source src={track.track.preview_url} type="audio/mp3" />
                    Your browser does not support the audio element.
                  </audio>}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="row">
          {/* left hand side column */}
          <div className="col-md-6">
            <h1>Playlists {this.state.user.username} has created</h1>
            <div className="row">
              {this.state.createdPlaylists && this.state.createdPlaylists.map(playlist => (
                <div className="col-md-4" key={playlist.id}>
                  <p>{playlist.name}</p>
                  <div className="image-tile">
                    <img src={playlist.images[0].url}
                      className="img-responsive"
                      onClick={() => this.getPlaylist(playlist)}/>
                  </div>
                  {!this.isFollowing(playlist) && <button onClick={() => this.followPlaylist(playlist)}
                    className="standard-button">Follow</button>}

                  {this.isFollowing(playlist) && <button onClick={() => this.unfollowPlaylist(playlist)}
                    className="standard-button">Unfollow</button>}
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
