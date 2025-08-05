import useTodoForm from "../state";
import type { Todo } from "../state";
import { Button } from "./ui/button";

interface Props {
  todo: Todo;
}

const ToDoForm = ({ todo }: Props) => {
  const { toggleTodo, deleteTodo } = useTodoForm();

  return (
    <div className="flex justify-between items-center border p-2 rounded mb-2">
      <span
        onClick={() => toggleTodo(todo.id)}
        className={`cursor-pointer ${
          todo.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {todo.text}
      </span>
      <Button
        variant="destructive"
        className="text-red-500"
        onClick={() => deleteTodo(todo.id)}
      >
        Supprimer
      </Button>
    </div>
  );
};

export default ToDoForm;
