"use server";
import { AuthResponseType } from "@/types/auth";
import {
  validateLoginFormData,
  validateRegisterFormData,
} from "@/utils/auth/validators";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// REGISTER USER FUNCTION
export async function registerUser(
  prevState: AuthResponseType,
  formData: FormData
): Promise<AuthResponseType> {
  try {
    const { email, password, displayName } = validateRegisterFormData(formData);

    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { display_name: displayName } },
    });

    if (error) {
      throw new Error(error.message || "Registration failed");
    }

    revalidatePath("/", "layout");

    return { success: true, message: "Registration successful!" };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}

// LOGIN USER FUNCTION
export async function loginUser(
  prevState: AuthResponseType,
  formData: FormData
): Promise<AuthResponseType> {
  try {
    const { email, password } = validateLoginFormData(formData);

    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error("Invalid credentials");
    }

    revalidatePath("/", "layout");
    return { success: true, message: "Login successful!" };
  } catch (error: unknown) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "An unexpected error occurred",
    };
  }
}
