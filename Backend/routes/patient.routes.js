import { Router } from "express";
import {
  searchPatients,
  readPatient,
} from "../controller/patient.controller.js";

const router = Router();

router.get("/patient", searchPatients); // Now correctly mapped!
router.get("/patient/:id", readPatient); // Now correctly mapped!

export default router;
