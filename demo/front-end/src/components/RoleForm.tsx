import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { VehiclesData } from "../dataStructures/dataTemplate";

interface Props {
  role: string;
  isSameDriver: boolean;
  yourVehicle: boolean;
  thirdVehicle: boolean;
  fields: VehiclesData;
  updateFields: (fields: Partial<VehiclesData>) => void;
}

export const RoleForm = ({
  role,
  isSameDriver,
  yourVehicle,
  thirdVehicle,
  fields,
  updateFields,
}: Props) => {
  const isDriver = role === "Driver";
  return (
    <>
      <div className="hr-container">
        <hr />
        <span className="hr-title">{role} Details</span>
        <hr />
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">
            {role} Name {!thirdVehicle && <span className="required">*</span>}
          </label>
          <input
            type="text"
            className="form-control"
            value={isDriver ? fields.nameDriver : fields.nameOwner}
            onChange={(e) => {
              if (isSameDriver) {
                updateFields({
                  nameDriver: e.target.value,
                  nameOwner: e.target.value,
                });
              } else {
                isDriver
                  ? updateFields({ nameDriver: e.target.value })
                  : updateFields({ nameOwner: e.target.value });
              }
            }}
            required={!thirdVehicle}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">
            {role} Contact No / Mobile{" "}
            {!thirdVehicle && <span className="required">*</span>}
          </label>
          <input
            type="text"
            className="form-control"
            value={isDriver ? fields.contactNumDriver : fields.contactNumOwner}
            onChange={(e) => {
              if (isSameDriver) {
                updateFields({
                  contactNumDriver: e.target.value,
                  contactNumOwner: e.target.value,
                });
              } else {
                isDriver
                  ? updateFields({
                      contactNumDriver: e.target.value,
                    })
                  : updateFields({
                      contactNumOwner: e.target.value,
                    });
              }
            }}
            required={!thirdVehicle}
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">
          {role} Address {!thirdVehicle && <span className="required">*</span>}
        </label>
        <input
          type="text"
          className="form-control"
          value={isDriver ? fields.addressDriver : fields.addressOwner}
          onChange={(e) => {
            if (isSameDriver) {
              updateFields({
                addressDriver: e.target.value,
                addressOwner: e.target.value,
              });
            } else {
              isDriver
                ? updateFields({ addressDriver: e.target.value })
                : updateFields({ addressOwner: e.target.value });
            }
          }}
          required={!thirdVehicle}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">{role} Email</label>
        <input
          type="email"
          className="form-control"
          value={isDriver ? fields.emailDriver : fields.emailOwner}
          onChange={(e) => {
            if (isSameDriver) {
              updateFields({
                emailDriver: e.target.value,
                emailOwner: e.target.value,
              });
            } else {
              isDriver
                ? updateFields({ emailDriver: e.target.value })
                : updateFields({ emailOwner: e.target.value });
            }
          }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="datePicker" className="form-label">
          Date of Birth{" "}
          {!thirdVehicle && !yourVehicle && <span className="required">*</span>}
        </label>
        <input
          type="date"
          className="form-control"
          id="datePicker"
          value={isDriver ? fields.dobDriver : fields.dobOwner}
          onChange={(e) => {
            if (isSameDriver) {
              updateFields({
                dobDriver: e.target.value,
                dobOwner: e.target.value,
              });
            } else {
              isDriver
                ? updateFields({ dobDriver: e.target.value })
                : updateFields({ dobOwner: e.target.value });
            }
          }}
          required={!thirdVehicle && !yourVehicle}
        />
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Licence No{" "}
            {!thirdVehicle && !yourVehicle && (
              <span className="required">*</span>
            )}
          </label>
          <input
            type="text"
            className="form-control"
            value={isDriver ? fields.licenceNumDriver : fields.licenceNumOwner}
            onChange={(e) => {
              if (isSameDriver) {
                updateFields({
                  licenceNumDriver: e.target.value,
                  licenceNumOwner: e.target.value,
                });
              } else {
                isDriver
                  ? updateFields({ licenceNumDriver: e.target.value })
                  : updateFields({ licenceNumOwner: e.target.value });
              }
            }}
            required={!thirdVehicle && !yourVehicle}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">
            Expiry Date{" "}
            {!thirdVehicle && !yourVehicle && (
              <span className="required">*</span>
            )}
          </label>
          <input
            type="date"
            className="form-control"
            value={isDriver ? fields.expiryDateDriver : fields.expiryDateOwner}
            onChange={(e) => {
              if (isSameDriver) {
                updateFields({
                  expiryDateDriver: e.target.value,
                  expiryDateOwner: e.target.value,
                });
              } else {
                isDriver
                  ? updateFields({ expiryDateDriver: e.target.value })
                  : updateFields({ expiryDateOwner: e.target.value });
              }
            }}
            required={!thirdVehicle && !yourVehicle}
          />
        </div>
      </div>
    </>
  );
};
