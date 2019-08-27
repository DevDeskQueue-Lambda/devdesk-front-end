import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthState from "./context/auth/AuthState";

import Login from './components/auth/Login';
import Register from './components/auth/Registration';
import NavBar from './components/NavBar';
import lambdaLogo from './lambda-logo.png';

//Routing
import PrivateRoute from "./components/routing/PrivateRoute";

//User Routing
import UserDashboard from "./components/pages/User/Dashboard";

function App(props) {
	return (
		<AuthState>
			<div className='App'>
				<Router>
					<NavBar logo={lambdaLogo} />
					<Fragment>
						<Switch>
							<Route exact path='/' component={Login} />
							<Route path='/register' component={Register} />
							<PrivateRoute path="/users/dashboard" component={UserDashboard} />
						</Switch>
					</Fragment>
				</Router>
			</div>
		</AuthState>
	);
}

export default App;
