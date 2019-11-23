import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import UserLogin from './user/UserLogin';
import UserRegistration from './user/UserRegistration';
import AuthenticatedRoute from './authentication/AuthenticatedRoute';
import Dashboard from './dashboard/Dashboard';
import AccountPage from './account/AccountPage';
import AppLayout from './layout/AppLayout';

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect exact from="/" to="/dashboard" />
        <Route path="/login" component={UserLogin} />
        <Route path="/register" component={UserRegistration} />
        <AuthenticatedRoute path="/dashboard">
          <AppLayout>
            <Dashboard />
          </AppLayout>
        </AuthenticatedRoute>
        <AuthenticatedRoute path="/accounts">
          <AppLayout>
            <AccountPage />
          </AppLayout>
        </AuthenticatedRoute>
      </Switch>
    </Router>
  );
}
