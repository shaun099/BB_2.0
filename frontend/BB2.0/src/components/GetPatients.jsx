import React, { useState } from "react";
import api from "../api"; // Import API helper

const GetPatients = () => {
    const [patient, setPatient] = useState(null);
    const [error, setError] = useState("");

    const fetchPatients = async () => {
        try {
            const response = await api.get("/api/patient",{withCredentials:true});
            console.log("Patient Data:", response.data); // Debugging // Fetch from backend
            setPatient(response.data);
            // setError(""); // Clear any previous error
        } catch (err) {
            //setPatient(null);
            setError("Failed to fetch patients. Make sure you are authenticated.");
            console.error("Error fetching patients:", err.response);
        }
    };

    return (
        <div className="p-4 max-w-xl mx-auto">
            <button 
                onClick={fetchPatients} 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow"
            >
                Get Patient
            </button>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {patient && (
                <div className="mt-6 p-4 border rounded bg-gray-100">
                    <h2 className="text-xl font-semibold mb-2">Patient Details</h2>
                    <p><strong>Name:</strong> {patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}</p>
                    <p><strong>Gender:</strong> {patient.gender}</p>
                    <p><strong>Birth Date:</strong> {patient.birthDate}</p>
                    <p><strong>ID:</strong> {patient.id}</p>
                </div>
            )}
        </div>
    );
};

export default GetPatients;
