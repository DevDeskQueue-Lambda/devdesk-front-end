// Types
import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAIL,
  GET_ASSIGNED_TICKETS,
  GET_ASSIGNED_TICKETS_FAIL,
  GET_All_TICKETS,
  GET_All_TICKETS_FAIL
} from "../types";

export default (state, action) => {
  console.log("reducer action", action);
  switch (action.type) {
    //! GET USER
    case GET_CURRENT_USER: {
      return {
        ...state,
        user: action.payload
      };
    }
    case GET_CURRENT_USER_FAIL: {
      return {
        ...state,
        userError: action.payload
      };
    }
    //! GET TICKETS
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
    default:
      return state;
  }
};
