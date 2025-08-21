import { useEffect, useState } from "react";
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
import useAppState from "../../state";
import { useShareTodo } from "../../hooks/tables/todoShares/hooks";
import Supabase from "../../lib/supabase";
import { profilesTable } from "../../constants";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  todoId: string | null;
}

const ShareTodoModal = ({ isOpen, setIsOpen, todoId }: Props) => {
  const userInfo = useAppState((state) => state.userInfo);
  const userId = userInfo!.id!;
  const shareTodo = useShareTodo();

  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [usersList, setUsersList] = useState<{ id: string; name: string }[]>(
    []
  );
  const [error, setError] = useState("");

  // Charger tous les utilisateurs
  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await Supabase.from(profilesTable).select(
        "id, name"
      );

      if (error) {
        console.error("Erreur chargement utilisateurs :", error.message);
        return;
      }

      // Exclure soi-même
      const filtered = data.filter((u) => u.id !== userId);
      setUsersList(filtered);
    };

    if (isOpen) fetchUsers();
  }, [isOpen, userId]);

  const handleConfirmShare = async () => {
    if (!todoId || !selectedUserId) {
      setError("Veuillez sélectionner un utilisateur");
      return;
    }

    shareTodo.mutate({
      todo_id: todoId,
      shared_with: selectedUserId,
      shared_by: userId,
    });

    setSelectedUserId("");
    setError("");
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="bg-[#FAEAE1]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-[#222936]">
            Partager la tâche
          </AlertDialogTitle>
          <AlertDialogDescription>
            Sélectionnez l'utilisateur avec qui partager cette tâche
          </AlertDialogDescription>
        </AlertDialogHeader>

        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="w-full p-2 rounded border text-[#222936]"
        >
          <option value="">-- Choisir un utilisateur --</option>
          {usersList.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {error && <span className="text-red-500 text-sm mt-1"> {error} </span>}

        <AlertDialogFooter className="mt-4">
          <AlertDialogCancel className="cursor-pointer bg-gray-300 hover:bg-gray-400">
            Annuler
          </AlertDialogCancel>
          <Button
            type="button"
            onClick={handleConfirmShare}
            className="bg-green-400 hover:bg-green-500 text-white"
          >
            Partager
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShareTodoModal;
