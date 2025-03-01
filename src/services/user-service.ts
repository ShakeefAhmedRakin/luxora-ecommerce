import { LoginCredentialsType, RegisterCredentialsType } from "@/types/auth";
import { supabaseClient } from "@/utils/supabase/client";
import { SupabaseClient, User } from "@supabase/supabase-js";

class UserService {
  private supabase: SupabaseClient;

  constructor(supabase: SupabaseClient) {
    this.supabase = supabase;
  }

  async registerUser({
    email,
    password,
    fullname,
  }: Omit<RegisterCredentialsType, "confirmPassword">) {
    const { data: userData, error: accountCreationError } =
      await this.supabase.auth.signUp({
        email,
        password,
      });

    if (accountCreationError) {
      throw new Error(accountCreationError.message || "Internal server error");
    }

    if (!userData?.user?.id) {
      throw new Error("Internal server error");
    }

    const { data: updatedData, error: accountUpdateError } = await this.supabase
      .from("accounts")
      .update({ full_name: fullname })
      .eq("id", userData.user.id)
      .select();

    if (!updatedData || accountUpdateError) {
      throw new Error("Internal server error");
    }
  }

  async loginUser({ email, password }: LoginCredentialsType) {
    const { error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new Error(error.message || "Invalid credentials");
    }
  }

  async getUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();

    return data?.user;
  }

  async logOutUser() {
    const supabaseBrowser = supabaseClient();

    // log out from browser session
    await supabaseBrowser.auth.signOut();

    // log out from server session
    await this.supabase.auth.signOut();
  }
}

export default UserService;
