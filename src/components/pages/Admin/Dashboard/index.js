import React from "react";

import AdminTicketView from "./ticketViews/AdminTicketView";
import AdminUserView from "./userViews/AdminUserView";

const AdminDashboard = () => {
  return (
    <div>
      <AdminUserView />

      <AdminTicketView />
    </div>
  );
};

export default AdminDashboard;
