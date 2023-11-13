import React, { ChangeEvent, useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { AccidentData } from "../dataStructures/dataTemplate";

interface Props {
  fields: AccidentData;
  updateFields: (fields: Partial<AccidentData>) => void;
}

export const AccidentInfo = ({ fields, updateFields }: Props) => {
  const [imagePreviews, setImagePreviews] = useState(fields.accidentCarImage);

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // Get the selected files

    // Create an array to store image previews
    const previews: string[] = [];

    // Iterate through the selected files
    if (files !== null) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        // Read the file as a data URL
        reader.readAsDataURL(file);

        reader.onload = () => {
          const dataURL = reader.result as string;
          previews.push(dataURL);

          // Set the selected files and their previews in state
          updateFields({ accidentCarImage: previews });

          // Save the image previews to local storage as Base64 data URLs
          // localStorage.setItem("imagePreviews", JSON.stringify(previews));

          setImagePreviews(previews);
        };
      }
    }
  };

  return (
    <>
      <h2 className="form-title">Accident Details</h2>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label className="form-label">Date</label>
          <input
            type="date"
            className="form-control"
            value={fields.accidentDate}
            onChange={(e) => updateFields({ accidentDate: e.target.value })}
          />
        </div>
        <div className="col-md-6 mb-3">
          <label className="form-label">Time</label>
          <input
            type="time"
            className="form-control"
            value={fields.accidentTime}
            onChange={(e) => updateFields({ accidentTime: e.target.value })}
          />
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Place</label>
        <input
          type="text"
          className="form-control"
          value={fields.accidentPlace}
          onChange={(e) => updateFields({ accidentPlace: e.target.value })}
        />
      </div>
      <div className="form-floating mb-3">
        <textarea
          className="form-control"
          placeholder="Description"
          id="floatingTextarea2"
          style={{ height: "100px" }}
          value={fields.accidentDescription}
          onChange={(e) =>
            updateFields({ accidentDescription: e.target.value })
          }
        ></textarea>
        <label htmlFor="floatingTextarea2">Description</label>
      </div>
      <div className="mb-3">
        <label htmlFor="imageInput" className="form-label">
          Damaged Areas of Your Vehicle (Only accept landscape and small-size
          pictures)
        </label>
        {fields.accidentCarImage?.length !== 0 && (
          <div className="image-gallery">
            {fields.accidentCarImage?.map((image, index) => (
              <div className="mb-2" key={index}>
                <img
                  src={image}
                  alt={`Preview ${index}`}
                  className="img-thumbnail"
                ></img>
              </div>
            ))}
            <span style={{ color: "red", fontSize: 14 }}>
              * Upload again will overwrite those images above
            </span>
          </div>
        )}
        <input
          type="file"
          className="form-control"
          id="imageInput"
          accept="image/*"
          capture="environment"
          multiple
          onChange={handleFileInputChange}
        />
      </div>
      <div className="mb-3">
        <span className="form-label">Reported to police?</span>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="report-police"
            value="Y"
            checked={fields.reportedPolice === "Y"}
            onChange={() => updateFields({ reportedPolice: "Y" })}
          />
          <label className="form-label">Y</label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="report-police"
            value="N"
            checked={fields.reportedPolice === "N"}
            onChange={() => updateFields({ reportedPolice: "N" })}
          />
          <label className="form-label">N</label>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Police Station (if Y)</label>
        <input
          type="text"
          className="form-control"
          value={fields.policeStation}
          onChange={(e) => updateFields({ policeStation: e.target.value })}
        />
      </div>
    </>
  );
};
