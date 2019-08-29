import React, { useContext, useEffect, useState } from "react";
import AdminContext from "../../../../../context/admin/adminContext";

const AssignTicket = props => {
  const adminContext = useContext(AdminContext);
  const { adminAssignTicket } = adminContext;

  useEffect(() => {
    setTicket({
      id: "",
      userid: ""
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [ticket, setTicket] = useState({
    id: " ",
    userid: " "
  });

  const { id, userid } = ticket;

  const onChange = e => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();
    console.log("AssignTicket.js", ticket);
    adminAssignTicket(ticket);
    setTicket({
      id: "",
      userid: ""
    });
  };
  console.log("AssignTicket", ticket);
  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="ticket id"
          name="id"
          value={id}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="user id"
          name="userid"
          value={userid}
          onChange={onChange}
        />
        <button>Assign Ticket</button>
      </form>
    </>
  );
};

export default AssignTicket;
