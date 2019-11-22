import { BEARER_TOKEN_STORAGE_KEY } from '../../core/constants/local-storage.constants';

import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from './auth.service';
import PropTypes from 'prop-types';

import { message } from 'antd';

function PrivateRoute({ children, ...props }) {
  const [hasPermission, setHasPermission] = useState(null);

  useEffect(() => {
    const hasPermission = isUserLoggedIn();

    if (!hasPermission) {
      notifyNoPermission();
    }

    setHasPermission(hasPermission);
  }, []);

  const isUserLoggedIn = () => {
    const token = localStorage.getItem(BEARER_TOKEN_STORAGE_KEY);

    if (!token) {
      return false;
    }

    return AuthService.authenticate(token)
      .then(response => response.data)
      .catch(() => false);
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

PrivateRoute.propTypes = {
  children: PropTypes.object
};

export default PrivateRoute;
