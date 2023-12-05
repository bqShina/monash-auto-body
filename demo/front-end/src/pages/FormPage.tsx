import React from "react";
import { Form } from "../components/Form";
import { Heading } from "../components/global/Heading";
import { NavBar } from "../components/global/NavBar";
import { Footer } from "../components/global/Footer";

export const FormPage = () => {
  return (
    <>
      <NavBar />
      <Heading title="Client Form" />
      <Form />
      <Footer />
    </>
  );
};
