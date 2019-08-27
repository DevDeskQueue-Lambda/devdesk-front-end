import React, { Fragment, useContext, useEffect } from "react";
import { Header, Grid } from "semantic-ui-react";
import AdminContext from "../../../../context/admin/adminContext";

const AdminDashboard = () => {
  const adminContext = useContext(AdminContext);

  const { users, adminGetAllUsers, adminDeleteUser, loading } = adminContext;

  console.log("users", users);

  useEffect(() => {
    adminGetAllUsers();
  }, []);

  return (
    <div>
      <Grid>
        <Grid.Column>
          <Header>Admin Dashboard</Header>
          <h4>adminGetAllUsers by first name</h4>
          {users &&
            users.map(user => {
              return (
                <Fragment>
                  <h1>{user.fname}</h1>
                  <button
                    onClick={() => {
                      adminDeleteUser(user.userid);
                    }}
                  >
                    Delete
                  </button>
                </Fragment>
              );
            })}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
