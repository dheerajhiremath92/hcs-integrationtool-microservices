import { patient } from "../models/patient.js";

/*
- saving  received data with help of mongoose model to MongoDB.
- Verfying if  data is already present in  collections to avoid duplicates
- Destructuring received data and assigning to respective parameters to mongoose Document(Instance of  Model).
- Making  Member ID(unique value) as primary key and call save() function.
- 
*/
export const savePatient = async (data) => {
  //Check for possible duplicates
  await patient.findOne({ _id: data.MemberID }, (err, exam) => {
    if (err) {
      console.log(err);
    }
    if (exam) {
      //log data if received data is already present in  database, dynamically adding MemberID to identify patient
      console.log(
        `Patient data with Member ID ${data.MemberID} has already been saved into database`
      );
    } // one-to-one mapping of received params to respective params of instance of Model
    else {
      let doc = new patient({
        _id: data.MemberID,
        ProgramIdentifier: data.ProgramIdentifier,
        DataSource: data.DataSource,
        CardNumber: data.CardNumber,
        MemberID: data.MemberID,
        FirstName: data.FirstName,
        LastName: data.LastName,
        DateofBirth: data.DateofBirth,
        Address1: data.Address1,
        Address2: data.Address2,
        City: data.City,
        State: data.State,
        Zipcode: data.Zipcode,
        Telephonenumber: data.Telephonenumber,
        EmailAddress: data.EmailAddress,
        CONSENT: data.CONSENT,
        MobilePhone: data.MobilePhone,
      });
      //calling save() to push data to MongoDB
      doc.save();
      console.log(doc);
    }
  });
};
