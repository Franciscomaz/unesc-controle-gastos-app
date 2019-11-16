import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserLogin from './usuario/UserLogin';
import UserRegistration from './usuario/UserRegistration';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <UserLogin />
        </Route>
        <Route path="/register">
          <UserRegistration />
        </Route>
      </Switch>
    </Router>
  );
}
