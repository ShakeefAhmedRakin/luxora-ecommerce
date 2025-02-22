"use server";
import { UserAuth } from "@/services/user";

export async function login(formData: FormData) {
  return UserAuth.login(formData);
}

export async function signup(formData: FormData) {
  return UserAuth.signup(formData);
}
