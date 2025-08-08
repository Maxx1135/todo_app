import { z } from "zod";
import { BaseSupabaseSchema } from "../../baseSchema";

export const TodoAttrSchema = z.object({
  title: z.string(),
  completed: z.boolean().optional(),
});

export const TodoSchema = BaseSupabaseSchema.extend({
  ...TodoAttrSchema.shape,
});

export type TodoAttrT = z.infer<typeof TodoAttrSchema>;
export type TodoT = z.infer<typeof TodoSchema>;
