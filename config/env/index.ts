import { z } from 'zod';

import { envSchema, type EnvType } from './env.scheme';

const validateEnv = (): EnvType => {
  try {
    const result = envSchema.parse(process.env);
    return result;
  } catch (error) {
    if (error instanceof z.ZodError) {
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error en las variables de entorno:');
        console.error(error.issues);
      }

      if (process.env.NODE_ENV === 'production') {
        throw new Error('Variables de entorno inválidas. Abortando.');
      }
    }

    if (process.env.NODE_ENV !== 'production') {
      console.warn('Usando valores por defecto para las variables de entorno');
      const envWithDefaults = { ...process.env };
      return envSchema.parse(envWithDefaults);
    }

    throw error;
  }
};

export const env = validateEnv();
