import { Button } from "../../components/ui/button";
import { useCompleteTodo, useDeleteTodo } from "../../hooks/tables/todos/hooks";
import type { TodoT } from "../../hooks/tables/todos/schema";
import useAppState from "../../state";

interface Props {
  todos: TodoT[];
  isLoading: boolean;
  setIsEditOpen: (open: boolean) => void;
  setIsSharedOpen: (open: boolean) => void;
  setEditingTodo: (todo: TodoT | null) => void;
  setEditInput: (input: string) => void;
  setCurrentTodoId: (id: string | null) => void;
}

const TodoList = ({
  todos,
  isLoading,
  setIsEditOpen,
  setIsSharedOpen,
  setEditingTodo,
  setEditInput,
  setCurrentTodoId,
}: Props) => {
  const userInfo = useAppState((state) => state.userInfo);
  const userId = userInfo!.id!;

  const deleteTodo = useDeleteTodo();
  const completeTodo = useCompleteTodo();
  const handleDelete = (id: string) => {
    deleteTodo.mutate(id);
  };

  const handleEdit = (todo: TodoT) => {
    setEditingTodo(todo);
    setEditInput(todo.title);
    setIsEditOpen(true);
  };

  const handleComplete = (todoId: string) => {
    completeTodo.mutate(todoId);
  };

  const handleShare = async (todoId: string) => {
    if (!userId || !todoId) return;
    setCurrentTodoId(todoId);
    setIsSharedOpen(true);
  };
  return (
    <div>
      {isLoading ? (
        <span className="mt-6 text-gray-400 text-center">Chargement...</span>
      ) : (
        <ul className="mt-6 space-y-4">
          {todos && todos.filter((todo) => !todo.completed).length ? (
            todos
              .filter((todo) => !todo.completed)
              .map((todo: TodoT) => (
                <li
                  key={todo.id}
                  className="p-2 flex justify-between rounded-md border border-[#E83C75] bg-[#FAEAE1] text-gray-800"
                >
                  <span className="pt-1">{todo.title}</span>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => {
                        handleEdit(todo);
                      }}
                      className="cursor-pointer bg-yellow-200 hover:bg-yellow-300"
                    >
                      ✎
                    </Button>
                    <Button
                      className="bg-red-300 hover:bg-red-400 cursor-pointer"
                      onClick={() => todo.id && handleDelete(todo.id)}
                      disabled={!todo.id}
                    >
                      ❌
                    </Button>
                    <Button
                      onClick={() => todo.id && handleComplete(todo.id)}
                      className="bg-blue-300 hover:bg-blue-400 cursor-pointer"
                    >
                      ✅
                    </Button>
                    <Button
                      onClick={() => todo.id && handleShare(todo.id)}
                      className="bg-green-300 hover:bg-green-400 cursor-pointer"
                    >
                      🔗
                    </Button>
                  </div>
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

export default TodoList;
