import { VehiclesData, WitnessData, AccidentData, RepairerData, AgreementData, FormState } from "./dataTemplate"; // Import your types from the correct file

// export const initialVehiclesData: VehiclesData = {
//   AbnNumber: "",
//   GstRegistered: "",
//   addressDriver: "",
//   addressOwner: "",
//   contactNumDriver: "",
//   contactNumOwner: "",
//   dobDriver: "",
//   dobOwner: "",
//   emailDriver: "",
//   emailOwner: "",
//   expiryDateDriver: "",
//   expiryDateOwner: "",
//   insured: "",
//   insurer: "",
//   insurerPolicyNum: "",
//   licenceNumDriver: "",
//   licenceNumOwner: "",
//   model: "",
//   nameDriver: "",
//   nameOwner: "",
//   vehicleRegistration: "",
// };

// export const initialWitnessData: WitnessData = {
//   address: "",
//   witnessMobile: "",
//   witnessName: "",
// };

// export const initialAccidentData: AccidentData = {
//   accidentCarImage: [],
//   accidentDate: "",
//   accidentDescription: "",
//   accidentPlace: "",
//   accidentTime: "", 
//   reportedPolice: "",
//   policeStation: ""
// };

export const initialVehiclesData: VehiclesData = {
  AbnNumber: "123456789",
  GstRegistered: "Y",
  addressDriver: "123 Main St",
  addressOwner: "456 Elm St",
  contactNumDriver: "555-123-4567",
  contactNumOwner: "555-987-6543",
  dobDriver: "1990-01-15",  // Updated format
  dobOwner: "1985-05-20",    // Updated format
  emailDriver: "driver@example.com",
  emailOwner: "owner@example.com",
  expiryDateDriver: "2023-12-31",  // Updated format
  expiryDateOwner: "2024-06-30",    // Updated format
  insured: "Y",
  insurer: "ABC Insurance",
  insurerPolicyNum: "P123456789",
  licenceNumDriver: "DL123456",
  licenceNumOwner: "DL987654",
  model: "Toyota Camry",
  nameDriver: "John Doe",
  nameOwner: "Jane Smith",
  vehicleRegistration: "ABC-123",
};

export const initialWitnessData: WitnessData = {
  address: "789 Oak St",
  witnessMobile: "555-555-5555",
  witnessName: "Alice Johnson",
};

export const initialAccidentData: AccidentData = {
  accidentCarImage: ["image1.jpg", "image2.jpg"],
  accidentDate: "2023-10-15",
  accidentDescription: "Car accident description",
  accidentPlace: "Intersection of Main St and Elm St",
  accidentTime: "14:30",
  reportedPolice: "Y",
  policeStation: "Local Police Station",
};


export const initialRepairerData: RepairerData = {
  referringRepairer: "Monash Auto Body",
  repairerContact: "03 9562 8555",
  signature: "",
  signDate: "",
};

export const initialAgreementData: AgreementData = {
    signature: "",
  signDate: "",
};

export const initialFields: FormState = {
  vehicleDetails: initialVehiclesData,
  offendingVehicle: initialVehiclesData,
  thirdVehicle: initialVehiclesData,
  witnessDetails: initialWitnessData,
  accidentDetails: initialAccidentData,
  repairConfirmation: initialRepairerData,
  legalAgreement: initialAgreementData
}


