import PostCard from "./PostCard";
import AddBtn from "./AddBtn";
import { useError, usePost } from "../context/postContext";
import AlertWindow from "./Alert/AlertWindow";

const Home = () => {
  const { postData = [] } = usePost();
  const { showAlert, setShowAlert, errMsg, errType } = useError();
  return (
    <>
      <AlertWindow
        show={showAlert}
        setShow={setShowAlert}
        msg={errMsg}
        type={errType}
      />
      <div className="container min-h-[200vh] py-4 px-2">
        <h1 className="text-2xl md:text-3xl max-md:mb-12 text-[#6998AB] font-bold text-default text-center">
          UpForceTech's Task to Blog Management
        </h1>
        {postData?.map((post) => (
          <div key={post._id} className="mt-5 w-[85%] md:w-[70%] mx-auto">
            <PostCard post={post} />
          </div>
        ))}
        <AddBtn />
      </div>
    </>
  );
};

export default Home;
