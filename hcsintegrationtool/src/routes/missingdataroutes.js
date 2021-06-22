import express, { response, Router } from "express";
import { missingEmail, missingFname } from "../controllers/missingdata.js";
const router = express.Router();

//routes to handle missifn firsname , emails

//calling appropraite function when required API is called
router.get("/api/missingemail", missingEmail);
router.get("/api/missingfirstname", missingFname);

export { router as missingdatarouter };
