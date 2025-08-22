import z from "zod";
import { BaseSupabaseSchema } from "../../baseSchema";

export const ProfileAttrSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const ProfileSchema = BaseSupabaseSchema.extend({
  ...ProfileAttrSchema.shape,
});

export type ProfileAttrT = z.infer<typeof ProfileAttrSchema>;
export type ProfileT = z.infer<typeof ProfileSchema>;
