import { ApiResponse } from "../utils/ApiResponse.js";

export const statusCheck = async (req, res) => {
    try {
        res.status(200).send(new ApiResponse(200, null, "Server is online"))
    } catch (error) {
        console.log(error);
        res.status(500).send(new ApiResponse(500, error, "Error fetching status."))
    }
}