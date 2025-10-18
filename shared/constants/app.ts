import { env } from "@/config/env/env.scheme";

export const APP = {
  API_BASE_URL: env.client.NEXT_PUBLIC_API_BASE_URL,
  FRONTEND_BASE_URL: env.client.NEXT_PUBLIC_FRONTEND_BASE_URL,
};