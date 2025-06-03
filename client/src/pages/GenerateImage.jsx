import React, { useState } from "react";
import { motion } from "motion/react";

const GenerateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-[70vh]">
      {/* ✅ Shimmer UI while image is being generated */}
      {isGenerating && (
        <div className="bg-neutral-300 w-80 min-h-80 my-10 mx-auto animate-pulse rounded-xl"></div>
      )}

      {imageUrl && (
        <div className="bg-neutral-300 w-80 min-h-80 my-10 mx-auto rounded-xl">
          <img src={imageUrl} alt="" />
        </div>
      )}

      <motion.form
        onSubmit={onSubmitHandler}
        className="flex flex-col justify-center items-center"
        initial={{ opacity: 0.2, y: 100 }}
        transition={{ duration: 1 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        {!imageUrl && (
          <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-1 mt-20 rounded-full">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe what you want to generate"
              className="flex-1 bg-transparent outline-none ml-8 mr-2 max-sm:w-20 placeholder-style"
            />
            <button
              type="submit"
              className={`bg-zinc-900 px-10 sm:px-16 py-3 rounded-full ${
                isGenerating ? "opacity-50 cursor-not-allowed" : ""
              } `}
              disabled={isGenerating}
            >
              {isGenerating ? "Generating..." : "Generate"}
            </button>
          </div>
        )}
        {imageUrl && (
          <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-1 mt-10 rounded-full">
            <button className="bg-transparent border border-zinc-900 text-black  px-8 py-3 rounded-full cursor-pointer">
              Generate Another
            </button>
            <button className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer">
              <a href={imageUrl} download>
                Download
              </a>
            </button>
          </div>
        )}
      </motion.form>
    </div>
  );
};

export default GenerateImage;
