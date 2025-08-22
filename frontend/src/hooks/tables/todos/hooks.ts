import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { todosTable } from "../../../constants";
import Supabase from "../../../lib/supabase";
import { TodoSchema, type TodoAttrT, type TodoT } from "./schema";
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
    .eq("user_id", userId)
    .order("id", { ascending: true });

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

// Mettre à jour une tâche
export const updateTodo = async (todoId: string, newData: Partial<TodoT>) => {
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
      newData: Partial<TodoT>;
    }) => updateTodo(todoId, newData),
    onSuccess: () =>
      genericMutationResultFn.onSuccess({
        queryKeys: [todosTable],
      }),
  });

// Marquer une tâche comme complétée
export const completeTodo = async (todoId: string) => {
  const { data, error } = await Supabase.from(todosTable)
    .update({
      completed: true,
    })
    .eq("id", todoId)
    .select("*")
    .single();

  if (error) throw new Error(error.message);
  return TodoSchema.parse(data);
};

export const useCompleteTodo = () =>
  useMutation({
    mutationFn: (todoId: string) => completeTodo(todoId),
    onSuccess: () =>
      genericMutationResultFn.onSuccess({
        queryKeys: [todosTable],
      }),
  });
