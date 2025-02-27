import {
  LoginCredentialsSchema,
  RegisterCredentialsSchema,
} from "@/schemas/auth";
import { LoginCredentialsType, RegisterCredentialsType } from "@/types/auth";

export function validateRegisterFormData(
  formData: FormData
): RegisterCredentialsType {
  if (!(formData instanceof FormData)) {
    throw new Error("Invalid form data");
  }

  const formDataObject = Object.fromEntries(formData.entries());

  const result = RegisterCredentialsSchema.safeParse(formDataObject);

  if (!result.success) {
    throw new Error(result.error.issues[0]?.message || "Invalid input");
  }

  return result.data;
}

export function validateLoginFormData(
  formData: FormData
): LoginCredentialsType {
  if (!(formData instanceof FormData)) {
    throw new Error("Invalid form data");
  }

  const formDataObject = Object.fromEntries(formData.entries());

  const result = LoginCredentialsSchema.safeParse(formDataObject);

  if (!result.success) {
    throw new Error("Invalid credentials");
  }

  return result.data;
}
