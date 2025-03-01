import { ServerResponseType } from "@/types/responses";

export function successResponse(
  message: string,
  data: unknown = null
): ServerResponseType {
  return {
    success: true,
    message: message,
    data: data,
  };
}
