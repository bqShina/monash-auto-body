import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { RoleForm } from "./RoleForm";
import { ABNForm } from "./ABNForm";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { VehiclesData } from "../dataStructures/dataTemplate";
import { FormCheckInputProps } from "react-bootstrap/esm/FormCheckInput";

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
  const [isSameDriver, setIsSameDriver] = useState(
    fields.nameOwner === fields.nameDriver && fields.nameOwner !== ""
  );
  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsSameDriver(event.target.checked);
    console.log("check", isSameDriver);
  };
  // useEffect(() => {
  //   setIsSameDriver(false);
  // }, []);
  useEffect(() => {
    if (isSameDriver) {
      updateFields({
        dobDriver: fields.dobOwner,
        addressDriver: fields.addressOwner,
        contactNumDriver: fields.contactNumOwner,
        emailDriver: fields.emailOwner,
        expiryDateDriver: fields.expiryDateOwner,
        licenceNumDriver: fields.licenceNumOwner,
        nameDriver: fields.nameOwner,
      });
    }
    // else if (!editForm && !isSameDriver) {
    //   updateFields({
    //     dobDriver: "",
    //     addressDriver: "",
    //     contactNumDriver: "",
    //     emailDriver: "",
    //     expiryDateDriver: "",
    //     licenceNumDriver: "",
    //     nameDriver: "",
    //   });
    // }
  }, [isSameDriver]);
  return (
    <>
      <h2 className="form-title">
        {title}{" "}
        {thirdVehicle && <span className="optional-mark">(Optional)</span>}
      </h2>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Make, Model, Year{" "}
            {!thirdVehicle && !yourVehicle && (
              <span className="required">*</span>
            )}
          </label>
          <input
            autoFocus
            type="text"
            className="form-control"
            value={fields.model}
            onChange={(e) => updateFields({ model: e.target.value })}
            required={!thirdVehicle && !yourVehicle}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Vehicle Registration{" "}
            {!thirdVehicle && <span className="required">*</span>}
          </label>
          <input
            type="text"
            className="form-control"
            value={fields.vehicleRegistration}
            onChange={(e) =>
              updateFields({ vehicleRegistration: e.target.value })
            }
            required={!thirdVehicle}
            title="Please enter your vehicle registration"
          />
        </div>
      </div>
      {yourVehicle && <ABNForm fields={fields} updateFields={updateFields} />}
      <div className="mb-3">
        <span className="form-label">
          Insured?{" "}
          {!thirdVehicle && !yourVehicle && <span className="required">*</span>}
        </span>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="insured"
            value="Y"
            checked={fields.insured === "Y"}
            onChange={() => updateFields({ insured: "Y" })}
            required={!thirdVehicle && !yourVehicle}
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
            required={!thirdVehicle && !yourVehicle}
          />
          <label className="form-label">N</label>
        </div>
      </div>
      {fields.insured !== "N" && (
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Insurer (if Y){" "}
              {!thirdVehicle && !yourVehicle && (
                <span className="required">*</span>
              )}
            </label>
            <input
              type="text"
              className="form-control"
              value={fields.insurer}
              onChange={(e) => updateFields({ insurer: e.target.value })}
              required={!thirdVehicle && !yourVehicle}
            />
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">
              Claim & Policy No{" "}
              {!thirdVehicle && !yourVehicle && (
                <span className="required">*</span>
              )}
            </label>
            <input
              type="text"
              className="form-control"
              value={fields.insurerPolicyNum}
              onChange={(e) =>
                updateFields({ insurerPolicyNum: e.target.value })
              }
              required={!thirdVehicle && !yourVehicle}
            />
          </div>
        </div>
      )}

      {!thirdVehicle && (
        <>
          <RoleForm
            key={"owner"}
            role="Owner"
            isSameDriver={isSameDriver}
            yourVehicle={yourVehicle}
            thirdVehicle={thirdVehicle}
            fields={fields}
            updateFields={updateFields}
          />
          {/* {!editForm && ( */}
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              onChange={handleCheckboxChange}
              value=""
              id="flexCheckDefault"
              checked={isSameDriver}
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Driver's details are the same as owner's details.
            </label>
          </div>
          {/* )} */}
        </>
      )}
      {!isSameDriver && (
        <RoleForm
          key={"driver"}
          role="Driver"
          isSameDriver={isSameDriver}
          yourVehicle={yourVehicle}
          thirdVehicle={thirdVehicle}
          fields={fields}
          updateFields={updateFields}
        />
      )}
    </>
  );
};
