import React, { useContext } from "react";
import AuthContext from "../../../context/auth/authContext";
import { Button, Card, Grid } from "semantic-ui-react";

const Dashboard = () => {
  const authContext = useContext(AuthContext);

  const { userInfo } = authContext;

  const formatRoleName = role => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };
  return (
    <>
      <Grid textAlign="center">
        <Grid.Column width={12}>
          <Card.Group>
            {userInfo.userRoles &&
              userInfo.userRoles.length > 1 &&
              userInfo.userRoles.map(role => (
                <Card key={role.role.roleid}>
                  <Card.Content>
                    <Card.Header>{formatRoleName(role.role.name)}</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Button as="a" href={`/${role.role.name}/dashboard`}>
                      {formatRoleName(role.role.name)} Dashboard
                    </Button>
                  </Card.Content>
                </Card>
              ))}
          </Card.Group>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Dashboard;
