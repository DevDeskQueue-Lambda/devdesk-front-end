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
  UPDATE_TICKET_FAIL,
  DELETE_TICKET,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  SET_MODAL_OPEN
} from "../types";

const TicketState = props => {
  const initialState = {
    tickets: [],
    loading: false,
    error: null,
    categories: [],
    categoriesError: null,
    isModalOpen: false
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

      dispatch({
        type: SET_MODAL_OPEN,
        payload: false
      });
    } catch (errors) {
      dispatch({
        type: ADD_TICKET_FAIL,
        payload: errors.response.data
      });
    }
  };

  const editTicket = async ticket => {
    try {
      const editedTicket = await axiosWithAuth().put(
        `/tickets/ticket/${ticket.ticketid}`,
        ticket
      );
      console.log(editedTicket);
    } catch (errors) {
      // dispatch({
      //   type: UPDATE_TICKET,
      //   payload: ticket.data
      // })
    }
  };

  const setModalOpen = condition => {
    dispatch({
      type: SET_MODAL_OPEN,
      payload: condition
    });
  };

  return (
    <TicketContext.Provider
      value={{
        tickets: state.tickets,
        loading: state.loading,
        error: state.error,
        categoriesError: state.categoriesError,
        categories: state.categories,
        isModalOpen: state.isModalOpen,
        fetchAllCategories,
        fetchAllTickets,
        addTicket,
        editTicket,
        setModalOpen
      }}
    >
      {props.children}
    </TicketContext.Provider>
  );
};

export default TicketState;
