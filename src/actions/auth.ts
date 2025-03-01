"use server";
import UserService from "@/services/user-service";
import { ServerResponseType } from "@/types/responses";
import {
  getValidatedLoginFormData,
  getValidatedRegisterFormData,
} from "@/utils/auth/validators";
import { errorResponse } from "@/utils/responses/errorResponse";
import { successResponse } from "@/utils/responses/successResponse";
import { createClient } from "@/utils/supabase/server";
import { User } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";

async function getUserService(): Promise<UserService> {
  const supabase = await createClient();
  return new UserService(supabase);
}

export async function registerUser(
  prevState: ServerResponseType,
  formData: FormData
): Promise<ServerResponseType> {
  try {
    const { email, password, fullname } =
      getValidatedRegisterFormData(formData);

    const userService = await getUserService();

    await userService.registerUser({
      email,
      password,
      fullname,
    });

    revalidatePath("/", "layout");

    return successResponse("Registration successful!");
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function loginUser(
  prevState: ServerResponseType,
  formData: FormData
): Promise<ServerResponseType> {
  try {
    const { email, password } = getValidatedLoginFormData(formData);

    const userService = await getUserService();

    await userService.loginUser({ email, password });

    revalidatePath("/", "layout");

    return successResponse("Login successful!");
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function loginUserWithGoogle(): Promise<
  ServerResponseType<{ callbackUrl: string }>
> {
  try {
    const userService = await getUserService();

    const callbackUrl = await userService.loginUserWithGoogle();

    return successResponse("Login successful!", { callbackUrl });
  } catch (error: unknown) {
    return errorResponse(error);
  }
}

export async function getUser(): Promise<User | null> {
  const userService = await getUserService();

  const data = await userService.getUser();

  return data;
}

export async function logOutUser(): Promise<ServerResponseType> {
  try {
    const userService = await getUserService();

    const user = await userService.getUser();

    if (!user) {
      throw new Error("Failed to log out");
    }

    await userService.logOutUser();

    revalidatePath("/", "layout");

    return successResponse("Logout successful!");
  } catch (error: unknown) {
    return errorResponse(error);
  }
}
