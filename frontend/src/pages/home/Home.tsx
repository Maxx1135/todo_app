import { Link } from "react-router-dom";
import { logoutPage } from "../../constants";
import Todo from "../todo/Todo";

const Home = () => {
  return (
    <div className="w-screen h-screen  bg-[#D3D3D3] flex justify-center">
      <div className="w-2/3 h-auto flex flex-col gap-10 pt-10 items-center  ">
        <div className="text-4xl text-[#536895] w-full text-center p-5 font-bold">
          To do app
        </div>

        <div>
          <Todo />
        </div>
      </div>
      <div className="pt-5">
        <button className="bg-[#536895] text-white px-4 py-2 rounded hover:bg-[#3b4f7a] transition-colors duration-300">
          <Link to={logoutPage}>Se déconnecter</Link>
        </button>
      </div>
    </div>
  );
};

export default Home;
