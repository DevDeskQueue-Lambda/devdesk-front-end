import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/auth/authContext";

import { Menu, Container, Image, Button } from "semantic-ui-react";

const NavBar = ({ logo, homeUrl }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, logout } = authContext;
  const onLogOut = () => {
    logout();
  };

  return (
    <Menu borderless>
      <Container>
        <Menu.Item as="a" href={homeUrl}>
          <Image src={logo} size="small" />
        </Menu.Item>
        <Menu.Item position="right">
          <a href={homeUrl}>
            <Button className="tertiary">Home</Button>
          </a>
          {isAuthenticated ? (
            <Button className="tertiary" onClick={onLogOut}>
              Log Out
            </Button>
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
