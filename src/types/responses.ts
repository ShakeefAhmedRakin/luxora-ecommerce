export type ServerResponseType<T = unknown> = {
  success: boolean | null;
  message: string;
  data?: T;
};
