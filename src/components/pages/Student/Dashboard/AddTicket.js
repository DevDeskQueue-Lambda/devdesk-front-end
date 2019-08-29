import React, { useContext, useEffect } from "react";
import TicketContext from "../../../../context/ticket/ticketContext";
import { Formik } from "formik";
import StudentForm from "./StudentForm";

import * as Yup from "yup";

const AddTicket = () => {
  const ticketContext = useContext(TicketContext);
  const { addTicket, fetchAllCategories, categories } = ticketContext;
  console.log('ticketContext', ticketContext);
  useEffect(() => {
    fetchAllCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Formik
        initialValues={{
          title: "AWS API Gateway",
          description: "Infinite call",
          tried: "Console.log",
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

          // console.log('values in submit', values);

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
