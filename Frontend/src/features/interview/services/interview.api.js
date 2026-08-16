import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/interview`;

export async function getInterviewReport(id) {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
}