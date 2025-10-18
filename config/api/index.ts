import { APP } from '@/shared/constants/app';
import { ApiClientConfig } from './api-client.config';
import { HttpClient } from './http-client';

// API CONFIGS
export { END_POINTS, buildEndpoint } from './end-points.config';
export { ApiClientConfig } from './api-client.config';
export { HttpClient } from './http-client';

// CLIENTES
export const apiClient = new ApiClientConfig(APP.API_BASE_URL ? APP.API_BASE_URL : '');
export const httpClient = new HttpClient(apiClient);