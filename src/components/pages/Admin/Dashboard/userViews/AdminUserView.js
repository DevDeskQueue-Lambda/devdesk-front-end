// import React, { Fragment, useContext, useEffect } from "react";
// import { Button, Header, Grid } from "semantic-ui-react";
// import AdminContext from "../../../../../context/admin/adminContext";

// import AssignTicket from "../ticketViews/AssignTicket";
// import UserForm from "../UserForm";

// import UserFilter from "./UserFilter";

// import PromoteUser from "./PromoteUser";

// const AdminUserView = () => {
//   const adminContext = useContext(AdminContext);



//   // const { admin}
//   const {
//     users,
//     adminGetAllUsers,
//     adminDeleteUser,
//     filtered,
//     setPromotingUser,
//     promotingUser,
//     adminAddUser
//   } = adminContext;

//   // console.log("admin index", users);

//   useEffect(() => {
//     adminGetAllUsers();

//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div>
//    

//       <Grid>
//         <Grid.Column>
//           <Header>Admin Dashboard</Header>
//           <h4>Users</h4>
          
          
          
          
//           <UserFilter />
//           {filtered && filtered !== null
//             ? filtered.map((user, i) => {
//                 return (
//                   <Fragment key={i}>
//                     <UserForm/>
//                     <button
//                       onClick={() => {
//                         adminAddUser(user.userid);
//                       }}
//                     >
//                       Add User
//                     </button>
//                     <h1>{user.username}</h1>
//                     <h3>{user.fname}</h3>
//                     <h3>{user.lname}</h3>
//                     <AssignTicket />
//                     <button
//                       onClick={() => {
//                         adminDeleteUser(user.userid);
//                       }}
//                     >
//                       Delete User
//                     </button>

//                   </Fragment>
//                 );
//               })
//             : users &&
//               users.map((user, i) => {
//                 return (
//                   <Fragment key={i}>
//                     <button
//                       onClick={() => {
//                         adminAddUser(user.userid);
//                       }}
//                     >
//                       Add User
//                     </button>
//                     <h2>{user.username}</h2>
//                     <h3>{user.fname}</h3>
//                     <h3>{user.lname}</h3>
//                     <AssignTicket />
//                     <button
//                       onClick={() => {
//                         adminDeleteUser(user.userid);
//                       }}
//                     >
//                       Delete User
//                     </button>
//                     {user.authority.findIndex(
//                       authority => authority.authority === "ROLE_ADMIN"
//                     ) === -1 && (
//                       <Button
//                         onClick={() => setPromotingUser(true, user, false)}
//                       >
//                         Promote
//                       </Button>
//                     )}
//                   </Fragment>
//                 );
//               })}
//         </Grid.Column>
//       </Grid>

//       {promotingUser && <PromoteUser />}
//     </div>
//   );
// };

// export default AdminUserView;




import React, { useState, Fragment, useContext, useEffect } from "react";
import { Button, Header, Grid,Label, Modal, Table } from "semantic-ui-react";
import AdminContext from "../../../../../context/admin/adminContext";

// import AssignTicket from "../ticketViews/AssignTicket";
// import UserForm from "../UserForm";

// import UserFilter from "./UserFilter";

// import PromoteUser from "./PromoteUser";

const AdminUserView = () => {
  const adminContext = useContext(AdminContext);
  const { users, adminGetAllUsers, adminDeleteUser, filtered, setPromotingUser, promotingUser, adminAddUser , isModalOpen, setModalOpen} = adminContext;
    
        console.log("users", users);
        const [userModal, setUserModal] = useState({});

  useEffect(() => {
    adminGetAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  const handleUserModal = action => {
    setUserModal(action);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
  };

 
  return (
    <div>
    <Grid padded="horizontally"  style={{ marginTop: '3rem' }}>
      <Grid.Column width={16}>
        <Header as="h1">Administration Dashboard</Header>
        <Header>Registered Students </Header>
      </Grid.Column>
      <Grid.Column textAlign="right">
      <Button onClick={() => handleUserModal("add")}>Add Student</Button>
          </Grid.Column>
      <Grid.Column width={16}>
        <Table celled>
          <Table.Header>
            <Table.Row>
            <Table.HeaderCell>Username</Table.HeaderCell>
            <Table.HeaderCell>Student Name</Table.HeaderCell>
              <Table.HeaderCell>Email</Table.HeaderCell>
              <Table.HeaderCell>Role</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>

            </Table.Row>
          </Table.Header>
          <Table.Body>
            {users && 
            users.map(user => {
              return (
                <Table.Row key={user.userid}>
                  {/* {users && users.map(user => {
                  return (
                    <Table.Cell><Link to={` `}>{user.fname}</Link></Table.Cell> 
                    );
                  })}*/}
                  <Table.Cell>{user.username}</Table.Cell>
                  <Table.Cell>{user.fname} {user.lname} </Table.Cell>
                  <Table.Cell>{user.useremail} </Table.Cell>
                  <Table.Cell>
                  {user.authority.map(
                          user => `${"/ "}${user.authority}`)}
                  </Table.Cell>
                  <Table.Cell>
                      <button
                        onClick={() => {
                          adminDeleteUser(user.userid);
                        }}>   
                        Delete
                        </button> 
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
      </Grid.Column>
    </Grid>
    </div>
  );
};

export default AdminUserView;