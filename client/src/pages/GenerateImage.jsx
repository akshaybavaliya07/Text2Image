import React, { useState } from "react";
import { motion } from "motion/react";
import { useImageGenerator } from "../hooks/useImageGenerator";
import { useLocation } from "react-router-dom";

const GenerateImage = () => {
  const [prompt, setPrompt] = useState("");
  const [imageUrl, setImageUrl] = useState(initialImageUrl);
  const [loading, setLoading] = useState(false);

  const { generateImage } = useImageGenerator();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    const image = await generateImage(prompt);
    if (image) setImageUrl(image);
    setLoading(false);
  };

  return (
    <div className="min-h-[70vh]">
      {/* ✅ Shimmer UI while image is being generated */}
      {loading && (
        <div className="bg-neutral-300 w-80 min-h-80 my-10 mx-auto animate-pulse rounded-xl"></div>
      )}

      {imageUrl && (
        <div className="bg-neutral-300 w-80 min-h-80 my-10 mx-auto rounded-lg overflow-hidden">
          <img src={imageUrl} alt="" className="w-full h-full object-cover" />
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
              required
            />
            <button
              type="submit"
              className={`bg-zinc-900 px-10 sm:px-16 py-3 rounded-full ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              } `}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate"}
            </button>
          </div>
        )}
        {imageUrl && (
          <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-1 mt-10 rounded-full">
            <button
              className="bg-transparent border border-zinc-900 text-black  px-8 py-3 rounded-full cursor-pointer"
              onClick={() => {
                setImageUrl("");
                setPrompt("");
              }}
            >
              Generate Another
            </button>
            <a
              href={imageUrl} download
              className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer text-white text-center"
            >
              Download
            </a>
          </div>
        )}
      </motion.form>
    </div>
  );
};

export default GenerateImage;
