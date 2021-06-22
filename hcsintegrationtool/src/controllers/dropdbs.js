import { emailModel } from "../models/email.js";
import { patient } from "../models/patient.js";

// function to drop patient collection programmatically 
export const droppatientdb = async (req, res) => {
  try {
    await patient.collection
      .drop()
      .then(() => res.status(200).json("Patients collections dropped"));
      console.log("Patients collectionsDB dropped")
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// function to drop emails collection programmatically 
export const dropemaildb = async (req, res) => {
  try {
    await emailModel.collection
      .drop()
      .then(() => res.status(200).json("Email collectionsDB dropped"));
      console.log("Email collections dropped")
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
