import { useState } from "react";
import useTodoForm from "../state";
import type { Todo } from "../state";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Input } from "./ui/input";

interface Props {
  todo: Todo;
}

const ToDoForm = ({ todo }: Props) => {
  const { toggleTodo, deleteTodo, updateTodo } = useTodoForm();
  const [newText, setNewText] = useState(todo.text);
  const [open, setOpen] = useState(false);

  const handleUpdate = () => {
    if (newText.trim() === "") return;
    updateTodo(todo.id, newText);
    setOpen(false);
  };

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
      <div className="flex gap-2">
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" onClick={() => setOpen(true)}>
              Modifier
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Modifier la tâche</AlertDialogTitle>
            </AlertDialogHeader>
            <Input
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
            />
            <AlertDialogFooter>
              <Button className="text-red-500" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleUpdate} className="text-green-600">
                Enregistrer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          variant="destructive"
          className="text-red-500"
          onClick={() => deleteTodo(todo.id)}
        >
          Supprimer
        </Button>
      </div>
    </div>
  );
};

export default ToDoForm;
