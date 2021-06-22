import express, { Router } from "express";
import { dropemaildb, droppatientdb } from "../controllers/dropdbs.js";
const router = express.Router();

//Defining routes to handle collection drops from MongoDB
router.post("/api/droppatientdb", droppatientdb);
router.post("/api/dropemaildb", dropemaildb);

export { router as dropdbrouter };
