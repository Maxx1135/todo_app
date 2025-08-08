import { z } from "zod";

export const BaseSupabaseSchema = z.object({
  id: z.string(),
  created_at: z.string(),
});
