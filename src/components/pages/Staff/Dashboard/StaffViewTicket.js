import React, { useEffect, useState } from 'react';
import { Grid, Header, Segment, Label, Comment, Form as SemanticForm, Button } from 'semantic-ui-react';
import { axiosWithAuth } from '../../../../utils';

const StaffViewTicket = ({ match }) => {
  const { id } = match.params;
  const [ticket, setTicket] = useState();

  useEffect(() => {
    axiosWithAuth().get(`/tickets/ticket/${id}`)
      .then(response => {
        console.log(response.data);
        setTicket(response.data);
      });
  }, [id]);

  return (
    ticket ? (
      <Grid container>
        <Grid.Column width={3}>
          <Segment raised>
            <p><strong>Status:</strong> {ticket.status.name}</p>
            <p><strong>Assigned:</strong> {ticket.assigneduser ? ticket.assigneduser.fname : 'Nobody'}</p>
            <Label.Group>
              {
                ticket.ticketCategories.map(category => {
                  return (
                    <Label key={category.category.categoryid}>
                      {category.category.name}
                    </Label>
                  )
                })
              }
            </Label.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column width={13}>
          <Segment>
            <Header as="h1">{ticket.title}</Header>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Attempted:</strong> {ticket.tried}</p>
          </Segment>
          <Comment.Group>
            <Header>Comments</Header>
            {
              ticket.ticketComments.map(comment => {
                return (
                  <Comment key={comment.comment.commentid}>
                    <Comment.Avatar src="http://via.placeholder.com/50x50" />
                    <Comment.Content>
                      <Comment.Author as="a">{comment.comment.user.fname}</Comment.Author>
                      <Comment.Metadata>
                        <div>Today at 5:42PM</div>
                      </Comment.Metadata>
                      <Comment.Text>{comment.comment.comment}</Comment.Text>
                    </Comment.Content>
                  </Comment>
                );
              })
            }
          </Comment.Group>
          <SemanticForm reply>
            <SemanticForm.TextArea />
            <Button primary>
              Comment
            </Button>
          </SemanticForm>
        </Grid.Column>
      </Grid>
    ) : null
  );
}

export default StaffViewTicket;