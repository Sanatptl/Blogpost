import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";

const PostContext = createContext(null);
const BlogContext = createContext(null);
const ErrorContext = createContext(null);

const PostProvider = ({ children }) => {
  //post
  const [postData, setPostData] = useState([]);

  //blog
  const [blogData, setBlogData] = useState(
    JSON.parse(localStorage.getItem("blog")) || {}
  );

  //error
  const [showAlert, setShowAlert] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [errType, setErrType] = useState("");

  //

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/posts/${id}`);
      setPostData((prev) => prev.filter((el) => el._id !== id));
      setErrMsg("Blog deleted successfully");
      setErrType("success");
    } catch (error) {
      setErrMsg("request failed, Try after some time");
      setErrType("error");
    } finally {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    (async function () {
      try {
        const data = await axios.get(`${BASE_URL}/posts`);
        setPostData(data.data.data);
      } catch (err) {
        setErrMsg(
          "The server is currently unavailable. Please try again later."
        );
        setShowAlert(true);
      }
    })();
  }, []);

  const value = {
    postData,
    setPostData,
    handleDelete,
  };
  return (
    <PostContext.Provider value={value}>
      <BlogContext.Provider value={{ blogData, setBlogData }}>
        <ErrorContext.Provider
          value={{
            showAlert,
            setShowAlert,
            errMsg,
            setErrMsg,
            errType,
            setErrType,
          }}
        >
          {children}
        </ErrorContext.Provider>
      </BlogContext.Provider>
    </PostContext.Provider>
  );
};

export const useError = () => useContext(ErrorContext);
export const useBlog = () => useContext(BlogContext);
export const usePost = () => useContext(PostContext);

export default PostProvider;
