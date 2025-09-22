import type { AxiosRequestConfig } from 'axios';

import type { ICancelablePromise } from '@/shared/types/api.type';
import type { ApiClientConfig } from './api-client.config';

export class HttpClient {
  constructor(private readonly client: ApiClientConfig) {}

  public async get<T>(
    url: string,
    config?: AxiosRequestConfig,
    requestId?: string
  ): Promise<ICancelablePromise<T>> {
    return await this.client.request<T>({ method: 'GET', url, ...config }, requestId);
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
    requestId?: string
  ): Promise<ICancelablePromise<T>> {
    return await this.client.request<T>({ method: 'POST', url, data, ...config }, requestId);
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
    requestId?: string
  ): Promise<ICancelablePromise<T>> {
    return await this.client.request<T>({ method: 'PUT', url, data, ...config }, requestId);
  }

  public async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
    requestId?: string
  ): Promise<ICancelablePromise<T>> {
    return await this.client.request<T>({ method: 'PATCH', url, data, ...config }, requestId);
  }

  public async delete<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
    requestId?: string
  ): Promise<ICancelablePromise<T>> {
    return await this.client.request<T>({ method: 'DELETE', url, data, ...config }, requestId);
  }

  public cancelRequest(requestId: string) {
    this.client.cancelRequest(requestId);
  }

  public cancelAllRequests() {
    this.client.cancelAllRequests();
  }
}
