import {
  GET_TICKETS,
  GET_TICKETS_FAIL,
  ADD_TICKET,
  UPDATE_TICKET,
  DELETE_TICKET
} from "../types";

export default (state, action) => {
  console.log("reducer action ", action);
  switch (action.type) {
    case GET_TICKETS: {
      localStorage.setItem("student_tickets", JSON.stringify(action.payload));
      return {
        ...state,
        tickets: action.payload
      };
    }
    case GET_TICKETS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
};
