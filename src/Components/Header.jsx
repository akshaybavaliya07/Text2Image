import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center text-center my-20">
      <div className="text-stone-500 inline-flex text-center gap-2 rounded-full border border-neutral-500 px-6 py-1 bg-white">
        <p>Best text to image generator</p>
        <img src="/images/star_icon.svg" alt="star_icon" />
      </div>

      <h1 className="text-4xl sm:text-7xl max-w-[300px] sm:max-w-[590px] mt-10 mx-auto text-center">
        Turn text to <span className="text-blue-600 ">image</span>, in seconds.
      </h1>

      <p className="text-center max-w-xl mx-auto mt-5">
        Unlease your creativity with AI, Turn your imagination into visual art
        in seconds - just type, and watch the magic happens
      </p>

      <Link to="/generate">
        <button className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full hover:scale-105 transition-all duration-500">
          Generate Images
          <img className="h-6" src="/images/star_group.png" alt="star_group" />
        </button>
      </Link>

      {/* previous generated images */}
      <div className="flex flex-wrap justify-center gap-3 mt-16">
        {Array(6)
          .fill("")
          .map((item, index) => (
            <img
              key={index}
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
              src={
                index % 2 === 0
                  ? "/images/sample_img_1.png"
                  : "/images/sample_img_2.png"
              }
              alt="generated_images"
              width={70}
            />
          ))}
      </div>

      <p className="text-neutral-600 mt-2">Previous generated images</p>
    </div>
  );
};

export default Header;
