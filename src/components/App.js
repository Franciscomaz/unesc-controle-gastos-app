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
import AppLayout from './layout/AppLayout';
import AccountPage from './account/AccountPage';
import CategoryPage from './category/CategoryPage';

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
        <AuthenticatedRoute path="/categories">
          <AppLayout>
            <CategoryPage />
          </AppLayout>
        </AuthenticatedRoute>
      </Switch>
    </Router>
  );
}
