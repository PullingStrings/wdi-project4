import React from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';

import UsersForm from './usersForm';

import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

class UsersEdit extends React.Component {
  state = {
    user: {
      username: '',
      base64: '',
      location: {}
    },
    address: ''
  };

  componentDidMount() {
    Axios
      .get(`/api/users/${this.props.match.params.id}`)
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.log(err));
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState(prevState => {
      prevState.user[name] = value;
      return prevState;
    });
  }

  handleAutocomplete = (address) => this.setState({ address });

  handleFormSubmit = (e) => {
    e.preventDefault();

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        const user = Object.assign({}, this.state.user, { location: latLng });
        this.setState({ user }, this.handleSubmit);
      });
  }



  handleSubmit = () => {
    Axios
      .put(`/api/users/${this.props.match.params.id}`, this.state.user, {
        headers: { 'Authorization': 'Bearer ' + Auth.getToken() }
      })
      .then(res => this.props.history.push(`/users/${res.data.id}`))
      .catch(err => this.setState({ errors: err.response.data.errors }));
  }

  getDataURL = (dataURL) => {
    this.setState(prevState => {
      const user = Object.assign({}, prevState.user, { base64: dataURL });
      return { user };
    });
  }



  render() {
    return (
      <UsersForm
        history={this.props.history}
        handleSubmit={this.handleFormSubmit}
        handleChange={this.handleChange}
        handleAutocomplete={this.handleAutocomplete}
        address={this.state.address}
        getDataURL={this.getDataURL}
        user={this.state.user}
        errors={this.state.errors}
      />
    );
  }
}

export default UsersEdit;
