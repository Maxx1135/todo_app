import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Button } from "../../components/ui/button";
import { useDeleteTodo, useGetTodos } from "../../hooks/tables/todos/hooks";
import useAppState from "../../state";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CompletedTodosModal = ({ isOpen, setIsOpen }: Props) => {
  const userInfo = useAppState((state) => state.userInfo);
  const userId = userInfo!.id!;
  const deleteTodo = useDeleteTodo();
  const { data: todos } = useGetTodos(userId);

  const handleDelete = (id: string) => {
    deleteTodo.mutate(id);
  };

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
  );
};

export default CompletedTodosModal;
