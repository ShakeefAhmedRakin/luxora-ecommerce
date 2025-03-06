import {
  LoginCredentialsSchema,
  RegisterCredentialsSchema,
} from "@/schemas/auth";
import { LoginCredentialsType, RegisterCredentialsType } from "@/types/auth";

export function getValidatedRegisterFormData(
  formData: RegisterCredentialsType
): RegisterCredentialsType {
  const { data, error } = RegisterCredentialsSchema.safeParse(formData);

  if (error) {
    throw new Error(error.issues[0]?.message || "Invalid input");
  }

  return data;
}

export function getValidatedLoginFormData(
  formData: LoginCredentialsType
): LoginCredentialsType {
  const { data, error } = LoginCredentialsSchema.safeParse(formData);

  if (error) {
    throw new Error("Invalid credentials");
  }

  return data;
}
