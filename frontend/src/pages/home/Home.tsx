import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { logoutPage } from "../../constants";
// import useTodoStore from "../../state";
// import ToDoForm from "../../components/ToDoForm";

const Home = () => {
  const [text, setText] = useState("");
  // const { todos, addTodo } = useTodoStore();

  const handleAdd = () => {
    if (text.trim() === "") return;
    // addTodo(text);
    setText("");
  };
  return (
    <div className="w-screen h-screen  bg-[#D3D3D3] flex justify-center">
      <div className="w-2/3 h-auto flex flex-col gap-10 pt-10 items-center  ">
        <div className="text-4xl text-[#536895] w-full text-center p-5 font-bold">
          To do app
        </div>
        <div className="flex gap-5">
          <Input
            className="pl-5 pr-5"
            placeholder="Ajouter une tâche..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handleAdd} className="text-black ">
            Ajouter
          </Button>
        </div>

        {/* <div className=" w-2/3">
          <div className="">
            {todos.length === 0 ? (
              <span className="text-gray-500 text-start">Aucune tâche.</span>
            ) : (
              todos.map((todo) => <ToDoForm key={todo.id} todo={todo} />)
            )}
          </div>
        </div> */}
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
