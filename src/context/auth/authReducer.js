import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types';

export default (state, action) => {
	console.log('reducer action', action);
	switch (action.type) {
		case LOGIN_SUCCESS:
			localStorage.setItem('token', action.payload.access_token);
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false
			};

		case LOGIN_FAIL:
		case LOGOUT:
			localStorage.removeItem('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload
			};

		default:
			return state;
	}
};
