import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  useAddTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateTodo,
} from "../../hooks/tables/todos/hooks";
import type { TodoAttrT } from "../../hooks/tables/todos/schema";
import useAppState from "../../state";
import { useState } from "react";

const Todo = () => {
  const { userInfo } = useAppState();
  const { data: todos, isLoading } = useGetTodos(userInfo?.id || "");
  const addTodo = useAddTodo();
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();

  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editingTodo, setEditingTodo] = useState<TodoAttrT | null>(null);

  const handleAdd = () => {
    if (!input.trim() || !userInfo?.id) return;
    addTodo.mutate({ user_id: userInfo.id, title: input });
    setInput("");
  };

  const handleDelete = (id: string) => {
    deleteTodo.mutate(id);
  };

  const handleEdit = (todo: TodoAttrT) => {
    setEditingTodo(todo);
    setEditInput(todo.title);
  };

  const handleUpdate = () => {
    if (!editingTodo || !editInput.trim() || !editingTodo.id) return;
    updateTodo.mutate({
      todoId: editingTodo.id,
      newData: { title: editInput },
    });
    setEditingTodo(null);
  };

  return (
    <div className="w-full p-5 rounded shadow">
      <div className="flex gap-5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ajouter une tâche"
          className="border p-2 rounded"
        />
        <button onClick={handleAdd} className="p-2">
          Ajouter
        </button>
      </div>

      <div className="pt-10">
        <span>Mes tâches</span>
      </div>
      {isLoading ? (
        <p>Chargement...</p>
      ) : (
        <ul>
          {todos?.map((todo: TodoAttrT) => (
            <li key={todo.id} className="flex justify-between items-center">
              <span>{todo.title}</span>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => handleEdit(todo)}>
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => todo.id && handleDelete(todo.id)}
                  disabled={!todo.id}
                >
                  Supprimer
                </Button>

                <AlertDialog
                  open={!!editingTodo}
                  onOpenChange={(open) => !open && setEditingTodo(null)}
                >
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Modifier la tâche</AlertDialogTitle>
                    </AlertDialogHeader>
                    <Input
                      value={editInput}
                      onChange={(e) => setEditInput(e.target.value)}
                      placeholder="Nouveau titre"
                    />
                    <AlertDialogFooter className="mt-4 flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setEditingTodo(null)}
                      >
                        Annuler
                      </Button>
                      <Button onClick={handleUpdate}>Enregistrer</Button>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Todo;
