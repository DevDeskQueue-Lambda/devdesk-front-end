import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { Form, Field, withFormik } from "formik";
import {} from "semantic-ui-react";
import {
  Form as SemanticForm,
  Button,
  Grid,
  Header,
  Message
} from "semantic-ui-react";
import * as yup from "yup";

const Login = ({ values, history, status }) => {
  const authContext = useContext(AuthContext);

  const { login, isAuthenticated, userInfo, error } = authContext;
  const { username, password } = values;

  useEffect(() => {
    if (status) {
      login({ username, password });
    }

    if (isAuthenticated) {
      if (userInfo && userInfo.authority.length > 1) {
        props.history.push("/dashboard");
      } else {
        const auth = userInfo.authority[0].authority.split("_");
        const role = auth[1].toLowerCase();
        props.history.push(`/${role}/dashboard`);
      }
    }
  }, [isAuthenticated, history, userInfo, status, login, username, password]);

  return (
    <Grid container centered>
      <Grid.Column width={5}>
        <Form className="ui form">
          {error && (
            <Message
              negative
              icon="warning circle"
              content={error.data.error_description}
            />
          )}
          <Header as="h1">User Login</Header>
          <SemanticForm.Field>
            <Field type="text" name="username" placeholder="Username" />
          </SemanticForm.Field>
          <SemanticForm.Field>
            <Field type="password" name="password" placeholder="Password" />
          </SemanticForm.Field>
          <Button primary type="submit">
            Login
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

const FormikLogin = withFormik({
  mapPropsToValues: function({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },

  validationSchema: yup.object().shape({
    username: yup.string().required("You must provide your username."),
    password: yup.string().required("You must provide your password.")
  }),

  handleSubmit: function(values, { setStatus }) {
    setStatus(values);
  }
})(Login);

export default FormikLogin;
