import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";

const Registration = props => {
  const authContext = useContext(AuthContext);

  const { register, isAuthenticated, userInfo } = authContext;

  useEffect(() => {
    if (isAuthenticated) {
      if (userInfo && userInfo.userRoles.length > 1) {
        props.history.push("/dashboard");
      } else {
        const role = userInfo.userRoles[0].role.name;
        props.history.push(`/${role}/dashboard`);
      }
    }
    // eslint-disable-next-line
  }, [isAuthenticated, props.history, userInfo]);

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    useremail: "",
    username: "",
    password: "",
    password2: ""
  });

  const { fname, lname, useremail, username, password, password2 } = user;

  const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (
      fname === 0 ||
      lname === 0 ||
      username === 0 ||
      useremail === 0 ||
      password === ""
    ) {
      console.log("Please enter all fields");
    } else if (password !== password2) {
      console.log("Passwords do not match");
    } else {
      register({ fname, lname, useremail, username, password });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account <span>Register</span>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="fname">First Name</label>
            <input
              type="text"
              name="fname"
              value={fname}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label htmlFor="lname">Last Name</label>
            <input
              type="text"
              name="lname"
              value={lname}
              onChange={onChange}
              required
            />
          </div>
          <div>
            <label htmlFor="useremail">Email Address</label>
            <input
              type="email"
              name="useremail"
              value={useremail}
              onChange={onChange}
              required
              placeholder="Valid Email"
            />
          </div>
          <div>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={onChange}
              required
              minLength="5"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input
              type="password"
              name="password2"
              value={password2}
              onChange={onChange}
              required
              minLength="6"
            />
          </div>
          <input type="submit" value="Register" />
        </form>
      </h1>
    </div>
  );
};

export default Registration;
