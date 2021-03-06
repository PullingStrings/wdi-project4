import React from 'react';
import {  withRouter, Link } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Navbar = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(
    <div className="NavBar">
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <div className="nav-link">
          <Link to={Auth.isAuthenticated() ? '/users' : '/'}>Follow & Find Playlists</Link>
        </div>
        <h4>Find playlists from people around you</h4>
        { Auth.isAuthenticated() && <Link className="nav-link" to={`/users/${Auth.getPayload().userId}`}>My Profile</Link> }
        { Auth.isAuthenticated() &&  <a href="#" onClick={logout} className="nav-link">LogOut</a> }
      </nav>
    </div>

  );
};

export default withRouter(Navbar);
