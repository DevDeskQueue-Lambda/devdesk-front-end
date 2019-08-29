import React, { useEffect, useState } from 'react';
import { Grid, Header, Segment, Label, Comment, Form as SemanticForm, Button } from 'semantic-ui-react';
import { axiosWithAuth } from '../../../../utils';
import AdminContext from "../../../../context/admin/adminContext";
// import TicketContext from "../../../../context/admin/ticketContext";

    const [user, setUsers] = useState();
useEffect(() => {
    const AdminStudent= () => {
    axiosWithAuth().get(`/users/allusers`)
      .then(response => {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error);
      })
    }
    AdminEditUser ()
  }, []);


return(


<div>
<Grid padded="horizontally" style={{ marginTop: "5rem" }}>
  <Grid.Row columns={2}>
    <Grid.Column>
      <Header>Student</Header>
    </Grid.Column>
    <Grid.Column textAlign="right">
      <Button onClick={() => addUsers("add")}>Add User</Button>
    </Grid.Column>
  </Grid.Row>
  <Grid.Column width={16}>
    <Table celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Username</Table.HeaderCell>
          <Table.HeaderCell>Student Name</Table.HeaderCell>
          <Table.HeaderCell>Email</Table.HeaderCell>
          <Table.HeaderCell>Actions</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {users &&
          users.length > 0 &&
          users.map(user => (
            <Table.Row key={user.userid}>
              <Table.Cell>{user.fname}, {user.lname}</Table.Cell>
              <Table.Cell>{user.useremail}</Table.Cell>
              <Table.Cell>
                <Button
                  color="red"
                  onClick={() => deleteUser("user.userid")}
                >
                  Delete
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  </Grid.Column>
</Grid>
</div>
)
}

export default AdminStudentInfo;