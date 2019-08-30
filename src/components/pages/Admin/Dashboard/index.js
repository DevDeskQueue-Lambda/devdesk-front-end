import React from "react";
import { Route } from 'react-router-dom';
import AdminTicketView from "./ticketViews/AdminTicketView";
import AdminUserView from "./userViews/AdminUserView";

const AdminDashboard = () => {
  // console.log('adminview', props.users)
  return (
    <div>

      <Route exact path="/admin/dashboard/users" component={AdminUserView} />
      <Route path="/admin/dashboard/tickets" component={AdminTicketView} />
    </div>
  );
};

export default AdminDashboard;
