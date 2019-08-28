import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import StudentForm from "./StudentForm";
const EditTicket = props => {
  return (
    <>
      <Formik
        initialValues={{
          title: props.title,
          description: props.description,
          tried: props.tried,
          category: props.category
        }}
        onSubmit={(values, actions) => {}}
        render={formikProps => <StudentForm {...formikProps} />}
      />
    </>
  );
};

export default EditTicket;
