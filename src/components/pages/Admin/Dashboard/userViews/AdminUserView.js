import React, { Fragment, useContext, useEffect } from "react";
import { Button, Header, Grid } from "semantic-ui-react";
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

  // console.log("admin index", users);

  useEffect(() => {
    adminGetAllUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid>
        <Grid.Column>
          <Header>Admin Dashboard</Header>
          <h4>Users</h4>
          <UserFilter />
          {filtered && filtered !== null
            ? filtered.map(user => {
                return (
                  <Fragment>
                    <h1>{user.username}</h1>
                    <h3>{user.fname}</h3>
                    <h3>{user.lname}</h3>
                    <AssignTicket />
                    <button
                      onClick={() => {
                        adminDeleteUser(user.userid);
                      }}
                    >
                      Delete User
                    </button>
                  </Fragment>
                );
              })
            : users &&
              users.map(user => {
                return (
                  <Fragment key={user.userid}>
                    <h2>{user.username}</h2>
                    <h3>{user.fname}</h3>
                    <h3>{user.lname}</h3>
                    <AssignTicket />
                    <button
                      onClick={() => {
                        adminDeleteUser(user.userid);
                      }}
                    >
                      Delete User
                    </button>
                    {user.authority.findIndex(
                      authority => authority.authority === "ROLE_ADMIN"
                    ) === -1 && (
                      <Button
                        onClick={() => setPromotingUser(true, user, false)}
                      >
                        Promote
                      </Button>
                    )}
                  </Fragment>
                );
              })}
        </Grid.Column>
      </Grid>

      {promotingUser && <PromoteUser />}
    </div>
  );
};

export default AdminUserView;
