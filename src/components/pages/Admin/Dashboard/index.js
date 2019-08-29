import React from "react";

import AdminTicketView from "./ticketViews/AdminTicketView";
import AdminUserView from "./userViews/AdminUserView";

const AdminDashboard = () => {
  // console.log('adminview', props.users)
  return (
    <div>
      <AdminUserView />
      <AdminTicketView />
    </div>
  );
};

export default AdminDashboard;
