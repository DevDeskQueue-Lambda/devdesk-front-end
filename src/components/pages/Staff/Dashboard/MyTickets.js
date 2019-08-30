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
    /* fetchCurrentUserData(); */
    /* fetchAssignedTickets(); */
    fetchAssignedTickets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const mappedTickets = (x, y) => {
    if (x === y) {
      return `${x} is equal to ${y}`;
    }
  };

  /* function isAssigned() {
    return;
  } */

  const currentTickets = tickets;
  const currentUser = user;

  const filterino = () => {
    const filterNull = currentTickets.filter(
      ticket => ticket.assigneduser !== null
    );
    const mapId = filterNull.map(item => {
      return item.assigneduser.userid;
    });
    const filterId = mapId.filter(id => id === currentUser.userid);
    /*     const killMe = currentTickets.filter(ticket => ) */
    console.log("1 filterNull", filterNull);
    console.log("2 mapId", mapId);
    console.log("3 filterId", filterId);
    /*     console.log("4 killMe", killMe); */
  };

  //console.log("USER ID", user.userid);
  //console.log("TICKETS", tickets);
  console.log("MAPPED TICKETS", mappedTickets(4, 4));
  console.log(filterino());

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
                      <Button
                        color="red"
                        /* onClick={() => handleTicketModal("delete")} */
                      >
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
