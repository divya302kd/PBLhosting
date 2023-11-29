import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../components/Home';
import Signup from '../project-ui/Signup';
import Login from '../project-ui/Login';

function UnauthenticatedRoutes() {
  return (
    <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/Login" component={Login} />
    <Route path="/Signup" component={Signup} />
    </Switch>
  );
}

export default UnauthenticatedRoutes;
