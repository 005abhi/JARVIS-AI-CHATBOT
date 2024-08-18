import React, { useState } from "react";
import "../App.css";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { uploadImage } from "../hooks/image";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      setImagePreview(URL.createObjectURL(selectedFile));
    } else {
      setImagePreview("");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setIsLoading(true);
    setUploadStatus(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await uploadImage(formData);
      console.log(response);
      setResponseText(response.data.response);
      setUploadStatus("success");
      toast("🐼 " + response.data.message);
    } catch (error) {
      console.error("Error uploading file", error);
      setResponseText("Error uploading file");
      setUploadStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen overflow-y-auto p-10 flex-col items-center justify-center bg-[#121212] text-white">
      
      <h1 className="text-white text-3xl font-semibold my-5">
        <Link
          to={"/"}
          className="font-semibold text-3xl text-center text-white"
        >
          <Typewriter
            options={{
              strings: [
                "Upload an Image",
                "Analyse image data",
                "Your one-stop solution",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </Link>
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="file-input-wrapper">
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            required
            id="file-input"
            aria-describedby="file-help"
          />
          <label htmlFor="file-input" className="file-input-label">
            ⬆️ <span>{file ? file.name : "Choose an image"}</span>
          </label>
          <small
            id="file-help"
            className="form-text text-muted text-md text-red-400"
          >
            *Accepts image files only.
          </small>
        </div>
        <button
          type="submit"
          className="bg-green-600 w-full font-semibold px-4 py-2 rounded-md"
          disabled={isLoading}
          aria-busy={isLoading}
          aria-disabled={isLoading}
        >
          {isLoading ? "Uploading..." : "Upload"}
        </button>
      </form>
      {isLoading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p>Uploading your image...</p>
        </div>
      )}
      <div className="result-container">
        {imagePreview && (
          <img src={imagePreview} alt="Preview" className="image-preview" />
        )}
        {uploadStatus && (
          <div className={`upload-status ${uploadStatus}`}>
            {uploadStatus === "success" ? "✅" : "⚠️"}
            <p>
              {uploadStatus === "success"
                ? "Upload successful!"
                : "Upload failed"}
            </p>
          </div>
        )}
        {responseText && (
          <p className="text-black bg-slate-400 px-2 py-2 rounded-md my-2">
            Generated response:{" "}
            <span className="font-semibold">{responseText}</span>
          </p>
        )}
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </div>
  );
};

export default FileUpload;
