import React from 'react';
import { withRouter } from 'react-router-dom';
import OAuthButton from '../auth/OAuthButton';



import Auth from '../../lib/Auth';

class HomePage extends React.Component {
  componentWillMount() {
    Auth.isAuthenticated() ? this.props.history.replace('/users') : null;
  }
  render() {
    return(
      <header className="HomePage">
        <div className="HomePageContent">
          <div className="HomePageContentInner">
            <h1>FIND.LISTEN.FOLLOW</h1>
            <div className="HomePageLoginButton">
              <OAuthButton provider="spotify">Login with Spotify</OAuthButton>
              { ' ' }
              <h1>Login with your spotify account and place your location....See what people around you are listening to</h1>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(HomePage);
