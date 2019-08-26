import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';

const Login = props => {
	const authContext = useContext(AuthContext);

	const { login, isAuthenticated } = authContext;

	useEffect(() => {
		if (isAuthenticated) {
			props.history.push('/');
		}
	}, [isAuthenticated, props.history]);

	const [user, setUser] = useState({
		username: '',
		password: ''
	});

	const { username, password } = user;

	function handleChanges(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	const onSubmit = e => {
		e.preventDefault();
		login({ username, password });
	};

	return (
		<div>
			<h1>User Login</h1>
			<form onSubmit={onSubmit}>
				<input
					type='text'
					name='username'
					placeholder='username'
					value={user.username}
					onChange={handleChanges}
				/>
				<input
					type='text'
					name='password'
					placeholder='password'
					value={user.password}
					onChange={handleChanges}
				/>
				<button>Login</button>
			</form>
		</div>
	);
};

export default Login;
