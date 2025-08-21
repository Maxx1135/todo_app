import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import useAppState from "../../state";
import { useGetSharedTodos } from "../../hooks/tables/todoShares/hooks";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SharedTodosModal = ({ isOpen, setIsOpen }: Props) => {
  const userInfo = useAppState((state) => state.userInfo);
  const userId = userInfo!.id!;
  const { data: todos, isLoading } = useGetSharedTodos(userId);

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="bg-[#FAEAE1] ">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#222936] ">
              Tâches partagées avec vous
            </AlertDialogTitle>
            <AlertDialogDescription>
              Voici la liste des tâches que d'autres utilisateurs ont partagées
              avec vous
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="max-h-80 overflow-auto mt-2">
            {isLoading ? (
              <span className="text-gray-500">Chargement...</span>
            ) : todos && todos.length ? (
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li key={`${todo.todo_id}-${todo.shared_by}`}>
                    <span className="text-sm text-gray-500">
                      {todo.shared_by || "Utilisateur inconnu"}
                    </span>

                    <div className="p-2 rounded-md border border-blue-300 bg-blue-50 text-gray-800 flex items-center justify-between">
                      {todo.Todos?.title}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="text-gray-500 italic">
                Aucune tâche partagée avec vous pour l'instant.
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

export default SharedTodosModal;
