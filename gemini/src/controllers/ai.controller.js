import { ApiResponse } from "../utils/ApiResponse.js";
import { GoogleGenerativeAI } from "@google/generative-ai"

if (!process.env.API_KEY) {
    console.log(`API_KEY not found! Please provide a valid key.`)
    process.exit(1)
}

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const sendToAi = async (req, res) => {
    try {
        const { prompt } = req.body

        if (!prompt) {
            return res.status(400).send(new ApiResponse(400, null, "Required fields missing."))
        }

        const result = await model.generateContent(prompt);
        const response = await result.response; 
        const text = await response.text();
        // console.log(text);

        res.status(200).send(new ApiResponse(200, text, "Response received successfully."))
    } catch (error) {
        console.log(error)
        res.status(500).send(new ApiResponse(500, error, "Error sending data to AI"))
    }
}