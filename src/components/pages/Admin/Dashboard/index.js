<<<<<<< HEAD
// import React, { Fragment, useContext, useEffect } from "react";
// import { Header, Grid } from "semantic-ui-react";
// import AdminContext from "../../../../context/admin/adminContext";

// const AdminDashboard = () => {
//   const adminContext = useContext(AdminContext);

//   const { users, adminGetAllUsers, adminDeleteUser, loading } = adminContext;

//   console.log("users", users);

//   useEffect(() => {
//     adminGetAllUsers();
//   }, []);

//   return (
//     <div>
//       <Grid>
//         <Grid.Column>
//           <Header>Admin Dashboard</Header>
//           <h4>adminGetAllUsers by first name</h4>
//           {users &&
//             users.map(user => {
//               return (
//                 <Fragment>
//                   <h1>{user.fname}</h1>
//                   <button
//                     onClick={() => {
//                       adminDeleteUser(user.userid);
//                     }}
//                   >
//                     Delete
//                   </button>
//                 </Fragment>
//               );
//             })}
//         </Grid.Column>
//       </Grid>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useContext, useEffect } from "react";
import { Header, Grid, Table, Button, Label } from "semantic-ui-react";
import { Link } from 'react-router-dom';
import TicketContext from "../../../../context/ticket/ticketContext";
import AdminContext from "../../../../context/admin/adminContext";

const AdminDashboard = () => {
  const ticketContext = useContext(TicketContext);
  const { tickets, fetchAllTickets, } = ticketContext;
  const adminContext = useContext(AdminContext);
  const { users, adminGetAllUsers, adminDeleteUser, loading } = adminContext;
    
        console.log("users", users);

  useEffect(() => {
    fetchAllTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
=======
import React from "react";

import AdminTicketView from "./ticketViews/AdminTicketView";
import AdminUserView from "./userViews/AdminUserView";
>>>>>>> d2ae215986ff64533a09debffa9105c30fa92184

const AdminDashboard = (props) => {
  console.log('adminview', props.users)
  return (
<<<<<<< HEAD
    <Grid padded="horizontally"  style={{ marginTop: '3rem' }}>
      <Grid.Column width={16}>
        <Header as="h1">Administration Dashboard</Header>
      </Grid.Column>
      <Grid.Column textAlign="right">
            <Button >Add Student</Button>
          </Grid.Column>
      <Grid.Column width={16}>
        <Table celled>
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell>Student Name</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Categories</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
              <Table.HeaderCell>Edit</Table.HeaderCell>

            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tickets && 
            tickets.map(ticket => {
              return (
                <Table.Row key={ticket.ticketid}>
                  {/* {users && users.map(user => {
                  return (
                    <Table.Cell><Link to={` `}>{user.fname}</Link></Table.Cell> 
                    );
                  })}*/}
                  <Table.Cell>{ticket.title}</Table.Cell>
                  <Table.Cell>{ticket.description}</Table.Cell>
                  <Table.Cell>
                    <Label.Group>
                      {ticket.ticketCategories.map(category => (
                          <Label key={category.category.categoryid}>
                            {category.category.name}
                          </Label>
                        ))}
                    </Label.Group>
                  </Table.Cell>
                  <Table.Cell>{ticket.status.name}</Table.Cell>
                  <Table.Cell>
                  {/* {users && users.map(user => {
                    return (
                      <button
                        onClick={() => {
                          adminDeleteUser(user.userid);
                        }}>   
                        Delete</button> 
                        );
                    })} */}
                    <button></button>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
=======
    <div>
      <AdminUserView />

      <AdminTicketView />
    </div>
>>>>>>> d2ae215986ff64533a09debffa9105c30fa92184
  );
};

export default AdminDashboard;

