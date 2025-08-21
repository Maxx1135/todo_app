import { Button } from "../../components/ui/button";
import useAppState from "../../state";
import { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import CompletedTodosModal from "./CompletedTodosModal";
import SharedTodosModal from "./SharedTodosModal";
import EditTodoModal from "./EditTodoModal";
import ShareTodoModal from "./ShareTodoModal";
import { useGetTodos } from "../../hooks/tables/todos/hooks";
import type { TodoT } from "../../hooks/tables/todos/schema";

const Todo = () => {
  const userInfo = useAppState((state) => state.userInfo);
  const userId = userInfo!.id!;

  const { data: todos, isLoading } = useGetTodos(userId);

  const [input, setInput] = useState("");
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isSharedOpen, setIsSharedOpen] = useState(false);
  const [isTodoSharedOpen, setTodoIsSharedOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoT | null>(null);
  const [editInput, setEditInput] = useState("");
  const [currentTodoId, setCurrentTodoId] = useState<string | null>(null);

  if (!userId) return <p>Chargement utilisateur...</p>;
  return (
    <div className="w-auto h-full flex flex-col h-full gap-5 items-center overflow-x-hidden ">
      <div className="w-3/4 mx-auto p-6 bg-[#222936] rounded-lg border-2 border-gray-200 shadow-sm">
        {/* Champ d'ajout */}
        <TodoInput setInput={setInput} input={input} userId={userId} />

        {/* Liste des tâches */}
        <TodoList
          todos={todos ?? []}
          isLoading={isLoading}
          setIsEditOpen={setIsEditOpen}
          setIsSharedOpen={setIsSharedOpen}
          setEditingTodo={setEditingTodo}
          setEditInput={setEditInput}
          setCurrentTodoId={setCurrentTodoId}
        />
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          onClick={() => setIsCompleteOpen(true)}
          className="rounded-md bg-blue-200 text-[#222936] hover:bg-blue-300 cursor-pointer transition-colors duration-300"
        >
          Voir les tâches accomplies
        </Button>
        <Button
          type="button"
          onClick={() => setTodoIsSharedOpen(true)}
          className="rounded-md bg-green-200 text-[#222936] hover:bg-green-300 cursor-pointer transition-colors duration-300"
        >
          Voir les tâches partagées.
        </Button>
      </div>

      {/* Modales */}
      <CompletedTodosModal
        isOpen={isCompleteOpen}
        setIsOpen={setIsCompleteOpen}
      />
      <SharedTodosModal
        isOpen={isTodoSharedOpen}
        setIsOpen={setTodoIsSharedOpen}
      />
      <EditTodoModal
        isOpen={isEditOpen}
        setIsOpen={setIsEditOpen}
        editingTodo={editingTodo}
        editInput={editInput}
        setEditInput={setEditInput}
      />
      <ShareTodoModal
        isOpen={isSharedOpen}
        setIsOpen={setIsSharedOpen}
        todoId={currentTodoId}
      />
    </div>
  );
};

export default Todo;
