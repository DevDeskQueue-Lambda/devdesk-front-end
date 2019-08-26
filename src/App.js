import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthState from "./context/auth/AuthState";

import Login from "./components/auth/Login";
import Home from "./components/pages/Home";
import Register from "./components/auth/Registration";

//Routing
import PrivateRoute from "./components/routing/PrivateRoute";

//User Routing
import UserDashboard from "./components/pages/User/Dashboard";

import "./App.css";

function App() {
  return (
    <AuthState>
      <div className="App">
        APP
        <Router>
          <Fragment>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute path="/users/dashboard" component={UserDashboard} />
            </Switch>
          </Fragment>
        </Router>
      </div>
    </AuthState>
  );
}

export default App;
