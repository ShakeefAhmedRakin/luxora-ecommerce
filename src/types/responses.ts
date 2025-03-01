export type ServerResponseType = {
  success: boolean | null;
  message: string;
  data?: unknown;
};

export const defaultServerResponse: ServerResponseType = {
  success: null,
  message: "",
  data: null,
};
