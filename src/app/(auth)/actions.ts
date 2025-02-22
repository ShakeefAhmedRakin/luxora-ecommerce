"use server";
import { LogType } from "@/types/logs";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function registerUser(
  prevState: LogType,
  formData: FormData
): Promise<LogType> {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: null, message: "Email and password are required" };
  }

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Signup successful!" };
}

export async function loginUser(
  prevState: LogType,
  formData: FormData
): Promise<LogType> {
  const supabase = await createClient();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { success: null, message: "Email and password are required" };
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  revalidatePath("/", "layout");
  return { success: true, message: "Signup successful!" };
}
