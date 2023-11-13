import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { VehiclesData } from "../dataStructures/dataTemplate";

interface Props {
  role: string;
  fields: VehiclesData;
  updateFields: (fields: Partial<VehiclesData>) => void;
}

export const RoleForm = ({ role, fields, updateFields }: Props) => {
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
          <label className="form-label">{role} Name</label>
          <input
            type="text"
            className="form-control"
            value={isDriver ? fields.nameDriver : fields.nameOwner}
            onChange={(e) =>
              isDriver
                ? updateFields({ nameDriver: e.target.value })
                : updateFields({ nameOwner: e.target.value })
            }
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">{role} Contact No / Mobile</label>
          <input
            type="text"
            className="form-control"
            value={isDriver ? fields.contactNumDriver : fields.contactNumOwner}
            onChange={(e) =>
              isDriver
                ? updateFields({ contactNumDriver: e.target.value })
                : updateFields({ contactNumOwner: e.target.value })
            }
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">{role} Address</label>
        <input
          type="text"
          className="form-control"
          value={isDriver ? fields.addressDriver : fields.addressOwner}
          onChange={(e) =>
            isDriver
              ? updateFields({ addressDriver: e.target.value })
              : updateFields({ addressOwner: e.target.value })
          }
        />
      </div>

      <div className="mb-3">
        <label className="form-label">{role} Email</label>
        <input
          type="text"
          className="form-control"
          value={isDriver ? fields.emailDriver : fields.emailOwner}
          onChange={(e) =>
            isDriver
              ? updateFields({ emailDriver: e.target.value })
              : updateFields({ emailOwner: e.target.value })
          }
        />
      </div>
      <div className="mb-3">
        <label htmlFor="datePicker" className="form-label">
          Date of Birth
        </label>
        <input
          type="date"
          className="form-control"
          id="datePicker"
          value={isDriver ? fields.dobDriver : fields.dobOwner}
          onChange={(e) =>
            isDriver
              ? updateFields({ dobDriver: e.target.value })
              : updateFields({ dobOwner: e.target.value })
          }
        />
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Licence No</label>
          <input
            type="text"
            className="form-control"
            value={isDriver ? fields.licenceNumDriver : fields.licenceNumOwner}
            onChange={(e) =>
              isDriver
                ? updateFields({ licenceNumDriver: e.target.value })
                : updateFields({ licenceNumOwner: e.target.value })
            }
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Expiry Date</label>
          <input
            type="date"
            className="form-control"
            value={isDriver ? fields.expiryDateDriver : fields.expiryDateOwner}
            onChange={(e) =>
              isDriver
                ? updateFields({ expiryDateDriver: e.target.value })
                : updateFields({ expiryDateOwner: e.target.value })
            }
          />
        </div>
      </div>
    </>
  );
};
