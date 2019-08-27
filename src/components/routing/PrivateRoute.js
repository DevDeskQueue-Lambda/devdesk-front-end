import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

const PrivateRoute = ({ component: Component, roleName, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, userInfo } = authContext;

  return (
    <Route
      {...rest}
      render={props => {
        if (!isAuthenticated) {
          return (
            <Redirect to={{ pathname: "/", state: { from: props.location } }} />
          );
        }

        if (
          roleName &&
          userInfo.userRoles.findIndex(role => role.role.name === roleName) ===
            -1
        ) {
          if (userInfo.userRoles.length === 1) {
            return (
              <Redirect
                to={{
                  pathname: `/${userInfo.userRoles[0].role.name}/dashboard`,
                  state: { error: "unauthorized role", from: props.location }
                }}
              />
            );
          } else {
            return (
              <Redirect
                to={{
                  pathname: `/dashboard`,
                  state: { error: "unauthorized role", from: props.location }
                }}
              />
            );
          }
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
