import React from 'react';
import {  withRouter, Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import OAuthButton from '../auth/OAuthButton';

const Navbar = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(
    <div className="NavBar">
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <h1 className="navBar-brand"><Link to="/">Play-Gen</Link></h1>
        <h4>Find playlists from people around you</h4>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
        </div>
        <OAuthButton provider="spotify">Login with Spotify</OAuthButton>
        { Auth.isAuthenticated() &&  <a href="#" onClick={logout} className="nav-link">LogOut</a> }
      </nav>
    </div>

  );
};

export default withRouter(Navbar);
//
// <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
//
//   <h1 className="navBar-brand"><Link to="/">Play-Gen</Link></h1>
// <h2>Find playlists from people around you</h2>
//
//   <div className="collapse navbar-collapse" id="navbarSupportedContent">
//     <ul className="navbar-nav mr-auto">
//       <li className="nav-item active">
//         <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
//       </li>
//     </ul>
//     { Auth.isAuthenticated() &&  <a href="#" onClick={logout} className="standard-button">Logout</a> }
{/* <OAuthButton provider="spotify">
  Login with Spotify
</OAuthButton> */}
//   </div>
// </nav>
