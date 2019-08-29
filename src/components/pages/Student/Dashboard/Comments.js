import React, { useContext } from "react";
import TicketContext from "../../../../context/ticket/ticketContext";
import { Button, Comment, Modal } from "semantic-ui-react";
const Comments = () => {
  const ticketContext = useContext(TicketContext);
  const {
    isTicketCommentsModalOpen,
    setTicketCommentsModalOpen,
    ticketComments
  } = ticketContext;
  return (
    <>
      <Modal open={isTicketCommentsModalOpen} size="small">
        <Modal.Header>Comments</Modal.Header>
        <Modal.Content>
          <Comment.Group>
            {ticketComments.length > 0 &&
              ticketComments.map(comment => (
                <Comment key={comment.comment.commentid}>
                  <Comment.Content>
                    <Comment.Author>
                      {comment.comment.user.fname}
                    </Comment.Author>
                    <Comment.Text>{comment.comment.comment}</Comment.Text>
                  </Comment.Content>
                </Comment>
              ))}
          </Comment.Group>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setTicketCommentsModalOpen(false, [])}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default Comments;
