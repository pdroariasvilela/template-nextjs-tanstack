import axios from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  InternalServerErrorException,
  NetworkException,
  NotFoundException,
  RequestCancelledException,
  ServiceUnavailableException,
  TooManyRequestsException,
  UnauthorizedException,
} from '@/shared/exceptions/custom-errors';
import type {
  IApiClientOptions,
  IApiErrorResponse,
  IApiResponse,
  ICancelablePromise,
} from '@/shared/types/api.type';

export class ApiClientConfig {
  public readonly abortControllers: Map<string, AbortController>;
  private readonly client: AxiosInstance;
  private readonly retryAttempts: number;
  private readonly retryDelay: number;

  constructor(
    public readonly baseURL: string,
    options: IApiClientOptions = {}
  ) {
    const { timeout, retryAttempts = 3, retryDelay = 1000 } = options;

    this.retryAttempts = retryAttempts;
    this.retryDelay = retryDelay;
    this.client = axios.create({
      baseURL,
      timeout,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      //TODO : Debo cambiarlo a true xd
      withCredentials: false,
    });

    this.abortControllers = new Map<string, AbortController>();
    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => config,
      (error: AxiosError) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError<IApiErrorResponse>) => {
        if (error.response) {
          const { status, data } = error.response;
          const errorMessage = data.message || 'Ocurrió un error inesperado';
          const errorCode = data.code || `(HTTP_${String(status)})`;
          const details = { errors: data.errors, originalData: data };
          console.error(`API Error [${String(status)}]:`, errorMessage, errorCode);

          switch (status) {
            case 400:
              throw new BadRequestException(errorMessage, data.details ?? details, String(errorCode));
            case 401:
              this.handleUnauthorized();
              throw new UnauthorizedException(errorMessage, data.details ?? details, String(errorCode));
            case 403:
              throw new ForbiddenException(errorMessage, data.details ?? details, String(errorCode));
            case 404:
              throw new NotFoundException(errorMessage, data.details ?? details, String(errorCode));
            case 409:
              throw new ConflictException(errorMessage, data.details ?? details, String(errorCode));
            case 429:
              throw new TooManyRequestsException(errorMessage, data.details ?? details, String(errorCode));
            case 500:
              throw new InternalServerErrorException();
            case 502:
              throw new BadGatewayException(errorMessage, data.details ?? details, String(errorCode));
            case 503:
              throw new ServiceUnavailableException(errorMessage, data.details ?? details, String(errorCode));
            default:
              throw new Error(`${errorMessage} (${String(errorCode)})`);
          }
        } else if (error.request) {
          throw new NetworkException('No se pudo conectar con el servidor. Verifica tu conexión.');
        } else if (axios.isCancel(error)) {
          throw new RequestCancelledException('Solicitud cancelada por el usuario.');
        } else {
          throw new Error(`Error al procesar la solicitud`);
        }
      }
    );
  }

  private async sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async retryRequest<T>(
    requestFn: () => Promise<AxiosResponse<T>>,
    attempts: number = this.retryAttempts
  ): Promise<AxiosResponse<T>> {
    try {
      return await requestFn();
    } catch (error: unknown) {
      if (attempts > 1 && this.shouldRetry(error)) {
        await this.sleep(this.retryDelay);
        return this.retryRequest(requestFn, attempts - 1);
      }
      throw error;
    }
  }

  private shouldRetry(error: unknown): boolean {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      return !error.response || (status !== undefined && status >= 500 && status < 600);
    }
    return false;
  }

  private handleUnauthorized(): void {
    window.dispatchEvent(
      new CustomEvent('auth:unauthorized', {
        detail: {
          timestamp: new Date(),
          reason: 'token_expired',
          redirectTo: '/auth/login',
        },
      })
    );
  }

  public cancelRequest(requestId: string): void {
    const controller = this.abortControllers.get(requestId);
    if (controller) {
      controller.abort(`Solicitud ${requestId} cancelada`);
      this.abortControllers.delete(requestId);
    }
  }

  public cancelAllRequests(): void {
    this.abortControllers.forEach((controller, requestId) => {
      controller.abort(`Solicitud ${requestId} cancelada`);
    });
    this.abortControllers.clear();
  }

  public async request<T>(config: AxiosRequestConfig, requestId?: string): Promise<ICancelablePromise<T>> {
    if (requestId) {
      const controller = new AbortController();
      this.abortControllers.set(requestId, controller);
      config.signal = controller.signal;
    }

    try {
      const response = await this.retryRequest<T>(() => this.client.request<T>(config));

      if (requestId) {
        this.abortControllers.delete(requestId);
      }

      const result: IApiResponse<T> = {
        data: response.data,
        status: response.status,
        message: response.statusText,
        headers: response.headers,
      };

      const cancelablePromise = Promise.resolve(result) as ICancelablePromise<T>;
      return await cancelablePromise;
    } catch (error) {
      if (requestId) {
        this.abortControllers.delete(requestId);
      }
      throw error;
    }
  }
}
