import { ServerResponseType } from "@/types/responses";
import getErrorMessage from "../error/getErrorMessage";

export function errorResponse<T = null>(error: unknown): ServerResponseType<T> {
  return {
    success: false,
    message: getErrorMessage(error),
    data: null as T, // Ensures `data` always matches the expected type
  };
}
