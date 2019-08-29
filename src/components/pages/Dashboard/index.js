import React, { useContext } from "react";
import AuthContext from "../../../context/auth/authContext";
import { Button, Card, Container } from "semantic-ui-react";

const Dashboard = () => {
  const authContext = useContext(AuthContext);
  const { userInfo } = authContext;
  const formatRoleName = role => {
    const auth = role.split("_");
    const authRole = auth[1].toLowerCase();

    return authRole.charAt(0).toUpperCase() + authRole.slice(1);
  };

  const formatPathName = role => {
    const auth = role.split("_");
    return auth[1].toLowerCase();
  };

  return (
    <Container>
      <Card.Group centered itemsPerRow={3}>
        {userInfo.authority &&
          userInfo.authority.length > 1 &&
          userInfo.authority.map(authority => (
            <Card key={authority.authority}>
              <Card.Content textAlign="center">
                <Card.Header>{formatRoleName(authority.authority)}</Card.Header>
              </Card.Content>
              <Card.Content textAlign="center">
                <Button
                  as="a"
                  href={`/${formatPathName(authority.authority)}/dashboard`}
                >
                  {formatRoleName(authority.authority)} Dashboard
                </Button>
              </Card.Content>
            </Card>
          ))}
      </Card.Group>
    </Container>
  );
};

export default Dashboard;
