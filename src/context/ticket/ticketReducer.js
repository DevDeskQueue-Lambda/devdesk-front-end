import {
  GET_TICKETS,
  GET_TICKETS_FAIL,
  ADD_TICKET,
  UPDATE_TICKET,
  UPDATE_TICKET_FAIL,
  DELETE_TICKET,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  SET_MODAL_OPEN
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
    case GET_CATEGORIES_SUCCESS: {
      return {
        ...state,
        categories: action.payload
      };
    }
    case GET_CATEGORIES_FAIL: {
      return {
        ...state,
        categoriesError: action.payload
      };
    }
    case ADD_TICKET: {
      return {
        ...state,
        tickets: [...state.tickets, action.payload]
      };
    }
    case UPDATE_TICKET: {
      return {
        ...state,
        tickets: state.tickets.map(ticket =>
          ticket.ticketid === action.payload.ticketid ? action.payload : ticket
        )
      };
    }
    case UPDATE_TICKET_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    case SET_MODAL_OPEN: {
      return {
        ...state,
        isModalOpen: action.payload
      };
    }

    default:
      return state;
  }
};
