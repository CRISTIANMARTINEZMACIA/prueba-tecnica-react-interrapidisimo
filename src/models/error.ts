export interface CustomApiError extends Error {
    response?: {
      status?: number;
    };
    status?: number;
  }