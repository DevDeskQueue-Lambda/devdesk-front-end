import React, { useState, useContext, useEffect } from "react";
import {
  Comment,
  Button,
  Header,
  Grid,
  Icon,
  Label,
  Modal,
  Table
} from "semantic-ui-react";
import TicketContext from "../../../../context/ticket/ticketContext";
import AddTicket from "./AddTicket";
import EditTicket from "./EditTicket";

const StudentDashboard = props => {
  const ticketContext = useContext(TicketContext);
  const { tickets, fetchAllTickets, isModalOpen, setModalOpen } = ticketContext;

  const [ticketModal, setTicketModal] = useState({});
  const [ticketProps, setTicketProps] = useState({});
  const [isCommentModalOpen, setCommentModalOpen] = useState(false);
  const [commentModalProps, setCommentModalProps] = useState([]);

  useEffect(() => {
    fetchAllTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (commentModalProps.length > 0) {
      setCommentModalOpen(true);
    } else {
      setCommentModalOpen(false);
    }
  }, [commentModalProps]);

  const handleTicketModal = (action, ticketInfo) => {
    if (action === "edit") {
      setTicketProps(ticketInfo);
    }
    setTicketModal(action);
    setModalOpen(true);
  };

  const handleCommentModal = ticketComments => {
    setCommentModalProps(ticketComments);
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
                <Table.HeaderCell>Category</Table.HeaderCell>
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
                              handleCommentModal(ticket.ticketComments)
                            }
                          >
                            <Icon name="comment outline" />
                          </Button>
                        )}
                    </Table.Cell>
                    <Table.Cell>
                      <Button.Group>
                        <Button
                          color="blue"
                          onClick={() => handleTicketModal("edit", ticket)}
                          size="small"
                        >
                          Edit
                        </Button>
                        <Button
                          color="red"
                          onClick={() => handleTicketModal("delete")}
                          size="small"
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
      <Modal open={isCommentModalOpen}>
        <Modal.Header>Comments</Modal.Header>
        <Modal.Content>
          <Comment.Group>
            {commentModalProps.length > 0 &&
              commentModalProps.map(comment => (
                <Comment key={comment.comment.commentid}>
                  <Comment.Content>
                    <Comment.Author>
                      {comment.comment.user.fname}
                    </Comment.Author>
                    <Comment.Text>{comment.comment.comment}</Comment.Text>
                  </Comment.Content>
                </Comment>
              ))}
          </Comment.Group>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setCommentModalProps([])}>Close</Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default StudentDashboard;
