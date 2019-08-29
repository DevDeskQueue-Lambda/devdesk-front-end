import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { Header, Grid, Table, Label } from "semantic-ui-react";
import { axiosWithAuth } from '../../../../utils';

const StaffDashboard = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axiosWithAuth().get('/tickets/alltickets')
      .then(response => setTickets(response.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

const StaffDashboard = props => {
  return (
    <Grid container style={{ marginTop: '2rem' }}>
      <Grid.Column width={16}>
        <Header as="h1">Staff Dashboard</Header>
      </Grid.Column>
      <Grid.Column width={16}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Description</Table.HeaderCell>
              <Table.HeaderCell>Categories</Table.HeaderCell>
              <Table.HeaderCell>Status</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {tickets && tickets.map(ticket => {
              return (
                <Table.Row key={ticket.ticketid}>
                  <Table.Cell>
                    <Link to={`/staff/dashboard/ticket/${ticket.ticketid}`} style={{fontWeight: 'bold'}}>
                      {ticket.title}
                    </Link></Table.Cell>
                  <Table.Cell>{ticket.description}</Table.Cell>
                  <Table.Cell>
                    <Label.Group>
                      {
                        ticket.ticketCategories.map(category => (
                          <Label key={category.category.categoryid}>
                            {category.category.name}
                          </Label>
                        ))}
                    </Label.Group>
                  </Table.Cell>
                  <Table.Cell>{ticket.status.name}</Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
  );
};

export default StaffDashboard;
