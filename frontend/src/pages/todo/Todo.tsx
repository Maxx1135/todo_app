import { Button } from "../../components/ui/button";
import { useAddTodo, useGetTodos } from "../../hooks/tables/todos/hooks";
import type { TodoT } from "../../hooks/tables/todos/schema";
import useAppState from "../../state";
import { useState } from "react";

const Todo = () => {
  const userInfo = useAppState((state) => state.userInfo);
  const userId = userInfo?.id || "";
  const { data: todos, isLoading } = useGetTodos(userId);
  const addTodo = useAddTodo(userInfo?.id || "");

  const [input, setInput] = useState("");

  const handleAdd = () => {
    if (!input.trim() || !userId) return;
    addTodo.mutate({ title: input });
    setInput("");
  };

  if (!userId) return <p>Chargement utilisateur...</p>;
  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[#222936] rounded-lg border-2 border-gray-200 shadow-sm">
      <div className="flex gap-3">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ajouter une tâche"
          className="flex-1 border text-white  border-gray-300 px-3  rounded-md  transition"
        />
        <Button
          type="button"
          onClick={handleAdd}
          className="px-4 py-4 rounded-md bg-[#FAEAE1] text-[#222936] hover:bg-[#E83C75] hover:text-white cursor-pointer transition-colors duration-300 text-lg"
        >
          Ajouter
        </Button>
      </div>

      {isLoading ? (
        <p className="mt-6 text-gray-400 text-center">Chargement...</p>
      ) : (
        <ul className="mt-6 space-y-2">
          {todos && todos.length ? (
            todos.map((todo: TodoT) => (
              <li
                key={todo.id}
                className="px-4 py-2 rounded-md border border-gray-100 bg-gray-50 text-gray-800"
              >
                {todo.title}
              </li>
            ))
          ) : (
            <li className="text-gray-400 italic text-center">Aucune tâche.</li>
          )}
        </ul>
      )}
    </div>
  );
};

export default Todo;
