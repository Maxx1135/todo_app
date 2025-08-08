// hooks/useTodos.ts
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

export const useAddTodo = () =>
  useMutation({
    mutationFn: (todoData: TodoAttrT) => addTodo(todoData),
    onSuccess: () =>
      genericMutationResultFn.onSuccess({
        queryKeys: [todosTable],
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

// Mettre à jour une tâche
export const updateTodo = async (
  todoId: string,
  newData: Partial<TodoAttrT>
) => {
  const { data, error } = await Supabase.from(todosTable)
    .update(newData)
    .eq("id", todoId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return TodoSchema.parse(data);
};

export const useUpdateTodo = () =>
  useMutation({
    mutationFn: ({
      todoId,
      newData,
    }: {
      todoId: string;
      newData: Partial<TodoAttrT>;
    }) => updateTodo(todoId, newData),
    onSuccess: () =>
      genericMutationResultFn.onSuccess({
        queryKeys: [todosTable],
      }),
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
