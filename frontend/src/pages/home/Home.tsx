import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import useTodoStore from "../../state";
import ToDoForm from "../../components/ToDoForm";

const Home = () => {
  const [text, setText] = useState("");
  const { todos, addTodo } = useTodoStore();

  const handleAdd = () => {
    if (text.trim() === "") return;
    addTodo(text);
    setText("");
  };
  return (
    <div className="w-screen h-screen  flex justify-center">
      <div className="w-2/3 h-auto flex flex-col gap-10 pt-10 items-center  ">
        <div className="text-3xl text-[#536895]  w-full text-center p-5 font-bold">
          To do app
        </div>
        <div className="flex gap-5">
          <Input
            placeholder="Ajouter une tâche..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <Button onClick={handleAdd} className="text-black">
            Ajouter
          </Button>
        </div>

        <div className="bg-white w-2/3">
          {todos.length === 0 ? (
            <p className="text-gray-500 text-start">Aucune tâche.</p>
          ) : (
            todos.map((todo) => <ToDoForm key={todo.id} todo={todo} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
