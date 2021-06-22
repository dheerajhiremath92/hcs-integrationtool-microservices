import express from "express";
import { viewemails, viewpatients } from "../controllers/viewcollections.js";

const router = express.Router();

//routes to show collections in MongoDB
router.get("/api/emailcollection", viewemails);

router.get("/api/patientcollection", viewpatients);

export { router as viewcollectionsrouter };
