import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import UserLogin from './usuario/UserLogin';
import UserRegistration from './usuario/UserRegistration';
import PrivateRoute from './authentication/PrivateRoute';
import Dashboard from './dashboard/Dashboard';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={UserLogin} />
        <Route path="/register" component={UserRegistration} />
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
