import React from 'react';
import OAuth from '../lib/OAuth';
import queryString from 'query-string';
import Axios from 'axios';
import Auth from '../lib/Auth';
import { withRouter } from 'react-router-dom';

class OAuthButton extends React.Component {
  componentWillMount() {
    this.provider = OAuth.getProvider(this.props.provider);
    //if theres no code in the address bar, AND
    //the provider in locaolStorage does not match this button
    //stop here...
    if(!this.props.location.search.match(/code/)
    || localStorage.getItem('provider') !== this.props.provider) return false;
    //get the querystring out of the address bar, as an Object
    //{code: 'hahahhahaheieieiidkdkdk'}
    const data = queryString.parse(this.props.location.search);
    data.redirectUri = window.location.origin + window.location.pathname;
    // console.log(data);
    //send the code to the api
    Axios.post(this.provider.url, data)
      .then(res => Auth.setToken(res.data.token))
      .then(() => localStorage.removeItem('provider'))
      .then(() => this.props.history.replace(this.props.location.pathname))
      .then(() => this.props.history.push('/'));
  }

  setProvider = () => {
    localStorage.setItem('provider', this.props.provider);
  }
  render(){
    return (
      <a
        className="btn btn-primary"
        href={this.provider.authLink}
        onClick={this.setProvider}
      >
        {this.props.children}

      </a>
    );
  }
}

export default withRouter(OAuthButton);
