import { z } from "zod";

// Detecta si estamos en el servidor (true) o en el navegador (false)
const IS_SERVER = typeof window === "undefined";

// --- Esquema del Servidor ---
// (Solo se valida en el servidor)
const serverSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url(),
  NEXT_PUBLIC_FRONTEND_BASE_URL: z.url(),
  SERVER_SECRET_KEY: z.string().min(1),
});

// --- Esquema del Cliente ---
// (Solo valida las variables públicas)
const clientSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.url(),
  NEXT_PUBLIC_FRONTEND_BASE_URL: z.url(),
});

// --- Validación ---
let allEnv: z.infer<typeof serverSchema>;
let clientEnv: z.infer<typeof clientSchema>;

if (IS_SERVER) {
  // --- Lógica solo para el SERVIDOR ---
  const result = serverSchema.safeParse(process.env);

  if (!result.success) {
    console.error(
      "❌ Variables de entorno inválidas (SERVIDOR):",
      result.error.flatten().fieldErrors
    );
    throw new Error(
      "Variables de entorno del servidor inválidas. Revisa tu .env.local"
    );
  }

  allEnv = result.data;
  clientEnv = {
    NEXT_PUBLIC_API_BASE_URL: result.data.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_FRONTEND_BASE_URL: result.data.NEXT_PUBLIC_FRONTEND_BASE_URL,
  };
} else {
  const result = clientSchema.safeParse({
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_FRONTEND_BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
  });

  if (!result.success) {
    console.error(
      "❌ Variables de entorno inválidas (CLIENTE):",
      result.error.flatten().fieldErrors
    );
    throw new Error("Variables de entorno del cliente inválidas.");
  }

  // @ts-expect-error
  allEnv = {};
  clientEnv = result.data;
}

export const env = {
  // Propiedades del servidor (solo accesibles en el servidor)
  ...allEnv,
  // Propiedades seguras para el cliente (accesibles en ambos)
  client: clientEnv,
};
