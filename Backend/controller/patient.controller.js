import {
  getAllPatients,
  getPatientData,
} from "../service/bluebutton.service.js";

const formatPatientData = (patient) => {
  return {
    id: patient.id || "N/A",
    name:
      patient.name?.[0]?.given?.join(" ") +
        " " +
        (patient.name?.[0]?.family || "") || "Unknown",
    gender: patient.gender || "Unknown",
    birthDate: patient.birthDate || "N/A",
  };
};

export const searchPatients = async (req, res) => {
  if (!req.session.bbAccessToken) {
    // return res.status(401).json({ error: "Unauthorized. Please log in." });
    return res.redirect(302, "/auth/login");
  }

  try {
    const patients = await getAllPatients(req.session.bbAccessToken);
    //res.json(patients);
    const simplifiedPatients = patients.entry?.map((entry) =>
      formatPatientData(entry.resource)
    );
    res.json(simplifiedPatients || []);
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch patients",
      details: error.message,
    });
  }
};

export const readPatient = async (req, res) => {
  const { id } = req.params;
  if (!req.session.bbAccessToken) {
    return res.status(401).json({ error: "Unauthorized. Please log in." });
  }

  try {
    const patient = await getPatientData(req.session.bbAccessToken, id);
    //res.json(patient);
    res.json(formatPatientData(patient));
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch patient",
      details: error.message,
    });
  }
};
