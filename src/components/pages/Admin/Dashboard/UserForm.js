// import React, {useState} from 'react'



// const UserForm = ({ submitUser, initialValues, values, }) => {
//   const [user, setUser] = useState(initialValues || {username: "", name: "", email: ""});
//   const handleChange = event => setUser({...user, [event.target.name]: event.target.value});
//   const handleSubmit = event => {
//     event.preventDefault();
//     submitUser(user);
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input name="username"
//              placeholder="username"
//              value={user.username}
//              onChange={handleChange} />
//       <input name="first name"
//              placeholder="first name"
//              value={user.fname}
//              onChange={handleChange} />
//       <input name="last name"
//              placeholder="last name"
//              value={user.lname}
//              onChange={handleChange} />     
//       <input name="email"
//              placeholder="email"
//              value={user.useremail}
//              onChange={handleChange} />
//       <button type="submit">Add User</button>
//     </form>
//   );
// };

// export default UserForm;
