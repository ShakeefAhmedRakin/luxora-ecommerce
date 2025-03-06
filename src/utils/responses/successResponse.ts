import { ServerResponseType } from "@/types/responses";

export function successResponse<T>(
  message: string,
  data?: T
): ServerResponseType<T> {
  return {
    success: true,
    message,
    data,
  };
}
