import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UsersIndex from '../users/UsersIndex';
import UsersShow from  '../users/UsersShow';
import UsersEdit from '../users/UsersEdit';

// import Login from '../auth/Login';
// import Register from '../auth/Register';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={UsersIndex} />
      <Route exact path="/users/:id" component={UsersShow} />
      <Route exact path="/users/:id/edit" component={UsersEdit} />
      {/* <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} /> */}
    </Switch>
  );
};

export default Routes;
