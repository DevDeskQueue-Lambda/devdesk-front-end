import React, { useContext } from "react";
import TicketContext from "../../../../context/ticket/ticketContext";
import { Formik } from "formik";
import StudentForm from "./StudentForm";
const EditTicket = props => {
  const ticketContext = useContext(TicketContext);
  const { categories, editTicket } = ticketContext;

  return (
    <>
      <Formik
        initialValues={{
          title: props.ticket.title,
          description: props.ticket.description,
          tried: props.ticket.tried,
          ticketCategories: props.ticket.ticketCategories.map(
            category => category.category.categoryid
          )
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
          values.ticketid = props.ticket.ticketid;
          editTicket(values);
          window.location.reload()
        }}
        render={formikProps => (
          <StudentForm {...formikProps} helpCategories={categories} />
        )}
      />
    </>
  );
};

export default EditTicket;
