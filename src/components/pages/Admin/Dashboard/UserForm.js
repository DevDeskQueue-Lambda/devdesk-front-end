import React, {useState, useContext, useEffect } from 'react'

import AdminContext from "../../../../context/admin/adminContext";

const UserForm = () => {
  const adminContext = useContext(AdminContext);

  const { users, adminGetAllUsers, adminDeleteUser, adminAddUser, adminEditUser } = adminContext;

  return (
    <div>
      
    </div>
  )
}

export default UserForm
