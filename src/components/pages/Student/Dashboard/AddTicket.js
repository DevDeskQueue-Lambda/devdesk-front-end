import React, { useContext } from "react";
import TicketContext from "../../../../context/ticket/ticketContext";
import { Formik } from "formik";
import StudentForm from "./StudentForm";
import { categories } from "../../../../utils/ticketCategories";
import * as Yup from "yup";

const AddTicket = () => {
  const ticketContext = useContext(TicketContext);
  const { addTicket } = ticketContext;

  return (
    <>
      <Formik
        initialValues={{
          title: "AWS API Gateway",
          description: "Infinite call",
          tried: "Console.log",
          category: []
        }}
        onSubmit={(values, actions) => {
          /* Work in progress */
          console.log(values);
          //   const category = categories.find(
          //     category => category.key === values.category
          //   );

          //addTicket(values);
        }}
        render={formikProps => (
          <StudentForm {...formikProps} helpCategories={categories} />
        )}
      />
    </>
  );
};

export default AddTicket;
