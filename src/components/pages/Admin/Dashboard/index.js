import React, { useState, Fragment, useContext, useEffect } from "react";
import { Button, Header, Grid, Label, Modal, Table } from "semantic-ui-react";
import AdminContext from "../../../../context/admin/adminContext";

import UserFilter from "./UserFilter";
import TicketFilter from "./TicketFilter";
import AdminTicketView from "./AdminTicketView";

const AdminDashboard = () => {
  const adminContext = useContext(AdminContext);

  const { users, adminGetAllUsers, adminDeleteUser, filtered } = adminContext;

  console.log("admin index", users);

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
                    <h1>{user.fname}</h1>
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
                    <h1>{user.fname}</h1>
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

      <AdminTicketView />
    </div>
  );
};

export default AdminDashboard;
