import { patient } from "../models/patient.js";
import express, { response, Router } from "express";

import { emailModel } from "../models/email.js";
var scheduled_date = new Date();

/*
Function to schedule email based on Consent Value
- Find all patients with CONSENT: "Y"
- Iterate over all items found and check if Email has already been scheduled
- If email not scheduled, create emails for 4 days from the given date an dstore emails in emails collection in MongoDB
- Emails in the collection are uniquely identifed by Member ID(primary key)
- Snapshot of email schedule data:
    Scheduling email for Member 43233
    Andy rocker  : Day 1 , scheduled_date : 6/17/2021
    Andy rocker  : Day 2 , scheduled_date : 6/18/2021
    Andy rocker  : Day 3 , scheduled_date : 6/19/2021
    Andy rocker  : Day 4 , scheduled_date : 6/20/2021
*/
export const ConsentY = async (req, res) => {
  try {
    //Fetching all patients with Email COnsent :"Y"
    const data = await patient.find({ CONSENT: "Y" });
    await data.forEach(async (element) => {
      //Iterating over found data and Check if email is already scheduled.
      var tempval = await finddataemail(element);
      //Logging duplicates / already scheduled email values
      if (tempval) {
        console.log(`Email already scheduled for Member ${tempval._id}`);
      } // Creating emails for patient by calling createemails func
      else {
        console.log(`Scheduling email for Member ${element.MemberID}`);
        //Calling func to schedule emails
        createemails(element);
      }
    });
  } catch (err) {
    console.log(err);
  }
  // Sending response to client once scheduling is completed
  res.status(200).send("Scheduling completed");
};

//Function to find scheduled email presence in emails collection
export const finddataemail = async (data) => {
  try {
    var tempdata = await emailModel.findOne({ _id: data.MemberID });
    return tempdata;
  } catch (error) {
    console.log(error);
  }
};

//Function to schedule emails
export const createemails = async (dt) => {
  var emailarray = [];
  //Running a loop to schedule email for 4 days
  for (let day = 0; day < 4; day++) {
    //Getting current date
    scheduled_date = new Date().setDate(new Date().getDate() + day);
    console.log(
      `${dt.FirstName} ${dt.LastName} : Day ${
        day + 1
      } , scheduled_date : ${new Date(scheduled_date).toLocaleDateString()}`
    );
    // Pushing the parsed data to array. Each item in array has 4 email items.
    // Made use of array to store data and save data once for all 4 days
    
    emailarray.push({
      _id: `Day ${day + 1}`,
      Info: `${dt.FirstName} ${dt.LastName} : Day ${
        day + 1
      } , Email scheduled_date : ${new Date(
        scheduled_date
      ).toLocaleDateString()}`,
      FirstName: dt.FirstName,
      LastName: dt.LastName,
      scheduled_date: new Date(scheduled_date).toDateString(),
    });
  } // 1-to-1 mapping to instance of Model, supplying array of emails as of the params
  let emaildoc = new emailModel({
    _id: dt.MemberID,
    emails: emailarray,
  });
  //calling save() to push data to MongoDB
  await emaildoc.save();
};
