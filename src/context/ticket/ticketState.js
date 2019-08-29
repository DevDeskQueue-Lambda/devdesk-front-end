import React, { useReducer } from "react";
import { axiosWithAuth } from "../../utils";
import axios from "axios";
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
  DELETE_TICKET_FAIL,
  GET_CATEGORIES_SUCCESS,
  GET_CATEGORIES_FAIL,
  SET_MODAL_OPEN,
  SET_DELETE_TICKET_MODAL_OPEN,
  SET_DELETING_TICKET_ID,
  SET_TICKET_COMMENTS,
  SET_TICKET_COMMENTS_MODAL_OPEN,
  SET_ASSIGNED_STAFF,
  SET_ASSIGNED_STAFF_MODAL_OPEN,
  FILTER_BY_CATEGORY,
  RESET_FILTER
} from "../types";

const TicketState = props => {
  const initialState = {
    defaultTickets: [],
    tickets: [],
    loading: false,
    error: null,
    categories: [],
    categoriesError: null,
    isModalOpen: false,
    isDeleteTicketModalOpen: false,
    isTicketCommentsModalOpen: false,
    isAssignedStaffModalOpen: false,
    ticketComments: [],
    assignedStaff: null
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
  const fetchAllTickets = async studentID => {
    try {
      const tickets = await axiosWithAuth().get("/tickets/alltickets");

      dispatch({
        type: GET_TICKETS,
        payload: { tickets: tickets.data, studentID: studentID }
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

      dispatch({
        type: UPDATE_TICKET,
        payload: editedTicket.data
      });
      dispatch({
        type: SET_MODAL_OPEN,
        payload: false
      });
    } catch (errors) {
      dispatch({
        type: UPDATE_TICKET_FAIL,
        payload: errors.response.data
      });
    }
  };

  const deleteTicket = async ticketID => {
    try {
      const deletedTicket = await axiosWithAuth().delete(
        `/tickets/ticket/${ticketID}`
      );

      dispatch({
        type: DELETE_TICKET,
        payload: deletedTicket.data
      });

      dispatch({
        type: SET_DELETING_TICKET_ID,
        payload: null
      });
      dispatch({
        type: SET_DELETE_TICKET_MODAL_OPEN,
        payload: false
      });
    } catch (errors) {
      dispatch({
        type: DELETE_TICKET_FAIL,
        payload: errors.response.data
      });
    }
  };
  const deletingTicket = ticketID => {
    dispatch({
      type: SET_DELETING_TICKET_ID,
      payload: ticketID
    });
    dispatch({
      type: SET_DELETE_TICKET_MODAL_OPEN,
      payload: true
    });
  };
  const setModalOpen = condition => {
    dispatch({
      type: SET_MODAL_OPEN,
      payload: condition
    });
  };

  const setDeleteTicketModalOpen = open => {
    dispatch({
      type: SET_DELETE_TICKET_MODAL_OPEN,
      payload: open
    });

    if (!open) {
      dispatch({
        type: SET_DELETING_TICKET_ID,
        payload: null
      });
    }
  };

  const setTicketCommentsModalOpen = (isOpen, comments) => {
    dispatch({
      type: SET_TICKET_COMMENTS_MODAL_OPEN,
      payload: isOpen
    });
    dispatch({
      type: SET_TICKET_COMMENTS,
      payload: comments
    });
  };
  const setAssignedStaffModalOpen = (isOpen, staff) => {
    dispatch({
      type: SET_ASSIGNED_STAFF_MODAL_OPEN,
      payload: isOpen
    });
    dispatch({
      type: SET_ASSIGNED_STAFF,
      payload: staff
    });
  };

  const setFilter = (filterBy, filteringTerm) => {
    switch (filterBy) {
      case "category":
        dispatch({
          type: FILTER_BY_CATEGORY,
          payload: filteringTerm
        });

        break;

      default:
        dispatch({
          type: RESET_FILTER,
          payload: null
        });
    }
  };

  return (
    <TicketContext.Provider
      value={{
        // state variables
        tickets: state.tickets,
        defaultTickets: state.defaultTickets,
        deletingTicketID: state.deletingTicketID,
        loading: state.loading,
        error: state.error,
        categoriesError: state.categoriesError,
        categories: state.categories.sort((a, b) => {
          let categoryA = a.name.toUpperCase();
          let categoryB = b.name.toUpperCase();
          return categoryA < categoryB ? -1 : categoryA > categoryB ? 1 : 0;
        }),
        isModalOpen: state.isModalOpen,
        isDeleteTicketModalOpen: state.isDeleteTicketModalOpen,
        isTicketCommentsModalOpen: state.isTicketCommentsModalOpen,
        ticketComments: state.ticketComments,
        assignedStaff: state.assignedStaff,
        isAssignedStaffModalOpen: state.isAssignedStaffModalOpen,
        // functions
        fetchAllCategories,
        fetchAllTickets,
        addTicket,
        editTicket,
        deleteTicket,
        deletingTicket,
        setModalOpen,
        setDeleteTicketModalOpen,
        setTicketCommentsModalOpen,
        setAssignedStaffModalOpen,
        setFilter
      }}
    >
      {props.children}
    </TicketContext.Provider>
  );
};

export default TicketState;
