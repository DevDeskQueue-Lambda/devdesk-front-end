import React, { useContext, useEffect } from "react";
import TicketContext from "../../../../context/ticket/ticketContext";
import { Formik } from "formik";
import * as Yup from "yup";
import StudentForm from "./StudentForm";
const EditTicket = props => {
  const ticketContext = useContext(TicketContext);
  const { fetchAllCategories, categories } = ticketContext;

  useEffect(() => {
    fetchAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
        render={formikProps => (
          <StudentForm {...formikProps} helpCategories={categories} />
        )}
      />
    </>
  );
};

export default EditTicket;
