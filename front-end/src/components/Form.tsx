import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useMultistepForm } from "./useMultistepForm";
import { VehicleForm } from "./VehicleForm";
import { WitnessForm } from "./WitnessForm";
import { AccidentInfo } from "./AccidentInfo";
import { RepairerInfo } from "./RepairerInfo";
import { Agreement } from "./Agreement";
import { Record, FormState } from "../dataStructures/dataTemplate";
import { initialFields } from "../dataStructures/dataInitial";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  addRecord,
  saveRecordIntoGoogleSheet,
  updateRecord,
} from "../dataStructures/repository";

type FormFields<T> = {
  fields: T;
  updateFields: (newFields: Partial<T>) => void;
};

const FORMNAMES = [
  "vehicleDetails",
  "offendingVehicle",
  "thirdVehicle",
  "witnessDetails",
  "accidentDetails",
  "repairConfirmation",
  "legalAgreement",
];

function useFormFields<T>(initialState: T): FormFields<T> {
  const [fields, setFields] = useState<T>(initialState);

  const updateFields = (newFields: Partial<T>): void => {
    setFields((prevFields) => ({ ...prevFields, ...newFields }));
  };

  return { fields, updateFields };
}

const setupLocalStorage = (initialField: Record | FormState) => {
  for (let i = 0; i < FORMNAMES.length; i++) {
    const fieldName = FORMNAMES[i];
    if (fieldName in initialField) {
      // Use type assertion here
      const fieldValue = (initialField as any)[fieldName];
      localStorage.setItem(fieldName, JSON.stringify(fieldValue));
    }
  }
};

// const setupLocalStorage = (initialField: Record | FormState) => {
//   for (let i = 0; i < FORMNAMES.length; i++) {
//     localStorage.setItem(
//       FORMNAMES[i],
//       JSON.stringify(initialField[FORMNAMES[i]])
//     );
//   }
// };

export const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const passedData = location.state;

  const editForm = passedData !== null;
  // let initialField: Record | FormState = initialFields;
  let initialField: Record | FormState = initialFields;

  // const fetchData = async () => {
  if (editForm) {
    initialField = passedData;
  } else {
    setupLocalStorage(initialField);
  }
  if (editForm || !localStorage.getItem("vehicleDetails")) {
    setupLocalStorage(initialField);
  }
  const getItemFromLocalStorage = (key: string) => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  };

  const { fields: fields1, updateFields: updateFields1 } = useFormFields(
    getItemFromLocalStorage(FORMNAMES[0])
  );
  const { fields: fields2, updateFields: updateFields2 } = useFormFields(
    getItemFromLocalStorage(FORMNAMES[1])
  );
  const { fields: fields3, updateFields: updateFields3 } = useFormFields(
    getItemFromLocalStorage(FORMNAMES[2])
  );
  const { fields: fields4, updateFields: updateFields4 } = useFormFields(
    getItemFromLocalStorage(FORMNAMES[3])
  );
  const { fields: fields5, updateFields: updateFields5 } = useFormFields(
    getItemFromLocalStorage(FORMNAMES[4])
  );
  const { fields: fields6, updateFields: updateFields6 } = useFormFields(
    getItemFromLocalStorage(FORMNAMES[5])
  );
  const { fields: fields7, updateFields: updateFields7 } = useFormFields(
    getItemFromLocalStorage(FORMNAMES[6])
  );

  const { steps, currentStepIndex, step, isFirstStep, isLastStep, back, next } =
    useMultistepForm([
      <VehicleForm
        key={"yourVehicle"}
        title="Your Vehicle Details"
        // editForm={editForm}
        yourVehicle={true}
        thirdVehicle={false}
        fields={fields1}
        updateFields={updateFields1}
      />,
      <VehicleForm
        key={"offendingVehicle"}
        title="Offending Vehicle Details"
        // editForm={editForm}
        yourVehicle={false}
        thirdVehicle={false}
        fields={fields2}
        updateFields={updateFields2}
      />,
      <VehicleForm
        key={"thirdVehicle"}
        title="Third Vehicle Details"
        // editForm={editForm}
        yourVehicle={false}
        thirdVehicle={true}
        fields={fields3}
        updateFields={updateFields3}
      />,
      <WitnessForm fields={fields4} updateFields={updateFields4} />,
      <AccidentInfo fields={fields5} updateFields={updateFields5} />,
      <RepairerInfo fields={fields6} updateFields={updateFields6} />,
      <Agreement
        fields={fields7}
        ownerVehicle={fields1}
        updateFields={updateFields7}
      />,
    ]);
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    switch (currentStepIndex) {
      case 0:
        localStorage.setItem(FORMNAMES[0], JSON.stringify(fields1));
        break;
      case 1:
        localStorage.setItem(FORMNAMES[1], JSON.stringify(fields2));
        break;
      case 2:
        localStorage.setItem(FORMNAMES[2], JSON.stringify(fields3));
        break;
      case 3:
        localStorage.setItem(FORMNAMES[3], JSON.stringify(fields4));
        break;
      case 4:
        localStorage.setItem(FORMNAMES[4], JSON.stringify(fields5));
        break;
      case 5:
        localStorage.setItem(FORMNAMES[5], JSON.stringify(fields6));
        break;
      case 6:
        localStorage.setItem(FORMNAMES[6], JSON.stringify(fields7));
        break;
    }
    // localStorage.setItem("clients", JSON.stringify(fields));

    // if (currentStepIndex === 7) {

    if (currentStepIndex === 6) {
      const FINAL_DATA: FormState = {
        vehicleDetails: fields1,
        offendingVehicle: fields2,
        thirdVehicle: fields3,
        witnessDetails: fields4,
        accidentDetails: fields5,
        repairConfirmation: fields6,
        legalAgreement: fields7,
      };

      if (!editForm) {
        addRecord(FINAL_DATA);
        saveRecordIntoGoogleSheet(FINAL_DATA);
      } else {
        updateRecord(FINAL_DATA, passedData._id);
        // saveRecordIntoGoogleSheet(FINAL_DATA);
      }

      setupLocalStorage(initialFields);
      // localStorage.clear();
      navigate("/success", { state: editForm });
    } else {
      next();
    }
  };
  return (
    <>
      <div className="wrapper">
        <form className="fill-table" onSubmit={onSubmit}>
          <div className="page-number">
            {currentStepIndex + 1} / {steps.length}
          </div>

          {step}
          <div className="button-area">
            {!isFirstStep && (
              <button type="button" className="btn btn-primary" onClick={back}>
                Back
              </button>
            )}
            <button type="submit" className="btn btn-primary">
              {isLastStep ? (editForm ? "Update" : "Submit") : "Next"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
