import { ServerResponseType } from "@/types/responses";

export function successResponse<T>(
  message: string,
  data: T = null as T
): ServerResponseType<T> {
  return {
    success: true,
    message,
    data,
  };
}
