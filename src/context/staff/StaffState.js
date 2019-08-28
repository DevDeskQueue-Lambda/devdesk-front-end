import React from 'react';
import { axiosWithAuth } from "../../utils";
// Context/Reducer
import StaffContext from './staffContext';
import staffReducer from './staffReducer';
// Types
import {
  GET_CURRENT_USER,
  GET_CURRENT_USER_FAIL,
  GET_ASSIGNED_TICKETS,
  GET_ASSIGNED_TICKETS_FAIL
} from "../types";

const StaffState = props => {
  const initialState = {
    user: {},
    userError: null,
    tickets: [],
    loading: false,
    error: null
  }
  const [state, dispatch] = React.useReducer(staffReducer, initialState);

  //! GET CURRENT USER
  const fetchCurrentUserData = async () => {
    try {
      const user = await axiosWithAuth().get("/users/user");
      dispatch({
        type: GET_CURRENT_USER,
        payload: user.data
      });
    } catch (err) {
      dispatch({
        type: GET_CURRENT_USER_FAIL,
        payload: err.response.data
      });
    }
  }
  //! GET ASSIGNED TICKETS
  const fetchAssignedTickets = async () => {
    try {
      const tickets = await axiosWithAuth()
      .get("/tickets/alltickets");
      dispatch({
        type: GET_ASSIGNED_TICKETS,
        payload: tickets.data
      });
    } catch (err) {
      dispatch({
        type: GET_ASSIGNED_TICKETS_FAIL,
        payload: err.response.data
      });
    }
  };
  // Get Assigned Tickets???
  // Claim Ticket
  // Resolve Ticket

  return (
    <StaffContext.Provider
      value={{
        user: state.user,
        userError: state.userError,
        tickets: state.tickets,
        loading: state.loading,
        error: state.error,
        fetchAssignedTickets,
        fetchCurrentUserData
      }}
    >
      {props.children}
    </StaffContext.Provider>
  )
}

export default StaffState;