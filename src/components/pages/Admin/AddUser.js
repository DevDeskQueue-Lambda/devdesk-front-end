import React, {  useContext, useEffect } from 'react'
import { Form, Modal, Button } from 'semantic-ui-react'
// import { withFormik, Form, Field } from "formik";
// import React, { useContext, useEffect } from "react";
import AdminContext from "../../../../context/admin/adminContext";
import { axiosWithAuth } from '../../../../utils';


const NewUser = () => {
    const adminContext = useContext(AdminContext);
    const [newUsers, setNewUsers] = useState();

    useEffect(() => {
        axiosWithAuth().post(`/register`, {
            user.username:" ",
            user.password:"",
            user.fname:" ",
            user.lname:"",
            user.useremail:""
            }
        )
          .then    (response => {
            console.log(response.data);
            // newUsers(response.data);
          });
          .catch(error =>{
            console.log(error);
          }
      }, []);


    return (
      <Modal trigger={<Button content="Add New User" />} closeIcon>
        <Modal.Header>Add New User</Modal.Header>
        <Modal.Content>
          <Form onSubmit={this.handleSubmit}>
            <Form.Field>
              <Form.Input
                label="First Name"
                name="First name"
                value={fname}
                onChange={this.handleChange}
                autoFocus={true}
              />
            </Form.Field>
            <Form.Input
                label="Last Name"
                name="Last name"
                value={lname}
                onChange={this.handleChange}
                autoFocus={true}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Username"
                name="username"
                value={username}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                label="Email"
                name="Email"
                value={useremail}
                onChange={this.handleChange}
              />
            </Form.Field>
            </Form.Field>
            <Button type="submit" content="Submit" disabled={!name || !username} />
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

export default NewUser
