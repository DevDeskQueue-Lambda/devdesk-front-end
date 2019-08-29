import React, { Fragment, useContext, useEffect } from "react";
import { Header, Grid } from "semantic-ui-react";
import AdminContext from "../../../../../context/admin/adminContext";
import AssignTicket from '../ticketViews/AssignTicket'

import UserFilter from "./UserFilter";


const AdminUserView = () => {
  const adminContext = useContext(AdminContext);

  const { users, adminGetAllUsers, adminDeleteUser, filtered } = adminContext;

  // console.log("admin index", users);

  useEffect(() => {
    adminGetAllUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid>
        <Grid.Column>
          <Header>Admin Dashboard</Header>
          <h4>Users</h4>
          <UserFilter />
          {filtered && filtered !== null
            ? filtered.map(user => {
              return (
                <Fragment>
                  <h1>{user.username}</h1>
                  <h3>{user.fname}</h3>
                  <h3>{user.lname}</h3>
                  <AssignTicket />
                  <button
                    onClick={() => {
                      adminDeleteUser(user.userid);
                    }}
                  >
                    Delete User
                    </button>
                </Fragment>
              );
            })
            : users &&
            users.map(user => {
              return (
                <Fragment>
                  <h2>{user.username}</h2>
                  <h3>{user.fname}</h3>
                  <h3>{user.lname}</h3>
                  <AssignTicket />
                  <button
                    onClick={() => {
                      adminDeleteUser(user.userid);
                    }}
                  >
                    Delete User
                    </button>
                </Fragment>
              );
            })}
        </Grid.Column>
      </Grid>


    </div>
  );
};

export default AdminUserView;
