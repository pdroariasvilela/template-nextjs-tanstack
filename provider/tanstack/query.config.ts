import { UnauthorizedException } from "@/shared/exceptions/custom-errors";
import { AxiosError } from "axios";

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: (failureCount: number, error: unknown) => {
        if (error instanceof UnauthorizedException) {
          return false;
        }

        if (error instanceof AxiosError) {
          if (error.response?.status && error.response.status >= 400 && error.response.status < 500) {
            return false;
          }
        }
        return failureCount < 3;
      },
    },
    mutations: {
      retry: false,
    },
  },
};