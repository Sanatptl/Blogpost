import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils";
import { useError, usePost } from "../context/postContext";
import AlertWindow from "../components/Alert/AlertWindow";

const CreatePost = () => {
  const [newPost, setNewPost] = useState({
    name: "",
    description: "",
    content: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { setPostData } = usePost();
  const { setErrMsg, errMsg, showAlert, setShowAlert, errType, setErrType } =
    useError();

  //

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const doc = await axios.post(`${BASE_URL}/posts`, newPost);
      setPostData((prev) => {
        prev.unshift(doc.data.data);
        return prev;
      });
      setErrType("success");
      setErrMsg("Blog created successfully!");
      setNewPost({
        name: "",
        description: "",
        content: "",
      });
      setTimeout(() => {
        setIsLoading(false);
        navigate("/");
      }, 1000);
    } catch (err) {
      setErrType("error");
      if (err.name === "AxiosError") {
        setErrMsg(err.response.data.message);
      } else {
        setErrMsg(err.message);
      }
      setIsLoading(false);
    } finally {
      setShowAlert(true);
    }
  };

  //

  //

  return (
    <div className="min-h-screen">
      <AlertWindow
        show={showAlert}
        setShow={setShowAlert}
        msg={errMsg}
        type={errType}
      />
      <div className="container text-[#6998AB] mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <form onSubmit={handleSubmit} className="py-8">
          <div className="mb-4">
            <label className="block font-bold mb-2 text-lg" htmlFor="name">
              Title
            </label>
            <input
              className="form_inputs font-semibold"
              id="name"
              type="text"
              placeholder="Your Blog Title"
              autoComplete="off"
              name="name"
              onChange={handleChange}
              value={newPost.name}
            />
          </div>
          <div className="mb-4">
            <label
              className="block font-bold mb-2 text-lg"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="form_inputs"
              id="description"
              rows={2}
              placeholder="Enter a description"
              name="description"
              onChange={handleChange}
              value={newPost.description}
            ></textarea>
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2 text-lg" htmlFor="content">
              Content
            </label>
            <textarea
              className="form_inputs"
              id="content"
              name="content"
              rows={10}
              placeholder="Enter the body of the blog"
              onChange={handleChange}
              value={newPost.content}
            ></textarea>
          </div>
          <div className="flex items-center justify-between">
            <Link to="/">
              <button
                className="bg-[#F15A59] hover:bg-[#E21818] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Cancel
              </button>
            </Link>
            <button
              className={`bg-[#38A3A5] ${
                isLoading ? "" : "hover:bg-[#03C988]"
              } text-black py-2 px-4 rounded focus:outline-none focus:shadow-outline `}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <img
                  src="loader.svg"
                  className={`w-16 h-6 ${isLoading ? "animate-spin" : ""}`}
                />
              ) : (
                "Add Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
