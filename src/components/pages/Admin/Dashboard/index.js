import React, { Fragment, useContext, useEffect } from "react";
import { Header, Grid } from "semantic-ui-react";
import AdminContext from '../../../../context/admin/adminContext'


const AdminDashboard = () => {
  const adminContext = useContext(AdminContext);

  const { users, adminGetAllUsers, loading } = adminContext;

  console.log('users', users)

  useEffect(() => {
    adminGetAllUsers();
  }, [])


  return (
    <div>
      <Grid>
        <Grid.Column>
          <Header>Admin Dashboard</Header>
          {users && users.map(user => user.fname)}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
