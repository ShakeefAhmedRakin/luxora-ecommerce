import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

class UserService {
  private async getSupabase() {
    return await createClient(); // Call createClient inside the method
  }

  async login(formData: FormData) {
    const supabase = await this.getSupabase();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login Error:", error.message);
      redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
  }

  async signup(formData: FormData) {
    const supabase = await this.getSupabase();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      console.error("Signup Error:", error.message);
      redirect("/error");
    }

    revalidatePath("/", "layout");
    redirect("/");
  }
}

export const UserAuth = new UserService();
