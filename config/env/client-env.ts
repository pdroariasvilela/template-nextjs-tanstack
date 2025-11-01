import { z } from "zod";

const clientSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_FRONTEND_BASE_URL: z.string().url(),
});

export const clientEnv = (() => {
  const result = clientSchema.safeParse({
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
    NEXT_PUBLIC_FRONTEND_BASE_URL: process.env.NEXT_PUBLIC_FRONTEND_BASE_URL,
  });

  if (!result.success) {
    console.error("❌ Variables de entorno inválidas (CLIENTE):", result.error.flatten().fieldErrors);
    throw new Error("Variables de entorno del cliente inválidas.");
  }

  return result.data;
})();
