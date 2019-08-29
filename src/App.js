import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthState from "./context/auth/AuthState";
import AdminState from "./context/admin/AdminState";
import StaffState from "./context/staff/StaffState";

// eslint-disable-next-line
import TicketState from "./context/ticket/ticketState";
import { roles } from "./utils/roles";

import Login from "./components/auth/Login";
import Register from "./components/auth/Registration";
import NavBar from "./components/NavBar";
import lambdaLogo from "./lambda-logo.png";

//Routing
import PrivateRoute from "./components/routing/PrivateRoute";

//User Routing
import StudentDashboard from "./components/pages/Student/Dashboard";
import StaffDashboard from "./components/pages/Staff/Dashboard";
import AdminDashboard from "./components/pages/Admin/Dashboard";
import Dashboard from "./components/pages/Dashboard";
import StaffViewTicket from "./components/pages/Staff/Dashboard/StaffViewTicket";

function App() {
  return (
    <AuthState>
      <Router>
        <AdminState>
          <StaffState>
            <div className="App">
              <Router>
                <NavBar
                  logo={lambdaLogo}
                  homeUrl="https://devdesk-ui.devdesk.now.sh/"
                />
                <Fragment>
                  <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/register" component={Register} />

                    <PrivateRoute path="/dashboard" component={Dashboard} />
                    <PrivateRoute
                      path="/student/dashboard"
                      rolename={roles.student}
                      component={StudentDashboard}
                    />
                    <PrivateRoute
                      exact
                      path="/staff/dashboard"
                      roleName={roles.staff}
                      component={StaffDashboard}
                    />

                    <PrivateRoute
                      path="/staff/dashboard/ticket/:id"
                      roleName={roles.staff}
                      component={StaffViewTicket}
                    />

                    <PrivateRoute
                      path="/admin/dashboard"
                      roleName={roles.admin}
                      component={AdminDashboard}
                    />

                    <PrivateRoute
                      path="/users/dashboard"
                      component={StudentDashboard}
                    />
                  </Switch>
                </Fragment>
              </Router>
            </div>
          </StaffState>
        </AdminState>
      </Router>
    </AuthState>
  );
}

export default App;
