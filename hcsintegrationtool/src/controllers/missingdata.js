import { patient } from "../models/patient.js";

//Function to find missing email for patients with CONSENT:"Y"

export const missingEmail = async (req, res) => {
  // find missing email data
  try {
    const missingemaildata = await patient.find({
      CONSENT: "Y",
      EmailAddress: "",
    });
    //set appropriate HTTP status code, Send missing data as response to client
    res.status(200).json(missingemaildata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const missingFname = async (req, res) => {
  // find missing first name data
  try {
    const missingfnamedata = await patient.find({ FirstName: "" });
    //set appropriate HTTP status code, Send missing data as response to client
    res.status(200).json(missingfnamedata);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
