import z from "zod";
import { BaseSupabaseSchema } from "../../baseSchema";

export const TodoSharesAttrSchema = z.object({
  id: z.string().optional(),
  todo_id: z.string(),
  shared_by: z.string(),
  shared_with: z.string(),
  created_at: z.string().optional(),
  Todos: z
    .object({
      title: z.string(),
    })
    .optional(),
});

export const TodoSharesSchema = BaseSupabaseSchema.extend({
  ...TodoSharesAttrSchema.shape,
});

export type TodoSharesAttrT = z.infer<typeof TodoSharesAttrSchema>;
export type TodoSharesT = z.infer<typeof TodoSharesSchema>;
