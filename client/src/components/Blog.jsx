import React from "react";
import { Link } from "react-router-dom";
import { useBlog } from "../context/postContext";

const Blog = () => {
  const { blogData } = useBlog();

  //

  return (
    <main className="container py-4 px-2 relative">
      <Link to="/">
        <div className="absolute md:fixed z-10 top-6 left-8 border-2 border-[#6998AB] hover:scale-95 p-2 rounded-full">
          <img src="back-arrow.svg" className="w-6 h-6" alt="" />
        </div>
      </Link>
      <div className="text-[#6998AB]  pt-12 md:pt-5 flex flex-col justify-around min-h-[40vh] mx-auto w-5/6">
        <div className="">
          <h2 className="text-xl md:text-3xl font-semibold">{blogData.name}</h2>
        </div>
        <div>
          <h4 className="text-lg md:text-xl">{blogData.description}</h4>
        </div>
        <div>
          <p className="text-base md:text-lg">{blogData.content}</p>
        </div>
      </div>
    </main>
  );
};

export default Blog;
