import React, { useReducer } from "react";
import { getCurrentLoggedInUser } from "../../utils";
import AdminContext from "./adminContext";
import adminReducer from "./adminReducer";

import {

  DELETE_USER,
  GET_ALL_USERS,
  GET_USER_ROLES,

  ASSIGN_TICKET,

  REMOVE_ASSIGNED,
  FILTER_USERS,
  CLEAR_FILTER,

  CLEAR_USERS,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_LOADING,
  ADMIN_FETCH_TICKETS,
  ADMIN_FILTER_TICKETS,
  ADMIN_CLEAR_TICKET_FILTER,
  ADMIN_FETCH_TICKET_BY_ID,
  PROMOTE_USER_TO_STAFF,
  PROMOTE_ANY_USER,
  PROMOTE_USER_TO_ADMIN,
  ADMIN_ERROR
} from "../types";

const AdminState = props => {
  const initialState = {
    users: null,
    loading: false,
    error: null,
    current: null,
    filtered: null,
    adminTickets: null,
    filteredTickets: null,
    staff: []
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);

  // adminGetAllUsers
  const adminGetAllUsers = async () => {
    try {
      const res = await getCurrentLoggedInUser().get(
        "https://lambda-devdesk.herokuapp.com/users/allusers"
      );
      // console.log("AdminState", res);
      dispatch({
        type: GET_ALL_USERS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ADMIN_ERROR,
        payload: err.response.data
      });
    }
  };

  // adminDeleteUser  - which deletes user by id staff or student
  const adminDeleteUser = async id => {
    // console.log("adminDeleteUser", id);
    try {
      await getCurrentLoggedInUser().delete(
        `https://lambda-devdesk.herokuapp.com/users/user/${id}`
      );
      // console.log("adminDeleteUser", id);
      dispatch({
        type: DELETE_USER,
        payload: id
      });
      adminGetAllUsers();
    } catch (err) {
      dispatch({
        type: ADMIN_ERROR,
        payload: err.response.data
      });
    }
  };

  // adminGetUserRoles
  const adminGetUserRoles = async () => {
    try {
      const res = await getCurrentLoggedInUser().get(
        "https://lambda-devdesk.herokuapp.com/users/roles"
      );
      // console.log("AdminState", res);
      dispatch({
        type: GET_USER_ROLES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ADMIN_ERROR,
        payload: err.response.data
      });
    }
  };

  // adminAddUser
  const adminAddUser = async () => console.log("adminAddUser");

  // adminEditUser
  const adminUpdateUser = async () => console.log("adminEditUser");

  // clear users
  const adminClearUsers = () => {
    dispatch({
      type: CLEAR_USERS
    });
  };

  // set current user
  const adminSetCurrent = user => {
    dispatch({
      type: SET_CURRENT,
      payload: user
    });
  };

  // adminClearCurrent
  const adminClearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // adminUserFilter
  const adminUserFilter = text => {
    dispatch({
      type: FILTER_USERS,
      payload: text
    });
  };

  // adminClearFilter

  const adminClearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  // adminFetchTickets
  const adminFetchTickets = async () => {
    try {
      const res = await getCurrentLoggedInUser().get(
        "https://lambda-devdesk.herokuapp.com/tickets/alltickets"
      );
      // console.log('adminFetchTickets', res)
      dispatch({
        type: ADMIN_FETCH_TICKETS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ADMIN_ERROR,
        payload: err.response.data
      });
    }
  };

  // get ticket by id
  const adminFetchTicketById = async id => {
    try {
      await getCurrentLoggedInUser().get(
        `https://lambda-devdesk.herokuapp.com/tickets/ticket/${id}`
      );
      dispatch({
        type: ADMIN_FETCH_TICKET_BY_ID,
        payload: id
      });
    } catch (err) {
      dispatch({
        type: ADMIN_ERROR,
        payload: err.response.data
      });
    }
  };

  // adminFilterTickets
  const adminFilterTickets = text => {
    dispatch({
      type: ADMIN_FILTER_TICKETS,
      payload: text
    });
  };

  // adminClearTicketFilter
  const adminClearTicketFilter = () => {
    dispatch({ type: ADMIN_CLEAR_TICKET_FILTER });
  };

  // adminArchiveTicket
  const adminArchiveTicket = () => console.log("adminArchiveTicket");

  // adminAssignTicket
  const adminAssignTicket = async ({ id, userid }) => {
    console.log("adminAssignTicket", id, userid);
    try {
      const res = await getCurrentLoggedInUser().put(
        `https://lambda-devdesk.herokuapp.com/tickets/ticket/admin/assign/${id}/${userid}`
      );
      console.log("adminAssignTicket", id, userid);
      dispatch({
        type: ASSIGN_TICKET,
        payload: res.data
      });
      adminFetchTickets();
    } catch (err) {
      console.log("adminAssignTicket", err);
      dispatch({
        type: ADMIN_ERROR,
        payload: err.response.data
      });
    }
  };

  // adminResolveTicket
  const adminResolveTicket = () => console.log("adminResolveTicket");

  // adminRemoveAssigned
  const adminRemoveAssigned = async id => {
    console.log("adminRemoveAssigned 1", id);
    try {
      const res = await getCurrentLoggedInUser().put(
        `https://lambda-devdesk.herokuapp.com/tickets/ticket/unassign/${id}`
      );
      console.log("adminRemoveAssigned 2", id);
      dispatch({
        type: REMOVE_ASSIGNED,
        payload: res.data
      });
      adminFetchTickets();
    } catch (err) {
      console.log("adminRemoveAssigned 3", err.response);
      dispatch({
        type: ADMIN_ERROR,
        payload: err.response.data
      });
    }
  };

  // set loading to true
  const setLoading = () => dispatch({ type: SET_LOADING });

  // promote user to staff
  const promoteUserToStaff = () => console.log("promoteUserToStaff");

  // promote any user
  const promoteAnyUser = () => console.log("promoteUserToStaff");

  // promote user to admin
  const promoteUserToAdmin = () => console.log("promoteUserToStaff");

  return (
    <AdminContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        error: state.error,
        filtered: state.filtered,
        adminTickets: state.adminTickets,
        filteredTickets: state.filteredTickets,
        staff: state.staff,
        promoteUserToStaff,
        promoteAnyUser,
        promoteUserToAdmin,
        adminGetAllUsers,
        adminDeleteUser,
        adminGetUserRoles,
        adminArchiveTicket,
        adminAssignTicket,
        adminResolveTicket,
        adminRemoveAssigned,
        adminUserFilter,
        adminAddUser,
        adminUpdateUser,
        adminClearFilter,
        adminClearCurrent,
        adminSetCurrent,
        adminClearUsers,
        adminFetchTickets,
        adminFilterTickets,
        adminClearTicketFilter,
        adminFetchTicketById,
        setLoading
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
