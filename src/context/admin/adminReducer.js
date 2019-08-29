import {

  DELETE_USER,
  GET_ALL_USERS,
  GET_USER_ROLES,

  ASSIGN_TICKET,

  FILTER_USERS,
  CLEAR_FILTER,

  CLEAR_USERS,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADMIN_FETCH_TICKETS,
  ADMIN_FILTER_TICKETS,
  ADMIN_CLEAR_TICKET_FILTER,
  ADMIN_FETCH_TICKET_BY_ID,

  ERROR
} from "../types";

export default (state, action) => {
  console.log("adminReducer", action);
  switch (action.type) {
    case ADMIN_FETCH_TICKET_BY_ID:
    case ADMIN_FETCH_TICKETS:
      return {
        ...state,
        adminTickets: action.payload,
        loading: false
      };
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
    // Work in progress
    case ASSIGN_TICKET:
      return {
        ...state,
        staff: [action.payload, ...state.staff],
        loading: false
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
            user.username.match(regex) || user.useremail.match(regex)
          );
        })
      };
    case ADMIN_FILTER_TICKETS:
      return {
        ...state,
        filteredTickets: state.adminTickets.filter(ticket => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            ticket.title.match(regex) || ticket.status.name.match(regex) || ticket.user.fname.match(regex) || ticket.user.lname.match(regex) || ticket.user.username.match(regex)
          );
        })
      };
    case ADMIN_CLEAR_TICKET_FILTER:
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
