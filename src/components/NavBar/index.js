import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

import { Menu, Container, Image, Button } from "semantic-ui-react";

const NavBar = ({ logo }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, userInfo } = authContext;
  //console.log("navbar", user);

  const onLogOut = () => {
    logout();
  };

  return (
    <Menu borderless>
      <Container>
        <Menu.Item as="a" href="/">
          <Image src={logo} size="small" />
        </Menu.Item>
        <Menu.Item position="right">
          {isAuthenticated ? (
            <>
              <Menu.Item>Hello, {userInfo.fname}</Menu.Item>
              <Button className="tertiary" onClick={onLogOut}>
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link to="/register">
                <Button className="tertiary">Register</Button>
              </Link>
              <Link to="/">
                <Button className="tertiary">Login</Button>
              </Link>
            </>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavBar;
