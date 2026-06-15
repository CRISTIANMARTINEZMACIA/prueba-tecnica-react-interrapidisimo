import type { FallbackProps } from "react-error-boundary";
import type { CustomApiError } from "../../models/error";
import { Error400View } from "./Error400View";


export const DetailErrorBoundary = ({ error }: FallbackProps) => {
  const apiError = error as CustomApiError;
  const status = apiError?.response?.status || apiError?.status;

  if (status && status >= 400 && status < 500) {
    return <Error400View error={apiError} />;
  }

  throw error;
};