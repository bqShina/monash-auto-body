import React, { useRef, useEffect, useState } from "react";
// @ts-ignore
import SignatureCanvas, { SignatureCanvasRef } from "react-signature-canvas";
import { AgreementData, RepairerData } from "../dataStructures/dataTemplate";

interface Props {
  fields: AgreementData | RepairerData;
  updateFields: (fields: Partial<AgreementData | RepairerData>) => void;
}
export const SignatureInput: React.FC<Props> = ({ fields, updateFields }) => {
  const [sign, setSign] = useState<SignatureCanvasRef | null>(null);
  const [showSign, setShowSign] = useState(fields.signature.length !== 0);

  const handleClear = () => {
    sign.clear();
  };

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  };

  const handleSave = () => {
    const signatureImage = sign.getTrimmedCanvas().toDataURL("image/png");
    console.log(signatureImage);
    updateFields({ signature: signatureImage });
    updateFields({ signDate: getCurrentDate() });
    setShowSign(true);
  };

  console.log(sign);

  return (
    <>
      {!showSign && (
        <>
          <div className="sign mb-3">
            <div className="signature-pad">
              <SignatureCanvas
                ref={(data) => setSign(data)}
                //   onEnd={handleCanvasChange}
                penColor="black"
                canvasProps={{
                  width: 400,
                  height: 150,
                  className: "sigCanvas",
                }}
              />
            </div>
            <button
              type="button"
              className="btn btn-light save-signature"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="btn btn-light clear-signature"
            >
              Clear
            </button>
          </div>
          <small className="warning">
            Remember to click 'Save' button or the signature will not be saved.
          </small>
        </>
      )}
      {showSign && (
        <div className="show-signature">
          <div className=" md-2 signature-pad sign-center">
            <img src={fields.signature} alt="signature" />
          </div>

          <p className="mt-2" style={{ fontSize: 14 }}>
            Signed on <strong>{fields.signDate}</strong>
          </p>
          <button
            type="button"
            className="btn btn-light save-signature"
            onClick={() => setShowSign(false)}
          >
            Edit
          </button>
        </div>
      )}
    </>
  );
};
