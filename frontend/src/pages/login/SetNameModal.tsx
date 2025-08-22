import { useState } from "react";
import useAppState from "../../state";
import Supabase from "../../lib/supabase";
import { profilesTable } from "../../constants";
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
interface Props {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const SetNameModal = ({ isOpen, setIsOpen }: Props) => {
  const userInfo = useAppState((state) => state.userInfo);
  const updateName = useAppState((state) => state.updateName);
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState("");

  const handleSave = async () => {
    if (!nameInput.trim()) {
      setError("Le nom est obligatoire");
      return;
    }
    if (!userInfo) return;

    // Mettre à jour Supabase
    const { error: supabaseError } = await Supabase.from(profilesTable)
      .update({ name: nameInput })
      .eq("id", userInfo.id)
      .select();

    if (supabaseError) {
      console.error(supabaseError.message);
      setError("Erreur lors de l'enregistrement");
      return;
    }
    updateName(nameInput);
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent className="max-w-sm rounded-lg border border-gray-200 bg-white shadow-lg p-6">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-gray-800">
            Bienvenue !
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="mb-4 text-sm text-gray-500">
          Veuillez entrer votre nom
        </AlertDialogDescription>
        <Input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Nom"
          className="mb-2 border-gray-300 focus:border-blue-400 focus:ring-blue-400 rounded"
        />
        {error && (
          <span className="text-xs text-red-500 mb-2 block">{error}</span>
        )}
        <AlertDialogFooter className="flex justify-end gap-2 mt-4">
          <AlertDialogCancel className="px-4 py-2 rounded border border-gray-300 text-gray-600 hover:bg-gray-100 transition">
            Annuler
          </AlertDialogCancel>
          <Button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={handleSave}
          >
            Enregistrer
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SetNameModal;
