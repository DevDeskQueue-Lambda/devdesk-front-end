import React from "react";
import { Route, Link } from 'react-router-dom';
import AdminTicketView from "./ticketViews/AdminTicketView";
import AdminUserView from "./userViews/AdminUserView";
import { Menu } from 'semantic-ui-react';
import PrivateRoute from '../../../routing/PrivateRoute';

const AdminDashboard = () => {
  return (
    <div>
      <Menu>
        <Link to="/admin/dashboard/users"><Menu.Item name='Registered Users' /></Link>
        <Link to="/admin/dashboard/tickets"><Menu.Item name="Current Tickets" /></Link>
      </Menu>

      <PrivateRoute path="/admin/dashboard/users" component={AdminUserView} />
      <PrivateRoute path="/admin/dashboard/tickets" component={AdminTicketView} />
    </div>
  );
};

export default AdminDashboard;
