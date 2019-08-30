import React, { useContext } from "react";
import AuthContext from "../../../context/auth/authContext";
import { Button, Card, Container, Grid } from "semantic-ui-react";

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
    <Grid stackable container centered columns={3}>
      {userInfo.authority &&
        userInfo.authority.length > 1 &&
        userInfo.authority.map(authority => (
          <Grid.Column>
            <Card fluid key={authority.authority}>
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
          </Grid.Column>
        ))}
    </Grid>
  );
};

export default Dashboard;
