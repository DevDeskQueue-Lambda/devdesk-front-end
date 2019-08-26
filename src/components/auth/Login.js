import React, { useState } from 'react';
import { axiosLogin as axios } from '../../utils';

const Login = ({ history }) => {
	const [user, setUser] = useState({
		username: '',
		password: ''
	});

	function handleChanges(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	const onSubmit = e => {
		e.preventDefault();
		axios()
			.post(
				'/login',
				`grant_type=password&username=${user.username}&password=${user.password}`
			)
			.then(res => {
				console.log(res.data);
				history.push('/');
			})
			.catch(err => console.log(err.response));
	};

	return (
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
	);
};

export default Login;
