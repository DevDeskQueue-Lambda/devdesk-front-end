// Staff Member can - View list of open tickets
// Staff Member can - Assign a ticket to his/herself by click of a button
// Staff Member can - Change ticket to resolved, or back to the assignable queue if a resolution has not been met

import React from 'react';
// import any helpers
import StaffContext from './staffContext';
import staffReducer from './staffReducer';
import { getTickets } from "../../utils";
// Types
import {
  GET_UNASSIGNED_TICKETS,
  ASSIGN_TICKET,
  UNASSIGN_TICKET,
  EDIT_TICKET_STATUS,
  SET_LOADING,
  STAFF_ERROR
} from "../types";

const StaffState = props => {
  const initialState = {
    tickets: null, 
    loading: false,
    error: null
  }
  const [state, dispatch] = React.useReducer(staffReducer, initialState);
  // Get unassigned tickets
  const getUnassignedTickets = async () => {
    try {
      const res = await getTickets()
        .get("https://lambda-devdesk.herokuapp.com/tickets/alltickets");
      dispatch({
        type: GET_UNASSIGNED_TICKETS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: STAFF_ERROR,
        payload: err.response.data
      });
    }
  };
  // Assign ticket
  const assignTicket = () => console.log('assignTicket');
  // Unassign ticket
  const unassignTicket = () => console.log('unassignTicket');
  // Edit ticket status ( open, unresolved, resolved )
  const editTicketStatus = () => console.log('editTicketStatus');
  // set Loading to true
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <StaffContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        error: state.error,
        getUnassignedTickets,
        assignTicket,
        unassignTicket,
        editTicketStatus,
        setLoading
      }}
    >
      {props.children}
    </StaffContext.Provider>
  )
}

export default StaffState;