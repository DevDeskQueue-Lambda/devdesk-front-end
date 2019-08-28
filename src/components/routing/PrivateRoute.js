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
          userInfo.authority.findIndex(
            authority => authority.authority === roleName
          ) === -1
        ) {
          const auth = userInfo.authority[0].authority.split("_");
          const role = auth[1].toLowerCase();

          if (userInfo.authority.length === 1) {
            return (
              <Redirect
                to={{
                  pathname: `/${role}/dashboard`,
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
