import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import AuthState from './context/auth/AuthState';

import Login from './components/auth/Login';
import Home from './components/pages/Home';
import Register from './components/auth/Registration';
import NavBar from './components/NavBar';
import lambdaLogo from './lambda-logo.png';

import './App.css';

function App() {
	return (
		<AuthState>
			<div className='App'>
				<Router>
					<NavBar logo={lambdaLogo} />
					<Fragment>
						<Switch>
							<Route exact path='/' component={Home} />
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
						</Switch>
					</Fragment>
				</Router>
			</div>
		</AuthState>
	);
}

export default App;
