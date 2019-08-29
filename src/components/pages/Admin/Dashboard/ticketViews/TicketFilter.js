import React, { useContext, useRef, useEffect, useState } from "react";
import AdminContext from "../../../../../context/admin/adminContext";

const TicketFilter = () => {
  const [value, setValue] = useState("");
  const adminContext = useContext(AdminContext);

  const text = useRef("");

  const { adminFilterTickets,
    adminClearTicketFilter, filteredTickets } = adminContext;

  useEffect(() => {
    if (filteredTickets == null) {
      text.current.value = "";
    }
  });

  console.log("TicketFilter.js", text);

  const onChange = e => {
    setValue(e.target.value);
    if (text.current.value !== "") {
      adminFilterTickets(e.target.value);
    } else {
      adminClearTicketFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type="text"
        value={value}
        placeholder="Tickets"
        onChange={onChange}
      />
    </form>
  );
};

export default TicketFilter;
