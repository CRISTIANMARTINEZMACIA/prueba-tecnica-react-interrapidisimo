import type { ProductResponse } from "./product";

export interface Response {
  error: boolean;
  message: string;
  data: Root | null;
}

export interface Root {
  products: ProductResponse[];
  total?: number;
  skip?: number;
  limit?: number;
}
