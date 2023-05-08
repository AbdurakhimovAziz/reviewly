import { AxiosError } from 'axios';

export type ServerResponse = {
  message: string;
  success: boolean;
};

export type ServerErrorResponse = {
  message: string;
  statusCode: number;
  error: string;
};

export type AxiosErrorWithRetry = AxiosError & {
  config: {
    _retry?: boolean;
  };
};
