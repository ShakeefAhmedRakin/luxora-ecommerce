import { ServerResponseType } from "@/types/responses";
import getErrorMessage from "../error/getErrorMessage";

export function errorResponse(error: unknown): ServerResponseType {
  return {
    success: false,
    message: getErrorMessage(error),
  };
}
