import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Dropdown,
  Header,
  Grid,
  Icon,
  Label,
  Modal,
  Table
} from "semantic-ui-react";
import AuthContext from "../../../../context/auth/authContext";
import TicketContext from "../../../../context/ticket/ticketContext";
import AddTicket from "./AddTicket";
import EditTicket from "./EditTicket";
import DeleteTicket from "./DeleteTicket";
import Comments from "./Comments";
import AssignedStaff from "./AssignedStaff";

const StudentDashboard = props => {
  const authContext = useContext(AuthContext);
  const ticketContext = useContext(TicketContext);
  const { userInfo } = authContext;
  const {
    tickets,
    categories,
    fetchAllTickets,
    fetchAllCategories,
    isModalOpen,
    setModalOpen,
    deletingTicket,
    setTicketCommentsModalOpen,
    assignedStaff,
    setAssignedStaffModalOpen,
    setFilter
  } = ticketContext;

  const [ticketModal, setTicketModal] = useState({});
  const [ticketProps, setTicketProps] = useState({});

  useEffect(() => {
    fetchAllTickets(userInfo.userid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTicketModal = (action, ticketInfo) => {
    if (action === "edit") {
      setTicketProps(ticketInfo);
    }
    setTicketModal(action);
    setModalOpen(true);
  };

  let modal = {
    name: ticketModal === "add" ? "Add Ticket" : "Edit Ticket",
    type:
      ticketModal === "add" ? (
        <AddTicket ticket={ticketProps} />
      ) : (
        <EditTicket ticket={ticketProps} />
      ),
    headerStyle:
      ticketModal === "add"
        ? { backgroundColor: "#21BA45", color: "#FFFFFF" }
        : { backgroundColor: "#2185D0", color: "#FFFFFF" }
  };

  return (
    <div>
      <Grid padded="horizontally" style={{ marginTop: "5rem" }}>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header>Student Tickets</Header>
          </Grid.Column>
          <Grid.Column textAlign="right">
            <Button color="green" onClick={() => handleTicketModal("add", {})}>
              Add Ticket
            </Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width={16}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <Grid columns={2}>
                    <Grid.Row>
                      <Grid.Column>Category</Grid.Column>
                      <Grid.Column textAlign="right">
                        <Dropdown floating icon="filter" clearable>
                          <Dropdown.Menu>
                            <Dropdown.Item
                              color="red"
                              onClick={() => setFilter("reset", null)}
                            >
                              Reset Filter
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            {categories &&
                              categories.length > 0 &&
                              categories.map(category => (
                                <Dropdown.Item
                                  key={category.categoryid}
                                  onClick={() =>
                                    setFilter("category", category.name)
                                  }
                                >
                                  {category.name}
                                </Dropdown.Item>
                              ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>
                </Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Tried</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Notifications</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tickets &&
                tickets.length > 0 &&
                tickets.map(ticket => (
                  <Table.Row key={ticket.ticketid}>
                    <Table.Cell width={3}>
                      <Label.Group>
                        {ticket.ticketCategories &&
                          ticket.ticketCategories.length > 0 &&
                          ticket.ticketCategories.map(category => (
                            <Label
                              key={category.category.categoryid}
                              size="small"
                            >
                              {category.category.name}
                            </Label>
                          ))}
                      </Label.Group>
                    </Table.Cell>
                    <Table.Cell>{ticket.title}</Table.Cell>
                    <Table.Cell width={4}>{ticket.description}</Table.Cell>
                    <Table.Cell>{ticket.tried}</Table.Cell>
                    <Table.Cell>{ticket.status.name}</Table.Cell>
                    <Table.Cell>
                      {ticket.ticketComments &&
                        ticket.ticketComments.length > 0 && (
                          <Button
                            icon
                            size="tiny"
                            onClick={() =>
                              setTicketCommentsModalOpen(
                                true,
                                ticket.ticketComments
                              )
                            }
                          >
                            <Icon name="comment outline" />
                          </Button>
                        )}
                      {ticket.assigneduser && (
                        <Button
                          icon
                          size="tiny"
                          onClick={() =>
                            setAssignedStaffModalOpen(true, ticket.assigneduser)
                          }
                        >
                          <Icon name="user outline" />
                        </Button>
                      )}
                    </Table.Cell>
                    <Table.Cell>
                      <Button.Group>
                        <Button
                          color="blue"
                          onClick={() => handleTicketModal("edit", ticket)}
                          size="tiny"
                        >
                          Edit
                        </Button>
                        <Button
                          color="red"
                          onClick={() => deletingTicket(ticket.ticketid)}
                          size="tiny"
                        >
                          Delete
                        </Button>
                      </Button.Group>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
      <Modal open={isModalOpen}>
        <Modal.Header style={modal.headerStyle}>{modal.name}</Modal.Header>
        <Modal.Content>{modal.type}</Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setModalOpen(false)}>Close</Button>
        </Modal.Actions>
      </Modal>
      {assignedStaff && <AssignedStaff />}
      <Comments />
      <DeleteTicket />
    </div>
  );
};

export default StudentDashboard;
