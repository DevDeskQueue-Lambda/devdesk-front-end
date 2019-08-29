import {
  GET_TICKETS,
  GET_TICKETS_FAIL,
  ADD_TICKET,
  UPDATE_TICKET,
  UPDATE_TICKET_FAIL,
  DELETE_TICKET,
  DELETE_TICKET_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  SET_MODAL_OPEN,
  SET_DELETE_TICKET_MODAL_OPEN,
  SET_DELETING_TICKET_ID,
  SET_TICKET_COMMENTS_MODAL_OPEN,
  SET_TICKET_COMMENTS,
  SET_ASSIGNED_STAFF,
  SET_ASSIGNED_STAFF_MODAL_OPEN
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
    case DELETE_TICKET: {
      return {
        ...state,
        tickets: state.tickets.filter(
          ticket => ticket.ticketid !== action.payload
        )
      };
    }
    case DELETE_TICKET_FAIL: {
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
    case SET_DELETE_TICKET_MODAL_OPEN: {
      return {
        ...state,
        isDeleteTicketModalOpen: action.payload
      };
    }
    case SET_DELETING_TICKET_ID: {
      return {
        ...state,
        deletingTicketID: action.payload
      };
    }
    case SET_TICKET_COMMENTS: {
      return {
        ...state,
        ticketComments: action.payload
      };
    }
    case SET_TICKET_COMMENTS_MODAL_OPEN: {
      return {
        ...state,
        isTicketCommentsModalOpen: action.payload
      };
    }
    case SET_ASSIGNED_STAFF: {
      return {
        ...state,
        assignedStaff: action.payload
      };
    }
    case SET_ASSIGNED_STAFF_MODAL_OPEN: {
      return {
        ...state,
        isAssignedStaffModalOpen: action.payload
      };
    }
    default:
      return state;
  }
};
