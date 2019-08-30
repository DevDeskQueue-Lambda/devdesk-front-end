import React from "react";
import { axiosWithAuth, getCurrentLoggedInUser } from "../../utils";
// Context/Reducer
import StaffContext from "./staffContext";
import staffReducer from "./staffReducer";
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

const StaffState = props => {
  const initialState = {
    user: {},
    tickets: [],
    loading: false,
    error: null
  };
  const [state, dispatch] = React.useReducer(staffReducer, initialState);

  //! GET USER DATA
  const fetchCurrentUserData = async () => {
    try {
      const user = await axiosWithAuth().get(
        "https://lambda-devdesk.herokuapp.com/users/user"
      );
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
  };

  //! GET ASSIGNED TICKETS
  const fetchAssignedTickets = async () => {
    try {
      fetchCurrentUserData();
      fetchAllTickets();
      dispatch({
        type: GET_ASSIGNED_TICKETS,
        payload: fetchAllTickets
      });
    } catch (err) {
      dispatch({
        type: GET_ASSIGNED_TICKETS_FAIL,
        payload: err.response
      });
    }
  };

  //! GET AVAILABLE TICKETS
  const fetchAvailableTickets = async () => {
    try {
      const tickets = await axiosWithAuth().get(
        "https://lambda-devdesk.herokuapp.com/tickets/alltickets"
      );
      const availableTickets = tickets.data.filter(
        ticket => ticket.assigneduser === null
      );
      dispatch({
        type: GET_AVAILABLE_TICKETS,
        payload: availableTickets
      });
    } catch (err) {
      dispatch({
        type: GET_AVAILABLE_TICKETS_FAIL,
        payload: err.response
      });
    }
  };

  //! GET ALL TICKETS
  const fetchAllTickets = async () => {
    try {
      const res = await axiosWithAuth().get(
        "https://lambda-devdesk.herokuapp.com/tickets/alltickets"
      );
      dispatch({
        type: GET_All_TICKETS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: GET_All_TICKETS_FAIL,
        payload: err.response
      });
    }
  };

  //! CLAIM TICKET
  const claimTicket = async (ticket, user) => {
    try {
      const res = await axiosWithAuth().put(
        `https://lambda-devdesk.herokuapp.com/tickets/ticket/admin/assign/${ticket.ticketid}/${user.userid}`
      );
      console.log("RES.DATA", res);
      /* dispatch({
        type: CLAIM_TICKET,
        payload: res.data
      }); */
    } catch (err) {
      dispatch({
        type: CLAIM_TICKET_FAIL,
        payload: err.response
      });
    }
  };

  return (
    <StaffContext.Provider
      value={{
        user: state.user,
        tickets: state.tickets,
        loading: state.loading,
        error: state.error,
        fetchAssignedTickets,
        fetchCurrentUserData,
        fetchAvailableTickets,
        fetchAllTickets,
        claimTicket
      }}
    >
      {props.children}
    </StaffContext.Provider>
  );
};

export default StaffState;
