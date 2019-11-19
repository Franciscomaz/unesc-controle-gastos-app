import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import UserLogin from './user/UserLogin';
import UserRegistration from './user/UserRegistration';
import PrivateRoute from './authentication/PrivateRoute';
import Dashboard from './dashboard/Dashboard';
import AccountPage from './account/AccountPage';

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Route path="/login" component={UserLogin} />
        <Route path="/register" component={UserRegistration} />
        <PrivateRoute path="/dashboard">
          <Dashboard />
        </PrivateRoute>
        <PrivateRoute path="/accounts">
          <AccountPage />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}
