import { z } from "zod";

const serverSchema = z.object({
  AUTH_SECRET: z.string().min(1),
  MICROSOFT_CLIENT_ID: z.string(),
  MICROSOFT_CLIENT_SECRET: z.string(),
  MICROSOFT_TENANT_ID: z.string().optional(),
  SERVER_SECRET_KEY: z.string().min(1),
  DATABASE_URL: z.string().min(1),
});

export const serverEnv = (() => {
  if (typeof window !== "undefined") {
    throw new Error("❌ serverEnv no puede usarse en el cliente");
  }

  const result = serverSchema.safeParse(process.env);
  if (!result.success) {
    console.error("❌ Variables de entorno inválidas (SERVIDOR):", result.error.flatten().fieldErrors);
    throw new Error("Variables de entorno del servidor inválidas. Revisa tu .env.local");
  }

  return result.data;
})();
