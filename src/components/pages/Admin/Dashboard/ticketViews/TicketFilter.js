import React, { useContext, useRef, useEffect, useState } from "react";
import AdminContext from "../../../../../context/admin/adminContext";
import { Input } from 'semantic-ui-react';


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

  // console.log("TicketFilter.js", text);

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
      <div className="ui input">
        <input
          ref={text}
          type="text"
          value={value}
          placeholder="Tickets"
          onChange={onChange}
        />
      </div>
    </form>
  );
};

export default TicketFilter;
