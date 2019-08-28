import React, { useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import { Form, Field, withFormik } from "formik";
import { Form as SemanticForm, Button, Grid, Message } from "semantic-ui-react";
import * as yup from "yup";
import _ from "lodash";

const Registration = ({ errors, touched, status, history }) => {
  const authContext = useContext(AuthContext);
  const { register, isAuthenticated, userInfo } = authContext;

  useEffect(() => {
    if (status) {
      register(status);
    }

    if (isAuthenticated) {
      if (userInfo && userInfo.userRoles.length > 1) {
        history.push("/dashboard");
      } else {
        const role = userInfo.userRoles[0].role.name;

        history.push(`/${role}/dashboard`);
      }
    }
    // eslint-disable-next-line
  }, [status]);

  return (
    <Grid container centered>
      <Grid.Column width={8}>
        <Form className="ui form">
          {!_.isEmpty(
            _.intersection(Object.keys(touched), Object.keys(errors))
          ) && (
            <Message
              icon="warning circle"
              header="There's some problems with the information below."
              negative
              list={_.intersection(
                Object.keys(touched),
                Object.keys(errors)
              ).map(key => errors[key])}
            />
          )}

          <SemanticForm.Field>
            <label>
              First Name
              <Field type="text" name="fname" />
            </label>
          </SemanticForm.Field>
          <SemanticForm.Field>
            <label>
              Last Name
              <Field type="text" name="lname" />
            </label>
          </SemanticForm.Field>
          <SemanticForm.Field>
            <label>
              Email
              <Field type="email" name="useremail" />
            </label>
          </SemanticForm.Field>
          <SemanticForm.Field>
            <label>
              Username
              <Field type="text" name="username" />
            </label>
          </SemanticForm.Field>
          <SemanticForm.Field>
            <label>
              Password
              <Field type="password" name="password" />
            </label>
          </SemanticForm.Field>
          <SemanticForm.Field>
            <label>
              Confirm Password
              <Field type="password" name="password2" />
            </label>
          </SemanticForm.Field>
          <Button primary type="submit">
            Register
          </Button>
        </Form>
      </Grid.Column>
    </Grid>
  );
};

const FormikRegistration = withFormik({
  mapPropsToValues: ({
    fname,
    lname,
    useremail,
    username,
    password,
    password2
  }) => {
    return {
      fname: fname || "",
      lname: lname || "",
      useremail: useremail || "",
      username: username || "",
      password: password || "",
      password2: password2 || ""
    };
  },

  validationSchema: yup.object().shape({
    fname: yup.string().required("You must provide your first name."),
    lname: yup.string().required("You must provide your last name."),
    useremail: yup
      .string()
      .required("You must provide an email.")
      .email("The email provided is not valid."),
    username: yup
      .string()
      .required("You must provide a username.")
      .min(5, "Your username must be at least 5 characters long."),
    password: yup
      .string()
      .required("You must provide a password.")
      .min(6, "Your password must be at least 6 characters long."),
    password2: yup
      .string()
      .required("You must confirm your password.")
      .oneOf([yup.ref("password")], "The passwords do not match.")
  }),

  handleSubmit: function(values, { resetForm, setStatus }) {
    setStatus(values);
    resetForm();
  }
})(Registration);

export default FormikRegistration;
