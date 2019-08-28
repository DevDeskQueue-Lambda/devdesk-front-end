import React, { useState, Fragment, useContext, useEffect } from "react";
import { Button, Header, Grid, Label, Modal, Table } from "semantic-ui-react";
import AdminContext from "../../../../context/admin/adminContext";
import TicketContext from "../../../../context/ticket/ticketContext";

import AddTicket from '../../Student/Dashboard/AddTicket'
import EditTicket from '../../Student/Dashboard/EditTicket'
import UserFilter from './UserFilter'

const AdminDashboard = () => {
  const adminContext = useContext(AdminContext);

  const { users, adminGetAllUsers, adminDeleteUser, adminAddUser, adminEditUser } = adminContext;

  console.log("users", users);

  //ticket context
  const [ticketModal, setTicketModal] = useState({});
  const ticketContext = useContext(TicketContext);
  const { tickets, fetchAllTickets, isModalOpen, setModalOpen } = ticketContext;

  useEffect(() => {
    adminGetAllUsers();
    fetchAllTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleTicketModal = action => {
    setTicketModal(action);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  let modal = {
    name: ticketModal === "add" ? "Add Ticket" : "Edit Ticket",
    type: ticketModal === "add" ? <AddTicket /> : <EditTicket />
  };

  return (
    <div>

    <div>
      <Grid>
        <Grid.Column>
          <Header>Admin Dashboard</Header>
          <h4>Users</h4>
          <form>
            
            <UserFilter />
            <button
                    onClick={() => {
                      adminAddUser();
                    }}
                  >
                    AddUser
                  </button>
          </form>
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
                    Delete User
                  </button>
                  
                  <button
                    onClick={() => {
                      adminEditUser();
                    }}
                  >
                    Edit User
                  </button>

                </Fragment>
              );
            })}
        </Grid.Column>
      </Grid>
    </div>
    
    <div>
      <Grid padded="horizontally" style={{ marginTop: "5rem" }}>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header>Current Tickets</Header>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button onClick={() => handleTicketModal("add")}>Add Ticket</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width={16}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Tried</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tickets &&
                tickets.length > 0 &&
                tickets.map(ticket => (
                  <Table.Row key={ticket.ticketid}>
                    <Table.Cell>
                      {ticket.ticketCategories &&
                        ticket.ticketCategories.length > 0 &&
                        ticket.ticketCategories.map(category => (
                          <Label key={category.category.categoryid}>
                            {category.category.name}
                          </Label>
                        ))}
                    </Table.Cell>
                    <Table.Cell>{ticket.title}</Table.Cell>
                    <Table.Cell>{ticket.description}</Table.Cell>
                    <Table.Cell>{ticket.tried}</Table.Cell>
                    <Table.Cell>{ticket.status.name}</Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => handleTicketModal("edit")}>
                        Edit
                      </Button>
                      <Button
                        color="red"
                        onClick={() => handleTicketModal("delete")}
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
      <Modal closeIcon onClose={handleModalClose} open={isModalOpen}>
        <Modal.Header>{modal.name}</Modal.Header>
        <Modal.Content>{modal.type}</Modal.Content>
      </Modal>
    </div>
    </div>
  );
};

export default AdminDashboard;
