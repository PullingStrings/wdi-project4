import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

// import Auth from '../../lib/Auth';

class UsersIndex extends React.Component {
  state = {
    users: []
  }

  componentWillMount() {
    Axios
      .get('/api/users')
      .then(res => this.setState({ users: res.data }, () => console.log(res)))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="row">
          {this.state.users.map(user => {
            return(
              <div key={user.id} className="col-md-4 col-sm-6 col-xs-12">
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default UsersIndex;
