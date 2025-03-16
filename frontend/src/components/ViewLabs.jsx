// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Layout from "./Layout";  // Import Layout

// const ViewLabs = () => {
//   const [labAdmins, setLabAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchLabAdmins = async () => {
//       try {
//         const response = await axios.get("http://localhost:8081/api/auth/lab-admins");
//         setLabAdmins(response.data);
//       } catch (err) {
//         console.error("Error fetching lab admins:", err);
//         setError("Failed to load lab admins.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchLabAdmins();
//   }, []);

//   return (
//     <Layout>
//       <div className="max-w-6xl mx-auto p-6">
//         <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Labs</h2>

//         {loading ? (
//           <p className="text-center text-gray-500 text-lg">Loading lab admins...</p>
//         ) : error ? (
//           <p className="text-center text-red-500 text-lg">{error}</p>
//         ) : labAdmins.length === 0 ? (
//           <p className="text-center text-gray-500 text-lg">No lab admins available.</p>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {labAdmins.map((admin) => (
//               <div
//                 key={admin.id}
//                 className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
//               >
//                 <h3 className="text-2xl font-semibold text-gray-900">{admin.name}</h3>
//                 <p className="text-gray-600 mt-2"><strong className="text-gray-700">Email:</strong> {admin.email}</p>
//                 <p className="text-gray-600 mt-1"><strong className="text-gray-700">Lab Name:</strong> {admin.lab.name}</p>
//                 <p className="text-gray-600 mt-1"><strong className="text-gray-700">Lab id:</strong> {admin.lab.id}</p>
                // <p className="text-gray-600 mt-1"><strong className="text-gray-700">Servers:</strong> {admin.lab.servers}</p>
                // <p className="text-gray-600 mt-1"><strong className="text-gray-700">Lab Location:</strong> {admin.lab.location}</p>
                // <p className="text-gray-600 mt-1"><strong className="text-gray-700">Operating Hours:</strong> {admin.lab.operating_hours}</p>
                // <p className="text-gray-600 mt-1"><strong className="text-gray-700">RAM:</strong> {admin.lab.ram}</p>
                // <p className="text-gray-600 mt-1"><strong className="text-gray-700">Processors:</strong> {admin.lab.processors}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default ViewLabs;



import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import LabLayoutImage from "../assets/photo3.png"; // Import the image

const ViewLabs = () => {
  const [labAdmins, setLabAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedLab, setSelectedLab] = useState(null); // State for modal

  useEffect(() => {
    const fetchLabAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:8081/api/auth/lab-admins");
        setLabAdmins(response.data);
      } catch (err) {
        console.error("Error fetching lab admins:", err);
        setError("Failed to load lab admins.");
      } finally {
        setLoading(false);
      }
    };

    fetchLabAdmins();
  }, []);

  return (
    <Layout>
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">Labs</h2>

        {loading ? (
          <p className="text-center text-gray-500 text-lg">Loading lab admins...</p>
        ) : error ? (
          <p className="text-center text-red-500 text-lg">{error}</p>
        ) : labAdmins.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No lab admins available.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {labAdmins.map((admin) => (
              <div
                key={admin.id}
                className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-2xl font-semibold text-gray-900">{admin.name}</h3>
                <p className="text-gray-600 mt-2">
                  <strong className="text-gray-700">Email:</strong> {admin.email}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong className="text-gray-700">Lab Name:</strong> {admin.lab.name}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong className="text-gray-700">Lab ID:</strong> {admin.lab.id}
                </p>
                <p className="text-gray-600 mt-1"><strong className="text-gray-700">Servers:</strong> {admin.lab.servers}</p>
                <p className="text-gray-600 mt-1"><strong className="text-gray-700">Lab Location:</strong> {admin.lab.location}</p>
                <p className="text-gray-600 mt-1"><strong className="text-gray-700">Operating Hours:</strong> {admin.lab.operating_hours}</p>
                <p className="text-gray-600 mt-1"><strong className="text-gray-700">RAM:</strong> {admin.lab.ram}</p>
                <p className="text-gray-600 mt-1"><strong className="text-gray-700">Processors:</strong> {admin.lab.processors}</p>
                {/* View Layout Button */}
                <button
                  onClick={() => setSelectedLab(admin.lab)}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  View Layout
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedLab && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-2xl w-full">
            <button
              onClick={() => setSelectedLab(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
            >
              &times;
            </button>
            <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">
              {selectedLab.name} Layout
            </h3>
            <img
              src={LabLayoutImage} // Imported Image from assets
              alt="Lab Layout"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </Layout>
  );
};

export default ViewLabs;
