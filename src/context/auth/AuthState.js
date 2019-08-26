import React, { useReducer } from 'react';
import { axiosLogin as axios } from '../../utils';
import AuthContext from './authContext';
import authReducer from './authReducer';
import { axiosWithAuth } from '../../utils';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

const AuthState = props => {
	const initialState = {
		token: localStorage.getItem('token'),
		isAuthenticated: null,
		loading: true,
		user: null,
		error: null
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	// Login
	const login = async fromData => {
		try {
			const res = await axios().post(
				'/login',
				`grant_type=password&username=${fromData.username}&password=${fromData.password}`
			);
			console.log('AuthState login prop', res);
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data
			});
		} catch (err) {
			dispatch({
				type: LOGIN_FAIL,
				payload: err.response.data.msg
			});
		}
	};

	// Logout
	const logout = () => dispatch({ type: LOGOUT });

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				isAuthenticated: state.isAuthenticated,
				loading: state.loading,
				user: state.user,
				error: state.error,
				login,
				logout
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
