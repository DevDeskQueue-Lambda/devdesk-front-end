import React, { useReducer } from "react";
import axios from "axios";
import { getCurrentLoggedInUser } from "../../utils";

import AdminContext from "./adminContext";
import adminReducer from "./adminReducer";

import {
  ADMIN_DELETE_USER,
  ADMIN_GET_ALL_USERS,
  ADMIN_GET_USER_ROLES,
  ADMIN_ARCHIVE_TICKET,
  ADMIN_ASSIGN_TICKET,
  ADMIN_RESOLVE_TICKET,
  ADMIN_REMOVE_ASSIGNED,
  SET_LOADING,
  ERROR
} from "../types";

const AdminState = props => {
  const initialState = {
    users: null,
    loading: false,
    error: null
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
        type: ADMIN_GET_ALL_USERS,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
    }
  };

  // adminDeleteUser  - which deletes user by id staff or student
  const adminDeleteUser = async id => {
    console.log("adminDeleteUser", id);
    try {
      await getCurrentLoggedInUser().delete(
        `https://lambda-devdesk.herokuapp.com/users/user/${id}`
      );
      // console.log("adminDeleteUser", id);
      dispatch({
        type: ADMIN_DELETE_USER,
        payload: id
      });
      adminGetAllUsers();
    } catch (err) {
      dispatch({
        type: ERROR,
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
      console.log("AdminState", res);
      dispatch({
        type: ADMIN_GET_USER_ROLES,
        payload: res.data
      });
    } catch (err) {
      dispatch({
        type: ERROR,
        payload: err.response.data
      });
    }
  };

  // adminStudentFilter

  // adminArchiveTicket
  const adminArchiveTicket = () => console.log("adminArchiveTicket");

  // adminAssignTicket
  const adminAssignTicket = () => console.log("adminAssignTicket");

  // adminResolveTicket
  const adminResolveTicket = () => console.log("adminResolveTicket");

  // adminRemoveAssigned
  const adminRemoveAssigned = () => console.log("adminRemoveAssigned");

  // set loading to true
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <AdminContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        error: state.error,
        adminGetAllUsers,
        adminDeleteUser,
        adminGetUserRoles,
        adminArchiveTicket,
        adminAssignTicket,
        adminResolveTicket,
        adminRemoveAssigned,
        setLoading
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
