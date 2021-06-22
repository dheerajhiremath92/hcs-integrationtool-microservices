import express, { response, Router } from "express";

import { ConsentY } from "../controllers/emailschedule.js";
const router = express.Router();
/*
calling appropraite function when required API is called
- When post requested is made to http://"serveraddress":3000/api/scheduleemail
- ConsentY function is fired and emails ae schduled
*/
router.post("/api/scheduleemail", ConsentY);


export { router as scheduleemailrouter };
