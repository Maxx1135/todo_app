import { Link } from "react-router-dom";
import { logoutPage } from "../../constants";
import Todo from "../todo/Todo";

const Home = () => {
  return (
    <div className="w-screen h-screen bg-[#222936] flex justify-center items-start">
      <div className="w-9/10 h-auto flex flex-col gap-10 pt-10 items-center relative">
        <div className="text-4xl text-[#FAEAE1] w-full text-center p-5 font-bold">
          To do app
        </div>

        <div className="w-8/10">
          <Todo />
        </div>
        <button className="absolute top-4 right-4 bg-[#E83C75] text-[#FAEAE1] px-3 py-1 rounded hover:bg-[#3b4f7a] transition-colors duration-300 text-lg">
          <Link to={logoutPage}>Log out</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
