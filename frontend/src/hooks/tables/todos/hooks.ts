import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { todosTable } from "../../../constants";
import Supabase from "../../../lib/supabase";
import { TodoSchema, type TodoAttrT } from "./schema";
import { genericMutationResultFn } from "../../utils";

// Ajouter une tâche
export const addTodo = async (todoData: TodoAttrT) => {
  const { data, error } = await Supabase.from(todosTable)
    .insert(todoData)
    .select("*");

  if (error) throw new Error(error.message);
  return TodoSchema.parse(data[0]);
};

export const useAddTodo = (userId: string) =>
  useMutation({
    mutationFn: (todoData: TodoAttrT) => addTodo(todoData),
    onSuccess: () =>
      genericMutationResultFn.onSuccess({
        queryKeys: [todosTable, userId],
      }),
  });

// Récupérer toutes les tâches d’un utilisateur
export const getTodos = async (userId: string) => {
  const { data, error } = await Supabase.from(todosTable)
    .select("*")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);
  return z.array(TodoSchema).parse(data);
};

export const useGetTodos = (userId: string) =>
  useQuery({
    queryKey: [todosTable, userId],
    queryFn: () => getTodos(userId),
    enabled: !!userId,
  });

// Supprimer une tâche
export const deleteTodo = async (todoId: string) => {
  const { error } = await Supabase.from(todosTable).delete().eq("id", todoId);
  if (error) throw new Error(error.message);
};

export const useDeleteTodo = () =>
  useMutation({
    mutationFn: (todoId: string) => deleteTodo(todoId),
    onSuccess: () =>
      genericMutationResultFn.onSuccess({
        queryKeys: [todosTable],
      }),
  });
