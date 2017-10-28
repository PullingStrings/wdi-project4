import React from 'react';
import {  withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';
import OAuthButton from '../auth/OAuthButton';

const Navbar = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(
    <nav>
      <OAuthButton provider="spotify">
        Login with Spotify
      </OAuthButton>
      {' '}
      <a href="#" onClick={logout} className="standard-button">Logout</a>
    </nav>
  );
};

export default withRouter(Navbar);
