import { z } from "zod";

export const registerSchema = z.object({
  email: z.email(),
  password: z.string()
    .min(6, {
      message: "Passwords must be at least 6 characters"
    })
    .regex(/[a-z]/, {
      message: "Passwords must have at least one lowercase ('a'-'z')."
    })
    .regex(/[A-Z]/, {
      message: "Passwords must have at least one uppercase ('A'-'Z')."
    })
    .regex(/[0-9]/, {
      message: "Passwords must have at least one digit ('0'-'9')."
    })
    .regex(/[!@#$ %^&* (),.?":{}|<>]/, {
      message: "Passwords must have at least one non alphanumeric character."
    })   
});

export type RegisterSchema = z.infer<typeof registerSchema>;