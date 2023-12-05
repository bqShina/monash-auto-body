const path = require("path");
const PDFDocument = require("pdfkit");
const fs = require("fs");
const logoPath = path.join(__dirname, "images", "logo.png");
const logo = fs.readFileSync(logoPath);

// const logo = fs.readFileSync("./images/logo.png");
// Constants
const bodySize = 11;
const gap = 0.1;
const middlePostion = 285;

const convertDateFormat = (inputDate) => {
  if (inputDate === "") return "";
  const parts = inputDate.split("-");

  // Check if the input format is valid (yyyy-mm-dd with 3 parts)
  if (parts.length !== 3) {
    return "Invalid Date Format";
  }

  // Rearrange the date parts in "dd/mm/yyyy" format
  const dd = parts[2];
  const mm = parts[1];
  const yyyy = parts[0];

  // Create the new date format
  const outputDate = `${dd}/${mm}/${yyyy}`;

  return outputDate;
};
const convertTimeFormat = (inputTime) => {
  // Split the input time string by ":"
  const parts = inputTime.split(":");

  // Check if the input format is valid (hh:mm with 2 parts)
  if (parts.length !== 2) {
    return "Invalid Time Format";
  }

  // Parse hours and minutes
  const hours = parseInt(parts[0], 10);
  const minutes = parts[1];

  // Determine am or pm
  const period = hours >= 12 ? "pm" : "am";

  // Convert to 12-hour format
  const convertedHours = hours % 12 || 12;

  // Create the new time format
  const outputTime = `${convertedHours}:${minutes} ${period}`;

  return outputTime;
};

const subHeading = (doc, title, positionX, positionY) => {
  doc.font("Times-Bold").fontSize(bodySize).text(title, positionX, positionY);
  positionY = doc.y;
  doc.strokeColor("gray");
  doc.moveTo(positionX, positionY).lineTo(580, positionY).stroke();
};

const orderedList = (doc, number, content, positionX, positionY) => {
  doc
    .font("Times-Roman")
    .lineGap(3)
    .text(`${number}.`, positionX + 18, positionY);
  doc.text(content, positionX + 30, positionY);
};
const vehiclePdf = (doc, vehicle, vehicleType, positionX, positionY) => {
  positionY = changeLine(0.7, doc);
  doc.font("Times-Roman").text("Make, Model, Year: ", positionX, positionY);
  doc.font("Times-Bold").text(vehicle.model, positionX + 100, positionY);

  doc
    .font("Times-Roman")
    .text("Vehicle Registration: ", positionX + middlePostion, positionY);
  doc
    .font("Times-Bold")
    .text(
      vehicle.vehicleRegistration ? vehicle.vehicleRegistration : " ",
      positionX + middlePostion + 105,
      positionY
    );
  positionY = changeLine(gap, doc);
  if (vehicleType === 2 || vehicleType === 3) {
    doc.font("Times-Roman").text("Insured: ", positionX, positionY);
    doc
      .font("Times-Bold")
      .text(vehicle.insured ? vehicle.insured : " ", positionX + 45, positionY);
    if (vehicle.insured === "Y") {
      doc.font("Times-Roman").text("Insurer: ", positionX + 75, positionY);
      doc.font("Times-Bold").text(vehicle.insurer, positionX + 118, positionY);
    }

    doc
      .font("Times-Roman")
      .text("Claim & Policy No: ", positionX + middlePostion, positionY);
    doc
      .font("Times-Bold")
      .text(
        vehicle.insurerPolicyNum ? vehicle.insurerPolicyNum : " ",
        positionX + middlePostion + 105,
        positionY
      );
    positionY = changeLine(gap, doc);
  }
  if (vehicleType !== 3) {
    rolePdf(doc, false, vehicle, vehicleType, positionX, positionY);
    positionY = changeLine(gap, doc);
  }
  rolePdf(doc, true, vehicle, vehicleType, positionX, positionY);
};
const changeLine = (gap, doc) => {
  doc.moveDown(gap);
  return doc.y;
};

const rolePdf = (doc, isDriver, vehicle, vehicleType, positionX, positionY) => {
  const role = isDriver ? "Driver" : "Owner";
  doc.font("Times-Roman").text(`${role} Name: `, positionX, positionY);
  doc
    .font("Times-Bold")
    .text(
      isDriver ? vehicle.nameOwner : vehicle.nameDriver,
      positionX + 75,
      positionY
    );

  doc
    .font("Times-Roman")
    .text(
      `${role} Contact No / Mobile: `,
      positionX + middlePostion,
      positionY
    );
  doc
    .font("Times-Bold")
    .text(
      isDriver
        ? vehicle.contactNumDriver
          ? vehicle.contactNumDriver
          : " "
        : vehicle.contactNumOwner
        ? vehicle.contactNumOwner
        : " ",
      positionX + middlePostion + 145,
      positionY
    );
  positionY = changeLine(gap, doc);
  doc.font("Times-Roman").text(`${role} Address: `, positionX, positionY);
  doc
    .font("Times-Bold")
    .text(
      isDriver
        ? vehicle.addressDriver
          ? vehicle.addressDriver
          : " "
        : vehicle.addressOwner
        ? vehicle.addressOwner
        : " ",
      positionX + 85,
      positionY
    );

  if (vehicleType === 1 && !isDriver) {
    positionY = changeLine(gap, doc);
    doc.font("Times-Roman").text("GST registered: ", positionX, positionY);
    doc
      .font("Times-Bold")
      .text(vehicle.GstRegistered, positionX + 80, positionY);
    if (vehicle.AbnNumber !== "") {
      doc.font("Times-Roman").text("ABN: ", positionX + 120, positionY);
      doc
        .font("Times-Bold")
        .text(vehicle.AbnNumber, positionX + 155, positionY);
    }
    doc
      .font("Times-Roman")
      .text("Insured? ", positionX + middlePostion, positionY);
    doc
      .font("Times-Bold")
      .text(
        vehicle.insured ? vehicle.insured : " ",
        positionX + middlePostion + 45,
        positionY
      );
    if (vehicle.insured === "Y") {
      doc
        .font("Times-Roman")
        .text("Insurer: ", positionX + middlePostion + 75, positionY);
      doc
        .font("Times-Bold")
        .text(
          vehicle.insurer ? vehicle.insurer : " ",
          positionX + middlePostion + 118,
          positionY
        );
    }
  }

  positionY = changeLine(gap, doc);
  doc.font("Times-Roman").text(`${role} Email: `, positionX, positionY);
  doc
    .font("Times-Bold")
    .text(
      isDriver ? vehicle.emailDriver : vehicle.emailOwner,
      positionX + 75,
      positionY
    );
  doc
    .font("Times-Roman")
    .text("Date of Birth: ", positionX + middlePostion, positionY);
  const dob = isDriver ? vehicle.dobDriver : vehicle.dobOwner;
  doc
    .font("Times-Bold")
    .text(
      dob ? convertDateFormat(dob) : " ",
      positionX + middlePostion + 75,
      positionY
    );
  positionY = changeLine(gap, doc);
  doc
    .font("Times-Roman")
    .text("Licence No: ", positionX + middlePostion, positionY);
  doc
    .font("Times-Bold")
    .text(
      isDriver ? vehicle.licenceNumDriver : vehicle.licenceNumOwner,
      positionX + middlePostion + 65,
      positionY
    );
  doc
    .font("Times-Roman")
    .text("Expiry: ", positionX + middlePostion + 135, positionY);
  const expiryDate = isDriver
    ? vehicle.expiryDateDriver
    : vehicle.expiryDateOwner;
  doc
    .font("Times-Bold")
    .text(
      expiryDate ? convertDateFormat(expiryDate) : " ",
      positionX + middlePostion + 175,
      positionY
    );
};

const createPdf = async (record, res) => {
  // initialize document
  const doc = new PDFDocument({
    margins: { top: 40, bottom: 30, left: 30, right: 30 },
  });

  //----------------- header -------------------------
  let positionY = doc.y;
  let positionX = 380;

  doc.font("Times-Bold").fontSize(48).text("L W S ");
  doc
    .font("Times-Bold")
    .fontSize(22)
    .text("L  a  w  y  e  r  s", 170, positionY + 20);
  doc
    .font("Times-Bold")
    .fontSize(15)
    .text("MOTOR VEHICLE", positionX, positionY);
  doc.moveDown(0.1);
  doc.font("Times-Bold").fontSize(15).text("CLAIM INSTRUCTIONS");

  positionY = changeLine(0.1, doc);
  doc.font("Times-Bold").fontSize(12).text("Tel: ");
  doc
    .font("Times-Roman")
    .fontSize(12)
    .text("03 9088 6238", positionX + 25, positionY);
  doc
    .font("Times-Bold")
    .fontSize(12)
    .text("Fax: ", positionX + 110, positionY);
  doc
    .font("Times-Roman")
    .fontSize(12)
    .text("03 8692 2850", positionX + 135, positionY);

  positionY = changeLine(0.1, doc);
  doc.font("Times-Bold").fontSize(9).text("Email: ", positionX, positionY);
  doc
    .font("Times-Roman")
    .fontSize(9)
    .fillColor("blue")
    .text("reception@lwslawyers.com.au", positionX + 30, positionY, {
      link: "mailto:reception@lwslawyers.com.au",
      underline: true,
    });

  positionY = changeLine(0.1, doc);
  doc
    .font("Times-Bold")
    .fontSize(9)
    .fillColor("black")
    .text("Website: ", positionX, positionY);
  doc
    .font("Times-Bold")
    .fontSize(9)
    .fillColor("blue")
    .text("www.lwslawyers.com.au", positionX + 35, positionY, {
      link: "www.lwslawyers.com.au",
      underline: true,
    });
  doc
    .font("Times-Bold")
    .fontSize(7)
    .fillColor("black")
    .text("ABN: 84 611 286 509", positionX + 136, positionY + 3);
  positionX = 30;
  positionY = 95;
  doc
    .font("Times-Roman")
    .fontSize(8)
    .text("Referring Repairer: ", positionX, positionY);
  if (record.repairConfirmation.referringRepairer === "Monash Auto Body") {
    doc.image(logo, positionX + 70, positionY - 2, {
      width: 80,
    });
  } else {
    doc
      .font("Times-Bold")
      .fontSize(8)
      .text(
        record.repairConfirmation.referringRepairer,
        positionX + 70,
        positionY
      );
  }

  doc
    .font("Times-Roman")
    .fontSize(8)
    .text("Contact No: ", positionX + 190, positionY);

  doc
    .font("Times-Bold")
    .fontSize(8)
    .text(
      record.repairConfirmation.repairerContact,
      positionX + 235,
      positionY
    );
  //----------------- body your vehicle -------------------------

  positionY = changeLine(2, doc);
  subHeading(doc, "YOUR VEHICLE DETAILS", positionX, positionY);
  vehiclePdf(doc, record.vehicleDetails, 1, positionX, positionY);

  positionY = changeLine(gap, doc);
  subHeading(doc, "OFFENDING VEHICLE DETAILS", positionX, positionY);
  vehiclePdf(doc, record.offendingVehicle, 2, positionX, positionY);
  positionY = changeLine(gap, doc);
  subHeading(doc, "THIRD VEHICLE DETAILS", positionX, positionY);
  vehiclePdf(doc, record.thirdVehicle, 3, positionX, positionY);

  //   ------------------------ your witness -------------------------
  positionY = changeLine(gap, doc);
  subHeading(doc, "WITNESS DETAILS", positionX, positionY);
  positionY = changeLine(0.7, doc);
  doc.font("Times-Roman").text("Name: ", positionX, positionY);
  doc
    .font("Times-Bold")
    .text(record.witnessDetails.witnessName, positionX + 40, positionY);

  doc
    .font("Times-Roman")
    .text("Contact No. Mobile: ", positionX + middlePostion, positionY);
  doc
    .font("Times-Bold")
    .text(
      record.witnessDetails.witnessMobile
        ? record.witnessDetails.witnessMobile
        : " ",
      positionX + middlePostion + 105,
      positionY
    );
  positionY = changeLine(gap, doc);
  doc.font("Times-Roman").text("Address: ", positionX, positionY);
  doc
    .font("Times-Bold")
    .text(
      record.witnessDetails.address ? record.witnessDetails.address : " ",
      positionX + 50,
      positionY
    );
  positionY = changeLine(1, doc);
  //   ------------------------ Accident details -------------------------
  subHeading(doc, "ACCIDENT DETAILS", positionX, positionY);
  positionY = changeLine(0.7, doc);
  doc.font("Times-Roman").text("Date: ", positionX, positionY);
  doc
    .font("Times-Bold")
    .text(
      convertDateFormat(record.accidentDetails.accidentDate),
      positionX + 30,
      positionY
    );

  doc.font("Times-Roman").text("Time: ", positionX + 140, positionY);
  doc
    .font("Times-Bold")
    .text(
      record.accidentDetails.accidentTime
        ? convertTimeFormat(record.accidentDetails.accidentTime)
        : " ",
      positionX + 170,
      positionY
    );
  doc
    .font("Times-Roman")
    .text(
      "Damaged Areas of Your Vehicle:",
      positionX + middlePostion,
      positionY
    );

  positionY = changeLine(gap, doc);
  imageY = positionY;
  doc.font("Times-Roman").text("Place: ", positionX, positionY);
  doc
    .font("Times-Bold")
    .text(
      record.accidentDetails.accidentPlace
        ? record.accidentDetails.accidentPlace
        : " ",
      positionX + 35,
      positionY
    );
  positionY = changeLine(gap, doc);
  doc.font("Times-Roman").text("Description: ", positionX, positionY);
  positionY = changeLine(gap, doc);
  doc
    .font("Times-Bold")
    .text(
      record.accidentDetails.accidentDescription
        ? record.accidentDetails.accidentDescription
        : " ",
      positionX,
      positionY,
      {
        width: middlePostion - 10,
        height: 76,
        align: "left", // You can adjust the alignment as needed (left, right, center)
        ellipsis: true, // Add ellipsis if the text doesn't fit within the box
      }
    );
  positionY += 75;
  doc
    .font("Times-Roman")
    .fontSize(8)
    .text("Reported to Police? ", positionX, positionY);
  doc
    .font("Times-Bold")
    .text(record.accidentDetails.reportedPolice, positionX + 70, positionY);
  doc.font("Times-Roman").text("Police Station: ", positionX + 90, positionY);
  if (record.accidentDetails.reportedPolice === "Y") {
    doc
      .font("Times-Bold")
      .text(record.accidentDetails.policeStation, positionX + 140, positionY);
  }
  // ------------------------ images ------------------------
  if (record.accidentDetails.accidentCarImage.length !== 0) {
    const accidentImage = record.accidentDetails.accidentCarImage[0];

    doc.image(accidentImage, positionX + middlePostion, imageY, {
      fit: [middlePostion - 30, 115],
    });
  } else {
    positionY += 115;
  }
  //   ------------------------ Repairer confirmation -------------------------

  positionY = changeLine(2, doc);
  subHeading(doc, "REPAIRER CONFIRMATION", positionX, positionY);
  positionY = changeLine(0.7, doc);
  doc
    .font("Times-Bold")
    .text(record.repairConfirmation.referringRepairer, positionX, positionY, {
      continued: true,
    })
    .font("Times-Roman")
    .text(
      " confirms that this matter is referred to LWS Lawyers Pty Ltd for this motor vehicle recovery action."
    );
  positionY = changeLine(0.7, doc);
  doc.text("Signature of Repairer: ", positionX, positionY);
  if (record.repairConfirmation.signature !== "") {
    doc.image(record.repairConfirmation.signature, positionX + 115, positionY, {
      fit: [100, 30],
      //   width: 100,
      //   height: 30,
    });
  }
  doc.text("Date: ", positionX + middlePostion, positionY);
  doc
    .font("Times-Bold")
    .text(
      record.repairConfirmation.signDate
        ? record.repairConfirmation.signDate
        : " ",
      positionX + middlePostion + 30,
      positionY
    );
  //   ------------------------ Agreement -------------------------
  positionY = changeLine(3, doc);
  subHeading(
    doc,
    "REQUEST TO ACT AND AUTHORITY TO APPOINT A LEGAL PRACTITIONER",
    positionX,
    positionY
  );
  positionY = changeLine(1, doc);
  doc.font("Times-Roman").text("TO: ");
  doc
    .font("Times-Bold")
    .text("L W S L a w y e r s Pty Ltd", positionX + 70, positionY);
  positionY = changeLine(gap, doc);
  doc
    .font("Times-Roman")
    .text("Level 24, 570 Bourke Street", positionX + 70, positionY);
  positionY = changeLine(gap, doc);
  doc.text("Melbourne Victoria 3000", positionX + 70, positionY);
  positionY = changeLine(1, doc);
  doc
    .font("Times-Bold")
    .text(
      "RE: REQUEST TO PURSUE RECOVERY FOR REPAIR COSTS & ASSOCIATED LOSSES",
      positionX,
      positionY
    );
  positionY = changeLine(1.5, doc);
  doc
    .font("Times-Roman")
    .lineGap(8)
    .text("I, ", positionX, positionY, { continued: true })
    .font("Times-Bold")
    .text(record.vehicleDetails.nameOwner, { continued: true })
    .font("Times-Roman")
    .text(", being the owner of the vehicle registration no. ", {
      continued: true,
    })
    .font("Times-Bold")
    .text(record.vehicleDetails.vehicleRegistration, { continued: true })
    .font("Times-Roman")
    .text(
      " hereby authorise your firm to recover any claim for repair costs, hire car costs and associated losses arising from my recent motor vehicle accident and I appoint your firm as my legal practitioner."
    );

  positionY = changeLine(0.3, doc);
  orderedList(
    doc,
    1,
    "I am aware that legal proceedings may need to be issued in my name and I authorise this and agree to co-operate through the recovery process and to provide instructions in regards to the matter and sign any necessary documents when requested.",
    positionX,
    positionY
  );
  // Segment 1
  positionY = changeLine(0.01, doc);
  // Segment 2
  orderedList(
    doc,
    2,
    "I have been given access to and read the overarching obligations on me in accordance with s41 the Civil Procedure Act 2010 as set out in s16 to s26 of that Act and understand them.",
    positionX,
    positionY
  );
  positionY = changeLine(0.01, doc);
  // Segment 3
  orderedList(
    doc,
    3,
    "I have determined that I will not lodge a claim on my own insurer even though I have the right to do so.",
    positionX,
    positionY
  );
  positionY = changeLine(0.01, doc);
  // Segment 4
  orderedList(
    doc,
    4,
    "I have been informed by the repairer where my vehicle will be repaired that they will be responsible for any and all costs associated with any legal proceedings that may need to be issued to recover the repair costs, hire costs, assessor’s fee and associated losses.",
    positionX,
    positionY
  );
  positionY = changeLine(0.01, doc);
  // Segment 5
  orderedList(
    doc,
    5,
    "I authorise for my vehicle to be repaired at this repair shop and for you to pay my repairer from proceeds recovered, their invoiced costs, and any payment to assessor for fees, any legal fees and other associated fees in this matter as my instructing solicitor from your account.",
    positionX,
    positionY
  );
  positionY = changeLine(0.01, doc);
  // Segment 6
  orderedList(
    doc,
    6,
    "I have been given the opportunity to seek my own legal advice and/or to contact Linda Wang, Legal Practitioner on 03 8658 5995 to discuss this authority prior to my signing the same.",
    positionX,
    positionY
  );
  positionY = changeLine(1, doc);
  // Additional Text
  doc
    .font("Times-Roman")
    .lineGap(8)
    .text("Please visit our website at ", positionX, positionY, {
      continued: true,
    })
    .fillColor("blue")
    .text("www.lwslawyers.com.au", {
      link: "http://www.lwslawyers.com.au",
      continued: true,
    })
    .fillColor("black")
    .text(
      " under Motor Vehicle Accidents for further information regarding your motor vehicle claim and for more information relating to your overarching obligations."
    );
  positionY = changeLine(0.5, doc);
  // Closing Statement
  doc
    .font("Times-Bold")
    .text(
      "I understand that there is no cost to me for this motor vehicle recovery action, unless I am otherwise advised."
    );

  positionY = changeLine(0.5, doc);
  doc.font("Times-Roman").text("Date: ");
  doc
    .font("Times-Bold")
    .text(
      record.legalAgreement.signDate ? record.legalAgreement.signDate : " ",
      positionX + 30,
      positionY
    );
  positionY = changeLine(gap, doc);
  if (record.legalAgreement.signature !== "") {
    doc.image(record.legalAgreement.signature, {
      fit: [100, 30],
      //   width: 100,
      //   height: 30,
    });
    positionY = changeLine(gap, doc);
  }
  doc
    .font("Times-Roman")
    .text("Owner of Vehicle Registration No. ", positionX, positionY, {
      continued: true,
    })
    .font("Times-Bold")
    .text(record.vehicleDetails.vehicleRegistration);

  // ---------------------------- end -----------------------------
  res.setHeader("Content-Disposition", 'attachment; filename="record.pdf"');
  res.setHeader("Content-Type", "application/pdf");

  // Pipe the PDF stream to the response
  doc.pipe(res);
  doc.end();
};

module.exports = { createPdf };
