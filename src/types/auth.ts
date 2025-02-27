import {
  LoginCredentialsSchema,
  RegisterCredentialsSchema,
} from "@/schemas/auth";
import { z } from "zod";

export type LoginCredentialsType = z.infer<typeof LoginCredentialsSchema>;

export type RegisterCredentialsType = z.infer<typeof RegisterCredentialsSchema>;

export type AuthResponseType = {
  success: boolean | null;
  message: string;
};
