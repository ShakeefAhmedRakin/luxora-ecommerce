import { z } from "zod";

export const LoginCredentialsSchema = z
  .object({
    email: z
      .string()
      .trim()
      .email({ message: "Email must be a valid email address" }),
    password: z
      .string()
      .trim()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$/, {
        message: "Password must contain at least one letter and one number",
      }),
  })
  .strict();

export const RegisterCredentialsSchema = LoginCredentialsSchema.extend({
  fullname: z
    .string()
    .trim()
    .min(3, { message: "Full name must be at least 3 characters long" }),
}).strict();
