import React from 'react';
import { Link } from 'react-router-dom';

const UserCard = ({ user, deleteUser }) => {
  return (
    <div>
      {user.fname} {user.username} {user.useremail}
      <button onClick={() => deleteUser(user.id)}>Delete</button>
      <Link to={`/users/edit/${user.id}`}>Edit</Link>
    </div>
  );
};

export default UserCard;