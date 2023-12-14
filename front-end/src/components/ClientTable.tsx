import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteRecord,
  generateRecordPDF,
  getRecords,
} from "../dataStructures/repository";
import { Record } from "../dataStructures/dataTemplate";

export const ClientTable = () => {
  const [clientList, setClientList] = useState<Record[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const fetchRecords = () => {
    getRecords().then((data) => setClientList(data));
  };
  useEffect(() => {
    fetchRecords();
  }, []);

  const onDelete = (id: string) => {
    deleteRecord(id);
    setShowAlert(true);
    // fetchRecords();
    setTimeout(() => {
      fetchRecords();
      setShowAlert(false);
    }, 2000);
  };

  const handlePDFGenerate = async (id: string) => {
    // Make an HTTP request to generate the PDF
    const response = await generateRecordPDF(id);
    console.log(response);
  };

  const handleClick = (client: Record) => {
    // navigate("/update", { state: client });
    navigate(`/update/${client._id}`);
  };
  return (
    <>
      {console.log(clientList)}
      <div className="container mt-3 client-table">
        {showAlert && (
          <div className="alert alert-primary" role="alert">
            You have deleted the record successfully
          </div>
        )}

        <Link
          to="https://docs.google.com/spreadsheets/d/1ojo97472vg-djrLTpqYTQs7uKHF__AK3CpQQx1C0YVw/edit#gid=0"
          target="_blank"
        >
          <button className="btn btn-outline-dark btn-sm mb-3">
            Google Sheet
          </button>
        </Link>
        <div className="row justify-content-center">
          <div className="col-md-12">
            {clientList.length === 0 ? (
              <p className="no-records">No records added yet</p>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Owner Name</th>
                    <th>Model</th>
                    <th>Vehicle Registration</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {clientList.map((client, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{client.vehicleDetails.nameOwner}</td>
                      <td>{client.vehicleDetails.model}</td>
                      <td>{client.vehicleDetails.vehicleRegistration}</td>
                      <td>
                        {/* <div className="btn-group" role="group"> */}
                        {/* <Link to={`update/${client._id}`}> */}
                        <button
                          className="btn btn-outline-primary btn-sm table-btn"
                          onClick={() => handleClick(client)}
                        >
                          View
                        </button>
                        {/* </Link> */}

                        <button
                          className="btn btn-outline-info btn-sm table-btn"
                          onClick={() => handlePDFGenerate(client._id)}
                        >
                          PDF
                        </button>

                        <button
                          className="btn btn-outline-danger btn-sm table-btn"
                          onClick={() => onDelete(client._id)}
                        >
                          Delete
                        </button>
                        {/* </div> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
