import { clientEnv } from "@/config/env";

export const APP = {
  API_BASE_URL: clientEnv.NEXT_PUBLIC_API_BASE_URL,
  FRONTEND_BASE_URL: clientEnv.NEXT_PUBLIC_FRONTEND_BASE_URL,
};