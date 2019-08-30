import React, { useContext } from "react";
import TicketContext from "../../../../context/ticket/ticketContext";
import { Formik } from "formik";
import StudentForm from "./StudentForm";

const AddTicket = () => {
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
