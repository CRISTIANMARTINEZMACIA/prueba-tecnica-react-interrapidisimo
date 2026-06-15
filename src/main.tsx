import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
  type DefaultError,
} from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import type { CustomApiError } from "./models/error.ts";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 15,
      retry: (failureCount: number, error: DefaultError) => {
        const apiError = error as CustomApiError;
        const status = apiError?.response?.status || apiError?.status;
        if (status && status >= 400 && status < 500) return false;
        return failureCount < 2;
      },

      throwOnError: (error: DefaultError) => {
        const apiError = error as CustomApiError;
        const status = apiError?.response?.status || apiError?.status;
        return status ? status >= 500 || !status : false;
      },

      refetchOnWindowFocus: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => console.error(`[Query Error]: ${error.message}`),
  }),
  mutationCache: new MutationCache({
    onError: (error) => console.error(`[Mutation Error]: ${error.message}`),
  }),
});
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>
);
