import React, { useState, useEffect } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';

import { message } from 'antd';

import AuthService from './auth.service';
import { getToken } from '../../core/authentication/auth-storage.service';

import PropTypes from 'prop-types';

function AuthenticatedRoute({ children, ...props }) {
  const [hasPermission, setHasPermission] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const verifyPermission = async () => {
      const hasPermission = await isUserLoggedIn();

      if (!hasPermission) {
        notifyNoPermission();
      }

      setHasPermission(hasPermission);
    };

    verifyPermission();
  }, [location.pathname]);

  const isUserLoggedIn = async () => {
    const token = getToken();

    if (!token) {
      return false;
    }

    try {
      const response = await AuthService.authenticate(token);
      return response.data;
    } catch {
      return false;
    }
  };

  const notifyNoPermission = () => {
    message.warning('Você não tem permissão para acessar esse recurso');
  };

  if (hasPermission === null) {
    return false;
  }

  return (
    <Route
      {...props}
      render={({ location }) =>
        hasPermission ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  );
}

AuthenticatedRoute.propTypes = {
  children: PropTypes.object
};

export default AuthenticatedRoute;
