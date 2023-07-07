import PostCard from "./PostCard";
import AddBtn from "./AddBtn";
import { usePost } from "../context/postContext";

const Home = () => {
  const { postData } = usePost();
  return (
    <div className="container min-h-[200vh] py-4 px-2">
      <h1 className="text-3xl text-[#6998AB] font-bold text-default text-center">
        BLOG
      </h1>
      {postData?.map((post) => (
        <div key={post._id} className="mt-5 w-[85%] md:w-[70%] mx-auto">
          <PostCard post={post} />
        </div>
      ))}
      <AddBtn />
    </div>
  );
};

export default Home;
