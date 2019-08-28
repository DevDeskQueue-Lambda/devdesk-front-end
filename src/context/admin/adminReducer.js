import {
  DELETE_USER,
  GET_ALL_USERS,
  GET_USER_ROLES,
  ARCHIVE_TICKET,
  ASSIGN_TICKET,
  RESOLVE_TICKET,
  REMOVE_ASSIGNED,
  FILTER_USERS,
  CLEAR_FILTER,
  ADD_USER,
  UPDATE_USER,
  CLEAR_USERS,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_LOADING,
  ERROR
} from "../types";

export default (state, action) => {
  console.log("adminReducer", action);
  switch (action.type) {
    case GET_USER_ROLES:
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload),
        loading: false
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: null,
        filtered: null,
        error: null,
        current: null
      };
    case SET_CURRENT:
      return {
        ...state,
        current: action.payload
      };
    case CLEAR_CURRENT:
      return {
        ...state,
        current: null
      };
    case FILTER_USERS:
      return {
        ...state,
        filtered: state.users.filter(user => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            user.fname.match(regex) ||
            user.lname.match(regex) ||
            user.username.match(regex)
          );
        })
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
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
