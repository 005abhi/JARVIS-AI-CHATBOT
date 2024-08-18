import { ApiResponse } from "../utils/ApiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

if (!process.env.API_KEY) {
  console.log(`API_KEY not found! Please provide a valid key.`);
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const sendToAi = async (req, res) => {
  try {
    const { prompt, history } = req.body;

    if (!prompt || !history) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    // Define history here, if it's undefined
    // const history = typeof globalThis.history !== 'undefined' ? globalThis.history : [];

    const constraint = `\n\nRules: If the chat history provided below is empty, ignore it and just greet the user.) Use emojis if applicable.\n\nIn an application I have the following history, keep the next response you send based on this history only: ${JSON.stringify(
      history
    )}`;

    // console.log(prompt + constraint);

    const result = await model.generateContent(prompt + constraint);
    const response = await result.response;
    let text = await response.text();

    text = text.replace(/\*+/g, "");

    res
      .status(200)
      .send(new ApiResponse(200, text, "Response received successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Error sending data to AI"));
  }
};
