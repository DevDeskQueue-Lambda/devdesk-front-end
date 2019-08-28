import React from "react";
import { Form } from "semantic-ui-react";

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
          <label htmlFor="category">Help Categories</label>
          <Form.Select
            multiple
            placeholder="Select a help category"
            selection
            options={helpCategories}
            name="category"
            onChange={e => setFieldValue("category", e.target.selectedOptions)}
          />
        </Form.Field>

        <Form.Button type="submit">Submit</Form.Button>
      </Form>
    </>
  );
};

export default StudentForm;
