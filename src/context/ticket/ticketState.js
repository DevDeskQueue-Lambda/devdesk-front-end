import React, { useReducer } from "react";
import { axiosWithAuth } from "../../utils";
import TicketContext from "./ticketContext";
import ticketReducer from "./ticketReducer";
import {
  GET_TICKETS,
  GET_TICKETS_FAIL,
  ADD_TICKET,
  ADD_TICKET_FAIL,
  UPDATE_TICKET,
  DELETE_TICKET
} from "../types";

const TicketState = props => {
  const initialState = {
    tickets: [],
    loading: false,
    error: null
  };

  const [state, dispatch] = useReducer(ticketReducer, initialState);

  const fetchAllTickets = async () => {
    try {
      const tickets = await axiosWithAuth().get("/tickets/alltickets");

      dispatch({
        type: GET_TICKETS,
        payload: tickets.data
      });
    } catch (errors) {
      dispatch({
        type: GET_TICKETS_FAIL,
        payload: errors.response.data
      });
    }
  };

  const addTicket = async ticket => {
    console.log(ticket);
    try {
      const ticket = await axiosWithAuth().post("/tickets/ticket", {
        title: "JSX",
        description: "JS Error",
        tried: "TDD",
        ticketCategories: [
          {
            category: {
              categoryid: 13
            }
          }
        ]
      });
      console.log(ticket);
      // dispatch({
      //   type: ADD_TICKET,
      //   payload: ticket.data
      // });
    } catch (errors) {
      console.log(errors);
      // dispatch({
      //   type: ADD_TICKET_FAIL,
      //   payload: errors.response.data
      // });
    }
  };
  return (
    <TicketContext.Provider
      value={{
        tickets: state.tickets,
        loading: state.loading,
        error: state.error,
        fetchAllTickets,
        addTicket
      }}
    >
      {props.children}
    </TicketContext.Provider>
  );
};

export default TicketState;
