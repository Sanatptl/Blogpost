import { useState, useContext, createContext, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils";

const PostContext = createContext(null);
const BlogContext = createContext(null);

const PostProvider = ({ children }) => {
  const [postData, setPostData] = useState([]);
  const [blogData, setBlogData] = useState(
    JSON.parse(localStorage.getItem("blog")) || {}
  );
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${BASE_URL}/posts/${id}`);
      setPostData((prev) => prev.filter((el) => el._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async function () {
      const data = await axios.get(`${BASE_URL}/posts`);
      setPostData(data.data.data);
    })();
  }, []);

  const value = { postData, setPostData, handleDelete };
  return (
    <PostContext.Provider value={value}>
      <BlogContext.Provider value={{ blogData, setBlogData }}>
        {children}
      </BlogContext.Provider>
    </PostContext.Provider>
  );
};

export const useBlog = () => useContext(BlogContext);
export const usePost = () => useContext(PostContext);

export default PostProvider;
