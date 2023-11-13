import React from "react";

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
