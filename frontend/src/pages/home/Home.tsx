import { Link } from "react-router-dom";
import { logoutPage } from "../../constants";
import Todo from "../todo/Todo";
import useAppState from "../../state";

const Home = () => {
  const userInfo = useAppState((state) => state.userInfo);

  if (!userInfo) {
    return <div>Chargement ...</div>;
  }

  return (
    <div className="w-screen h-auto bg-[#222936] flex justify-center items-start">
      <div className="w-9/10 h-screen flex flex-col gap-10 pt-10 items-center relative">
        <span className="text-md text-center font-semibold text-[#E83C75] bg-[#1a2230] px-3 py-2 rounded-full shadow-lg border border-[#E83C75] mb-6 animate-fade-in">
          👋 Bienvenue, <span className="text-[#FAEAE1]">{userInfo.name}</span>
        </span>
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
