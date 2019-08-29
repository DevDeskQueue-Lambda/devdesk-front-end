import React, { Fragment, useContext, useEffect } from "react";
import { Header, Grid } from "semantic-ui-react";
import AdminContext from "../../../../context/admin/adminContext";
import { Button } from 'semantic-ui-react'

const AdminDashboard = () => {
  const adminContext = useContext(AdminContext);

  const { users, adminGetAllUsers, adminDeleteUser, loading } = adminContext;

  console.log("users", users);

  useEffect(() => {
    adminGetAllUsers();
  }, []);

  return (
    <div class="ui two column centered grid">
      <Grid container style={{ marginTop: '2rem' }}>
        <Grid.Column width={16}>
        <h1 class="ui header">Admin Dashboard</h1>
        </Grid.Column>
        <Grid.Column width={16}>
          {users &&
            users.map(user => {
              return (
                <Fragment>
                <Fragment>
                  <h3>{user.fname}</h3>
                </Fragment>
                <Fragment>
                    <Button color={"red"}
                    onClick={() => {
                      adminDeleteUser(user.userid);
                    }}
                  >
                    Delete
                                  </Button>
                </Fragment>
                </Fragment>
                );
            })}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
