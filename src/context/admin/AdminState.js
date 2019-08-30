import React, { useReducer } from "react";

import { getCurrentLoggedInUser } from "../../utils";
import { axiosWithAuth } from "../../utils";
import AdminContext from "./adminContext";
import adminReducer from "./adminReducer";

import {
  DELETE_USER,
  GET_ALL_USERS,
  GET_USER_ROLES,
  // ARCHIVE_TICKET,
  ASSIGN_TICKET,
  RESOLVE_TICKET,
  REMOVE_ASSIGNED,
  FILTER_USERS,
  CLEAR_FILTER,
  // ADD_USER,
  // UPDATE_USER,
  CLEAR_USERS,
  SET_CURRENT,
  CLEAR_CURRENT,
  SET_LOADING,
  ADMIN_FETCH_TICKETS,
  ADMIN_FILTER_TICKETS,
  ADMIN_CLEAR_TICKET_FILTER,
  ADMIN_FETCH_TICKET_BY_ID,
  ADMIN_ERROR,
  ERROR,
  SET_PROMOTING_USER,
  SET_PROMOTED_USER,
  SET_PROMOTING_USER_MODAL_OPEN,
  UPDATE_USERS_AFTER_PROMOTION,
  SET_PROMOTED_USER_FAIL
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
    staff: [],
    promotingUser: null,
    promotedUser: null,
    isPromotingUserModalOpen: false
  };

  const [state, dispatch] = useReducer(adminReducer, initialState);

  // adminGetAllUsers
  const adminGetAllUsers = async () => {
    try {
      const res = await getCurrentLoggedInUser().get(
        "https://lambda-devdesk.herokuapp.com/users/allusers"
      );
      console.log("adminGetAllUsers", res);
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
      console.log("adminGetUserRoles", res);
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
    // console.log("adminAssignTicket", id, userid);
    try {
      const res = await getCurrentLoggedInUser().put(
        `https://lambda-devdesk.herokuapp.com/tickets/ticket/admin/assign/${id}/${userid}`
      );
      // console.log("adminAssignTicket", id, userid);
      dispatch({
        type: ASSIGN_TICKET,
        payload: res.data
      });
      adminFetchTickets();
    } catch (err) {
      console.log("adminAssignTicket", err);
      dispatch({
        type: ADMIN_ERROR,
        payload: err.response
      });
    }
  };

  // adminResolveTicket
  const adminResolveTicket = async id => {
    console.log("adminResolveTicket 1", id);
    try {
      const res = await getCurrentLoggedInUser().put(
        `https://lambda-devdesk.herokuapp.com/tickets/ticket/unassign/${id}`
      );
      console.log("adminResolveTicket 2", id);
      dispatch({
        type: RESOLVE_TICKET,
        payload: res.data
      });
      adminFetchTickets();
    } catch (err) {
      console.log("adminResolveTicket 3", err.response);
      dispatch({
        type: ADMIN_ERROR,
        payload: err.response
      });
    }
  };

  // adminRemoveAssigned
  const adminRemoveAssigned = async id => {
    // console.log("adminRemoveAssigned 1", id);
    try {
      const res = await getCurrentLoggedInUser().put(
        `https://lambda-devdesk.herokuapp.com/tickets/ticket/unassign/${id}`
      );
      // console.log("adminRemoveAssigned 2", id);
      dispatch({
        type: REMOVE_ASSIGNED,
        payload: res.data
      });
      adminFetchTickets();
    } catch (err) {
      // console.log("adminRemoveAssigned 3", err.response);
      dispatch({
        type: ADMIN_ERROR,
        payload: err.response.data
      });
    }
  };

  const setPromotingUser = (modalOpen, user, resetPromotedUser) => {
    dispatch({
      type: SET_PROMOTING_USER,
      payload: user
    });
    dispatch({
      type: SET_PROMOTING_USER_MODAL_OPEN,
      payload: modalOpen
    });

    if (resetPromotedUser) {
      dispatch({
        type: SET_PROMOTED_USER,
        payload: null
      });
    }
  };

  const promoteUserToStaff = async userID => {
    try {
      const promotedUser = await axiosWithAuth().put(
        `/users/admin/promote/staff/${userID}`
      );

      dispatch({
        type: SET_PROMOTED_USER,
        payload: promotedUser.data
      });

      dispatch({
        type: UPDATE_USERS_AFTER_PROMOTION,
        payload: promotedUser.data
      });
    } catch (errors) {
      dispatch({
        type: SET_PROMOTED_USER_FAIL,
        payload: errors.response
      });
    }
  };
  const promoteUserToAdmin = async userID => {
    try {
      const promotedUser = await axiosWithAuth().put(
        `/users/admin/promote/admin/${userID}`
      );

      dispatch({
        type: SET_PROMOTED_USER,
        payload: promotedUser.data
      });
      dispatch({
        type: UPDATE_USERS_AFTER_PROMOTION,
        payload: promotedUser.data
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  // set loading to true
  const setLoading = () => dispatch({ type: SET_LOADING });

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
        setLoading,
        promotingUser: state.promotingUser,
        promotedUser: state.promotedUser,
        isPromotingUserModalOpen: state.isPromotingUserModalOpen,
        setPromotingUser,
        promoteUserToStaff,
        promoteUserToAdmin
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
