import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/auth/Login';
import Home from './components/pages/Home';

import './App.css';

function App() {
	return (
		<div className='App'>
			APP
			<Router>
				<Fragment>
					<Switch>
						<Route exact path='/' component={Home} />
						<Route exact path='/login' component={Login} />
					</Switch>
				</Fragment>
			</Router>
		</div>
	);
}

export default App;
