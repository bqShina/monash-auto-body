import React from "react";
import { Link, useLoaderData, useLocation } from "react-router-dom";

export const SuccessContent = () => {
  const location = useLocation();
  const editForm = location.state;
  console.log(editForm);
  return (
    <>
      <div className="container flex-fill success-container">
        <div className="text-center">
          <h1 className="display-4 text-success mb-4">Thank You!</h1>
          <p className="lead">
            You have successfully{" "}
            {editForm ? "updated this record" : "submitted the form"}.
          </p>
          {editForm ? (
            <Link to="/records" className="btn btn-primary mt-3">
              Back to All Records
            </Link>
          ) : (
            <Link to="/" className="btn btn-primary mt-3">
              Submit Another Form
            </Link>
          )}
        </div>
      </div>
    </>
  );
};
