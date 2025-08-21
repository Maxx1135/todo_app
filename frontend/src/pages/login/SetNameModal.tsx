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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Bienvenue !</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          Veuillez entrez votre nom
        </AlertDialogDescription>
        <Input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          placeholder="Nom"
        />
        {error && <span> {error} </span>}
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <Button onClick={handleSave}>Enregistrer</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default SetNameModal;
