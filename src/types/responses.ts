export type ServerResponseType<T = unknown> = {
  success: boolean | null;
  message: string;
  data?: T;
};

export const defaultServerResponse: ServerResponseType = {
  success: null,
  message: "",
  data: null,
};
