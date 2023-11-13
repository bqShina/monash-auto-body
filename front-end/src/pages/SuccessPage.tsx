import React from "react";
import { NavBar } from "../components/global/NavBar";
import { Heading } from "../components/global/Heading";
import { Footer } from "../components/global/Footer";
import { SuccessContent } from "../components/SuccessContent";

export const SuccessPage = () => {
  return (
    <div>
      <NavBar />
      <Heading title="Client Form" />
      <SuccessContent />
      <Footer />
    </div>
  );
};
