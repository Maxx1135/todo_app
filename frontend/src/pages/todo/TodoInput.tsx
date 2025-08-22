import { useAddTodo } from "../../hooks/tables/todos/hooks";
import { Button } from "../../components/ui/button";

interface Props {
  input: string;
  setInput: (v: string) => void;
  userId: string;
}

const TodoInput = ({ input, setInput, userId }: Props) => {
  const addTodo = useAddTodo(userId);
  const handleAdd = () => {
    if (!input.trim() || !userId) return;
    addTodo.mutate({ title: input, user_id: userId });
    setInput("");
  };
  return (
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
  );
};
export default TodoInput;
