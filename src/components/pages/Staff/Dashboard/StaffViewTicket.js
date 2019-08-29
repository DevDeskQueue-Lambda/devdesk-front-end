import React, { useEffect, useState, useContext } from 'react';
import { Form, withFormik, Field } from 'formik';
import { Link } from 'react-router-dom';
import { Grid, Header, Segment, Label, Comment, Form as SemanticForm, Button, List } from 'semantic-ui-react';
import { axiosWithAuth } from '../../../../utils'
import AuthContext from '../../../../context/auth/authContext';
import * as yup from 'yup';

const StaffViewTicket = ({ match, status }) => {
  const authContext = useContext(AuthContext);
  const { userInfo } = authContext;
  const { id } = match.params;
  const [ticket, setTicket] = useState();
  const [comments, setComments] = useState([]);
  const [ticketStatus, setTicketStatus] = useState('');
  const [ticketAssigned, setTicketAssigned] = useState('');

  useEffect(() => {
    axiosWithAuth().get(`/tickets/ticket/${id}`)
      .then(response => {
        console.log(response.data);
        setTicket(response.data);
        setComments([...comments, response.data.ticketComments][0]);
        setTicketStatus(response.data.status.name);
        setTicketAssigned(response.data.assigneduser ? response.data.assigneduser.username : 'Nobody');
      });
  }, [id]);

  const addComment = content => {
    console.log(content, id);
    axiosWithAuth().post(`/comments/comment/${id}`, {
      comment: content,
    })
      .then(response => {
        setComments(response.data.ticketComments);
      })
      .catch(err => console.log(err))
  }

  const assign = () => {
    axiosWithAuth().put(`/tickets/ticket/assign/${id}`)
      .then(response => setTicketAssigned(userInfo.username))
      .catch(err => console.log(err))
  }

  const unassign = () => {
    axiosWithAuth().put(`/tickets/ticket/unassign/${id}`)
      .then(response => setTicketAssigned('Nobody'))
      .catch(err => console.log(err))
  }

  const resolve = () => {
    axiosWithAuth().put(`/tickets/ticket/resolve/${id}`)
      .then(() => setTicketStatus("Resolved"))
      .catch(err => console.log(err))
  }

  if (status) {
    addComment(status);
  }

  return (
    ticket ? (
      <Grid container>
        <Grid.Row>
          <Link to="/staff/dashboard">
            <Button icon="arrow left" content="Return to dashboard" />
          </Link>
        </Grid.Row>
        <Grid.Column width={3}>
          <Segment raised>
            <p><strong>Status:</strong> {ticketStatus}</p>
            <p><strong>Assigned:</strong> {ticketAssigned}</p>
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
            <List>
            {(
                  <List.Item>
                    <Button fluid color="green" disabled={ticketStatus === 'Resolved'} onClick={resolve}>Resolve</Button>
                  </List.Item>
                )
              }
              {
                ticketAssigned === 'Nobody' && (
                  <List.Item>
                    <Button fluid disabled={ticketStatus === 'Resolved'} onClick={assign}>Assign yourself</Button>
                  </List.Item>
                )
              }
              {
                ticketAssigned === userInfo.username && (
                  <List.Item>
                    <Button fluid disabled={ticketStatus === 'Resolved'} onClick={unassign}>Unassign yourself</Button>
                  </List.Item>
                )
              }
            </List>
          </Segment>
        </Grid.Column>
        <Grid.Column width={13}>
          <Segment>
            <Header as="h1">{ticket.title}</Header>
            <p><strong>Student:</strong> {`${ticket.user.fname} ${ticket.user.lname}`}</p>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Attempted:</strong> {ticket.tried}</p>
          </Segment>
          <Comment.Group>
            <Header>Comments</Header>
            {
              [...comments].reverse().map(comment => {
                return (
                  <Comment key={comment.comment.commentid}>
                    <Comment.Avatar src="http://via.placeholder.com/50x50" />
                    <Comment.Content>
                      <Comment.Author as="a">{comment.comment.user.username}</Comment.Author>
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
          <Form className="ui reply form">
            <SemanticForm.Field>
              <Field component="textarea" name="content" rows="3" />
            </SemanticForm.Field>
            <Button primary type="submit">
              Comment
            </Button>
          </Form>
        </Grid.Column>
      </Grid>
    ) : null
  );
}

const FormikStaffViewTicket = withFormik({
  mapPropsToValues: ({
    content
  }) => {
    return {
      content: content || '',
    }
  },

  validationSchema: yup.object().shape({
    content: yup.string().required(),
  }),

  handleSubmit: function (values, { setStatus, resetForm }) {
    setStatus(values.content);
    resetForm();
  },
})(StaffViewTicket);

export default FormikStaffViewTicket;