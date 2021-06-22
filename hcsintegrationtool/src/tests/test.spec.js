const csvtojson = require("csvtojson");
import { patient } from "../models/patient.js";
import { emailModel } from "../models/email.js";
import "regenerator-runtime/runtime";
import mongoose from "mongoose";
import { expect } from "@jest/globals";

//Intialising DB /collections before starting executon of test suite
beforeAll(async () => {
  const url =
    "mongodb+srv://Dheeraj:Dheerajch@92@cluster0.htm2w.mongodb.net/PatientDB?retryWrites=true&w=majority";
  await mongoose.connect(url, { useNewUrlParser: true });
});


describe("Unit test to comapre data between flat file and mongoDB collection", () => {
  test("Compare  data", async () => {
    let csv = [];
    //parsing csv from flatfile
    await csvtojson()
      .fromFile("patientData.csv")
      .then((csvData) => {
        csv = csvData;
      });
    expect.assertions(1);
    //find data in patients collections
    let data = await patient.find();
    // asserting to check if the data is equal
    await expect(data.length).toEqual(csv.length);
  });
});

describe("Unit test to verify to test creation of emails", () => {
  test("Compare Data", async () => {
    expect.assertions(1);
    let emaildata = await emailModel.find();
    let patientdata = await patient.find({ CONSENT: "Y" });
    // asserting to check if patients with CONSENT:Y is equal to emaildata lenght(each email object has four nested emails)

    await expect(patientdata.length).toEqual(emaildata.length);
  });
});
describe("Unit test to verify correct creation of emails", () => {
  test("Compare Data", async () => {
    expect.assertions(1);
    let emaildata = await emailModel.find();
    await expect(emaildata[0].emails.length).toEqual(4);
  });
});


//Closing connection to DB after test suites execution is completed
afterAll(async () => {
  mongoose.connection.close();
  console.log("Disconnected from DB");
});
