import {
  ADMIN_ADD_STAFF,
  ADMIN_DELETE_USER,
  ADMIN_ADD_STUDENT,
  ADMIN_GET_ALL_USERS,
  ADMIN_GET_USER_ROLES,
  ADMIN_ARCHIVE_TICKET,
  ADMIN_ASSIGN_TICKET,
  ADMIN_RESOLVE_TICKET,
  ADMIN_REMOVE_ASSIGNED,
  SET_LOADING
} from "../types";

export default (state, action) => {
  console.log("adminReducer", action);
  switch (action.type) {
    default:
      return state;
  }
};
