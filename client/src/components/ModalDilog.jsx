import { useEffect, useRef, useState } from "react";
import Modal from "react-modal";
import { usePost } from "../context/postContext";
import axios from "axios";
import { BASE_URL } from "../utils";

Modal.setAppElement("#root");

function isSmallScreen() {
  if (typeof window !== "undefined") {
    return window.innerWidth < 768;
  }
  return false;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: isSmallScreen() ? "80vw" : "70vw",
    width: "90%",
    maxHeight: "100vh",
    overflowY: "auto",
    boxShadow: "0px 0px 20px 5px #0b0b0be6",
    backgroundColor: "#6998AB",
    minHeight: "80vh",
    borderWidth: "0",
    color: "#000",
  },
  overlay: {
    zIndex: "900",
    padding: "2rem",
    backgroundColor: "rgba(20, 20, 20, 0.6)",
  },
};

const ModalDilog = ({ isModalOpen, setIsModalOpen, post }) => {
  const titleInput = useRef();
  const [updatePost, setUpdatePost] = useState(post);
  const { setPostData } = usePost();

  useEffect(() => {
    titleInput.current?.focus();
  }, []);

  function closeModal() {
    setIsModalOpen(false);
  }

  //

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatePost((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const doc = await axios.patch(
        `${BASE_URL}/posts/${post._id}`,
        updatePost
      );
      setPostData((prev) =>
        prev.map((postDoc) => {
          if (postDoc._id == post._id) return doc.data.updatedDoc;
          return postDoc;
        })
      );
    } catch (err) {
    } finally {
      setIsModalOpen(false);
    }
  };

  //

  //

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      //   shouldCloseOnOverlayClick={false}
    >
      <form onSubmit={handleSubmit} className="py-8">
        <div className="mb-4">
          <input
            ref={titleInput}
            className="form_inputs focus:shadow-[#116A7B] font-semibold"
            id="name"
            type="text"
            placeholder="Your Blog Title"
            autoComplete="off"
            name="name"
            onChange={handleChange}
            value={updatePost.name}
          />
        </div>
        <div className="mb-4">
          <textarea
            className="form_inputs focus:shadow-[#116A7B]"
            id="description"
            rows={2}
            placeholder="Enter a description"
            name="description"
            onChange={handleChange}
            value={updatePost.description}
          ></textarea>
        </div>
        <div className="mb-4">
          <textarea
            className="form_inputs focus:shadow-[#116A7B]"
            id="content"
            name="content"
            rows={10}
            placeholder="Enter the body of the blog"
            onChange={handleChange}
            value={updatePost.content}
          ></textarea>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="hover:bg-[#F15A59] border-[#F15A59] border-2 bg-transparent text-[#F15A59] hover:text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            Cancel
          </button>
          <button
            className={` hover:bg-[#38E54D] bg-[#55E0A3] text-black font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline `}
            type="submit"
            // disabled={isLoading}
            //
          >
            save
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalDilog;
