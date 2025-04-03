import React, { useEffect, useState } from 'react';

function App() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        console.log('Fetching patients from /api/patients...');
        const response = await fetch('http://localhost:5500/api/patients', {
          redirect: 'manual', // Handle redirects manually
          credentials: 'include', // Include cookies for session
        });

        console.log('Response status:', response.status);
        console.log('Response headers:', response.headers);

        // Handle redirect (302 or 0 status for opaque redirect)
        if (response.status === 302 || response.status === 0) {
          const redirectUrl = response.headers.get('Location');
          console.log('Redirect detected. Redirect URL:', redirectUrl);
          if (redirectUrl) {
            const absoluteUrl = redirectUrl.startsWith('http')
              ? redirectUrl
              : `http://localhost:5500${redirectUrl}`;
            console.log('Navigating to:', absoluteUrl);
            window.location.href = absoluteUrl;
          } else {
            throw new Error('Redirect status received, but no Location header found');
          }
          return;
        }

        // Check if the response is JSON
        const contentType = response.headers.get('Content-Type');
        console.log('Content-Type:', contentType);
        if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text();
          throw new Error(
            `Expected JSON, but received: ${text.slice(0, 100)}...`
          );
        }

        // Parse JSON response
        const data = await response.json();
        console.log('Fetched data:', data);
        setPatients(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Patient List</h1>

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center">
          <svg
            className="animate-spin h-8 w-8 text-blue-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <span className="ml-3 text-lg text-gray-600">Loading patients...</span>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md w-full max-w-md">
          <p className="font-semibold">Error</p>
          <p>{error}</p>
        </div>
      )}

      {/* Patient List */}
      {!loading && !error && (
        <div className="w-full max-w-2xl">
          {patients.length === 0 ? (
            <p className="text-center text-gray-500">No patients found.</p>
          ) : (
            <div className="space-y-4">
              {patients.map((patient) => (
                <div
                  key={patient.id}
                  className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <h2 className="text-xl font-semibold text-gray-800">
                    {patient.name}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    <span className="font-medium">Birth Date:</span>{' '}
                    {patient.birthDate}
                  </p>
                  <p className="text-gray-600 mt-1">
                    <span className="font-medium">ID:</span> {patient.id}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;