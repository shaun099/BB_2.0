import React from "react";
import GetPatients from "./components/GetPatients";


const App = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Patient List</h1>
            <GetPatients />
        </div>
    );
};

export default App;
