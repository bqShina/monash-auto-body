import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { VehiclesData } from "../dataStructures/dataTemplate";

interface Props {
  fields: VehiclesData;
  updateFields: (fields: Partial<VehiclesData>) => void;
}

export const ABNForm = ({ fields, updateFields }: Props) => {
  return (
    <>
      <div className="mb-3">
        <span className="form-label">GST Registered:</span>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="GST-registered"
            value="Y"
            checked={fields.GstRegistered === "Y"}
            onChange={() => updateFields({ GstRegistered: "Y" })}
          />
          <label className="form-label">Y</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="GST-registered"
            value="N"
            checked={fields.GstRegistered === "N"}
            onChange={() => updateFields({ GstRegistered: "N" })}
          />
          <label className="form-label">N</label>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">ABN (if company vehicle)</label>
        <input
          type="text"
          className="form-control"
          value={fields.AbnNumber}
          onChange={(e) => updateFields({ AbnNumber: e.target.value })}
        />
      </div>
    </>
  );
};
