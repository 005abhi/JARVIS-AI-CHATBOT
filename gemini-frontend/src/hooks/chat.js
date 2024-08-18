import axios from "axios";

export const sendChat = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/ai/chat",
      data
    );
    // console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
