import {
  LoginCredentialsSchema,
  RegisterCredentialsSchema,
} from "@/schemas/auth";
import { LoginCredentialsType, RegisterCredentialsType } from "@/types/auth";

export function getValidatedRegisterFormData(
  formData: FormData
): RegisterCredentialsType {
  if (!(formData instanceof FormData)) {
    throw new Error("Invalid form data");
  }

  const result = RegisterCredentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    fullname: formData.get("fullname"),
  });

  if (!result.success) {
    throw new Error(result.error.issues[0]?.message || "Invalid input");
  }

  return result.data;
}

export function getValidatedLoginFormData(
  formData: FormData
): LoginCredentialsType {
  if (!(formData instanceof FormData)) {
    throw new Error("Invalid form data");
  }

  const result = LoginCredentialsSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!result.success) {
    throw new Error("Invalid credentials");
  }

  return result.data;
}
