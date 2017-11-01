import React from 'react';
import { withRouter } from 'react-router-dom';


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
            <a className="btn btn-primary" href="#">Login</a>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(HomePage);
