import axios from "axios";

export const uploadImage = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/image/upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(response.data);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};
