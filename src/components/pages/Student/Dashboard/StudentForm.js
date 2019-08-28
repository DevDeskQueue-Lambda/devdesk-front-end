import React from "react";
import { Form } from "semantic-ui-react";
import { Field } from "formik";

const StudentForm = ({
  handleChange,
  handleSubmit,
  values,
  helpCategories,
  setFieldValue
}) => {
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label htmlFor="title">Title</label>
          <Form.Input
            name="title"
            onChange={handleChange}
            value={values.title}
          ></Form.Input>
        </Form.Field>
        <Form.Field>
          <label htmlFor="title">Description</label>
          <Form.Input
            name="description"
            onChange={handleChange}
            value={values.description}
          ></Form.Input>
        </Form.Field>
        <Form.Field>
          <label htmlFor="title">Tried</label>
          <Form.Input
            name="tried"
            onChange={handleChange}
            value={values.tried}
          ></Form.Input>
        </Form.Field>

        <Form.Field>
          <label htmlFor="ticketCategories">Ticket Categories</label>
          <Field
            component="select"
            name="ticketCategories"
            onChange={event =>
              setFieldValue(
                "ticketCategories",
                [].slice
                  .call(event.target.selectedOptions)
                  .map(option => option.value)
              )
            }
            multiple={true}
          >
            {helpCategories.map(category => (
              <option key={category.categoryid} value={category.categoryid}>
                {category.name}
              </option>
            ))}
          </Field>
        </Form.Field>

        <Form.Button type="submit">Submit</Form.Button>
      </Form>
    </>
  );
};

export default StudentForm;
