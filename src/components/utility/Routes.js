import React from 'react';
import { Switch, Route } from 'react-router-dom';

import UsersIndex from '../users/usersIndex';
import UsersShow from  '../users/usersShow';
import UsersEdit from '../users/usersEdit';
import HomePage from '../utility/HomePage';


const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/users" component={UsersIndex} />
      <Route exact path="/users/:id" component={UsersShow} />
      <Route exact path="/users/:id/edit" component={UsersEdit} />
    </Switch>
  );
};

export default Routes;
