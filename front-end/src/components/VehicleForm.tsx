import React, { Dispatch, SetStateAction, useState } from "react";
import { RoleForm } from "./RoleForm";
import { ABNForm } from "./ABNForm";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { VehiclesData } from "../dataStructures/dataTemplate";

interface Props {
  title: string;
  yourVehicle: boolean;
  thirdVehicle: boolean;
  fields: VehiclesData;
  updateFields: (fields: Partial<VehiclesData>) => void;
}

export const VehicleForm = ({
  title,
  yourVehicle,
  thirdVehicle,
  fields,
  updateFields,
}: Props) => {
  // console.log(title, fields);
  return (
    <>
      <h2 className="form-title">
        {title}{" "}
        {thirdVehicle && <span className="optional-mark">(Optional)</span>}
      </h2>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Make, Model, Year</label>
          <input
            autoFocus
            type="text"
            className="form-control"
            value={fields.model}
            onChange={(e) => updateFields({ model: e.target.value })}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Vehicle Registration</label>
          <input
            type="text"
            className="form-control"
            value={fields.vehicleRegistration}
            onChange={(e) =>
              updateFields({ vehicleRegistration: e.target.value })
            }
          />
        </div>
      </div>
      {yourVehicle && <ABNForm fields={fields} updateFields={updateFields} />}
      <div className="mb-3">
        <span className="form-label">Insured?</span>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="insured"
            value="Y"
            checked={fields.insured === "Y"}
            onChange={() => updateFields({ insured: "Y" })}
          />
          <label className="form-label">Y</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="insured"
            value="N"
            checked={fields.insured === "N"}
            onChange={() => updateFields({ insured: "N" })}
          />
          <label className="form-label">N</label>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Insurer (if Y)</label>
          <input
            type="text"
            className="form-control"
            value={fields.insurer}
            onChange={(e) => updateFields({ insurer: e.target.value })}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Claim & Policy No</label>
          <input
            type="text"
            className="form-control"
            value={fields.insurerPolicyNum}
            onChange={(e) => updateFields({ insurerPolicyNum: e.target.value })}
          />
        </div>
      </div>

      {!thirdVehicle && (
        <RoleForm role="Owner" fields={fields} updateFields={updateFields} />
      )}
      <RoleForm role="Driver" fields={fields} updateFields={updateFields} />
    </>
  );
};
