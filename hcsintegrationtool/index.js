import express from "express";

import mongoose from "mongoose";

import { missingdatarouter } from "./src/routes/missingdataroutes.js";
import { scheduleemailrouter } from "./src/routes/scheduleemailroute.js";
import { viewcollectionsrouter } from "./src/routes/viewcollectionsroute.js";
import { dropdbrouter } from "./src/routes/dropdbroutes.js";
import { datastream } from "./src/controllers/readcsvdata.js";

const app = express();
app.use(express.json());

//Making use of the imported route handlers to handle HTTP requests to the server
app.use(missingdatarouter);
app.use(scheduleemailrouter);
app.use(viewcollectionsrouter);
app.use(dropdbrouter);

// Defining the URI of Mongodb 
const MONGODB_URI =
  "mongodb://127.0.0.1:27017";

//Defining a function to connect to mongodb, upon succesfull connection fireup the server at PORT 3000
const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });

  //Upon Succesful connection , calling the function "datstream()" to parse the CSV data
  datastream();
};

start();
