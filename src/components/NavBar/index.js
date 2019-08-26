import React, {Fragment, useContext} from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { Menu, Container, Image, Button } from 'semantic-ui-react';

const NavBar = ({ logo }) => {
  
  const authContext = useContext(AuthContext);

  const { isAuthenticated, logout, user } = authContext;

  const onLogout = () => {
    logout();
  }

  return (
    <Menu borderless>
      <Container>
        <Menu.Item>
          <Link exact to="/">
            <Image src={logo} size="small" />
          </Link>
        </Menu.Item>
        <Menu.Item position="right">
          <Link to="/register">
            <Button className="tertiary">Register</Button>
          </Link>
          <Link to="/login">
            <Button className="tertiary">Login</Button>
          </Link>
        </Menu.Item>
      </Container>
    </Menu>
  );
}

export default NavBar;