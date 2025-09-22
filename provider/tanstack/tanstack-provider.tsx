'use client';

import { QueryClient, QueryClientProvider, QueryErrorResetBoundary } from "@tanstack/react-query";
import { queryClientConfig } from "./query.config";
import { useState } from "react";

interface TanstackProviderProps {
    children: React.ReactNode;
}

export const TanstackProvider = ({ children }: TanstackProviderProps) => {
    const [queryClient] = useState(() => new QueryClient(queryClientConfig));

    return (
        <QueryClientProvider client={queryClient}>
            <QueryErrorResetBoundary>
                {children}
            </QueryErrorResetBoundary>
        </QueryClientProvider>
    );
};