import React from "react";
import { Link } from "react-router-dom";

const AddBtn = () => {
  return (
    <Link to="/create">
      <div className="mx-auto w-[20rem] text-center p-3 rounded-full bg-[#38A3A5]">
        Create Blog
      </div>
    </Link>
  );
};

export default AddBtn;
