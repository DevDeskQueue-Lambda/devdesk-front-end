import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import axiosWithAuth from '../utils/axiosWithAuth.js';
import UserForm from './UserForm.js';
import UserCard from './UserCard.js';
import { Route, Redirect } from 'react-router-dom';
// import AdminContext from "../../../../context/admin/adminContext";
// import { axiosWithAuth } from '../../../../utils';

const Users = (props) => {
  const [usersList, setUsersList] = useState([]);

  const getUsers = () => {
    axiosWithAuth().get('https://lambda-devdesk.herokuapp.com/users/allusers')
      .then(response => {
        setUsersList(response.data);
      })
      .catch(error => console.log(error.response));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const addUser = user => {
    axiosWithAuth().post('https://lambda-devdesk.herokuapp.com/register', user)
       .then(response => {
        setUsersList(response.data);
      })
      .catch(error => console.log(error.response));
  };

  const editUser= user => {
    axiosWithAuth().put(`https://lambda-devdesk.herokuapp.com/users/user/${user.id}`, user)
      .then(response => {
        setUsersList(response.data);
        props.history.push("/users");
      })
      .catch(error => console.log(error.response));
  };

  const deleteUser= id => {
    axiosWithAuth().delete(`https://lambda-devdesk.herokuapp.com/users/user/${id}`)
    .then(response => {
        setUsersList(response.data);
      })
      .catch(error => console.log(error.response));
  };

  return (
    <div>
      <h2>Resgistered Users</h2>
      <Route exact path="/users" render={props => <UserForm {...props} submitUser={addUser} />}/>
      PrivateRoute path="/admin/dashboard" render={props => <UserForm {...props} submitUser={addUser} />}/>
      {usersList.map(user => {
        return 
        <UserCard key={user.id}
                  user={user}
                  deleteUser={deleteUser}/>;
      })}
      <Route path="/users/edit/:id" render={props => {
        console.log(props);
        const currentUser = usersList.find(user => user.id == props.match.params.id);
        if (!currentUser) {
          return <Redirect to="/users"/>;
        }
        return <UserForm {...props} submitUser={editUser} initialValues={currentUser}/>;
      }}/>
    </div>
  );
};

export default Users;