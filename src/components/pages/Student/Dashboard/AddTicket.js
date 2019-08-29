import React, { useContext, useEffect } from "react";
import TicketContext from "../../../../context/ticket/ticketContext";
import { Formik } from "formik";
import StudentForm from "./StudentForm";

import * as Yup from "yup";

const AddTicket = props => {
  const ticketContext = useContext(TicketContext);
  const { addTicket, categories } = ticketContext;

  return (
    <>
      <Formik
        initialValues={{
          title: "",
          description: "",
          tried: "",
          ticketCategories: []
        }}
        onSubmit={(values, actions) => {
          const tempArray = values.ticketCategories.map(ticketCategory => {
            const matchCategory = categories.find(
              category => category.categoryid === parseInt(ticketCategory)
            );

            return {
              category: matchCategory
            };
          });
          values.ticketCategories = tempArray;

          addTicket(values);
        }}
        render={formikProps => (
          <StudentForm {...formikProps} helpCategories={categories} />
        )}
      />
    </>
  );
};

export default AddTicket;
