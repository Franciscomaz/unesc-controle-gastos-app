import { BEARER_TOKEN_STORAGE_KEY } from '../../core/constants/local-storage.constants';

import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthService from './auth.service';
import PropTypes from 'prop-types';

function PrivateRoute({ children, ...props }) {
  const [hasPermission, setIfHasPermission] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(BEARER_TOKEN_STORAGE_KEY);

    AuthService.authenticate(token)
      .then(() => setIfHasPermission(true))
      .catch(() => setIfHasPermission(false));
  }, []);

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
