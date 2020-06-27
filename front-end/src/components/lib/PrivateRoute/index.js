import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuthenticated } from 'utils/auth';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated() === true ? (
        <Component {...props} />
      ) : (
        <Redirect to="/" />
      )
    }
  />
);
