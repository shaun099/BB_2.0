import axios from "axios";

export const getAllPatients = async (accessToken) => {
  const response = await axios.get(
    `${process.env.BB_API_BASE_URL}Patient`, // No ID here!
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};

export const getPatientData = async (accessToken, patientId) => {
  const response = await axios.get(
    `${process.env.BB_API_BASE_URL}Patient/${patientId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        Accept: "application/json",
      },
    }
  );
  return response.data;
};
