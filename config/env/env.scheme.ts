import { z } from 'zod';

export const envSchema = z.object({
  API_BASE_URL: z.string().min(1, 'La URL base de la API es requerida').default('https://rickandmortyapi.com/api'),
  FRONTEND_BASE_URL: z.string().min(1, 'La URL base del frontend es requerida').default('http://localhost:3000'),
  WS: z.string().default('ws://localhost:3000'),
  WS_SECURE: z.string().optional(),
  MOCK_AVAILABLE: z.enum(['true', 'false']).default('false').optional(),
  NODE_ENV: z.enum(['production', 'development', 'test']).default('development'),
  USE_SECURE_PROTOCOLS: z.enum(['true', 'false']).default('false').optional(),
});

export type EnvType = z.infer<typeof envSchema>;
