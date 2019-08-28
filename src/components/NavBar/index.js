import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

import { Menu, Container, Image, Button } from "semantic-ui-react";

const NavBar = ({ logo }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout, user } = authContext;
  //console.log("navbar", user);

  const onLogOut = () => {
    logout();
  };

  const authLinks = (
    <Menu borderless>
      <Container>
        <Menu.Item as="a" href="/">
          <Image src={logo} size="small" />
        </Menu.Item>
        <Menu.Item as="a" href="/register" position="right">
          <Button className="tertiary">Register</Button>
        </Menu.Item>
        <Menu.Item as="a" href="/">
          <Button className="tertiary">Login</Button>
        </Menu.Item>
      </Container>
    </Menu>
  );

  const guestLinks = (
    <Menu borderless>
      <Container>
        <Menu.Item as="a" href="/">
          <Image src={logo} size="small" />
        </Menu.Item>
        <Menu.Item position="right">
          <Button className="tertiary" onClick={onLogOut}>
            Log Out
          </Button>
        </Menu.Item>
      </Container>
    </Menu>
  );

  return <div>{isAuthenticated ? guestLinks : authLinks}</div>;
};

export default NavBar;
