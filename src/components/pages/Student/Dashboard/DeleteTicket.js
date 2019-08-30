import React, { useContext } from "react";
import TicketContext from "../../../../context/ticket/ticketContext";
import { Button, Header, Modal } from "semantic-ui-react";
const DeleteTicket = () => {
  const ticketContext = useContext(TicketContext);
  const {
    isDeleteTicketModalOpen,
    setDeleteTicketModalOpen,
    deletingTicketID,
    deleteTicket
  } = ticketContext;

  const headerStyle = {
    backgroundColor: "#DB2828",
    color: "#FFFFFF"
  };
  return (
    <>
      <Modal open={isDeleteTicketModalOpen} size="small">
        <Modal.Header style={headerStyle}>Delete Ticket</Modal.Header>
        <Modal.Content>
          <Header>Are you sure you want to delete this ticket?</Header>
        </Modal.Content>
        <Modal.Actions>
          <Button primary onClick={() => {
            return(
              
              deleteTicket(deletingTicketID),
              window.location.reload()
            )
            }}>
            Yes
          </Button>
          <Button basic onClick={() => setDeleteTicketModalOpen(false)}>
            No
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default DeleteTicket;
