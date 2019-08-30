import React, { useContext } from "react";
import TicketContext from "../../../../context/ticket/ticketContext";
import { Button, Header, Modal, ModalActions } from "semantic-ui-react";

const AssignedStaff = () => {
  const ticketContext = useContext(TicketContext);
  const {
    isAssignedStaffModalOpen,
    setAssignedStaffModalOpen,
    assignedStaff
  } = ticketContext;
  const staffName = `${assignedStaff.fname} ${assignedStaff.lname}`;
  return (
    <>
      <Modal open={isAssignedStaffModalOpen} size="small">
        <Modal.Header>Assigned Staff</Modal.Header>
        <Modal.Content>
          <Header>
            Your ticket is being handled by{" "}
            <span style={{ textDecoration: "underline" }}>{staffName}</span>{" "}
          </Header>
        </Modal.Content>
        <ModalActions>
          <Button onClick={() => setAssignedStaffModalOpen(false, null)}>
            Close
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
};

export default AssignedStaff;
