import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="bg-[#121212] w-full h-screen text-white p-5">
      <div className="bg-[#181818] flex w-full h-full rounded-md p-2">
        {/* Left side */}
        <div className="flex items-center justify-center flex-[0.5] w-full h-full">
          <div className="flex-col gap-3 justify-center max-w-[24rem]">
            <p className="font-bold text-2xl">Chat with our AI</p>
            <p className="mt-2 text-gray-600 mb-5">
              Get instant answers and support with our AI. Enjoy hands-free
              interaction with text-to-speech and speech-to-text features,
              making communication easier than ever!
            </p>
            <Link
              to={"/chat"}
              className="bg-black my-4 px-4 py-2 rounded-md duration-200 hover:bg-black/50"
            >
              Chat now
            </Link>
          </div>
        </div>
        {/* Right side */}
        <div className="flex border-l-2 border-l-slate-400 items-center justify-center flex-[0.5] w-full h-full">
          <div className="flex-col gap-3 justify-center max-w-[24rem]">
            <p className="font-bold text-2xl">Generate content from images</p>
            <p className="mt-2 text-gray-600 mb-5">
              Transform your images into engaging text effortlessly. Let our AI
              analyze and create captivating content tailored just for you.
            </p>
            <Link
              to={"/image"}
              className="bg-black my-4 px-4 py-2 rounded-md duration-200 hover:bg-black/50"
            >
              Generate now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
