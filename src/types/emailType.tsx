import { z } from "zod";

export const emailTypeSchema = z.object({
  id: z.string(),
  snippet: z.string(),
  subject: z.string(),
  from: z.string(),
  category: z.string().optional(),
});

export type emailType = z.infer<typeof emailTypeSchema>;
