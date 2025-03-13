import axios from "axios";

const BASE_URL = "http://localhost:8081"; // Backend URL


export const fetchLabs = async () => {
  try {
    console.log("Fetching labs from:", `${BASE_URL}/api/auth/labs`);
    const response = await axios.get(`${BASE_URL}/api/auth/labs`);
    console.log("Fetched labs:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching labs:", error.response?.data || error.message);
    throw error;
  }
};


export const addLab = async (labData) => {
  try {
    const formData = new FormData();
    formData.append("name", labData.name);
    formData.append("servers", labData.servers);

    const response = await axios.post(`${BASE_URL}/api/auth/labs`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data;
  } catch (error) {
    console.error("Error adding lab:", error);
    throw error;
  }
};
