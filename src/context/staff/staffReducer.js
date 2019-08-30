// Types
import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAIL,
  GET_ASSIGNED_TICKETS,
  GET_ASSIGNED_TICKETS_FAIL,
  GET_All_TICKETS,
  GET_All_TICKETS_FAIL,
  GET_AVAILABLE_TICKETS,
  GET_AVAILABLE_TICKETS_FAIL,
  CLAIM_TICKET,
  CLAIM_TICKET_FAIL
} from "../types";

export default (state, action) => {
  console.log("reducer action", action);
  switch (action.type) {
    //! GET USER DATA
    case GET_CURRENT_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    case GET_CURRENT_USER_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    //! GET ASSIGNED TICKETS
    case GET_ASSIGNED_TICKETS: {
      return {
        ...state,
        tickets: action.payload
      };
    }
    case GET_ASSIGNED_TICKETS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    //! GET AVAILABLE TICKETS
    case GET_AVAILABLE_TICKETS: {
      return {
        ...state,
        tickets: action.payload
      };
    }
    case GET_AVAILABLE_TICKETS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    //! GET ALL TICKETS
    case GET_All_TICKETS: {
      return {
        ...state,
        tickets: action.payload
      };
    }
    case GET_All_TICKETS_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }

    //! CLAIM TICKET
    case CLAIM_TICKET: {
      return {
        ...state,
        user: action.payload
      };
    }
    case CLAIM_TICKET_FAIL: {
      return {
        ...state,
        error: action.payload
      };
    }
    default:
      return state;
  }
};
