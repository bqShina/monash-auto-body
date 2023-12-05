import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { AgreementData, VehiclesData } from "../dataStructures/dataTemplate";
import { SignatureInput } from "./SignatureInput";

interface Props {
  fields: AgreementData;
  ownerVehicle: VehiclesData;
  updateFields: (fields: Partial<AgreementData>) => void;
}

export const Agreement = ({ fields, ownerVehicle, updateFields }: Props) => {
  return (
    <>
      <h2 className="form-title">Legal Agreement</h2>
      <div className="mb-3">
        <p>
          I, <strong>{ownerVehicle.nameOwner}</strong> being the owner of the
          vehicle registration no.
          <strong>{ownerVehicle.vehicleRegistration}</strong> hereby authorise
          your firm to recover any claim for repair costs, hire car costs and
          associated losses arising from my recent motor vehicle accident and I
          appoint your firm as my legal practitioner.
        </p>
        <ol>
          <li>
            I am aware that legal proceedings may need to be issued in my name
            and I authorise this and agree to co-operate through the recovery
            process and to provide instructions in regards to the matter and
            sign any necessary documents when requested.
          </li>
          <li>
            I have been given access to and read the overarching obligations on
            me in accordance with s41 the Civil Procedure Act 2010 as set out in
            s16 to s26 of that Act and understand them.
          </li>
          <li>
            I have determined that I will not lodge a claim on my own insurer
            even though I have the right to do so.
          </li>
          <li>
            I have been informed by the repairer where my vehicle will be
            repaired that they will be responsible for any and all costs
            associated with any legal proceedings that may need to be issued to
            recover the repair costs, hire costs, assessor’s fee and associated
            losses.
          </li>
          <li>
            I authorise for my vehicle to be repaired at this repair shop and
            for you to pay my repairer from proceeds recovered, their invoiced
            costs, and any payment to assessor for fees, any legal fees and
            other associated fees in this matter as my instructing solicitor
            from your account.
          </li>
          <li>
            I have been given the opportunity to seek my own legal advice and/or
            to contact Linda Wang, Legal Practitioner on 03 8658 5995 to discuss
            this authority prior to my signing the same.
          </li>
        </ol>
        <p>
          Please visit our website at{" "}
          <a href="http://www.lwslawyers.com.au"> www.lwslawyers.com.au</a>{" "}
          under Motor Vehicle Accidents for further information regarding your
          motor vehicle claim and for a more information relating to your
          overarching obligations.
        </p>
        <p>
          <strong>
            I understand that there is no cost to me for this motor vehicle
            recovery action, unless I am otherwise advised.
          </strong>
        </p>
      </div>
      <div className="mb-3">
        <label className="form-label">Signature of Owner</label>
        <SignatureInput fields={fields} updateFields={updateFields} />
      </div>
    </>
  );
};
