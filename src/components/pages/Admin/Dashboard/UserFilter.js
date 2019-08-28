import React, {useContext, useRef, useEffect } from 'react'
import AdminContext from '../../../../context/admin/adminContext';


const UserFilter = () => {
  const adminContext = useContext(AdminContext)

  const text = useRef('')

  const { adminStudentFilter, adminClearFilter} = adminContext
  

  return(
    <form>
      <input 
        ref={text}
        type="text"
        placeholder='Filter Users'
        onChange={null}
        
        />
    </form>
  )
}

export default UserFilter;