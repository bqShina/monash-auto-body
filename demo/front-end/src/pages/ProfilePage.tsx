import React from "react";
import { NavBar } from "../components/global/NavBar";
import { Heading } from "../components/global/Heading";
import { Footer } from "../components/global/Footer";
import { ProfileDetails } from "../components/ProfileDetails";

export const ProfilePage = () => {
  return (
    <>
      <NavBar />
      <Heading title="Welcome to Monash Auto Body" />
      <ProfileDetails />
      <Footer />
    </>
  );
};
