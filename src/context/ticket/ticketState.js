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
  DELETE_TICKET,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL
} from "../types";

const TicketState = props => {
  const initialState = {
    tickets: [],
    loading: false,
    error: null,
    categories: [],
    categoriesError: null
  };

  const [state, dispatch] = useReducer(ticketReducer, initialState);
  const fetchAllCategories = async () => {
    try {
      const categories = await axiosWithAuth().get("/category/categories");
      dispatch({
        type: GET_CATEGORIES_SUCCESS,
        payload: categories.data
      });
    } catch (errors) {
      dispatch({
        type: GET_CATEGORIES_FAIL,
        payload: errors.response.data
      });
    }
  };
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

  const addTicket = async newTicket => {
    try {
      const ticket = await axiosWithAuth().post("/tickets/ticket", newTicket);

      dispatch({
        type: ADD_TICKET,
        payload: ticket.data
      });
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
        categoriesError: state.categoriesError,
        fetchAllCategories,
        fetchAllTickets,
        addTicket,
        categories: state.categories
      }}
    >
      {props.children}
    </TicketContext.Provider>
  );
};

export default TicketState;
