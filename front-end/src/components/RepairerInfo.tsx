import React, { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { SignatureInput } from "./SignatureInput";
import { RepairerData } from "../dataStructures/dataTemplate";

interface Props {
  fields: RepairerData;
  updateFields: (fields: Partial<RepairerData>) => void;
}

export const RepairerInfo = ({ fields, updateFields }: Props) => {
  const [repairName, setRepairName] = useState("Monash Auto Body");
  const [signature, setSignature] = useState(""); // State to store the signature image data

  const handleSignatureChange = (value: string) => {
    setSignature(value); // Update the signature state when the user signs
  };
  return (
    <>
      <h2 className="form-title">Repair Confirmation</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Referring Repairer</label>
          <input
            type="text"
            className="form-control"
            value={fields.referringRepairer}
            onChange={(e) =>
              updateFields({ referringRepairer: e.target.value })
            }
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Contact No</label>
          <input
            type="text"
            className="form-control"
            value={fields.repairerContact}
            onChange={(e) => updateFields({ repairerContact: e.target.value })}
          />
        </div>
      </div>
      <div className="mb-3">
        <p className="repair-confirm-content">
          <strong>
            {fields.referringRepairer} confirms that this matter is referred to
            LWS Lawyers Pty Ltd for this motor vehicle recovery action.
          </strong>
        </p>
      </div>

      <div className="mb-3">
        <label className="form-label">Signature of Repairer</label>
        <SignatureInput fields={fields} updateFields={updateFields} />
      </div>
    </>
  );
};
