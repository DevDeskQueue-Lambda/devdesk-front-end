import React from "react";
import { Input, Menu, Segment } from "semantic-ui-react";
import StaffContext from '../../../../context/staff/staffContext';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//Components
import ClaimedTickets from './ClaimedTickets';
import UnclaimedTickets from './UnclaimedTickets';
import TicketView from './TicketView';

const StaffDashboard = props => {
  return (
    <div>
      <Router>
      <Menu pointing>
          <Menu.Item
            href="/staff/dashboard"
            name='claimed tickets'
          />
          <Menu.Item
            href="/staff/dashboard/unclaimed_tickets"
            name='unclaimed tickets'
          />
          <Menu.Item
            href="/staff/dashboard/ticket_view"
            name='ticket view'
          />
        </Menu>
        <>
          <Switch>
            <Route exact path="/staff/dashboard" component={ClaimedTickets} />
            <Route path="/staff/dashboard/unclaimed_tickets" component={UnclaimedTickets} />
            <Route path="/staff/dashboard/ticket_view" component={TicketView} />
          </Switch>
        </>
      </Router>
    </div>
  );
};

export default StaffDashboard;
