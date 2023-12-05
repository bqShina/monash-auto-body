import React from "react";
import { Link } from "react-router-dom";

interface Props {
  title: string;
}

export const Heading = ({ title }: Props) => {
  return (
    <>
      <section className="heading">
        <h1>{title}</h1>
      </section>
    </>
  );
};
