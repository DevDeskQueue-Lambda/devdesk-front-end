import React from "react";
import { Menu } from "semantic-ui-react";
/* import StaffContext from "../../../../context/staff/staffContext"; */
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import MyTickets from "./MyTickets";
import AvailableTickets from "./AvailableTickets";

export default function StaffDashboard(props) {
  /* const staffContext = React.useContext(StaffContext);
  const {
    user,
    tickets,
    fetchAssignedTickets,
    fetchCurrentUserData
  } = staffContext;

  React.useEffect(() => {
    fetchCurrentUserData();
    fetchAssignedTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); */

  return (
    <div>
      <Router>
        <Menu>
          <Menu.Item name="My Tickets" href="/staff/dashboard" />
          <Menu.Item
            name="Available Tickets"
            href="/staff/dashboard/available-tickets"
          />
        </Menu>
        <Switch>
          <Route exact path="/staff/dashboard" component={MyTickets} />
          <Route
            path="/staff/dashboard/available-tickets"
            component={AvailableTickets}
          />
        </Switch>
      </Router>
    </div>
  );
}
