import {
  DELETE_USER,
  GET_ALL_USERS,
  GET_USER_ROLES,
  // ARCHIVE_TICKET,
  ASSIGN_TICKET,
  RESOLVE_TICKET,
  REMOVE_ASSIGNED,
  FILTER_USERS,
  CLEAR_FILTER,
  // ADD_USER,
  // UPDATE_USER,
  CLEAR_USERS,
  SET_CURRENT,
  CLEAR_CURRENT,
  ADMIN_FETCH_TICKETS,
  ADMIN_FILTER_TICKETS,
  ADMIN_CLEAR_TICKET_FILTER,
  ADMIN_FETCH_TICKET_BY_ID,
  // PROMOTE_USER_TO_STAFF,
  // PROMOTE_ANY_USER,
  // PROMOTE_USER_TO_ADMIN,
  SET_LOADING,
  ADMIN_ERROR
} from "../types";

export default (state, action) => {
  console.log("admiReducer", action);
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
    case RESOLVE_TICKET:
      return {
        ...state,
        adminTickets: [action.payload],
        loading: false
      }
    case REMOVE_ASSIGNED:
      return {
        ...state,
        adminTickets: state.adminTickets.filter(
          ticket => ticket.id !== action.payload
        ),
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
            user.username.match(regex) ||
            user.useremail.match(regex)
          );
        })
      };
    case ADMIN_FILTER_TICKETS:
      return {
        ...state,
        filteredTickets: state.adminTickets.filter(ticket => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            ticket.title.match(regex) ||
            ticket.status.name.match(regex) ||
            ticket.user.fname.match(regex) ||
            ticket.user.lname.match(regex) ||
            ticket.user.username.match(regex)
          );
        })
      };
    case ADMIN_CLEAR_TICKET_FILTER:
    case CLEAR_FILTER:
      return {
        ...state,
        filtered: null
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case ADMIN_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};