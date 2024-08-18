import React, { useState, useEffect, useRef } from "react";
import { sendChat } from "../hooks/chat";
import BeatLoader from "react-spinners/BeatLoader.js";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "black",
};

const Chat = () => {
  const [prompt, setPrompt] = useState("");
  const [input, setInput] = useState("");
  const [text, setText] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const speechRef = useRef(null);

  const history = [];
  const [chat, setChat] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (inputText) => {
    const body = { prompt: inputText, history: chat };
    setPrompt(inputText);
    setInput("");
    const response = await sendChat(body);
    setText(response.payload);
    speakText(response.payload);
    history.push({ type: "user", content: inputText });
    history.push({ type: "model", content: response.payload });
    setChat((prev) => [...prev, ...history]);
    setLoading(false);
  };

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    setLoading(true);
    handleSubmit(input);
  };

  const speakText = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    setSpeaking(true);
    window.speechSynthesis.speak(utterance);

    utterance.onend = () => {
      setSpeaking(false);
    };
  };

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      return;
    }

    const speech = new webkitSpeechRecognition();
    speech.continuous = true;
    speech.lang = "en-US";

    speech.onresult = (event) => {
      const transcript = event.results[event.resultIndex][0].transcript;
      setInput(transcript);
      handleSubmit(transcript); // Automatically send after speech input
    };

    speech.onerror = (event) => {
      console.log("Error occurred in speech recognition:", event);
    };

    speech.onstart = () => {
      setListening(true);
    };

    speech.onend = () => {
      setListening(false);
    };

    speechRef.current = speech;

    return () => {
      speech.stop();
    };
  }, []);

  const toggleListening = () => {
    if (listening) {
      speechRef.current.stop();
    } else {
      speechRef.current.start();
    }
  };

  return (
    <div className="relative bg-transparent flex flex-col items-center justify-between h-screen w-full">
      <div className="mt-5">
        <Link
          to={"/"}
          className="font-semibold text-3xl text-center text-white"
        >
          <Typewriter
            options={{
              strings: [
                "Jarvis AI",
                "Your chat assistant",
                "Your hands-free voice assistant",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </Link>
      </div>
      <div className="bg-transparent rounded-xl min-w-[80%] min-h-[75%] max-w-[80%] overflow-y-auto">
        {/*prompt && (
          <p className="m-5 font-semibold text-xl bg-transparent-500 rounded-xl p-2 text-right text-white border border-white">
            {prompt}
          </p>
        )}
        {text ? (
          <p className="m-5 font-semibold text-xl bg-transparent-500 rounded-xl p-2 text-white border border-white">
            {text}
          </p>
        ) : (
          <p className="m-5 font-semibold text-xl bg-transparent-500 rounded-xl p-2 text-white border border-white">
            How can I help you?
          </p>
        )*/}
        {chat.length > 0 ? (
          chat.map((ele, index) => {
            return ele.type === "user" ? (
              <p
                key={index}
                className="bg-green-500/95 m-5 font-semibold text-xl bg-transparent-500 rounded-xl p-2 text-right text-white border border-white"
              >
                {ele.content}
              </p>
            ) : (
              <p
                key={index}
                className="bg-slate-500/95 m-5 font-semibold text-xl bg-transparent-500 rounded-xl p-2 text-white border border-white"
              >
                {ele.content}
              </p>
            );
          })
        ) : (
          <p className="m-5 font-semibold text-xl bg-transparent-500 rounded-xl p-2 text-white border border-white">
            How can I help you?
          </p>
        )}
      </div>

      <form
        autoComplete="off"
        className="flex gap-3 my-5"
        onSubmit={handleSubmitEvent}
      >
        <input
          type="text"
          name="prompt"
          value={input}
          autoFocus={true}
          placeholder="Type your question "
          onChange={(e) => setInput(e.target.value)}
          className="p-2 rounded-xl font-semibold text-xl bg-transparent border-white border-[1px] w-[30rem] text-white placeholder-white"
        />

        <button
          type="button"
          onClick={toggleListening}
          className="bg-transparent font-semibold px-6 py-2 hover:bg-blue-700 rounded-xl text-white border-white border"
        >
          {listening ? "Stop Listening" : "Start Listening"}
        </button>
        <button
          type="submit"
          className={`font-semibold px-6 py-2 hover:bg-green-700 rounded-xl text-white border-white border ${
            loading ? "bg-yellow-400" : "bg-transparent"
          }`}
        >
          {loading ? (
            <BeatLoader
              color={"#000000"}
              loading={loading}
              cssOverride={override}
              size={5}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "Send"
          )}
        </button>

        {/* {speaking && <p>Speaking...</p>}
        {listening && <p>Listening...</p>} */}
      </form>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default Chat;
