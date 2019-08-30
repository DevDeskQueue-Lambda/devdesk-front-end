import React from "react";
import { Button, Header, Grid, Label, Table } from "semantic-ui-react";
import StaffContext from "../../../../context/staff/staffContext";

export default function MyTickets(props) {
  const staffContext = React.useContext(StaffContext);
  const {
    user,
    tickets,
    fetchCurrentUserData,
    fetchAssignedTickets
  } = staffContext;

  React.useEffect(() => {
    fetchCurrentUserData();
    fetchAssignedTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUnclaim = ticket => {
    console.log("UNCLAIM TICKET", ticket.ticketid);
  };

  console.log("USER", user);
  console.log("ASSIGNED TICKETS", tickets);

  return (
    <div>
      <Grid padded="horizontally" style={{ marginTop: "5rem" }}>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Header>My Assigned Tickets</Header>
          </Grid.Column>
        </Grid.Row>
        <Grid.Column width={16}>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Category</Table.HeaderCell>
                <Table.HeaderCell>Title</Table.HeaderCell>
                <Table.HeaderCell>Description</Table.HeaderCell>
                <Table.HeaderCell>Tried</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {tickets &&
                tickets.length > 0 &&
                tickets.map(ticket => (
                  <Table.Row key={ticket.ticketid}>
                    <Table.Cell>
                      {ticket.ticketCategories &&
                        ticket.ticketCategories.length > 0 &&
                        ticket.ticketCategories.map(category => (
                          <Label key={category.category.categoryid}>
                            {category.category.name}
                          </Label>
                        ))}
                    </Table.Cell>
                    <Table.Cell>{ticket.title}</Table.Cell>
                    <Table.Cell>{ticket.description}</Table.Cell>
                    <Table.Cell>{ticket.tried}</Table.Cell>
                    <Table.Cell>{ticket.status.name}</Table.Cell>
                    <Table.Cell>
                      <Button /* onClick={() => handleTicketModal("edit")} */>
                        View
                      </Button>
                      <Button color="red" onClick={() => handleUnclaim(ticket)}>
                        Unclaim
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
    </div>
  );
}
