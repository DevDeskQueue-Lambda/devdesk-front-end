import React, { Fragment, useContext, useEffect } from "react";
import { Button, Header, Grid, Label, Modal, Table } from "semantic-ui-react";
import AdminContext from "../../../../../context/admin/adminContext";

import AssignTicket from "../ticketViews/AssignTicket";

import UserFilter from "./UserFilter";

import PromoteUser from "./PromoteUser";

const AdminUserView = () => {
  const adminContext = useContext(AdminContext);

  const {
    users,
    adminGetAllUsers,
    adminDeleteUser,
    filtered,
    setPromotingUser,
    promotingUser
  } = adminContext;

  useEffect(() => {
    adminGetAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid>
        <Grid.Column>
          <h4>Users</h4>
          <UserFilter />
          {/* <Table.Row celled> */}
          <Table>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {/* </Table.Row> */}
            <Table.Body>
              {filtered && filtered !== null
                ? filtered.map((user, i) => {
                    return (
                      <Fragment key={i}>
                        <Table.Row>
                          <Table.Cell>
                            <strong>{user.fname}</strong>
                          </Table.Cell>
                          <Table.Cell>
                            <strong>{user.lname}</strong>
                          </Table.Cell>
                          <Table.Cell>
                            <strong>{user.username}</strong>
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <AssignTicket />
                          <Button
                            onClick={() => {
                              adminDeleteUser(user.userid);
                            }}
                          >
                            Delete User
                          </Button>
                        </Table.Row>
                      </Fragment>
                    );
                  })
                : users &&
                  users.map((user, i) => {
                    return (
                      <Fragment key={i}>
                        <Table.Row>
                          <Table.Cell>
                            <strong>{user.fname}</strong>
                          </Table.Cell>
                          <Table.Cell>
                            <strong>{user.lname}</strong>
                          </Table.Cell>
                          <Table.Cell>
                            <strong>{user.username}</strong>
                          </Table.Cell>
                        </Table.Row>

                        <Table.Row>
                          <AssignTicket />
                          <Button
                            onClick={() => {
                              adminDeleteUser(user.userid);
                            }}
                          >
                            Delete User
                          </Button>

                          {user.authority.findIndex(
                            authority => authority.authority === "ROLE_ADMIN"
                          ) === -1 && (
                            <Button
                              secondary
                              onClick={() =>
                                setPromotingUser(true, user, false)
                              }
                            >
                              Promote
                            </Button>
                          )}
                        </Table.Row>
                      </Fragment>
                    );
                  })}
            </Table.Body>
          </Table>
        </Grid.Column>
      </Grid>
      {promotingUser && <PromoteUser />}
    </div>
  );
};

export default AdminUserView;
