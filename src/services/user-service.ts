import { AccountUpdate } from "@/types/database/accounts";
import { LoginCredentialsType, RegisterCredentialsType } from "@/types/auth";
import { Role } from "@/types/permissions";
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
    const { error: accountCreationError } = await this.supabase.auth.signUp({
      email,
      password,
    });

    if (accountCreationError) {
      throw new Error(accountCreationError.message || "Internal server error");
    }

    await this.updateAccountsData({ full_name: fullname });
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
    const { data, error } = await this.supabase.auth.getUser();

    if (error) {
      throw new Error(error.message);
    }

    return data?.user;
  }

  async getUserRole(): Promise<Role | null> {
    const user = await this.getUser();

    if (!user) {
      throw new Error("User not found");
    }

    const { data, error } = await this.supabase
      .from("accounts")
      .select("role")
      .eq("id", user?.id)
      .single();

    if (error) {
      throw new Error("User role not found");
    }

    return data.role;
  }

  async logOutUser() {
    const { error } = await this.supabase.auth.signOut();
    if (error) {
      throw new Error(error.message);
    }
  }

  private async updateAccountsData(updatedData: AccountUpdate): Promise<void> {
    const user = await this.getUser();
    const { error: accountUpdateError } = await this.supabase
      .from("accounts")
      .update(updatedData)
      .eq("id", user?.id)
      .select();

    if (accountUpdateError) {
      throw new Error("Internal server error");
    }
  }
}

export default UserService;
