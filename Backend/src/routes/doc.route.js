const express = require("express");
const router = express.Router();
const docController = require("../controllers/doc.controller");

router.get("/getDoctors", docController.getDoctors);

router.get("/getDoctorbyEmail", docController.getDoctor);

router.get("/doctorsByCityAndSpeciality", docController.getDoctorsByCityAndSpeciality);

router.post("/createDoctor", docController.createDoctor);

router.put('/updateDoctor', docController.updateDoctor);

router.delete("/deleteDoctor", docController.deleteDoctor);


module.exports = router;