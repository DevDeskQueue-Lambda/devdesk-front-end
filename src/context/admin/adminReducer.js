import {
  ADMIN_DELETE_USER,
  ADMIN_GET_ALL_USERS,
  ADMIN_GET_USER_ROLES,
  ERROR
} from "../types";

export default (state, action) => {
  console.log("adminReducer", action);
  switch (action.type) {
    case ADMIN_GET_USER_ROLES:
    case ADMIN_GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case ADMIN_DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        loading: false
      };
    case ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};
