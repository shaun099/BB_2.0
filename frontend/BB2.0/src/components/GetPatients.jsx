import React, { useState } from "react";
import api from "../api"; // Import API helper

const GetPatients = () => {
    const [patients, setPatients] = useState([]);
    const [error, setError] = useState("");

    const fetchPatients = async () => {
        try {
            const response = await api.get("/patients"); // Fetch from backend
            setPatients(response.data);
        } catch (err) {
            setError("Failed to fetch patients. Make sure you are authenticated.");
            console.error(err);
        }
    };

    return (
        <div className="p-4">
            <button 
                onClick={fetchPatients} 
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Get Patients
            </button>

            {error && <p className="text-red-500">{error}</p>}

            <ul className="mt-4">
                {patients.map(patient => (
                    <li key={patient.id} className="border p-2 mb-2">
                        <strong>{patient.name}</strong> - Age: {patient.age}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GetPatients;
