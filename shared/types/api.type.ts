import type { AxiosHeaders, AxiosResponseHeaders, HttpStatusCode, RawAxiosResponseHeaders } from 'axios';

export interface IApiResponse<T> {
  data: T;
  status: HttpStatusCode;
  message: string;
  headers?: RawAxiosResponseHeaders | AxiosResponseHeaders | AxiosHeaders;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    hasNext?: boolean;
  };
}

export interface IApiErrorResponse {
  message: string;
  code: string | number;
  details?: unknown;
  timestamp?: string;
  path?: string;
  errors?: {
    field?: string;
    message: string;
    code?: string;
  }[];
  stack?: string;
}

export interface ICancelablePromise<T> extends Promise<IApiResponse<T>> {
  cancel?: () => void;
}

export interface IApiClientOptions {
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}
