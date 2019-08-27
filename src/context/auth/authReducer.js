import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  GET_LOGGEDIN_USER_SUCCESS,
  GET_LOGGEDIN_USER_FAIL
} from "../types";

export default (state, action) => {
  console.log("reducer action", action);
  switch (action.type) {
    case REGISTER_SUCCESS:
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        userInfo: {
          ...action.payload
        },
        isAuthenticated: true,
        loading: false
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.access_token);
      return {
        ...state,
        ...action.payload
      };
    case GET_LOGGEDIN_USER_SUCCESS: {
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        userInfo: {
          ...action.payload
        },
        isAuthenticated: true,
        loading: false
      };
    }
    case GET_LOGGEDIN_USER_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        userInfo: null,
        error: action.payload
      };

    default:
      return state;
  }
};
