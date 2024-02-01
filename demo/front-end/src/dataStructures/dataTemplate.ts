export type VehiclesData = {
  AbnNumber?: string;
  GstRegistered?: string;
  addressDriver?: string;
  addressOwner?: string;
  contactNumDriver?: string;
  contactNumOwner?: string;
  dobDriver?: string;
  dobOwner?: string;
  emailDriver?: string;
  emailOwner?: string;
  expiryDateDriver?: string;
  expiryDateOwner?: string;
  insured?: string;
  insurer?: string;
  insurerPolicyNum?: string;
  licenceNumDriver?: string;
  licenceNumOwner?: string;
  model?: string;
  nameDriver?: string;
  nameOwner: string;
  vehicleRegistration: string;
}

export type WitnessData = {
    address?: string;
    witnessMobile?: string;
    witnessName?: string;
}

export type AccidentData = {
    accidentCarImage?: string[];
    accidentDate?: string;
    accidentDescription?: string;
    accidentPlace?: string;
    accidentTime?: string; 
    reportedPolice?: string;
    policeStation?: string;
}

export type RepairerData = {
    referringRepairer?: string;
    repairerContact?: string;
    signDate: string;
    signature: string;
}

export type AgreementData = {
    signDate: string;
    signature: string;
}

export type FormState = {
  vehicleDetails: VehiclesData;
  offendingVehicle: VehiclesData;
  thirdVehicle: VehiclesData;
  witnessDetails: WitnessData;
  accidentDetails: AccidentData;
  repairConfirmation: RepairerData;
  legalAgreement: AgreementData;
};

type VehicleDetails = {
  AbnNumber: string;
  GstRegistered: string;
  addressDriver: string;
  addressOwner: string;
  contactNumDriver: string;
  contactNumOwner: string;
  dobDriver: string;
  dobOwner: string;
  emailDriver: string;
  emailOwner: string;
  expiryDateDriver: string;
  expiryDateOwner: string;
  insured: string;
  insurer: string;
  insurerPolicyNum: string;
  licenceNumDriver: string;
  licenceNumOwner: string;
  model: string;
  nameDriver: string;
  nameOwner: string;
  vehicleRegistration: string;
  _id: string; // Assuming this is a string
};

export type Record = {
  _id: string; // Assuming this is a string
  vehicleDetails: VehicleDetails;
  offendingVehicle: VehicleDetails;
  thirdvehicle: VehicleDetails;
  witnessDetails: {
    address: string;
    witnessMobile: string;
    witnessName: string;
    _id: string; // Assuming this is a string
  };
  accidentDetails: {
    accidentCarImage: string; // Assuming this is an array of strings
    accidentDate: string;
    accidentDescription: string;
    accidentPlace: string;
    accidentTime: string;
    reportedPolice: string;
    policeStation: string;
    _id: string; // Assuming this is a string
  };
  repairConfirmation: {
    referringRepairer: string;
    repairerContact: string;
    signDate: string;
    signature: string;
    _id: string; // Assuming this is a string
  };
  legalAgreement: {
    signDate: string;
    signature: string;
    _id: string; // Assuming this is a string
  };
  __v: number; // Assuming this is a number
};

export type User = {
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  password_hash: string;
}


