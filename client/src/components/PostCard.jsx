import { useState } from "react";
import { useBlog, usePost } from "../context/postContext";
import ModalDilog from "./ModalDilog";
import { useNavigate } from "react-router-dom";

const PostCard = ({ post }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleDelete } = usePost();
  const navigate = useNavigate();
  const { setBlogData } = useBlog();

  //

  const date = new Date(post.createdAt).toLocaleString("en-IN", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  //

  const goToBlog = () => {
    setBlogData(post);
    localStorage.setItem("blog", JSON.stringify(post));
    navigate("/blog");
  };

  //

  return (
    <div className="relative group bg-[#6998AB] min-h-[6rem] mb-4 px-5 py-5 rounded flex flex-col justify-between">
      <ModalDilog
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        post={post}
      />
      <div className="w-9 md:w-12 flex justify-between md:hidden md:group-hover:flex absolute top-2 right-2">
        <div className="hover:scale-110" onClick={() => setIsModalOpen(true)}>
          <img
            className="w-5 h-5 max-md:w-4 max-md:h-4"
            src="edit.svg"
            alt="edit"
          />
        </div>
        <div className="hover:scale-110" onClick={() => handleDelete(post._id)}>
          <img
            className="md:w-5 md:h-5 h-4 w-4"
            src="delete.svg"
            alt="delete"
          />
        </div>
      </div>
      <p className="text-xl mb-2 font-semibold">{post.name}</p>
      <p className="font-medium ">{post.description}</p>
      <div className="flex justify-between items-end">
        <p className="text-xs">{date}</p>
        <p className="hover:font-semibold hover:scale-95" onClick={goToBlog}>
          read more
        </p>
      </div>
    </div>
  );
};

export default PostCard;
