import React, { useContext } from "react";
import { Button, Header, List, Message, Modal } from "semantic-ui-react";
import AdminContext from "../../../../../context/admin/adminContext";
const PromoteUser = () => {
  const adminContext = useContext(AdminContext);
  const {
    setPromotingUser,
    promoteUserToStaff,
    promoteUserToAdmin,
    promotingUser,
    promotedUser,
    isPromotingUserModalOpen
  } = adminContext;

  const userAuthorities = promotingUser.authority.map(
    authority => authority.authority
  );

  let promotingOptions =
    userAuthorities.includes("ROLE_STAFF") &&
    userAuthorities.includes("ROLE_STUDENT")
      ? "admin"
      : "staff";

  console.log(promotingOptions);
  return (
    <>
      <Modal open={isPromotingUserModalOpen} size="small">
        <Modal.Header>Promote User</Modal.Header>
        <Modal.Content>
          <Header>
            Promote{" "}
            <span style={{ textDecoration: "underline" }}>
              {promotingUser.fname} {promotingUser.lname}
            </span>{" "}
            to
          </Header>
          {promotedUser === null && (
            <>
              {promotingOptions === "admin" ? (
                <Button
                  onClick={() => promoteUserToAdmin(promotingUser.userid)}
                >
                  Admin
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => promoteUserToStaff(promotingUser.userid)}
                  >
                    Staff
                  </Button>
                </>
              )}
            </>
          )}
        </Modal.Content>
        <Modal.Content>
          {promotedUser &&
            promotedUser.authority.length > promotingUser.authority.length && (
              <Message positive>
                {promotedUser.fname} now has the following authorities
                <List>
                  {promotedUser.authority &&
                    promotedUser.authority.length > 0 &&
                    promotedUser.authority.map(authority => (
                      <List.Item key={authority.authority}>
                        {authority.authority}
                      </List.Item>
                    ))}
                </List>
              </Message>
            )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => setPromotingUser(false, null, true)}>
            Close
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default PromoteUser;
