import { LoginCredentialsType, RegisterCredentialsType } from "@/types/auth";
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

  async loginUserWithGoogle() {
    const { data, error } = await this.supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/callback`,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return data?.url;
  }

  async getUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();

    return data?.user;
  }

  async logOutUser() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
