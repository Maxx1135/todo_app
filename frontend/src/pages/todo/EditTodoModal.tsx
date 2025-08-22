import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { useUpdateTodo } from "../../hooks/tables/todos/hooks";
import type { TodoT } from "../../hooks/tables/todos/schema";

interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  editingTodo: TodoT | null;
  editInput: string;
  setEditInput: (input: string) => void;
}

const EditTodoModal = ({
  isOpen,
  setIsOpen,
  editingTodo,
  editInput,
  setEditInput,
}: Props) => {
  const [editError, setEditError] = useState("");
  const updateTodo = useUpdateTodo();

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
          setIsOpen(false);
          setEditError("");
        },
      }
    );
  };
  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="bg-[#FAEAE1] ">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[#E83C75] ">
              Modifier la tâche
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Changez le titre de votre tâche puis cliquez sur "Enregistrer" pour
            appliquer la modification.
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
    </div>
  );
};
export default EditTodoModal;
