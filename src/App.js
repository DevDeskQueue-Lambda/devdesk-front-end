import React from "react";
// import { Route } from "react-router-dom";
import NewTicketForm from "./components/NewTicketForm";

import "./App.css";

export default function App() {
  return (
      <div className="App">
      {  /* <Route path="/" exact component={NewTicketForm} />*/}
        < NewTicketForm />

        </div>

  );
}
