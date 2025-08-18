import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  useAddTodo,
  useCompleteTodo,
  useDeleteTodo,
  useGetTodos,
  useUpdateTodo,
} from "../../hooks/tables/todos/hooks";
import { type TodoT } from "../../hooks/tables/todos/schema";
import useAppState from "../../state";
import { useState } from "react";

const Todo = () => {
  const userInfo = useAppState((state) => state.userInfo);
  const userId = userInfo!.id!;
  const { data: todos, isLoading } = useGetTodos(userId);
  const addTodo = useAddTodo(userId);
  const deleteTodo = useDeleteTodo();
  const updateTodo = useUpdateTodo();
  const completeTodo = useCompleteTodo();

  const [input, setInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editingTodo, setEditingTodo] = useState<TodoT | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [editError, setEditError] = useState("");
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);

  const handleAdd = () => {
    if (!input.trim() || !userId) return;
    addTodo.mutate({ title: input, user_id: userId });
    setInput("");
  };

  const handleDelete = (id: string) => {
    deleteTodo.mutate(id);
  };

  const handleEdit = (todo: TodoT) => {
    setEditingTodo(todo);
    setEditInput(todo.title);
    setIsOpen(true);
  };

  const handleUpdate = () => {
    if (!editingTodo) return;

    if (!editInput.trim()) {
      setEditError("Champ obbligatoire");
      return;
    }

    updateTodo.mutate(
      {
        todoId: editingTodo.id,
        newData: { title: editInput },
      },
      {
        onSuccess: () => {
          setEditingTodo(null);
          setIsOpen(false);
          setEditError("");
        },
      }
    );
  };

  const handleComplete = (todoId: string) => {
    completeTodo.mutate(todoId);
  };

  if (!userId) return <p>Chargement utilisateur...</p>;
  return (
    <div>
      <span>
        <Button
          type="button"
          onClick={() => setIsCompleteOpen(true)}
          className="px-4 py-4 rounded-md bg-blue-200 text-[#222936] hover:bg-blue-300 cursor-pointer transition-colors duration-300 text-lg"
        >
          Voir les tâches accomplies
        </Button>
      </span>
      <div className="w-3/4 mx-auto p-6 bg-[#222936] rounded-lg border-2 border-gray-200 shadow-sm">
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

        {/* Liste des tâches non accomplies */}
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
                          setIsOpen(true);
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
                    </div>
                  </li>
                ))
            ) : (
              <li className="text-gray-400 italic text-center">
                Aucune tâche.
              </li>
            )}
          </ul>
        )}

        {/* Modal pour modifier la tâche */}
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogTrigger asChild></AlertDialogTrigger>

          <AlertDialogContent className="bg-[#FAEAE1] ">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[#E83C75] ">
                Modifier la tâche
              </AlertDialogTitle>
            </AlertDialogHeader>
            <AlertDialogDescription>
              Changez le titre de votre tâche puis cliquez sur "Enregistrer"
              pour appliquer la modification.
            </AlertDialogDescription>
            <Input
              value={editInput}
              onChange={(e) => setEditInput(e.target.value)}
              placeholder="Nouveau titre"
            />
            {editError && (
              <span className="text-red-500 text-sm mt-1">{editError}</span>
            )}
            <AlertDialogFooter className="mt-4 flex justify-end gap-2">
              <AlertDialogCancel className="cursor-pointer bg-red-400 hover:bg-red-500 text-white">
                Annuler
              </AlertDialogCancel>
              <Button
                type="button"
                onClick={handleUpdate}
                className="cursor-pointer bg-green-400 hover:bg-green-500 text-white"
              >
                Enregistrer
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Modal pour afficher la liste des tâches accomplies */}
        <AlertDialog open={isCompleteOpen} onOpenChange={setIsCompleteOpen}>
          <AlertDialogContent className="bg-[#FAEAA1]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-[#222936] ">
                Tâches accomplies
              </AlertDialogTitle>
              <AlertDialogDescription>
                Voici la liste de vos tâches déjà terminées.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <div className="max-h-80 overflow-auto mt-2">
              {todos && todos.filter((t) => t.completed).length ? (
                <ul className="space-y-2">
                  {todos
                    .filter((t) => t.completed)
                    .map((t) => (
                      <li
                        key={t.id}
                        className="p-2 rounded-md border-emerald-300 bg-emerald-50 text-gray-800 flex items-center justify-between"
                      >
                        <span>{t.title}</span>
                        <Button
                          className="bg-red-300 hover:bg-red-400 cursor-pointer"
                          onClick={() => t.id && handleDelete(t.id)}
                        >
                          ❌
                        </Button>
                      </li>
                    ))}
                </ul>
              ) : (
                <span className="text-gray-500 italic">
                  Aucune tâche accomplie pour l'instant.
                </span>
              )}
            </div>

            <AlertDialogFooter className="mt-4">
              <AlertDialogCancel className="cursor-pointer bg-gray-300 hover:bg-gray-400">
                Fermer
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
};

export default Todo;

// Bonjour j'alme jusre==te ==== ube
// Ce n'est pas Je dois juste me focxys une peu poiur ne pas faire de faute quand j'écrit quelques chsoes. Ce n'est pzs silpler
