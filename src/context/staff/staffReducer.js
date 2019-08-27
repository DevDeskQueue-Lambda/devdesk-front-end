//! Login / Logout
// Staff Member can - Login/Logout
//! Tickets
// Staff Member can - Claim/Unclaim a ticket
// Staff Member can - Change a ticket's status
// Staff Member can - Comment/Edit a comment on a ticket

import { CLAIM_TICKET, UNCLAIM_TICKET, EDIT_TICKET_STATUS, ADD_TICKET_COMMENT, EDIT_TICKET_COMMENT } from '../types';

export default (state, action) => {
  console.log("reducer action", action);
  switch (action.type) {
    case CLAIM_TICKET:
      console.log('CLAIM_TICKET');
      return {};
    case UNCLAIM_TICKET:
        console.log('UNCLAIM_TICKET');
        return {};
    case EDIT_TICKET_STATUS:
        console.log('EDIT_TICKET_STATUS');
        return {};
    case ADD_TICKET_COMMENT:
        console.log('ADD_TICKET_COMMENT');
        return {};
    case EDIT_TICKET_COMMENT:
        console.log('EDIT_TICKET_COMMENT');
        return {};
    default:
      return state;
  }
};