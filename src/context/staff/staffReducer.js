import {
  GET_UNASSIGNED_TICKETS,
  ASSIGN_TICKET,
  UNASSIGN_TICKET,
  EDIT_TICKET_STATUS,
  SET_LOADING,
  STAFF_ERROR
} from "../types";

export default (state, action) => {
  console.log("reducer action", action);
  switch (action.type) {
    case GET_UNASSIGNED_TICKETS:
      console.log('GET_UNASSIGNED_TICKETS');
      return {
        ...state,
        tickets: action.payload,
        loading: false
      };
    case ASSIGN_TICKET:
      console.log('ASSIGN_TICKET');
      return {};
    case UNASSIGN_TICKET:
      console.log('UNASSIGN_TICKET');
      return {};
    case EDIT_TICKET_STATUS:
      console.log('EDIT_TICKET_STATUS');
      return {};
    case STAFF_ERROR:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};