import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from '../components/Home';
import About from '../project-ui/About';
import Signup from '../project-ui/Signup';
import Login from '../project-ui/Login';

function UnauthenticatedRoutes() {
  return (
    <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/About" component={About} />
    <Route path="/Login" component={Login} />
    <Route path="/Signup" component={Signup} />
    </Switch>
  );
}

export default UnauthenticatedRoutes;
