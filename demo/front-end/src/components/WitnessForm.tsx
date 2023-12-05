import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { WitnessData } from "../dataStructures/dataTemplate";

interface Props {
  fields: WitnessData;
  updateFields: (fields: Partial<WitnessData>) => void;
}

export const WitnessForm = ({ fields, updateFields }: Props) => {
  return (
    <>
      <h2 className="form-title">
        Witness Details <span className="optional-mark">(Optional)</span>
      </h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            value={fields.witnessName}
            onChange={(e) => updateFields({ witnessName: e.target.value })}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Contact No / Mobile</label>
          <input
            type="text"
            className="form-control"
            value={fields.witnessMobile}
            onChange={(e) => updateFields({ witnessMobile: e.target.value })}
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Address</label>
        <input
          type="text"
          className="form-control"
          value={fields.address}
          onChange={(e) => updateFields({ address: e.target.value })}
        />
      </div>
    </>
  );
};
