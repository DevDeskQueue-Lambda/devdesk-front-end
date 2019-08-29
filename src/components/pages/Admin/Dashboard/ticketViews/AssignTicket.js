import React, { useContext, useEffect } from "react";
import AdminContext from "../../../../context/ticket/adminContext";


const AssignTicket = () => {
  const adminContext = useContext(AdminContext);
  const { tickets, adminFetchTickets, adminFilterTickets, adminClearTicketFilter } = adminContext;

  useEffect(() => {
    adminFetchTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
     
    </>
  );
};

export default AssignTicket;

