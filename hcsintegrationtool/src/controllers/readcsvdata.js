import { savePatient } from "./savePatientData.js";
import * as fsdata from "fs";
import csvdata from "csv-parser";

var userdata = [];

/* 
CSV data is parsed with  help of csv-parser module. 
Steps involved:
  -create readStream using fs module
  -forward/pipe  stream to csv  object
  -parse  received data (each row in csv) to have consitent and clean data. Push data to an array ()
  -Save data to mongodb on "end" event, by calling savePatient on every item with map() method. 
*/

export const datastream = async () => {
  await fsdata
    .createReadStream("./patientData.csv")
    .pipe(csvdata())
    .on("data", (row) => {
      let arr = row;
      //Cleaning and pushing data to array
      arr = JSON.parse(JSON.stringify(arr).replace(/\s(?=\w+":)/g, ""));
      userdata.push(arr);
    })// "end" event is triggered when all the rows in flat file are parsed
    .on("end", () => {
      console.log("success! Completed reading data from CSV");
      userdata.map((data) => {
        // Calling the savePatient() function on all items of the array.
        savePatient(data);
      });
    });
};
