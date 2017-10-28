import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UsersIndex from '../users/UsersIndex';
import UsersShow from  '../users/UsersShow';
// import Login from '../auth/Login';
// import Register from '../auth/Register';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={UsersIndex} />
      <Route exact path="/users/:id" component={UsersShow} />
      {/* <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} /> */}
    </Switch>
  );
};

export default Routes;
