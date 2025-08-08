import { z } from "zod";

export const TodoAttrSchema = z.object({
  id: z.string().optional(),
  user_id: z.string(),
  title: z.string(),
  completed: z.boolean().optional(),
});

export const TodoSchema = TodoAttrSchema.extend({
  id: z.string(),
  completed: z.boolean(),
});

export type TodoAttrT = z.infer<typeof TodoAttrSchema>;
export type TodoT = z.infer<typeof TodoSchema>;
