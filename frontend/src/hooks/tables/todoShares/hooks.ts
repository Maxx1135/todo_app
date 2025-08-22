import { TodoSharesSchema, type TodoSharesT } from "../todoShares/schema";
import { todosharesTable, todosTable } from "../../../constants";
import Supabase from "../../../lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";
import { genericMutationResultFn } from "../../utils";

// Partager un Todo
export const shareTodo = async (todoShared: TodoSharesT) => {
  const { data, error } = await Supabase.from(todosharesTable)
    .insert(todoShared)
    .select("*");

  if (error) throw new Error(error.message);
  return TodoSharesSchema.parse(data[0]);
};

export const useShareTodo = () =>
  useMutation({
    mutationFn: (todoShared: TodoSharesT) => shareTodo(todoShared),
    onSuccess: () =>
      genericMutationResultFn.onSuccess({
        queryKeys: [todosTable, todosharesTable],
      }),
  });

// Récupérer toutes les tâches partagées avec un utilisateur
export const getSharedTodos = async (userId: string) => {
  const { data, error } = await Supabase.from(todosharesTable)
    .select(`*, Todos(title)`)
    .eq("shared_with", userId);

  if (error) throw new Error(error.message);

  return data as TodoSharesT[];
};

export const useGetSharedTodos = (userId: string) =>
  useQuery({
    queryKey: [todosharesTable, userId],
    queryFn: () => getSharedTodos(userId),
    enabled: !!userId,
  });
