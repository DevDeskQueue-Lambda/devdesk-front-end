import React from "react";
import { Header, Grid } from "semantic-ui-react";
import StaffContext from '../../../../context/staff/staffContext';

const StaffDashboard = () => {
  const staffContext = React.useContext(StaffContext);
  const { tickets, getUnassignedTickets } = staffContext;

  console.log('tickets: ', tickets);

  React.useEffect(() => {
    getUnassignedTickets();
  }, []);
  return (
    <div>
      <Grid>
        <Grid.Column>
          <Header>Staff Dashboard</Header>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default StaffDashboard;
