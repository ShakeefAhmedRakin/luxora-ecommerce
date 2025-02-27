import { z } from "zod";

export const LoginCredentialsSchema = z.object({
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
});

export const RegisterCredentialsSchema = LoginCredentialsSchema.extend({
  displayName: z
    .string()
    .trim()
    .min(3, { message: "Display name must be at least 3 characters long" }),
});
