import axios from "axios";

const BASE_URL = "http://localhost:3000/api/interview";

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