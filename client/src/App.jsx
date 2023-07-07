import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PostProvider from "./context/postContext";
import CreatePost from "./pages/CreatePost";
import Blog from "./components/Blog";

const App = () => {
  return (
    <Router>
      <PostProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
      </PostProvider>
    </Router>
  );
};

export default App;
