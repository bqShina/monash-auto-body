import React from "react";
import { Heading } from "../components/global/Heading";
import { NavBar } from "../components/global/NavBar";
import { Footer } from "../components/global/Footer";
import { ClientTable } from "../components/ClientTable";

export const RecordsPage = () => {
  return (
    <>
      <NavBar />
      <Heading title="Client records" />
      <ClientTable />
      <Footer />
    </>
  );
};
