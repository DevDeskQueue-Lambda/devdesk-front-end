import React, { useState, Fragment, useContext, useEffect } from "react";
import { Button, Header, Grid, Label, Modal, Table } from "semantic-ui-react";

import AdminContext from "../../../../../context/admin/adminContext";
import TicketContext from "../../../../../context/ticket/ticketContext";
import AddTicket from "../../../Student/Dashboard/AddTicket";
import EditTicket from "../../../Student/Dashboard/EditTicket";

import TicketFilter from "./TicketFilter";




const AdminTicketView = () => {

  const adminContext = useContext(AdminContext);

  const { adminTickets, adminFetchTickets, filteredTickets } = adminContext;

  console.log("adminFetchTickets", adminTickets);

  //ticket context
  const [ticketModal, setTicketModal] = useState({});
  const ticketContext = useContext(TicketContext);
  const { isModalOpen, setModalOpen } = ticketContext;

  useEffect(() => {
    
    // fetchAllTickets();
    adminFetchTickets();
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
    <Grid padded="horizontally" style={{ marginTop: "5rem" }}>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Header>Current Tickets</Header>
      </Grid.Column>
      <Grid.Column textAlign="right">
        <Button onClick={() => handleTicketModal("add")}>
          Add Ticket
        </Button>
        
      </Grid.Column>
    </Grid.Row>

    <TicketFilter />

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
          {filteredTickets &&
            filteredTickets !== null ? filteredTickets.map(ticket => (
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
            ))
            
           : adminTickets &&
            adminTickets.length > 0 &&
            adminTickets.map(ticket => (
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
  )
}

export default AdminTicketView
