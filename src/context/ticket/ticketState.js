import React, { useReducer } from "react";
import { axiosWithAuth } from "../../utils";
import axios from 'axios';
import TicketContext from "./ticketContext";
import ticketReducer from "./ticketReducer";
import {
  GET_TICKETS,
  GET_TICKETS_FAIL,
  ADD_TICKET,
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
    console.log('new ticket', newTicket);
    //Autoposting to the devdesk slackbot which must be installed in the slack workspace
    const slackURL = 'https://hooks.slack.com/services/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';
    const proxyurl = "https://cors-anywhere.herokuapp.com/";

    axios.post(proxyurl + slackURL, { text: newTicket.description })
      .then(res => console.log('res from slack webhook', res))
      .catch(err => console.log(err.response));
    //******************************************************************************* */
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
      console.log(errors);
      // dispatch({
      //   type: ADD_TICKET_FAIL,
      //   payload: errors.response.data
      // });
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
        setModalOpen
      }}
    >
      {props.children}
    </TicketContext.Provider>
  );
};

export default TicketState;
