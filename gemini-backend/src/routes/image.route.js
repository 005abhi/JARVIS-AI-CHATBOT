import express from "express";
import { upload } from "../middlewares/multer.middleware.js";
import fs from "fs";
import { GoogleGenerativeAI } from "@google/generative-ai";

const imageRouter = express.Router();

imageRouter.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const fileType = req.file.mimetype.split("/")[0];
    const filePath = req.file.path;
    const mimeType = req.file.mimetype;
    let prompt = "";

    if (fileType === "image") {
      prompt = "Does this look store-bought or homemade?";
    } else {
      res.status(400).send("Unsupported file type.");
      return;
    }

    const data = fs.readFileSync(filePath).toString("base64");

    const genAI = new GoogleGenerativeAI(process.env.API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash-latest",
    });

    const content = {
      inlineData: {
        data,
        mimeType,
      },
    };

    const result = await model.generateContent([content]);

    const response = await result.response;
    let text = await response.text();

    text = text.replace(/\*+/g, "");

    res.json({
      response: text,
      statusCode: 200,
      message: "Image analysis successful.",
    });

    // Clean up uploaded file
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error("Error generating content", error);
    res.status(500).send("Internal Server Error");
  }
});

export { imageRouter };
