//! Login / Logout
// Staff Member can - Login/Logout
//! Tickets
// Staff Member can - Claim/Unclaim a ticket
// Staff Member can - Change a ticket's status
// Staff Member can - Comment/Edit a comment on a ticket
// staff - password

import React from 'react';
// import any helpers
import StaffContext from './staffContext';
import staffReducer from './staffReducer';
import { getCurrentLoggedInUser } from "../../utils";
// Types
import { CLAIM_TICKET, UNCLAIM_TICKET, EDIT_TICKET_STATUS, ADD_TICKET_COMMENT, EDIT_TICKET_COMMENT, STAFF_ERROR } from '../types';

const StaffState = props => {
  const initialState = {
    users: null, 
    loading: false,
    error: null
  }
  const [state, dispatch] = React.useReducer(staffReducer, initialState);
  // claim ticket
  const claimTicket = async () => {
    try {
      const res = await getCurrentLoggedInUser()
        .get("https://lambda-devdesk.herokuapp.com/tickets/tickets");

    } catch (err) {
      dispatch({
        type: STAFF_ERROR,
        payload: err.response.data
      });
    }
  }
  // unclaim ticket
  const unclaimTicket = () => console.log('unclaimTicket');
  // edit ticket status
  const editTicketStatus = () => console.log('editTicketStatus');
  // add ticket comment
  const addTicketComment = () => console.log('addTicketComment');
  // edit ticket comment
  const editTicketComment = () => console.log('editTicketComment');

  return (
    <StaffContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        error: state.error,
        claimTicket,
        unclaimTicket,
        editTicketStatus,
        addTicketComment,
        editTicketComment
      }}
    >
      {props.children}
    </StaffContext.Provider>
  )
}

export default StaffState;